import { useState } from "react";
import { getDefenseItems, getHPItems, getOffsenseItems, getTypeBoostItems, getTypeResistBerries } from "../../../util/ItemInfo";
import PokeItem from "./PokeItem";
import { Field, Item } from "../../../util/FieldClass";
import Collapse from "../elements/Collapse";

interface PokeModifierProps {
    attacker: boolean;
    setField: React.Dispatch<React.SetStateAction<Field>>;
}

function PokeItemChoice({ attacker, setField }: PokeModifierProps) {
    const [selected, setSelected] = useState<string>("");

    function handleSelectChange(item: Item) {
        var selectedItem: Item = { name: "", tooltip: "" };
        if (item.name != selected) {
            selectedItem = item;
        }
        setSelected(selectedItem.name);

        setField((prevField: Field) => {
            if (attacker) {
                prevField.attackerItem = selectedItem;
            }
            else {
                prevField.defenderItem = selectedItem;
            }
            return { ...prevField };
        });
    }

    return (
        <div className="flex flex-col gap-2 w-[100%] items-start ">
            {attacker &&
                <div className="flex flex-col gap-2 w-[100%] ">
                    <Collapse label={"Stat Items"} dir="wrap" gap={"sm"}>
                        {getOffsenseItems().map((item) => {
                            return <PokeItem item={item} updateCheck={handleSelectChange} selected={selected}></PokeItem>
                        })}
                    </Collapse>

                    <Collapse label={"Type Boosting Items"} dir="wrap" gap={"sm"}>
                        {getTypeBoostItems().map((item) => {
                            return <PokeItem item={item} updateCheck={handleSelectChange} selected={selected}></PokeItem>
                        })}
                    </Collapse>
                </div >
            }

            {
                !attacker &&
                <div className="flex flex-col gap-2 w-[100%] ">
                    <Collapse label={"Stat Items"} dir="wrap" gap={"sm"}>
                        {getDefenseItems().map((item) => {
                            return <PokeItem item={item} updateCheck={handleSelectChange} selected={selected}></PokeItem>
                        })}
                    </Collapse>

                    <Collapse label={"HP Items"} dir="wrap" gap={"sm"}>
                        {getHPItems().map((item) => {
                            return <PokeItem item={item} updateCheck={handleSelectChange} selected={selected}></PokeItem>
                        })}
                    </Collapse>

                    <Collapse label={"Resist Berries"} dir="wrap" gap={"sm"}>
                        {getTypeResistBerries().map((item) => {
                            return <PokeItem item={item} updateCheck={handleSelectChange} selected={selected}></PokeItem>
                        })}
                    </Collapse>
                </div>
            }
        </div >
    );
}

export default PokeItemChoice;