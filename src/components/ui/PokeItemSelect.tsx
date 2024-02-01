import { SelectedPokemon, updateSelectedItem } from "../../util/SelectedPokemon";
import React, { useEffect, useState } from "react";
import { Dex, Item, Type } from "@pkmn/dex";

type ItemFilter = { filterName: string; property: keyof Item; assertionFunction: FilterFunction; expected: any; };
type FilterFunction = (item: Item, property: keyof Item, expected: any) => boolean;
const checkValueTrue: FilterFunction = (item: Item, property: keyof Item, expected: any): boolean => item[property] == expected;
const checkPropertyIncludesKey: FilterFunction = (item: Item, property: keyof Item, expected: any): boolean => ((item[property] as String).toLowerCase()).includes(expected);
const checkPropertyExcludesKey: FilterFunction = (item: Item, property: keyof Item, expected: any): boolean => !((item[property] as String).toLowerCase()).includes(expected);
const checkMultiIncludeExclude: FilterFunction = (item: Item, property: keyof Item, expected: any): boolean => {
    var result = false;

    for (let i = 0; i < expected.include.length; i++) {
        result ||= checkPropertyIncludesKey(item, property, expected.include[i])
    }
    for (let j = 0; j < expected.exclude.length; j++) {
        if (!checkPropertyExcludesKey(item, property, expected.exclude[j])) {
            return false
        }
    }
    return true;
};


interface PokeItemSelectProps {
    pkmn: SelectedPokemon;
    setPkmn: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
}

export function PokeItemSelect({ pkmn, setPkmn }: PokeItemSelectProps) {
    const [filter, setFilters] = useState<ItemFilter>({ filterName: "All", property: "exists", assertionFunction: checkValueTrue, expected: true });

    function handleUpdateFilter(newFilter: ItemFilter) {
        setFilters(newFilter);
    }

    function handleChangeItem(item: Item | undefined) {
        setPkmn(updateSelectedItem(pkmn, item));
    }

    return (
        <div className="flex flex-row gap-4 h-6 w-[100%]">

            <div className="flex flex-col gap-1">
                <div className="min-w-[4.75em] h-6"><span>Item Filter:</span></div>
                <div className="min-w-[4.75em] h-6"><span>Held Item:</span></div>
            </div>
            <div className="flex flex-col gap-1">
                <ItemFiltersSelect updateFilter={handleUpdateFilter}></ItemFiltersSelect>
                <ItemSelect setItem={handleChangeItem} itemFilter={filter} pkmn={pkmn}></ItemSelect>
            </div>
        </div>
    );
}


interface ItemFiltersSelectProps {
    updateFilter: (newFilter: ItemFilter) => void;
}

function ItemFiltersSelect({ updateFilter }: ItemFiltersSelectProps) {
    const filters: ItemFilter[] = [
        { filterName: "All Items", property: "exists", assertionFunction: checkValueTrue, expected: true },
        { filterName: "Choice Items", property: "isChoice", assertionFunction: checkValueTrue, expected: true },
        { filterName: "Berries", property: "isBerry", assertionFunction: checkValueTrue, expected: true },
        { filterName: "Attack Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "attack " },
        { filterName: "Special Attack Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "sp. atk " },
        { filterName: "Defense Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "defense " },
        { filterName: "Special Defense Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "sp. def " },
        { filterName: "Speed Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "speed " },
        ...(Dex.types.all()).map((type: Type): ItemFilter => { return { filterName: type.name + " Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: type.name.toLowerCase() }; }),
    ];

    return (
        <div className="h-6">
            <select className="w-24 px-1 border-gray-400 border-solid border" onChange={(e) => updateFilter(filters[parseInt(e.target.value)])}>
                {filters.map((prop, idx) => <option value={idx}>{prop.filterName}</option>)}
            </select>
        </div>
    );
}


interface ItemSelectProps {
    setItem: (item: Item | undefined) => void;
    itemFilter: ItemFilter;
    pkmn: SelectedPokemon;
}

function ItemSelect({ setItem, itemFilter, pkmn }: ItemSelectProps) {
    const [allItems, setAllItems] = useState<Item[]>(applyItemFilters(getAllItems(pkmn), itemFilter));

    const [filteredItems, setFilteredItems] = useState<Item[]>(applyItemFilters(allItems, itemFilter));

    useEffect(() => {
        setFilteredItems(applyItemFilters(allItems, itemFilter));
    }, [itemFilter, allItems]);

    useEffect(() => {
        setAllItems(getAllItems(pkmn));
    }, [pkmn]);

    function getAllItems(pkmn: SelectedPokemon): Item[] {
        if (pkmn.speciesData.requiredItem) {
            return [Dex.items.get(pkmn.speciesData.requiredItem)];
        }
        return Dex.forGen(9).items.all().filter((item: Item) => !item.isNonstandard);
    }

    function applyItemFilters(items: Item[], myFilter: ItemFilter): Item[] {
        const filteredItemList: Item[] = items.filter((item) => {
            let keep = false;
            if (myFilter.assertionFunction(item, myFilter.property, myFilter.expected)) {
                keep = true;
            }
            return keep;
        });
        return filteredItemList;
    }

    function handleChangeItem(e: React.ChangeEvent<HTMLSelectElement>) {
        const index: number = parseInt(e.target.value)
        setItem(index >= 0 ? filteredItems[index] : undefined)
    }

    return (
        <div className="flex flex-col gap-1 h-6 w-[100%]">
            <select className="px-1 border-gray-400 border-solid border w-24" onChange={handleChangeItem} defaultValue="-1">
                <option value="-1">No Item</option>
                {filteredItems.map((item: Item, idx: number) => <option value={idx}>{item.name}</option>)}
            </select>
        </div>
    );
}
