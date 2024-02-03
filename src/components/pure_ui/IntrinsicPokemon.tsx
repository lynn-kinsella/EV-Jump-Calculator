import React from "react";
import { SelectedPokemon } from "../../util/SelectedPokemon";
import { Pokedex } from "./Pokedex";
import { PokemonOptions } from "./PokemonOptions";



export interface PokemonProps {
    pkmn: SelectedPokemon;
    updatePkmn: (pkmn: SelectedPokemon) => void;
}
export function IntrinsicPokemon({ pkmn, updatePkmn }: PokemonProps) {
    return (
        <div className="flex flex-row gap-x-5 gap-y-1 justify-center content-end w-[100%] h-[100%]">
            {/* Pokedex */}
            <Pokedex updatePkmn={updatePkmn} pkmn={pkmn}></Pokedex>
            {/* Options */}
            <PokemonOptions pkmn={pkmn} updatePkmn={updatePkmn}></PokemonOptions>
        </div>
    );
}
