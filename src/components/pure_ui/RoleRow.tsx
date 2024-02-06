import React, { SetStateAction } from "react";
import { ThemeRow } from "./ThemeContainer";
import { RoleSelectButton } from "./RoleSelectButton";

interface RoleRowProps {
    showAttacker: boolean;
    handleSwap: () => void;
    setShowAttacker: React.Dispatch<SetStateAction<boolean>>;
}
export function RoleRow({ showAttacker, handleSwap, setShowAttacker }: RoleRowProps) {
    const attackerTitle = <div className="flex flex-row justify-center items-center bg-red-200 w-[100%] px-4 py-2">{!showAttacker && "Show "}Attacker</div>;
    const defenderTitle = <div className="flex flex-row justify-center items-center bg-blue-200 w-[100%] px-4 py-2">{showAttacker && "Show "}Defender</div>;

    return (
        <ThemeRow gapType={"between"} wrap={"wrap"}>
            <RoleSelectButton size={"2xl"}>
                {showAttacker ? attackerTitle : defenderTitle}
            </RoleSelectButton>

            <RoleSelectButton clickAction={handleSwap} size={"xs"}>
                <div className="flex flex-row justify-center items-center w-[100%] px-4 py-2"
                    style={{ backgroundImage: "linear-gradient(90deg, rgb(254 202 202) 0%, rgb(191 219 254) 100%)" }}>
                    Swap
                </div>
            </RoleSelectButton>

            <RoleSelectButton clickAction={() => { setShowAttacker(prev => !prev); }} size={"xs"}>
                {!showAttacker ? attackerTitle : defenderTitle}
            </RoleSelectButton>
        </ThemeRow>
    );
}
