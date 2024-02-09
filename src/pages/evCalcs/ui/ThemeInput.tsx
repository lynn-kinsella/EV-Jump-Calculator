import React, { useEffect, useState } from "react";
import { ContainerProps } from "./ThemeContainer";
import { PokemonProps } from "./IntrinsicPokemon";
import { Dex } from "@pkmn/dex";
import { applyItemFilters, filters, getAllItems } from "./ItemSelect";

interface ThemeInputProps extends ContainerProps {
    width?: string;
    id: string;
}

interface SelectInputProps extends ThemeInputProps {
    value?: string | number;
    handleChange: (e?: any) => void;
    size?: "sm" | "md";
}

export function ThemeSelect({ children, value, handleChange, size = "md", width, id }: SelectInputProps) {
    const twStyle = `px-1 w-[100%] border-gray-400 border-solid bg-white border ${width} h-${size == "sm" ? 4 : 6} text-${size == "sm" ? "sm" : "base"}`
    return (
        <select id={id} className={twStyle} value={value} onChange={handleChange} >
            {children}
        </select>
    )
}

interface TextInputProps extends ThemeInputProps {
    width?: string;
    align?: "left" | "right" | "center";
    defaultValue?: string | number;
    inputMode?: "text" | "numeric";
    handleChange: (e: any) => void;
}

export function ThemeText({ width, align = "right", defaultValue = "", handleChange, inputMode = "text", id }: TextInputProps) {
    const twStyle = `h-6 border-gray-400 border-solid border ${width} text-${align} `

    return (
        <input inputMode={inputMode} className={twStyle} type="text" defaultValue={defaultValue} onBlur={handleChange} id={id} />
    )
}

interface GroupInputProps extends ThemeInputProps {
    hideLabel?: boolean;
    label: string;
    size?: string;
}

export function ThemeInputGroup({ children, width = "", id, label, hideLabel = false, size = "" }: GroupInputProps) {
    const twStyle = `flex flex-row ${size} ${!hideLabel && "gap-1"} ${width} h-fit`;
    return (
        <div className={twStyle}>
            <label htmlFor={id} className={hideLabel ? "max-w-0 overflow-clip" : undefined}>{label}</label>
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
        <ThemeInputGroupMulti width={width} id={"itemOptions"}>
            <ThemeInputGroup width={width} label={"Item: "} id={"item"}>
                <ThemeSelect id="item" value={pkmn.calcData.item ? pkmn.calcData.item : ""} handleChange={handleChangeItem} size={size}>
                    {[<option value={-1}>None</option>
                        , ...(applyItemFilters(getAllItems(pkmn), filters[filter]))
                            .map((item) =>
                                <option value={item.name}>{item.name}</option>)]}
                </ThemeSelect>
            </ThemeInputGroup>

            <ThemeInputGroup width={width} label={"Filter: "} id={"itemFilters"}>
                <ThemeSelect value={filter} handleChange={handleUpdateFilter} size={size} id={"itemFilters"}>
                    {filters.map((filter, idx) => <option value={idx}>{filter.name}</option>)}
                </ThemeSelect>
            </ThemeInputGroup>

        </ThemeInputGroupMulti >
    )
}

interface ThemeCheckInterface extends ThemeInputProps {
    state: boolean;
    updateState: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ThemeCheck({ state, updateState, id }: ThemeCheckInterface) {
    return (
        <input id={id} type="checkbox" checked={state} onChange={updateState} />
    )
}

interface ThemeRadioProps extends ThemeInputProps {
    state: boolean;
    updateState: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    name: string;
}

export function ThemeRadio({ state, updateState, name, value, id }: ThemeRadioProps) {
    return (
        <input type="radio" id={id} name={name} value={value} checked={state} onChange={updateState} />
    )
}

interface ThemeSubmitProps extends ContainerProps {
    updateState: () => void;
}

export function ThemeSubmit({ updateState, children }: ThemeSubmitProps) {
    return (
        <div className="hover:brightness-90 cursor-pointer">
            <div className="py-2 text-lg px-6 border border-gray-400 m-auto bg-white rounded-full select-none "
                onClick={updateState}
            >{children}</div>

        </div>
    )
}