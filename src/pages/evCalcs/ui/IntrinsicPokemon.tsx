import { SelectedPokemonInterface } from "../util/SelectedPokemon";
import { Pokedex } from "./Pokedex";
import { PokemonOptions } from "./PokemonOptions";
import { ThemeRow } from "./ThemeContainer";



export interface PokemonProps {
    pkmn: SelectedPokemonInterface;
    updatePkmn: (pkmn: SelectedPokemonInterface) => void;
}
export function IntrinsicPokemon({ pkmn, updatePkmn }: PokemonProps) {
    return (
        <ThemeRow wrap="nowrap">
            <Pokedex updatePkmn={updatePkmn} pkmn={pkmn}></Pokedex>
            <PokemonOptions pkmn={pkmn} updatePkmn={updatePkmn}></PokemonOptions>
        </ThemeRow>
    );
}
