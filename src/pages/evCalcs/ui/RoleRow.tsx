import React, { SetStateAction } from "react";
import { ThemeRow } from "../../../components/ThemeContainer";
import { RoleSelectButton } from "./RoleSelectButton";

interface RoleRowProps {
    showAttacker: boolean;
    handleSwap: () => void;
    setShowAttacker: React.Dispatch<SetStateAction<boolean>>;
}
export function RoleRow({ showAttacker, handleSwap, setShowAttacker }: RoleRowProps) {
    const attackerTitle = <div className={"flex flex-row justify-center items-center bg-red-100 w-[100%] px-4 py-2 " + (!showAttacker && "cursor-pointer")}>{!showAttacker && "Show "}Attacker</div>;
    const defenderTitle = <div className={"flex flex-row justify-center items-center bg-blue-100 w-[100%] px-4 py-2 " + (showAttacker && "cursor-pointer")}>{showAttacker && "Show "}Defender</div>;

    return (
        <ThemeRow justify="justify-between" wrap={"wrap"}>
            <div className="text-lg base flex flex-row rounded-full overflow-clip select-none">
                {showAttacker ? attackerTitle : defenderTitle}
            </div>

            <RoleSelectButton clickAction={handleSwap} size={"xs"}>
                <div className={"flex flex-row justify-center items-center w-[100%] px-4 py-2 cursor-pointer bg-gradient-to-r " +
                    (showAttacker ? "from-red-100 to-blue-100" : "from-blue-100 to-red-100")}>
                    Swap
                </div>
            </RoleSelectButton>

            <RoleSelectButton clickAction={() => { setShowAttacker(prev => !prev); }} size={"xs"}>
                {!showAttacker ? attackerTitle : defenderTitle}
            </RoleSelectButton>
        </ThemeRow >
    );
}
