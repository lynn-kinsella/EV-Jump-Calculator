import React from "react";
import { ThemeCheck, ThemeInputGroup, ThemeSelect, ThemeText } from "./ThemeInput";
import { AbilityName, Dex, Nature, NatureName, Type, TypeName } from "@pkmn/dex";
import { PokemonProps } from "./IntrinsicPokemon";
import { ItemSelectGroup } from "./ItemSelect";

export function PokemonOptions({ pkmn, updatePkmn }: PokemonProps) {

    function handleTeraChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newType = e.target.value as TypeName | "";
        if (!newType) {
            pkmn.updateTera(undefined);
        }
        else {
            pkmn.updateTera(newType);
        }
        updatePkmn(pkmn);
    }

    function handleNatureChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newNature = e.target.value as NatureName;
        pkmn.updateNature(newNature);
        updatePkmn(pkmn);
    }

    function handleAbilityChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newAbility = e.target.value as AbilityName;
        pkmn.updateAbility(newAbility);
        updatePkmn(pkmn);
    }

    function handleBurnedChange(e: React.ChangeEvent<HTMLInputElement>) {
        pkmn.updateBurned(e.target.checked);
        updatePkmn(pkmn);
    }

    function handleLevelChange(e: React.ChangeEvent<HTMLInputElement>) {
        const level:number = parseInt(e.target.value);
        if (!isNaN(level) && level <= 100 && level >= 1){
            pkmn.updateLevel(level);
            updatePkmn(pkmn);
        }
        else {
            e.target.value = String(pkmn.calcData.level);
        }
    }

    const width = "w-40";

    return (
        <div className="flex flex-wrap items-start gap-y-1 justify-between w-[100%] h-[100%]">
            <ThemeInputGroup width={width} label="Tera: " id="tera">
                <ThemeSelect value={pkmn.calcData.teraType ? pkmn.calcData.teraType : ""} handleChange={handleTeraChange} id={"tera"}>
                    {[<option value="">Not Active</option>, ...(Dex.types.all()).map((type: Type) => <option value={type.name}>{type.name}</option>
                    )]}
                </ThemeSelect>
            </ThemeInputGroup>

            <ThemeInputGroup width={width} label={"Nature: "} id={"nature"}>
                <ThemeSelect value={pkmn.calcData.nature} handleChange={handleNatureChange} id={"nature"}>
                    {(Dex.natures.all()).map((nature: Nature) => <option value={nature.name}>{nature.name}</option>
                    )}
                </ThemeSelect>
            </ThemeInputGroup>

            <ThemeInputGroup width={width} label={"Ability: "} id={"ability"}>
                <ThemeSelect value={pkmn.calcData.ability as string} handleChange={handleAbilityChange} id={"ability"}>
                    {Object.values(pkmn.speciesData.abilities).map((ab: AbilityName) => <option value={ab}>{ab}</option>)}
                </ThemeSelect>
            </ThemeInputGroup>

            <ThemeInputGroup width={width} label={"Burned? "} id={"status"}>
                <ThemeCheck updateState={handleBurnedChange} id={"status"} state={pkmn.calcData.status == "brn"}>
                </ThemeCheck>
            </ThemeInputGroup>

            <ItemSelectGroup width={width} pkmn={pkmn} updatePkmn={updatePkmn}></ItemSelectGroup>
            
            <ThemeInputGroup width={width} label={"Level: "} id={"level"}>
                <ThemeText handleChange={handleLevelChange} id={"level"} width="w-10 p-1" align="right" value={pkmn.calcData.level} inputMode="numeric">
                </ThemeText>
            </ThemeInputGroup>
        </div >
    );
}
