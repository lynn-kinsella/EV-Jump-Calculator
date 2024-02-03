import { PokeAPIPokemonList, Result } from "../types/PokeAPIPokemonList";
import { PokeAPIPokemonSpecies, Variety } from "../types/PokeAPIPokemonSpecies";

import { getIdFromURL } from "../util/PokeApiFormatting";
import { SelectedPokemon } from "../util/SelectedPokemon_old";
import { Dex, Species } from '@pkmn/dex'

export function getPokedex(): Species[] {
    return Dex.forGen(9).species.all().filter((dexEntry) => !dexEntry.isNonstandard);
}

export function getSpeciesVariants(baseForm: Species | undefined, setVariants: Function) {
    if (baseForm) {
        // fetch("https://pokeapi.co/api/v2/pokemon-species/" + baseForm.id)
        //     .then((res: Response) => res.json()).catch((err) => { console.log(err) })
        //     .then((species: PokeAPIPokemonSpecies) => {
        //         var vars: Species[] = [];
        //         vars = species.varieties.flatMap((variety: Variety, idx: number) => {
        //             if (!variety.pokemon.name.includes("gmax") && idx > 0) {
        //                 return { "name": variety.pokemon.name.split('-').splice(1).join('-'), "id": getIdFromURL(variety.pokemon.url) }
        //             }
        //             return []
        //         })
        //         setVariants([baseForm, ...vars]);
        //     })
    }
}
