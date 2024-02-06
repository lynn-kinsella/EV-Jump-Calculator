import React, { useEffect, useState } from "react";
import { ContainerProps } from "./ThemeContainer";
import { PokemonProps } from "./IntrinsicPokemon";
import { Dex } from "@pkmn/dex";
import { applyItemFilters, filters, getAllItems } from "./ItemSelect";

interface SelectInputProps extends ContainerProps {
    value?: string | number;
    handleChange: (e?: any) => void;
    size?: "sm" | "md";
    width?: string;
}

export function ThemeSelect({ children, value, handleChange, size = "md", width }: SelectInputProps) {
    const twStyle = `px-1 w-[100%] border-gray-400 border-solid border ${width} h-${size == "sm" ? 4 : 6} text-${size == "sm" ? "sm" : "base"}`
    return (
        <select className={twStyle} value={value} onChange={handleChange}>
            {children}
        </select>
    )
}

interface TextInputProps {
    width: string;
    align?: "left" | "right" | "center";
    defaultValue?: string | number;
    inputMode?: "text" | "numeric";
    handleChange: (e: any) => void;
}

export function ThemeText({ width, align = "right", defaultValue = "", handleChange, inputMode = "text" }: TextInputProps) {
    const twStyle = `h-6 border-gray-400 border-solid border ${width} text-${align}`

    return (
        <input inputMode={inputMode} className={twStyle} type="text" defaultValue={defaultValue} onBlur={handleChange} />
    )
}

interface ThemeInputProps extends ContainerProps {
    width?: string;
}

export function ThemeInputGroup({ children, width = "" }: ThemeInputProps) {
    const twStyle = `flex flex-row gap-1 ${width} h-fit`;
    return (
        <div className={twStyle}>
            {children}
        </div>
    )
}

export function ThemeInputGroupMulti({ children, width }: ThemeInputProps) {
    const twStyle = `flex flex-col gap-0.5 ${width}`;
    return (
        <div className={twStyle}>
            {children}
        </div>
    )
}

interface ItemSelectGroupProps extends PokemonProps {
    size?: "sm" | "md";
    width?: string
}

export function ItemSelectGroup({ pkmn, updatePkmn, size = "md", width }: ItemSelectGroupProps) {
    const [filter, setFilter] = useState<number>(0);

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
        <ThemeInputGroupMulti width={width}>
            <ThemeInputGroup width={width}>
                <span>Item: </span>
                <ThemeSelect value={pkmn.calcData.item ? pkmn.calcData.item : ""} handleChange={handleChangeItem} size={size}>
                    {[<option value={-1}>None</option>
                        , ...(applyItemFilters(getAllItems(pkmn), filters[filter]))
                            .map((item) =>
                                <option value={item.name}>{item.name}</option>)]}
                </ThemeSelect>
            </ThemeInputGroup>

            <ThemeInputGroup width={width}>
                <span>Filter: </span>
                <ThemeSelect value={filter} handleChange={handleUpdateFilter} size={size}>
                    {filters.map((filter, idx) => <option value={idx}>{filter.name}</option>)}
                </ThemeSelect>
            </ThemeInputGroup>

        </ThemeInputGroupMulti >
    )
}

interface ThemeCheckInterface {
    state: boolean;
    updateState: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ThemeCheck({ state, updateState }: ThemeCheckInterface) {
    return (
        <input type="checkbox" checked={state} onChange={updateState} />
    )
}

interface ThemeRadioInterface {
    state: boolean;
    updateState: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    value: string;
}

export function ThemeRadio({ state, updateState, name, value }: ThemeRadioInterface) {
    return (
        <input type="radio" name={name} value={value} checked={state} onChange={updateState} />
    )
}
