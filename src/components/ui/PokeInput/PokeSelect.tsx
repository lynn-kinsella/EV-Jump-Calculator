import { useEffect, useMemo, useState } from "react";
import { Species } from "@pkmn/dex";
import { responseToDisplayName } from "../../../util/PokeApiFormatting";
import Select from "../elements/Select";

interface PokeSelectProps {
    pokedex: Species[];
    updateSelection: Function;
    loading: boolean;
}

function PokeSelect({ pokedex, updateSelection, loading }: PokeSelectProps) {
    const [selectedOption, setSelectedOption] = useState<string>("")

    function handleSelectUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedOption(e.target.value)
        const index: number = parseInt(e.target.selectedOptions[0].value);
        updateSelection(pokedex[index]);
    }

    useEffect(() => {
        setSelectedOption("")
    }, [pokedex])

    const memoizedOptions = useMemo(() => pokedex.map((pokemonName: Species) => responseToDisplayName(pokemonName.name)), [pokedex])

    return (
        <div>
            {!loading ?
                <Select handleChange={handleSelectUpdate} value={selectedOption}>
                    {memoizedOptions.map((pokemonName, idx) => (<option value={idx}>{pokemonName}</option>))}
                </Select>
                :
                <Select handleChange={undefined} value={selectedOption}>
                    <option>Loading...</option>
                </Select>
            }
        </div >
    )
}

export default PokeSelect