import React from "react";
import { ItemSelectGroup, ThemeCheck, ThemeInputGroup, ThemeInputGroupMulti, ThemeSelect } from "./ThemeInput";
import { AbilityName, Dex, Nature, NatureName, Type, TypeName } from "@pkmn/dex";
import { PokemonProps } from "./IntrinsicPokemon";

export function PokemonOptions({ pkmn, updatePkmn }: PokemonProps) {

    function handleTeraChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let newType = e.target.value as TypeName | "";
        if (!!!newType) {
            pkmn.updateTera(undefined);
        }
        else {
            pkmn.updateTera(newType);
        }
        updatePkmn(pkmn);
    }

    function handleNatureChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let newNature = e.target.value as NatureName;
        pkmn.updateNature(newNature);
        updatePkmn(pkmn);
    }

    function handleAbilityChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let newAbility = e.target.value as AbilityName;
        pkmn.updateAbility(newAbility);
        updatePkmn(pkmn);
    }

    function handleAbilityActiveChange(e: React.ChangeEvent<HTMLInputElement>) {
        let active = e.target.checked;
        pkmn.updateAbilityActive(active);
        updatePkmn(pkmn);
    }
    const width = "w-40";

    return (
        <div className="flex flex-wrap items-start gap-y-1 justify-between w-[100%] h-[100%]">
            <ThemeInputGroup width={width}>
                <span>Tera: </span>
                <ThemeSelect value={pkmn.calcData.teraType ? pkmn.calcData.teraType : ""} handleChange={handleTeraChange}>
                    {[<option value="">Not Active</option>, ...(Dex.types.all()).map((type: Type) => <option value={type.name}>{type.name}</option>
                    )]}
                </ThemeSelect>
            </ThemeInputGroup>

            <ThemeInputGroup width={width}>
                <span>Nature: </span>
                <ThemeSelect value={pkmn.calcData.nature} handleChange={handleNatureChange}>
                    {(Dex.natures.all()).map((nature: Nature) => <option value={nature.name}>{nature.name}</option>
                    )}
                </ThemeSelect>
            </ThemeInputGroup>

            <ThemeInputGroupMulti width={width}>
                <ThemeInputGroup width={width}>
                    <span>Ability: </span>
                    <ThemeSelect value={pkmn.calcData.ability as string} handleChange={handleAbilityChange}>
                        {Object.values(pkmn.speciesData.abilities).map((ab: AbilityName) => <option value={ab}>{ab}</option>)}
                    </ThemeSelect>
                </ThemeInputGroup>
                <ThemeInputGroup width={width}>
                    <span>Active?</span>
                    <ThemeCheck state={!!pkmn.calcData.abilityOn} updateState={handleAbilityActiveChange}></ThemeCheck>
                </ThemeInputGroup>
            </ThemeInputGroupMulti>

            <ItemSelectGroup width={width} pkmn={pkmn} updatePkmn={updatePkmn}></ItemSelectGroup>
        </div >
    );
}
