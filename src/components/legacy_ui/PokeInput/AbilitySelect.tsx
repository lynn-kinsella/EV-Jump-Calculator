import { useEffect, useMemo, useState } from "react";
import { responseToDisplayName } from "../../../util/PokeApiFormatting";
import Select from "../elements/Select";

interface PokeSelectProps {
    abilities: string[];
    updateSelection: Function;
    loading: boolean;
}

function PokeSelect({ abilities, updateSelection, loading }: PokeSelectProps) {
    const [selectedOption, setSelectedOption] = useState<string>("")

    function handleSelectUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedOption(e.target.value)
        const index: number = parseInt(e.target.selectedOptions[0].value);
        updateSelection(index);
    }

    useEffect(() => {
        setSelectedOption("")
    }, [abilities])

    const memoizedOptions = useMemo(() => abilities.map((ability: string) => responseToDisplayName(ability)), [abilities])

    return (
        <div>
            {!loading ?
                <Select handleChange={handleSelectUpdate} value={selectedOption}>
                    {memoizedOptions.map((abilityName, idx) => (<option value={idx}>{abilityName}</option>))}
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