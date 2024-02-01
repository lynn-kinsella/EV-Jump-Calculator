import { SelectedPokemon } from "../../util/SelectedPokemon";
import { Sprites } from "@pkmn/img";
import Sprite from "./Sprite";

interface PokeSpriteProps {

    pkmn: SelectedPokemon;
}

export function PokeSprite({ pkmn }: PokeSpriteProps) {

    return (
        <Sprite url={Sprites.getPokemon(pkmn.calcData.name, { gen: 9 }).url}
            size={"sm"}
            spriteName={pkmn.speciesData.name}
            offset={Sprites.getPokemon(pkmn.calcData.name, { gen: 9 })}>
        </Sprite>
    );
}
