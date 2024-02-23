/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dex, Item, ModdedDex, Type } from "@pkmn/dex";
import { SelectedPokemonInterface } from "../util/SelectedPokemon";
import { PokemonProps } from "./IntrinsicPokemon";
import { useState, useEffect } from "react";
import { ThemeInputGroupMulti, ThemeInputGroup, ThemeSelect } from "./ThemeInput";

export type ItemFilter = { name: string; property: keyof Item; assertionFunction: FilterFunction; expected: any; };
type FilterFunction = (item: Item, property: keyof Item, expected: any) => boolean;
export const checkValueTrue: FilterFunction = (item: Item, property: keyof Item, expected: any): boolean => item[property] == expected;
export const checkPropertyIncludesKey: FilterFunction = (item: Item, property: keyof Item, expected: any): boolean => ((item[property] as string).toLowerCase()).includes(expected);


interface ItemSelectGroupProps extends PokemonProps {
    size?: "sm" | "md";
    width?: string
}

export function ItemSelectGroup({ pkmn, updatePkmn, size = "md", width }: ItemSelectGroupProps) {
    const [filter, setFilter] = useState<number>(0);
    const [itemFilters, setItemFilters] = useState<ItemFilter[]>([])
    const [gen9Dex, setGen9Dex] = useState<ModdedDex>()

    useEffect(() => {
        import("@pkmn/dex").then((module) => {
            setGen9Dex(module.Dex.forGen(9));
            setItemFilters(getFilters(module.Dex.forGen(9)))
        });
    }, [])

    function getFilters(dex: ModdedDex): ItemFilter[] {
        return [
            { name: "All Items", property: "exists", assertionFunction: checkValueTrue, expected: true },
            { name: "Choice Items", property: "isChoice", assertionFunction: checkValueTrue, expected: true },
            { name: "Berries", property: "isBerry", assertionFunction: checkValueTrue, expected: true },
            { name: "Attack Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "attack " },
            { name: "Special Attack Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "sp. atk " },
            { name: "Defense Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "defense " },
            { name: "Special Defense Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "sp. def " },
            { name: "Speed Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: "speed " },
            ...(dex.types.all()).map((type: Type): ItemFilter => { return { name: type.name + " Items", property: "desc", assertionFunction: checkPropertyIncludesKey, expected: type.name.toLowerCase() }; }),
        ];
    }

    function getAllItems(pkmn: SelectedPokemonInterface): Item[] {
        if (gen9Dex) {
            if (pkmn.speciesData.requiredItem) {
                return [Dex.items.get(pkmn.speciesData.requiredItem)];
            }
            return Dex.forGen(9).items.all().filter((item: Item) => !item.isNonstandard);
        }
        return [];
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

    function handleUpdateFilter(e: React.ChangeEvent<HTMLSelectElement>) {
        const index: number = parseInt(e.target.value);
        setFilter(index);
    }

    function handleChangeItem(e: React.ChangeEvent<HTMLSelectElement>) {
        pkmn.updateItem(Dex.forGen(9).items.get(e.target.value));
        updatePkmn(pkmn);
    }

    useEffect(() => {
        setFilter(0);
    }, [pkmn])

    return (
        <ThemeInputGroupMulti width={width} id={"itemOptions"}>
            <ThemeInputGroup width={width} label={"Item: "} id={"item"}>
                <ThemeSelect id="item" value={pkmn.calcData.item ? pkmn.calcData.item : ""} handleChange={handleChangeItem} size={size}>
                    {[<option value={-1}>None</option>
                        , ...(applyItemFilters(getAllItems(pkmn), itemFilters[filter]))
                            .map((item) =>
                                <option value={item.name}>{item.name}</option>)]}
                </ThemeSelect>
            </ThemeInputGroup>

            <ThemeInputGroup width={width} label={"Filter: "} id={"itemFilters"}>
                <ThemeSelect value={filter} handleChange={handleUpdateFilter} size={size} id={"itemFilters"}>
                    {itemFilters.map((filter, idx) => <option value={idx}>{filter.name}</option>)}
                </ThemeSelect>
            </ThemeInputGroup>

        </ThemeInputGroupMulti >
    )
}