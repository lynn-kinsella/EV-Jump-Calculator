import { Dex, Item, Type } from "@pkmn/dex";
import { SelectedPokemon } from "../../util/SelectedPokemon";

export type ItemFilter = { name: string; property: keyof Item; assertionFunction: FilterFunction; expected: any; };
type FilterFunction = (item: Item, property: keyof Item, expected: any) => boolean;
export const checkValueTrue: FilterFunction = (item: Item, property: keyof Item, expected: any): boolean => item[property] == expected;
export const checkPropertyIncludesKey: FilterFunction = (item: Item, property: keyof Item, expected: any): boolean => ((item[property] as String).toLowerCase()).includes(expected);
export const filters: ItemFilter[] = [
    { name: "All Items", property: "exists", assertionFunction: checkValueTrue, expected: true },
    { name: "Choice Items", property: "isChoice", assertionFunction: checkValueTrue, expected: true },
    { name: "Berries", property: "isBerry", assertionFunction: checkValueTrue, expected: true },
    { name: "Attack Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "attack " },
    { name: "Special Attack Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "sp. atk " },
    { name: "Defense Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "defense " },
    { name: "Special Defense Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "sp. def " },
    { name: "Speed Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "speed " },
    ...(Dex.types.all()).map((type: Type): ItemFilter => { return { name: type.name + " Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: type.name.toLowerCase() }; }),
];

export function getAllItems(pkmn: SelectedPokemon): Item[] {
    if (pkmn.speciesData.requiredItem) {
        return [Dex.items.get(pkmn.speciesData.requiredItem)];
    }
    return Dex.forGen(9).items.all().filter((item: Item) => !item.isNonstandard);
}

export function applyItemFilters(items: Item[], myFilter: ItemFilter): Item[] {
    const filteredItemList: Item[] = items.filter((item) => {
        let keep = false;
        if (myFilter.assertionFunction(item, myFilter.property, myFilter.expected)) {
            keep = true;
        }
        return keep;
    });
    return filteredItemList;
}