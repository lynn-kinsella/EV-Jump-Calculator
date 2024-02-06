import { SelectedPokemon } from "../../util/SelectedPokemon";
import { Pokedex } from "./Pokedex";
import { PokemonOptions } from "./PokemonOptions";
import { ThemeRow } from "./ThemeContainer";



export interface PokemonProps {
    pkmn: SelectedPokemon;
    updatePkmn: (pkmn: SelectedPokemon) => void;
}
export function IntrinsicPokemon({ pkmn, updatePkmn }: PokemonProps) {
    return (
        <ThemeRow gapType="gap" wrap="nowrap">
            <Pokedex updatePkmn={updatePkmn} pkmn={pkmn}></Pokedex>
            <PokemonOptions pkmn={pkmn} updatePkmn={updatePkmn}></PokemonOptions>
        </ThemeRow>
    );
}
