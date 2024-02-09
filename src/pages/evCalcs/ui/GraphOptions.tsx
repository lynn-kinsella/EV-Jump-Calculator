import { ContainerProps, ThemeContainer, ThemeRow } from "./ThemeContainer";
import React from "react";
import { ThemeCheck, ThemeInputGroup, ThemeRadio } from "./ThemeInput";
import { FixedStat, LineIndicators } from "./GraphContainer";

interface GraphOptionsProps extends ContainerProps {
    lineIndicators: LineIndicators;
    updateLineIndicators: (fraction: number, value: boolean) => void;
    fixedStat: FixedStat;
    updateFixedStat: (stat: FixedStat) => void;
}
export function GraphOptions({ lineIndicators, updateLineIndicators, fixedStat, updateFixedStat, children }: GraphOptionsProps) {
    function handleChangeLines(e: React.ChangeEvent<HTMLInputElement>, fraction: number) {
        updateLineIndicators(fraction, e.target.checked);
    }

    function handleChangeFixedStat(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value as FixedStat;
        updateFixedStat(value);
    }

    return (
        <ThemeContainer direction={"flex-col"}>
            <ThemeRow justify="justify-between" >
                <span className="w-[100%] text-center text-xl">Graph Options</span>
            </ThemeRow>

            <ThemeRow direction="flex-col">
                <span className="text-lg h-[100%]">HP Indicators:</span>
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-0 h-[100%] items-center">
                    <ThemeInputGroup label={"100%"} id={"16hpLine"}>
                        <ThemeCheck state={lineIndicators[16] == true} updateState={(e) => { handleChangeLines(e, 16); }} id={"16hpLine"}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                    <ThemeInputGroup label={"50%"} id={"8hpLine"}>
                        <ThemeCheck state={lineIndicators[8] == true} updateState={(e) => { handleChangeLines(e, 8); }} id={"8hpLine"}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                    <ThemeInputGroup label={"15/16"} id={"15hpLine"}>
                        <ThemeCheck state={lineIndicators[15] == true} updateState={(e) => { handleChangeLines(e, 15); }} id={"15hpLine"}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                    <ThemeInputGroup label={"7/8"} id={"14hpLine"}>
                        <ThemeCheck state={lineIndicators[14] == true} updateState={(e) => { handleChangeLines(e, 14); }} id={"14hpLine"}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                </div>
            </ThemeRow>

            <ThemeRow direction="flex-col">
                <span className="text-lg">Fixed Stat:</span>
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-0 h-[100%] items-center">
                    <ThemeInputGroup label={"Atk"} id={"fixAtk"}>
                        <ThemeRadio state={fixedStat == "atk"} updateState={handleChangeFixedStat} name={"fixedStat"} value={"atk"} id={"fixAtk"}>
                        </ThemeRadio>
                    </ThemeInputGroup>
                    <ThemeInputGroup label={"Def"} id={"fixDef"}>
                        <ThemeRadio state={fixedStat == "def"} updateState={handleChangeFixedStat} name={"fixedStat"} value={"def"} id={"fixDef"}>
                        </ThemeRadio>
                    </ThemeInputGroup>
                </div>
            </ThemeRow>
            <div className="flex sm:flex-row flex-col gap-x-4 gap-y-0 w-[100%]">
                {children}
            </div>
        </ThemeContainer>
    );
}
