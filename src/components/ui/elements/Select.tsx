import { ReactElement } from "react";

interface SelectProps {
    value: string;
    children: ReactElement[] | ReactElement;
    handleChange: Function | undefined;
}

function Select({ children, value, handleChange }: SelectProps) {
    return (
        <select onChange={(e) => { if (handleChange) handleChange(e) }} className="w-36 min-w-36" value={value}>
            {children}
        </select>
    )
}

export default Select