import { Move, NatureName, StatID } from "@pkmn/dex";
import { FixedStat, LineIndicators } from "./GraphContainer";
import { Field, Generations, calculate, Move as CalcMove } from "@smogon/calc";

import { computeFinalStats } from "@smogon/calc/dist/mechanics/util";
import { useEffect, useState } from "react";
import { pointsToEVs } from "../util/PokeCalcs";
import { StatTooltip } from "./StatTooltip";
import { ThemeContainer } from "../../../components/ThemeContainer";
import { HPLine } from "./HPLine";
import { SelectedPokemonInterface } from "../util/SelectedPokemon";

interface GraphProps {
    attacker: SelectedPokemonInterface;
    defender: SelectedPokemonInterface;
    move: Move | undefined;
    fixedStat: FixedStat;
    lineIndicators: LineIndicators;
    field: Field;
}

type GraphColumns = {
    [stat: string]: ColumnData
}
type NatureMod = "+" | " " | "-";
const keyNatures: { [stat in Exclude<StatID, "hp">]: { [mod in NatureMod]: NatureName } } = {
    atk: {
        "+": "Adamant",
        " ": "Serious",
        "-": "Modest"
    },
    spa: {
        "+": "Modest",
        " ": "Serious",
        "-": "Adamant"
    },
    def: {
        "+": "Bold",
        " ": "Serious",
        "-": "Lonely"
    },
    spd: {
        "+": "Calm",
        " ": "Serious",
        "-": "Naughty"
    },
    spe: {
        "+": "Modest",
        " ": "Serious",
        "-": "Brave"
    }
}

export type InputStats = {
    stat: number;
    nature: NatureMod;
    evs: number;
    ivs: number
}

export type ColumnData = {
    inputStats: InputStats[];
    calcs: {
        low: number;
        high: number;
    };
}

export function Graph({ attacker, defender, move, fixedStat, lineIndicators, field }: GraphProps) {
    const [graphData, setGraphData] = useState<GraphColumns>({});
    const [maxDmg, setMaxDmg] = useState<number>(0);
    const [tooltipVisibility, setTooltipVisibility] = useState<boolean>(true);
    const [currentColumn, setCurrentColumn] = useState<ColumnData | undefined>();
    const [mouseCoords, setMouseCoords] = useState<[number, number]>([0, 0])

    const overheadMargin = 1.05;

    useEffect(() => {
        if (!move || move.category == "Status") {
            setGraphData({ "-1": { inputStats: [{ stat: -1, nature: " ", evs: 0, ivs: 0 }], calcs: { low: 0, high: 0 } } });
            return
        }
        const workingPokemon: SelectedPokemonInterface[] = [attacker.clone(), defender.clone()]
        let variedPokemon: SelectedPokemonInterface;
        let natureOptions: NatureMod[];
        const variedStat: Exclude<StatID, "hp"> = getIndependentEV();
        let offenseStat: StatID = move.category == "Physical" ? "atk" : "spa";
        const defenseStat: StatID = move.category == "Physical" ? "def" : "spd";
        if (move.name == "Body Press") {
            offenseStat = "def";
        }

        if (fixedStat == "def") {
            variedPokemon = workingPokemon[0];
            natureOptions = [" ", "+"];
        }
        else {
            variedPokemon = workingPokemon[1];
            natureOptions = [" ", "+"];
        }


        const data: GraphColumns = {}
        const gen = Generations.get(9);
        let statValue: number = 0;
        const evSteps = attacker.calcData.level > 50 ? 64 : 33

        natureOptions.forEach((natureType: NatureMod) => {
            variedPokemon.updateNature(keyNatures[variedStat][natureType]);
            for (let i = 0; i < evSteps; i++) {
                variedPokemon.updateEVs(variedStat, pointsToEVs(i, attacker.calcData.level > 50));

                variedPokemon.calcAllStats();
                computeFinalStats(Generations.get(9), workingPokemon[0].calcData, workingPokemon[1].calcData,
                    field, offenseStat);
                computeFinalStats(Generations.get(9), workingPokemon[0].calcData, workingPokemon[1].calcData,
                    field, defenseStat);

                statValue = variedPokemon.calcData.stats[variedStat];

                const inputStats: InputStats = {
                    stat: statValue,
                    nature: natureType,
                    evs: variedPokemon.calcData.evs[variedStat],
                    ivs: variedPokemon.calcData.ivs[variedStat]
                }
                if (!data[statValue]) {
                    const result = calculate(gen,
                        workingPokemon[0].calcData,
                        workingPokemon[1].calcData,
                        new CalcMove(gen, move.name),
                        field
                    );
                    const dmg: [number, number] = result.range();
                    data[statValue] = {
                        inputStats: [inputStats], calcs: { "low": dmg[0], "high": dmg[1] }
                    }
                }
                else {
                    data[statValue].inputStats.push(inputStats)
                }
            }
        })
        setMaxDmg(
            Math.max(
                workingPokemon[1].calcData.stats.hp,
                Object.values(data).
                    reduce((acc: number, cur: ColumnData) => Math.max(acc, cur.calcs.high), 0)
            )
        )
        setGraphData(data);
    }, [attacker, defender, move, fixedStat, field])

    function handleGraphHover(e: React.MouseEvent, data: ColumnData) {
        setMouseCoords([e.pageY, e.pageX])
        setCurrentColumn(data);
    }

    function showTooltip() {
        setTooltipVisibility(true);
    }

    function hideTooltip() {
        setTooltipVisibility(false);
    }

    function getIndependentEV(): Exclude<StatID, "hp"> {
        if (move?.name == "Body Press") {
            return "def";
        }
        else {
            if (move?.category == "Physical") {
                return fixedStat == "def" ? "atk" : "def";
            }
            else {
                return fixedStat == "def" ? "spa" : "spd";
            }
        }
    }

    return (
        <ThemeContainer direction={"flex-row justify-center"}>
            <div className="w-[100%] aspect-square">
                <div className="w-[100%] h-[100%] flex flex-row">
                    <div className="flex self-center w-6">
                        <span className="break-all [writing-mode:vertical-lr] rotate-180">{"< Damage >"}</span>
                    </div>
                    <div className="w-[100%] self-stretch relative overflow-clip">
                        {!(!move || move.category == "Status") &&
                            <div className="w-[100%] aspect-square absolute pointer-events-none pl-3">
                                {
                                    (Object.keys(lineIndicators)).map((fraction) => {
                                        if (lineIndicators[fraction]) {
                                            return <HPLine
                                                maxDmg={maxDmg}
                                                defenderHP={defender.calcData.stats.hp}
                                                fraction={parseInt(fraction)}
                                                overheadMargin={overheadMargin}>
                                            </HPLine>
                                        }
                                    })
                                }
                            </div>
                        }
                        <div className="w-[100%] aspect-square pl-12"
                        >
                            <div className="w-[100%] h-[100%] border border-black relative flex-row flex rounded-md overflow-clip">
                                {Object.keys(graphData).map((calc: keyof GraphColumns) => {
                                    return (
                                        <div className={`bg-red-400 w-[100%] flex flex-col hover:border-l hover:border-r hover:border-yellow-100`}
                                            onMouseEnter={showTooltip}
                                            onMouseLeave={hideTooltip}>
                                            <div onMouseMove={(e) => handleGraphHover(e, graphData[calc])}
                                                className="w-[100%]"
                                                style={{ height: 100 * ((maxDmg * overheadMargin) - graphData[calc].calcs.high) / (maxDmg * overheadMargin) + "%", bottom: 0, position: "relative" }}></div>

                                            <div
                                                onMouseMove={(e) => handleGraphHover(e, graphData[calc])}
                                                className="bg-yellow-400 w-[100%]"
                                                style={{ height: 100 * (graphData[calc].calcs.high - graphData[calc].calcs.low) / (maxDmg * overheadMargin) + "%", bottom: 0, position: "relative" }}></div>

                                            <div
                                                onMouseMove={(e) => handleGraphHover(e, graphData[calc])}
                                                className="bg-green-400 w-[100%]"
                                                style={{ height: 100 * (graphData[calc].calcs.low) / (maxDmg * overheadMargin) + "%", bottom: 0, position: "relative" }}></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {tooltipVisibility && <StatTooltip
                    columnData={currentColumn}
                    statName={getIndependentEV()}
                    mouseCoords={mouseCoords}
                    target={defender}
                >
                </StatTooltip>}
                <div className="w-100% flex justify-center h-6 pl-[4.5rem]">
                    <span>{`< ${getIndependentEV()[0].toUpperCase() + getIndependentEV().slice(1)} EVs >`}</span>
                </div>
            </div>
        </ThemeContainer>
    )

}
