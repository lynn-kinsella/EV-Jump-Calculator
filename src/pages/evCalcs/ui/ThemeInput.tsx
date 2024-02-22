import React, { useEffect, useRef, useState } from "react";
import { ContainerProps } from "../../../components/ThemeContainer";
import Fuse from "fuse.js"

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

interface ThemeFuzzyProps extends ThemeInputProps {
    value?: string | number;
    options: string[];
    handleChange: (e?: any) => void;
    size?: "sm" | "md";
}

export function ThemeFuzzy({ options, value, handleChange, size = "md", width, id }: ThemeFuzzyProps) {
    const [queryText, setQueryText] = useState<string>("");
    const [showDropDown, setShowDropdown] = useState<boolean>(false);
    const [arrowKeyIndex, setArrowKeyIndex] = useState<number>(0);
    const [filteredList, setFilteredList] = useState<string[]>(options)
    const inputRef = useRef<HTMLInputElement>(null);

    function sendChange(pkmn: string) {
        if (pkmn && showDropDown) {
            handleChange(pkmn)
        }
    }

    function openDropdown() {
        setShowDropdown(true);
        setArrowKeyIndex(0);
    }

    function closeDropdown(overrideIndex?: number) {
        sendChange(filteredList[overrideIndex == undefined ? arrowKeyIndex : overrideIndex])
        setShowDropdown(false);
        inputRef.current?.blur();
        setQueryText("");
    }

    function getListLength() {
        return filteredList.length - 1;
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        switch (e.key) {
            case "Escape":
            case "Enter":
                closeDropdown();
                break;
            case "ArrowUp":
                setArrowKeyIndex(prev => Math.max(prev - 1, 0));
                break;
            case "ArrowDown":
                setArrowKeyIndex(prev => Math.min(prev + 1, getListLength()));
                break;
        }
    }

    function updateFilteredList() {
        var result = options;
        if (queryText) {
            const fuse = new Fuse(options);
            result = fuse.search(queryText).map(result => result.item);
        }
        sendChange(result[arrowKeyIndex])
        setFilteredList(result)
    }

    useEffect(() => {
        updateFilteredList();
    }, [queryText])

    useEffect(() => {
        sendChange(filteredList[arrowKeyIndex]);
    }, [arrowKeyIndex])

    const twStyle = `px-1 w-[100%] border-gray-400 border-solid bg-white border ${width} h-${size == "sm" ? 4 : 6} text-${size == "sm" ? "sm" : "base"}`

    return (
        <div className="w-[100%] h-6">
            <input type="search"
                value={queryText}
                ref={inputRef}
                className={twStyle}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder={value as string}
                onFocus={openDropdown}
                onBlur={() => closeDropdown()}
                onKeyDown={showDropDown ? handleKeyDown : undefined}
                id={id} />

            {showDropDown &&
                <ul className="z-10 relative bg-white w-[100%] border-gray-400 border-solid border-l border-r drop-shadow-lg ">
                    {filteredList.slice(0, 5).map((item, idx) => (
                        <li key={idx} className={`w-[100%] border-b border-gray-400 border-solid px-2 ${(arrowKeyIndex == idx) ? "bg-gray-700" : ""}`}
                            onClick={() => closeDropdown(idx)}
                            onMouseEnter={() => { setArrowKeyIndex(idx) }}
                            onTouchStart={() => { closeDropdown(idx); }}
                        >
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

interface TextInputProps extends ThemeInputProps {
    width?: string;
    align?: "left" | "right" | "center";
    value?: string | number;
    inputMode?: "text" | "numeric";
    handleChange: (e: any) => void;
    handleFocus?: (e: any) => void;
}

export function ThemeText({ width, align = "right", value, handleChange, handleFocus, inputMode = "text", id }: TextInputProps) {
    const twStyle = `h-6 border-gray-400 border-solid border ${width} text-${align} bg-white`

    return (
        <input inputMode={inputMode} className={twStyle} type="text" value={value} onBlur={handleChange} onFocus={handleFocus} id={id} />
    )
}

interface GroupInputProps extends ThemeInputProps {
    hideLabel?: boolean;
    label: string;
    size?: string;
    direction?: string
}

export function ThemeInputGroup({ children, width = "", id, label, hideLabel = false, size = "", direction = "flex-row" }: GroupInputProps) {
    const twStyle = `flex ${direction} ${size} ${!hideLabel && "gap-1"} ${width} h-fit`;
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

interface ThemeCheckInterface extends ThemeInputProps {
    state: boolean;
    updateState: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ThemeCheck({ state, updateState, id }: ThemeCheckInterface) {
    return (
        <input className="text-white" id={id} type="checkbox" checked={state} onChange={updateState} />
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
        <input className="bg-white" type="radio" id={id} name={name} value={value} checked={state} onChange={updateState} />
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