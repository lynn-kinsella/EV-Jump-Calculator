import React, { SetStateAction, useState } from "react";
import { ThemeRow } from "../../../components/ThemeContainer";
import SelectedPokemon, { SelectedPokemonInterface } from "../util/SelectedPokemon";
import { ThemeSubmit } from "./ThemeInput";

interface ImportBoxProps {
    setImportMode: React.Dispatch<SetStateAction<boolean>>;
    updatePkmn: (pkmn: SelectedPokemonInterface) => void;
}
export function ImportBox({ setImportMode, updatePkmn }: ImportBoxProps) {
    const [currentPaste, setCurrentPaste] = useState<string>("");

    function handleChangeImportMode() {
        setImportMode(false);
    }

    function handleSubmitImport() {
        import("@pkmn/dex").then((dexModule) => {
            const gen9Dex = dexModule.Dex.forGen(9);
            import("@pkmn/sets").then((setModule) => {
                const set = setModule.Sets.importSet(currentPaste);
                if (set && set.species) {
                    const newPkmn = new SelectedPokemon(set.species);
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
                        newPkmn.updateItem(gen9Dex.items.get(set.item));
                    }

                    if (set.nature) {
                        newPkmn.updateNature(gen9Dex.natures.get(set.nature).name);
                    }

                    if (set.ability) {
                        newPkmn.updateAbility(gen9Dex.abilities.get(set.ability).name);
                    }

                    if (set.teraType) {
                        newPkmn.updateTera(gen9Dex.types.get(set.teraType).name);
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
            })
        })
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
