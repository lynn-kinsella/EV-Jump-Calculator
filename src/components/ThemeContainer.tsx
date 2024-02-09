export interface ContainerProps {
    children?: JSX.Element | JSX.Element[] | string | number | boolean;
}

export function ColumnContainer({ children }: ContainerProps) {
    return (
        <div className="flex flex-col px-5 gap-2 items-center w-[100%]">
            {children}
        </div>
    );
}

export interface ThemeContainerProps extends ContainerProps {
    direction: string;
}

export function ThemeContainer({ children, direction }: ThemeContainerProps) {
    return (
        <div className={`bg-yellow-100 flex border border-black rounded-md p-3 gap-0 items-start w-[100%] max-w-[50em] ${direction}`}>
            {children}
        </div>
    );
}

interface ThemeRowProps extends ContainerProps {
    justify?: string;
    wrap?: "wrap" | "nowrap"
    direction?: string;
}

export function ThemeRow({ children, wrap = "nowrap", justify, direction = "flex-row" }: ThemeRowProps) {
    const twStyle = `flex ${direction} w-[100%] h-fit py-2 flex-${wrap} ${justify} gap-x-2 gap-y-1}`
    return (
        <div className={twStyle}>
            {children}
        </div>
    );
}
