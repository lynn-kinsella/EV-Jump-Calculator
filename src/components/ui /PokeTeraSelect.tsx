import { SelectedPokemon, updateSelectedTera } from "../../util/SelectedPokemon_old";
import React from "react";
import { Dex, Type, TypeName } from "@pkmn/dex";

interface PokeTeraSelectProps {
    pkmn: SelectedPokemon;
    setPkmn: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
}
export function PokeTeraSelect({ pkmn, setPkmn }: PokeTeraSelectProps) {

    function handleChangeTera(e: React.ChangeEvent<HTMLSelectElement>) {
        setPkmn(updateSelectedTera(pkmn, e.target.value as TypeName));
    }

    return (
        <div className="flex flex-row h-6 justify-between w-[100%]">
            <span>Tera Type: </span>
            <select className="px-1 border-gray-400 border-solid border" onChange={handleChangeTera}>
                <option value="">Not Active</option>
                {(Dex.types.all()).map((type: Type) => <option value={type.name}>{type.name}</option>)}
            </select>
        </div>
    );
}
