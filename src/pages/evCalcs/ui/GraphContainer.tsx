import { Suspense, useEffect, useState } from "react";
import { SelectedPokemonInterface } from "../util/SelectedPokemon";
import { Field } from "@smogon/calc";
import { Move, StatID } from "@pkmn/dex";
import { GraphOptions } from "./GraphOptions";
import { Graph } from "./Graph";
import { EVSlider } from "./EVSlider";



export type LineIndicators = {
    [fraction: number | string]: boolean;
};

export type FixedStat = "atk" | "def";
interface GraphContainerProps {
    attacker: SelectedPokemonInterface;
    defender: SelectedPokemonInterface;
    move: Move | undefined;
    field: Field;
}
export default function GraphFeature({ attacker, defender, move, field }: GraphContainerProps) {
    const [lineIndicators, setLineIndicators] = useState<LineIndicators>({ 16: true });
    const [fixedStat, setFixedStat] = useState<FixedStat>("atk");

    const [workingAttacker, setWorkingAttacker] = useState<SelectedPokemonInterface>(attacker.clone());
    const [workingDefender, setWorkingDefender] = useState<SelectedPokemonInterface>(defender.clone());

    useEffect(() => {
        setWorkingAttacker(attacker.clone());
    }, [attacker]);

    useEffect(() => {
        setWorkingDefender(defender.clone());
    }, [defender]);


    useEffect(() => {
        setWorkingAttacker(attacker.clone());
        setWorkingDefender(defender.clone());
    }, [])

    function updateLineIndicators(fraction: number, value: boolean) {
        setLineIndicators((prevIndicators) => { return { ...prevIndicators, [fraction]: value }; });
    }

    function updateFixedStat(stat: FixedStat) {
        setFixedStat(stat);
    }

    function getFixedEV(): Exclude<StatID, "hp"> {
        if (move?.category == "Physical") {
            return fixedStat == "atk" ? "atk" : "def";
        }
        else {
            return fixedStat == "atk" ? "spa" : "spd";
        }
    }

    return (
        <div className="flex flex-col gap-2 max-w-[50rem] w-[100%]">
            <GraphOptions
                lineIndicators={lineIndicators}
                updateLineIndicators={updateLineIndicators}
                fixedStat={fixedStat}
                updateFixedStat={updateFixedStat}>
                {/* EV Sliders */}
                <EVSlider referencePkmn={defender} pkmn={workingDefender} stat={"hp"} updatePkmn={setWorkingDefender}></EVSlider>
                {fixedStat == "def" ?
                    <EVSlider referencePkmn={defender} pkmn={workingDefender} stat={getFixedEV()} updatePkmn={setWorkingDefender}></EVSlider> :
                    <EVSlider referencePkmn={attacker} pkmn={workingAttacker} stat={getFixedEV()} updatePkmn={setWorkingAttacker}></EVSlider>
                }
            </GraphOptions>
            {/* Graph */}
            <Suspense>
                <Graph attacker={workingAttacker} defender={workingDefender} move={move} fixedStat={fixedStat} lineIndicators={lineIndicators} field={field}></Graph>
            </Suspense>
        </div>
    );
}

