import { Item } from "../../../util/FieldClass";
import { displayNameToResponse } from "../../../util/PokeApiFormatting";
import Sprite from "../elements/Sprite";

interface PokeItemProps {
    item: Item;
    updateCheck: Function;
    selected: string;
}


function PokeItem({ item, updateCheck, selected }: PokeItemProps) {

    return (
        <div className="flex flex-row w-min-fit">
            <input onChange={() => updateCheck(item)} type="checkbox" value={item.name} checked={selected === item.name}></input>
            <Sprite variant="sm" url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" + displayNameToResponse(item.name) + ".png"}></Sprite>
            <label htmlFor={item.name}>{item.name}</label>
        </div>
    )
}

export default PokeItem;