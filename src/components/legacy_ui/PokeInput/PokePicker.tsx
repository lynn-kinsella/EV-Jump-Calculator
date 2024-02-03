import { useCallback, useEffect, useState } from "react";
import { SelectedPokemon as pkmn } from "../../../util/SelectedPokemon_old";
import { Generations, Pokemon } from "@smogon/calc";
import { PokeAPIPokemonInterface } from "../../../types/PokeAPIPokemon";
import Sprite from "../elements/Sprite";
import PokeSelect from "./PokeSelect";
import { Species, Dex } from "@pkmn/dex";
import { getSpeciesVariants } from "../../../hooks/apiData";
import AbilitySelect from "./AbilitySelect";

interface PokePickerProps {
    setSelectedPokemon: Function
    selectedPokemon: pkmn | undefined
    pokedex: Species[]
}


function PokePicker({ setSelectedPokemon, selectedPokemon, pokedex }: PokePickerProps) {
    const [variants, setVariants] = useState<Species[]>([]);
    const [speciesUpdatedFlag, setSpeciesUpdatedFlag] = useState<boolean>(false);
    // useEffect(() => { updateSelectedPokemon(Dex.forGen(9).species.get("Bulbasaur")) }, [])

    // useEffect(() => {
    //     if (speciesUpdatedFlag) {
    //         if (selectedPokemon) {
    //             getSpeciesVariants({ "name": selectedPokemon?.name, "id": selectedPokemon?.num }, setVariants);
    //             setSpeciesUpdatedFlag(false);
    //         }
    //     }
    // }, [selectedPokemon]);


    const updateSelectedPokemon = useCallback((mon: Species) => {
        console.log(new Pokemon(9, mon.name))
        // setSelectedPokemon(pokedex);
        setSpeciesUpdatedFlag(true);
    }, [setSelectedPokemon])


    const updateSelectedForm = useCallback((id: number) => {
        // fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        //     .then((res: Response) => res.json()).catch((err) => { console.log(err) })
        //     .then((pkmn: PokeAPIPokemonInterface) => {
        //         setSelectedPokemon((prevPkmn: Pokemon) => {
        //             const myPkmn = new Pokemon(pkmn);
        //             myPkmn.num = prevPkmn.num;
        //             return myPkmn;
        //         });
        //     });
    }, [setSelectedPokemon])

    // const updateSelectedAbility = useCallback((ability: number) => {
    //     setSelectedPokemon((prevPkmn: pkmn) => {
    //         const myPkmn = prevPkmn;
    //         myPkmn.setSelectedAbility(ability);
    //         return myPkmn;
    //     });
    // }, [setSelectedPokemon])

    return (
        <div className="flex flex-row ">
            {/* <Sprite url={selectedPokemon?.sprite} variant="lg"></Sprite> */}
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        Pokemon
                        <PokeSelect pokedex={pokedex} updateSelection={updateSelectedPokemon} loading={pokedex.length == 0}></PokeSelect>
                    </div>
                    <div className="flex flex-col">
                        Form
                        <PokeSelect pokedex={variants} updateSelection={updateSelectedForm} loading={variants.length == 0}></PokeSelect>
                    </div>
                </div>
                {/* {selectedPokemon &&
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            Ability
                            <AbilitySelect abilities={selectedPokemon.abilities} updateSelection={updateSelectedAbility} loading={selectedPokemon == undefined} ></AbilitySelect>
                        </div>
                    </div>
                } */}
            </div>
        </div>

    );
}

export default PokePicker;