import React from "react";
import { Sprites } from "@pkmn/img";
import { Dex } from "@pkmn/dex";
import { ThemeInputGroup, ThemeSelect } from "./ThemeInput";
import { PokemonProps } from "./IntrinsicPokemon";

export function Pokedex({ pkmn, updatePkmn }: PokemonProps) {
    return (
        <div className="flex flex-col gap-0.5 w-[100%]">
            {/* Sprite */}
            <Sprite url={Sprites.getPokemon(pkmn.calcData.name, { gen: 9 }).url} spriteName={pkmn.calcData.name}></Sprite>
            {/* Pokemon Selector */}
            <PokemonSelector pkmn={pkmn} updatePkmn={updatePkmn}></PokemonSelector>
        </div>
    );
}
interface SpriteProps {
    url: string | undefined;
    spriteName: string;
}
function Sprite({ url }: SpriteProps) {
    return (
        <div className="flex flex-row justify-center items-end h-[100%] bg-white border border-gray-400">
            <div className="flex justify-center p-1 h-[100%] w-[100%]">
                <div className="w-[100%] h-[100%] bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${url})` }} />
            </div>
        </div>
    );
}
function PokemonSelector({ pkmn, updatePkmn }: PokemonProps) {
    const filteredDex = (Dex.forGen(9).species.all()).filter((mon) => !mon.isNonstandard && !mon.name.includes("Pikachu-"));

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        pkmn.updateSpecies(Dex.forGen(9).species.get(e.target.value));
        updatePkmn(pkmn);
    }

    return (
        <div className="w-[100%]">
            <ThemeInputGroup label={"pokedex"} id={"pokedex"} hideLabel={true}>
                <ThemeSelect value={pkmn.speciesData.name} handleChange={handleChange} id={"pokedex"}>
                    {filteredDex.map((mon) => <option value={mon.name}>{mon.name}</option>)}
                </ThemeSelect>
            </ThemeInputGroup>
        </div>
    );
}
