import { useEffect, useState } from "react";
import { Sprites } from "@pkmn/img";
import { ModdedDex, Species } from "@pkmn/dex";
import { ThemeFuzzy, ThemeInputGroup } from "./ThemeInput";
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
    const [gen9Dex, setGen9Dex] = useState<ModdedDex>()
    const [filteredDex, setFilteredDex] = useState<Species[]>([])

    useEffect(() => {
        import("@pkmn/dex").then((module) => {
            setGen9Dex(module.Dex.forGen(9));
            setFilteredDex(getFilteredDex(module.Dex.forGen(9)))
        }
        );
    }, [])


    function getFilteredDex(dex: ModdedDex): Species[] {
        return dex.species.all().filter((mon) => !mon.isNonstandard && !mon.name.includes("Pikachu-"));
    }

    function handleChange(newValue: string) {
        if (gen9Dex) {
            pkmn.updateSpecies(gen9Dex.species.get(newValue));
            updatePkmn(pkmn);
        }
    }

    return (
        <div className="w-[100%]">
            <ThemeInputGroup label={"pokedex"} id={"pokedex"} hideLabel={true}>
                <ThemeFuzzy options={filteredDex.map((mon) => mon.name)} handleChange={handleChange} id={""} value={pkmn.speciesData.name}></ThemeFuzzy>
                {/* <ThemeSelect value={pkmn.speciesData.name} handleChange={handleChange} id={"pokedex"}>
                    {filteredDex.map((mon) => <option value={mon.name}>{mon.name}</option>)}
                </ThemeSelect> */}
            </ThemeInputGroup>
        </div>
    );
}
