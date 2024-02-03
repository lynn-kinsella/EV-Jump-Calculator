import { SelectedPokemon } from "../../util/SelectedPokemon_old";
import React, { useState } from "react";

import PokeSelect from "./PokeSelect";
import { PokeStatSelect } from "./PokeStatSelect";
import { PokeItemSelect } from "./PokeItemSelect";
import { PokeNatureSelect } from "./PokeNatureSelect";
import { PokeAbilitySelect } from "./PokeAbilitySelect";
import { PokeTeraSelect } from "./PokeTeraSelect";
import { PokeSprite } from "./PokeSprite";

interface PokeSetProps {
    pkmn: SelectedPokemon;
    setPkmn: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
}

function PokeSet({ pkmn, setPkmn }: PokeSetProps) {
    return (
        <div className="flex flex-row gap-8 content-start">
            <div className="flex flex-col gap-1 justify-end">
                <PokeSprite pkmn={pkmn}></PokeSprite>
                <PokeSelect pkmn={pkmn} setPkmn={setPkmn}></PokeSelect>
                <PokeTeraSelect pkmn={pkmn} setPkmn={setPkmn}></PokeTeraSelect>
            </div>

            <div className="flex flex-col gap-1">
                <PokeStatSelect pkmn={pkmn} setPkmn={setPkmn}></PokeStatSelect>

                <div className="flex flex-row gap-4">
                    <PokeItemSelect pkmn={pkmn} setPkmn={setPkmn}></PokeItemSelect>
                    <div className="flex flex-col gap-1">
                        <PokeNatureSelect pkmn={pkmn} setPkmn={setPkmn}></PokeNatureSelect>
                        <PokeAbilitySelect pkmn={pkmn} setPkmn={setPkmn}></PokeAbilitySelect>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokeSet;