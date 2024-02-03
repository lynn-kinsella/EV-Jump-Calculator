import React, { useEffect, useState } from "react";
import { SelectedPokemon, calcStatWrapper } from "../../util/SelectedPokemon_old";
import { calculate, Generations, Move as CalcMove } from "@smogon/calc";
import { Move as DexMove, Move, NatureName, StatID } from "@pkmn/dex";
import { pointsToEVs } from "../../util/PokeCalcs";
import { StatTooltip } from "./StatTooltip";
import EVSlider from "./EVSlider";
type GraphColumns = {
    [stat: string]: ColumnData
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

const overheadMargin = 1.05

type FixedSetting = "atk" | "def" | "spe"

interface GraphContainerProps {
    attacker: SelectedPokemon;
    setAttacker: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
    defender: SelectedPokemon;
    setDefender: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
    attack: Move;
}

export function GraphContainer({ attacker, defender, setAttacker, setDefender, attack }: GraphContainerProps) {

    const [lineSettings, setLineSettings] = useState<number[]>([]);
    const [fixedSettings, setFixedSettings] = useState<FixedSetting>("atk");
    return (
        <div className="flex flex-col gap-8">
            <GraphOptions fixedSettings={fixedSettings} setFixedSettings={setFixedSettings} setLineSettings={setLineSettings} setAttacker={setAttacker} setDefender={setDefender} attack={attack}></GraphOptions>
            <Graph attacker={attacker} defender={defender} attack={attack} lineSettings={lineSettings} fixedSettings={fixedSettings}></Graph>
        </div>
    )
}


interface GraphOptionsProps {
    setAttacker: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
    setDefender: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
    setFixedSettings: React.Dispatch<React.SetStateAction<FixedSetting>>;
    fixedSettings: FixedSetting;
    setLineSettings: React.Dispatch<React.SetStateAction<number[]>>;
    attack: Move;
}

function GraphOptions({ setFixedSettings, fixedSettings, setLineSettings, setAttacker, setDefender, attack }: GraphOptionsProps) {

    function handleChangeFixedSetting(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value as "atk" | "def";
        setFixedSettings(value);
    }

    function handleChangeLines(value: number) {
        if (value) {
            setLineSettings((prevSettings) => {
                let newSettings = [...prevSettings];

                for (let i = 0; i < newSettings.length; i++) {
                    if (newSettings[i] == value) {
                        newSettings.splice(i, 1);
                        return newSettings;
                    }
                }

                newSettings.push(value);
                return newSettings;
            })
        }
    }

    return (
        <div className="flex flex-col gap-1">
            <h1>Options:</h1>
            <div>
                <h2>HP Indicators:</h2>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-1">
                        <label>100% HP</label><input type="checkbox" onClick={() => handleChangeLines(16)} value={16} />
                    </div>
                    <div className="flex flex-row gap-1">
                        <label>50% HP</label><input type="checkbox" onClick={() => handleChangeLines(8)} value={8} />
                    </div>
                    <div className="flex flex-row gap-1">
                        <label>15/16 HP</label><input type="checkbox" onClick={() => handleChangeLines(15)} value={15} />
                    </div>
                    <div className="flex flex-row gap-1">
                        <label>7/8 HP</label><input type="checkbox" onClick={() => handleChangeLines(14)} value={14} />
                    </div>
                </div>
            </div>
            <div>
                <h2>Fixed Stat:</h2>
                <div className="flex flex-row gap-4"><div className="flex flex-row gap-2 h-6">
                    <span>Fix Atk EVs</span>
                    <input type="radio" name="fixEvs" value="atk" checked={fixedSettings == "atk"} onChange={handleChangeFixedSetting} />
                </div>
                    <div className="flex flex-row gap-2 h-6">
                        <span>Fix Def EVs</span>
                        <input type="radio" name="fixEvs" value="def" checked={fixedSettings == "def"} onChange={handleChangeFixedSetting} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {fixedSettings == "atk" && <EVSlider updatePokemon={setAttacker} statName={attack.category == "Physical" ? "atk" : "spa"}></EVSlider>}
                {fixedSettings == "def" && <EVSlider updatePokemon={setDefender} statName={attack.category == "Physical" ? "def" : "spd"}></EVSlider>}
                <EVSlider updatePokemon={setDefender} statName={"hp"}></EVSlider>
            </div>
        </div>
    )
}


interface GraphProps {
    attacker: SelectedPokemon;
    defender: SelectedPokemon;
    attack: DexMove;
    fixedSettings: FixedSetting;
    lineSettings: number[];
    // field: Field;
}

export function Graph({ attacker, defender, attack, fixedSettings, lineSettings }: GraphProps) {
    const [graphData, setGraphData] = useState<GraphColumns>({});
    const [maxDmg, setMaxDmg] = useState<number>(0);
    const [tooltipVisibility, setTooltipVisibility] = useState<boolean>(false);
    const [currentColumn, setCurrentColumn] = useState<ColumnData | undefined>();
    const [mouseCoords, setMouseCoords] = useState<[number, number]>([0, 0])


    useEffect(() => {
        if (attacker && defender && attack) {
            if (attack.category == "Status") {
                return
            }

            var attackerRange = attacker;
            var defenderRange = defender;
            var variedPokemon: SelectedPokemon;
            var natureOptions: NatureMod[];

            if (fixedSettings == "def") {
                var variedStat: Exclude<StatID, "hp"> = attack.category == "Physical" ? "atk" : "spa";
                attackerRange = { speciesData: attacker.speciesData, calcData: attacker.calcData.clone() };
                variedPokemon = attackerRange;
                natureOptions = ["+", " "];
            }
            else {
                var variedStat: Exclude<StatID, "hp"> = attack.category == "Physical" ? "def" : "spd"
                defenderRange = { speciesData: defender.speciesData, calcData: defender.calcData.clone() };
                variedPokemon = defenderRange;
                natureOptions = ["+", " ", "-"];
            }

            var maxDmg = defender.calcData.stats.hp;
            var data: GraphColumns = {}

            const gen = Generations.get(9);

            natureOptions.forEach((natureType: NatureMod) => {
                variedPokemon.calcData.nature = keyNatures[variedStat][natureType];
                for (var i = 0; i < 33; i++) {
                    variedPokemon.calcData.evs[variedStat] = pointsToEVs(i)
                    const result = calculate(gen,
                        attackerRange.calcData,
                        defenderRange.calcData,
                        new CalcMove(gen, attack.name)
                    );
                    const dmg: [number, number] = result.range();

                    maxDmg = maxDmg < dmg[1] ? dmg[1] : maxDmg;
                    const statValue: number = calcStatWrapper(variedPokemon, variedStat)
                    const inputStats: InputStats = { stat: statValue, nature: natureType, evs: variedPokemon.calcData.evs[variedStat], ivs: variedPokemon.calcData.ivs[variedStat] }
                    if (data[statValue]) {
                        data[statValue].inputStats.push(inputStats)
                    }
                    else {
                        data[statValue] = {
                            inputStats: [inputStats], calcs: { "low": dmg[0], "high": dmg[1] }
                        }
                    }
                }
            })
            setGraphData(data);
            setMaxDmg(maxDmg);
        }
    }, [attacker, defender, attack])

    function showTooltip() {
        setTooltipVisibility(true);
    }

    function hideTooltip() {
        setTooltipVisibility(false);
    }

    function handleGraphHover(e: React.MouseEvent, data: ColumnData) {
        setMouseCoords([e.pageY, e.pageX])
        setCurrentColumn(data);
    }


    return (
        <div className="w-[30rem] h-[30rem]" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            <div>
                {tooltipVisibility && <StatTooltip columnData={currentColumn} statName={fixedSettings} mouseCoords={mouseCoords} target={defender}></StatTooltip>}
            </div>
            <div className="w-[30rem] h-[30rem] flex-row flex">
                {lineSettings.map((line) =>
                    <HPLine
                        maxDmg={maxDmg}
                        defenderHP={defender.calcData.stats.hp}
                        fraction={line}>
                    </HPLine>
                )}
                {Object.keys(graphData).map((calc: keyof GraphColumns) => {
                    return (
                        <div className={`bg-red-400 w-[100%] flex flex-col hover:border-l hover:border-r`}>
                            <div onMouseMove={(e) => handleGraphHover(e, graphData[calc])}
                                className="w-[100%]"
                                style={{ height: 100 * ((maxDmg * overheadMargin) - graphData[calc].calcs.high) / (maxDmg * overheadMargin) + "%", bottom: 0, position: "relative" }}></div>

                            <div onMouseMove={(e) => handleGraphHover(e, graphData[calc])}
                                className="bg-yellow-400 w-[100%]"
                                style={{ height: 100 * (graphData[calc].calcs.high - graphData[calc].calcs.low) / (maxDmg * overheadMargin) + "%", bottom: 0, position: "relative" }}></div>

                            <div onMouseMove={(e) => handleGraphHover(e, graphData[calc])}
                                className="bg-green-400 w-[100%]"
                                style={{ height: 100 * (graphData[calc].calcs.low) / (maxDmg * overheadMargin) + "%", bottom: 0, position: "relative" }}></div>
                        </div>
                    );
                })}
            </div>
        </div >
    );
}


interface HPLineProps {
    maxDmg: number;
    defenderHP: number;
    fraction: number;
}

function HPLine({ maxDmg, defenderHP, fraction }: HPLineProps) {
    return (
        <div className="w-[30rem] h-[30rem] z-10 absolute pointer-events-none">
            <div className="w-[100%] absolute opacity-70 bg-red-800"
                style={{
                    height: (100 / maxDmg * overheadMargin) + "%",
                    bottom: 100 * (defenderHP) / (maxDmg * overheadMargin) * (fraction / 16) + "%"
                }}>
            </div>
        </div>
    )
}
