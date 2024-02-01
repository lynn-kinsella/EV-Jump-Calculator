import { useMemo, useState } from "react";
import Select from "../elements/Select"
import { responseToDisplayName } from "../../../util/PokeApiFormatting";

interface AttackPickerProps {
    setAttack: React.Dispatch<React.SetStateAction<string>>;
    attackList: string[];
}

function AttackSelect({ setAttack, attackList }: AttackPickerProps) {
    const [selectedOption, setSelectedOption] = useState<string>("")

    function handleSelectUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedOption(e.target.value)
        setAttack(e.target.value);
    }

    const memoizedOptions = useMemo(() => attackList.map((attack: string) => responseToDisplayName(attack)), [attackList])

    return (
        <div className="flex flex-col gap-2 w-[100%] items-center">
            <span>Choose Attack:</span>
            <Select value={selectedOption} handleChange={handleSelectUpdate}>
                {memoizedOptions.map((attackName) => (<option value={attackName}>{attackName}</option>))}
            </Select>
        </div>
    )
}

export default AttackSelect