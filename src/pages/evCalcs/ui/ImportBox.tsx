import React, { SetStateAction, useState } from "react";
import { ThemeRow } from "./ThemeContainer";
import SelectedPokemon from "../util/SelectedPokemon";
import { Dex } from "@pkmn/dex";
import { Sets } from "@pkmn/sets";
import { ThemeSubmit } from "./ThemeInput";

interface ImportBoxProps {
    setImportMode: React.Dispatch<SetStateAction<boolean>>;
    updatePkmn: (pkmn: SelectedPokemon) => void;
}
export function ImportBox({ setImportMode, updatePkmn }: ImportBoxProps) {
    const [currentPaste, setCurrentPaste] = useState<string>("");

    function handleChangeImportMode() {
        setImportMode(false);
    }

    function handleSubmitImport() {
        const set = Sets.importSet(currentPaste);
        if (set && set.species) {
            var newPkmn = new SelectedPokemon(set.species);
            if (set.evs) {
                newPkmn.updateEVs("hp", set.evs.hp);
                newPkmn.updateEVs("atk", set.evs.atk);
                newPkmn.updateEVs("def", set.evs.def);
                newPkmn.updateEVs("spa", set.evs.spa);
                newPkmn.updateEVs("spd", set.evs.spd);
                newPkmn.updateEVs("spe", set.evs.spe);
            }

            if (set.ivs) {
                newPkmn.updateIVs("hp", set.ivs.hp);
                newPkmn.updateIVs("atk", set.ivs.atk);
                newPkmn.updateIVs("def", set.ivs.def);
                newPkmn.updateIVs("spa", set.ivs.spa);
                newPkmn.updateIVs("spd", set.ivs.spd);
                newPkmn.updateIVs("spe", set.ivs.spe);
            }

            if (set.item) {
                newPkmn.updateItem(Dex.forGen(9).items.get(set.item));
            }

            if (set.nature) {
                newPkmn.updateNature(Dex.forGen(9).natures.get(set.nature).name);
            }

            if (set.ability) {
                newPkmn.updateAbility(Dex.forGen(9).abilities.get(set.ability).name);
            }

            if (set.teraType) {
                newPkmn.updateTera(Dex.forGen(9).types.get(set.teraType).name);
            }

            if (set.moves) {
                newPkmn.moves = set.moves;
            }

            updatePkmn(newPkmn);
            handleChangeImportMode();
        }
        else {
            alert("Error importing set");
        }
    }

    return (
        <div className="w-[100%]">
            <ThemeRow>
                <textarea className="w-[100%] h-52 p-2 resize-none border-solid rounded-md border border-gray-400" placeholder="Paste Import here" onChange={(e) => setCurrentPaste(e.target.value)} />
            </ThemeRow>
            <ThemeRow justify="justify-center">
                <ThemeSubmit updateState={handleSubmitImport}>Submit</ThemeSubmit>
                <ThemeSubmit updateState={handleChangeImportMode}>Cancel</ThemeSubmit>
            </ThemeRow>
        </div>
    );
}
