import { ThemeContainer, ThemeRow } from "./ThemeContainer";
import React from "react";
import { ThemeCheck, ThemeInputGroup, ThemeRadio } from "./ThemeInput";
import { FixedSetting, LineIndicators } from "./GraphContainer";

interface GraphOptionsProps {
    lineIndicators: LineIndicators;
    updateLineIndicators: (fraction: number, value: boolean) => void;
    fixedStat: FixedSetting;
    updateFixedStat: (stat: FixedSetting) => void;
}
export function GraphOptions({ lineIndicators, updateLineIndicators, fixedStat, updateFixedStat }: GraphOptionsProps) {
    function handleChangeLines(e: React.ChangeEvent<HTMLInputElement>, fraction: number) {
        updateLineIndicators(fraction, e.target.checked);
    }

    function handleChangeFixedStat(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value as FixedSetting;
        updateFixedStat(value);
    }

    return (
        <ThemeContainer direction={"flex-col"}>
            <ThemeRow gapType="between">
                <span className="w-[100%] text-center text-xl">Graph Options</span>
            </ThemeRow>
            <div className="flex flex-col gap-0.5 p-y-0.5 w-[100%]">
                <span className="text-lg">HP Indicators:</span>
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-0">
                    <ThemeInputGroup>
                        <span>100%</span>
                        <ThemeCheck state={lineIndicators[16] == true} updateState={(e) => { handleChangeLines(e, 16); }}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                    <ThemeInputGroup>
                        <span>50%</span>
                        <ThemeCheck state={lineIndicators[8] == true} updateState={(e) => { handleChangeLines(e, 8); }}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                    <ThemeInputGroup>
                        <span>15/16</span>
                        <ThemeCheck state={lineIndicators[15] == true} updateState={(e) => { handleChangeLines(e, 15); }}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                    <ThemeInputGroup>
                        <span>7/8</span>
                        <ThemeCheck state={lineIndicators[14] == true} updateState={(e) => { handleChangeLines(e, 14); }}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                </div>
            </div>

            <div className="flex flex-col gap-0.5 p-y-0.5 w-[100%]">
                <span className="text-lg">Fixed Stat:</span>
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-0">
                    <ThemeInputGroup>
                        <span>Atk</span>
                        <ThemeRadio state={fixedStat == "atk"} updateState={handleChangeFixedStat} name={"fixedStat"} value={"atk"}>
                        </ThemeRadio>
                    </ThemeInputGroup>
                    <ThemeInputGroup>
                        <span>Def</span>
                        <ThemeRadio state={fixedStat == "def"} updateState={handleChangeFixedStat} name={"fixedStat"} value={"def"}>
                        </ThemeRadio>
                    </ThemeInputGroup>
                </div>
            </div>
        </ThemeContainer>
    );
}
