import { useEffect, useState } from "react";
import { Field } from "../../util/FieldClass";
import { SelectedPokemon } from "../../util/SelectedPokemon";
import { calculate, Generations, Result, Pokemon as SmogonPokemon } from "@smogon/calc";
import { Move } from "@smogon/calc/dist/move";
import { pointsToEvs } from "../../util/PokeCalcs";
import Collapse from "./elements/Collapse";

interface GraphProps {
    attacker: SelectedPokemon;
    defender: SelectedPokemon;
    attack: string;
    field: Field;
}

type columnData = {
    low: number,
    high: number
}

const overheadMargin = 1.05

function Graph({ attacker, defender, attack, field }: GraphProps) {
    const [graphData, setGraphData] = useState<columnData[]>([]);
    const [maxDmg, setMaxDmg] = useState<number>(0);

    useEffect(() => {
        if (attacker.baseStats && defender.baseStats && attack) {

            var maxDmg = defender.stats.hp;
            var data: columnData[] = []

            const gen = Generations.get(9);

            var attackerPokemon = new SmogonPokemon(gen, attacker.name, {
                level: 50,
                item: field.attackerItem.name,
                nature: attacker.nature,
            });

            var defenderPokemon = new SmogonPokemon(gen, defender.name, {
                level: 50,
                item: field.defenderItem.name,
                nature: defender.nature,
                evs: defender.evs
            })
            for (var i = 0; i < 31; i++) {
                attackerPokemon.evs.atk = pointsToEvs(i)
                const result = calculate(gen,
                    attackerPokemon,
                    defenderPokemon,
                    new Move(gen, attack)
                );
                const dmg: [number, number] = result.range();

                maxDmg = maxDmg < dmg[1] ? dmg[1] : maxDmg

                data.push({ "low": dmg[0], "high": dmg[1] })
            }
            setGraphData(data);
            console.log(maxDmg)
            setMaxDmg(maxDmg);
        }
    }, [attacker, defender.stats.hp, defender.stats.def, defender, attack, field])


    return (
        <div>
            <div className="w-[40rem] h-[40rem] z-10 absolute">
                <div className="w-[100%] bg-red-900 absolute opacity-70" style={{ height: (100 / maxDmg * overheadMargin) + "%", bottom: 100 * (defender.stats.hp) / (maxDmg * overheadMargin) + "%" }}> </div>
            </div>
            <div className="w-[40rem] h-[40rem] bg-indigo-200 flex-row flex gap-0">
                {graphData.map((col, idx) => {
                    return (
                        <div className={`bg-red-300  w-[100%] flex flex-col border`}>
                            <div className="w-[100%]" style={{ height: 100 * ((maxDmg * overheadMargin) - col.high) / (maxDmg * overheadMargin) + "%", bottom: 0, position: "relative" }}></div>
                            <div className="bg-yellow-300 w-[100%]" style={{ height: 100 * (col.high - col.low) / (maxDmg * overheadMargin) + "%", bottom: 0, position: "relative" }}></div>
                            <div className="bg-green-300 w-[100%]" style={{ height: 100 * (col.low) / (maxDmg * overheadMargin) + "%", bottom: 0, position: "relative" }}></div>
                            <div></div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Graph;