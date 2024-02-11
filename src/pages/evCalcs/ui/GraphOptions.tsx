import { ContainerProps, ThemeContainer, ThemeRow } from "../../../components/ThemeContainer";
import React, { useState } from "react";
import { ThemeCheck, ThemeInputGroup, ThemeRadio, ThemeText } from "./ThemeInput";
import { FixedStat, LineIndicators } from "./GraphContainer";

interface GraphOptionsProps extends ContainerProps {
    lineIndicators: LineIndicators;
    updateLineIndicators: (fraction: number, value: boolean) => void;
    fixedStat: FixedStat;
    updateFixedStat: (stat: FixedStat) => void;
}
export function GraphOptions({ lineIndicators, updateLineIndicators, fixedStat, updateFixedStat, children }: GraphOptionsProps) {
    const [customEnabled, setCustomEnabled] = useState<boolean>(false);
    const [customValue, setCustomValue] = useState<number>(0);

    function handleChangeCustomValue(e: React.ChangeEvent<HTMLInputElement>) {
        updateLineIndicators(customValue, false)
        const fraction = Math.round(1000 * (parseFloat(e.target.value) / 100)) * 10
        if (fraction) {
            setCustomValue(fraction);
            if (customEnabled) {
                updateLineIndicators(fraction, true)
            }
        }
    }

    function handleChangeCustomEnabled(e: React.ChangeEvent<HTMLInputElement>) {
        setCustomEnabled(e.target.checked);
        if (e.target.checked) {
            updateLineIndicators(customValue, true)
        }
        else {
            updateLineIndicators(customValue, false)
        }
    }

    function handleChangeFixedStat(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value as FixedStat;
        updateFixedStat(value);
    }

    function handleChangeLines(e: React.ChangeEvent<HTMLInputElement>, fraction: number) {
        updateLineIndicators(fraction, e.target.checked);
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
                        <ThemeCheck state={lineIndicators[10000] == true} updateState={(e) => { handleChangeLines(e, 10000); }} id={"16hpLine"}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                    <ThemeInputGroup label={"50%"} id={"8hpLine"}>
                        <ThemeCheck state={lineIndicators[5000] == true} updateState={(e) => { handleChangeLines(e, 5000); }} id={"8hpLine"}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                    <ThemeInputGroup label={"15/16"} id={"15hpLine"}>
                        <ThemeCheck state={lineIndicators[15 / 16 * 10000] == true} updateState={(e) => { handleChangeLines(e, 15 / 16 * 10000); }} id={"15hpLine"}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                    <ThemeInputGroup label={"7/8"} id={"14hpLine"}>
                        <ThemeCheck state={lineIndicators[14 / 16 * 10000] == true} updateState={(e) => { handleChangeLines(e, 14 / 16 * 10000); }} id={"14hpLine"}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                    <ThemeInputGroup label={"Custom"} id={"customhpLine"}>
                        <ThemeCheck state={customEnabled} updateState={handleChangeCustomEnabled} id={"customhpLine"}>
                        </ThemeCheck>
                    </ThemeInputGroup>
                    <ThemeInputGroup label={"%"} id={"hpPercent"} direction="row-reverse">
                        <ThemeText width="w-12" inputMode="numeric" handleChange={handleChangeCustomValue} id={""}>
                        </ThemeText>
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
