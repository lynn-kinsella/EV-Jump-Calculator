import { CSSProperties } from "react";


export interface ContainerProps {
    children?: JSX.Element | JSX.Element[] | string | number | boolean;
}

export interface ThemeContainerProps extends ContainerProps {
    direction: string;
}


export function ColumnContainer({ children }: ContainerProps) {
    return (
        <div className="flex flex-col px-5 py-10 gap-10 items-center">
            {children}
        </div>
    );
}

export function ThemeContainer({ children, direction }: ThemeContainerProps) {

    return (
        <div className={`bg-yellow-100 flex border border-black rounded-md p-3 gap-0 sm:w-[80%] md:w-[50%] w-[100%] ${direction}`}>
            {children}
        </div>
    );
}

interface ThemeRowProps extends ContainerProps {
    gapType?: "between" | "gap";
    wrap?: "wrap" | "nowrap"
}

export function ThemeRow({ children, gapType = "gap", wrap = "nowrap" }: ThemeRowProps) {
    const twStyle = `flex flex-row w-[100%] py-2 flex-${wrap} ${gapType == "between" ? "justify-between" : "gap-2"}`
    return (
        <div className={twStyle}>
            {children}
        </div>
    );
}
