import { SelectedPokemon, updateSelectedAbility, updateSelectedAbilityActive } from "../../util/SelectedPokemon";
import React, { useState } from "react";
import { AbilityName } from "@pkmn/dex";

interface PokeAbilitySelectProps {
    pkmn: SelectedPokemon;
    setPkmn: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
}
export function PokeAbilitySelect({ pkmn, setPkmn }: PokeAbilitySelectProps) {
    const [abiltyOn, setAbilityOn] = useState<boolean>(pkmn.calcData.abilityOn ? pkmn.calcData.abilityOn : false);

    function handleUpdateAbility(e: React.ChangeEvent<HTMLSelectElement>) {
        setPkmn(updateSelectedAbility(pkmn, e.target.value as AbilityName));
    }

    function handleUpdateAbilityActive(e: React.ChangeEvent<HTMLInputElement>) {
        setPkmn(updateSelectedAbilityActive(pkmn, e.target.checked));
        setAbilityOn(e.target.checked);
    }

    return (
        <div className="flex flex-row gap-4 h-6">
            <div className="min-w-14"><span>Ability: </span></div>
            <select className="px-1 border-gray-400 border-solid border w-24" onChange={handleUpdateAbility}>
                {Object.values(pkmn.speciesData.abilities).map((ab: AbilityName) => <option value={ab}>{ab}</option>)}
            </select>
            <div className="flex flex-row gap-2">
                <input type="checkbox" checked={abiltyOn} onChange={handleUpdateAbilityActive} />
                <span>Active?</span>
            </div>
        </div>
    );
}
