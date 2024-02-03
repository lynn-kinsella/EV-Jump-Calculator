import { Dex } from "@pkmn/dex"
import { Sprites } from "@pkmn/img"
import { useState, useEffect } from "react"
import { SelectedPokemon, updateSelectedSpecies } from "../../util/SelectedPokemon_old"
import Sprite from "./Sprite"

interface PokeSelectProps {
    pkmn: SelectedPokemon
    setPkmn: React.Dispatch<React.SetStateAction<SelectedPokemon>>
}

function PokeSelect({ pkmn, setPkmn }: PokeSelectProps) {

    return (
        <div className="flex flex-col gap-1">
            <PokeDexSelect pkmn={pkmn} setPkmn={setPkmn}></PokeDexSelect>
        </div>
    )
}

interface PokeDexSelectProps {
    pkmn: SelectedPokemon
    setPkmn: React.Dispatch<React.SetStateAction<SelectedPokemon>>
}

function PokeDexSelect({ setPkmn }: PokeDexSelectProps) {
    const filteredDex = (Dex.forGen(9).species.all()).filter((mon) => !mon.isNonstandard && !mon.name.includes("Pikachu-"))

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setPkmn((prevPkmn: SelectedPokemon) => updateSelectedSpecies(prevPkmn, filteredDex[parseInt(e.target.value)]))
    }

    return (
        <select className="px-1 w-48 h-6 border-gray-400 border-solid border" onChange={handleChange}>
            {
                filteredDex.map((mon, idx) => <option value={idx}>{mon.name}</option>)
            }
        </select>
    )
}

export default PokeSelect;