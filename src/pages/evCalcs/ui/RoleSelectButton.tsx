import { ContainerProps } from "../../../components/ThemeContainer";

interface RoleSelectButtonProps extends ContainerProps {
    clickAction?: () => void;
    size: "xs" | "sm" | "base" | "xl" | "2xl";
}
export function RoleSelectButton({ children, clickAction, size }: RoleSelectButtonProps) {
    let twStyle = "text-" + size + " base flex flex-row rounded-full overflow-clip select-none hover:brightness-90";
    return (
        <div className={twStyle} onClick={clickAction}>
            {children}
        </div>
    );
}