import { NatureName } from "@pkmn/dex";
import { SelectedPokemon, updateSelectedNature } from "../../util/SelectedPokemon_old";
import React, { useState } from "react";
import { NATURES } from "@smogon/calc/dist/data/natures";

interface PokeNatureSelectProps {
    setPkmn: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
    pkmn: SelectedPokemon;
}
export function PokeNatureSelect({ setPkmn, pkmn }: PokeNatureSelectProps) {
    const [natureEffects, setNatureEffects] = useState<string[]>(getNatureEffects(pkmn.calcData.nature));
    function getNatureEffects(nature: NatureName): string[] {
        const effects = NATURES[nature];
        if (effects[0] == effects[1]) {
            return [];
        }
        return ["+" + effects[0], "-" + effects[1]];
    }

    function updateNature(e: React.ChangeEvent<HTMLSelectElement>) {
        var newNature = e.target.value as NatureName;
        setPkmn((prevPkmn: SelectedPokemon) => updateSelectedNature(prevPkmn, newNature));
        setNatureEffects(getNatureEffects(newNature));
    }

    const boostOptions = Object.keys(NATURES).map((nt) => { return <option value={nt}>{nt}</option>; });
    return (
        <div className="flex flex-row items-end gap-4 h-6 ">
            <span className="min-w-14">Nature:</span>
            <select className="w-24 px-1 text-left border-gray-400 border-solid border h-6" defaultValue={"Serious"} onChange={updateNature}>
                {boostOptions}
            </select>

            <span className="w-24">({natureEffects.length > 0 ? (`${natureEffects[0]}/${natureEffects[1]}`) : "No Effect"})</span>
        </div>
    );
}
