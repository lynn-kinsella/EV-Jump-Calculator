import React from "react";
import { SelectedPokemon } from "../../util/SelectedPokemon_old";
import { StatID } from "@pkmn/dex";
import { ColumnData, InputStats } from "./Graph";

interface StatTooltipProps {
    columnData: ColumnData | undefined;
    statName: StatID;
    mouseCoords: [number, number];
    target: SelectedPokemon;
}
export function StatTooltip({ columnData, statName, mouseCoords, target }: StatTooltipProps) {
    return (
        <TooltipContainer columnData={columnData} statName={statName} mouseCoords={mouseCoords} target={target}></TooltipContainer>
    )
}

interface TooltipContainerProps {
    columnData: ColumnData | undefined;
    statName: StatID;
    mouseCoords: [number, number];
    target: SelectedPokemon;
}

function TooltipContainer({ columnData, statName, mouseCoords, target }: TooltipContainerProps) {
    function getDirection(mouseX: number): "l" | "r" {
        if (mouseX < window.innerWidth - 300) {
            return "l"
        }
        return "r"
    }

    function getOffset(mouseCoords: [number, number]): React.CSSProperties {
        return getDirection(mouseCoords[1]) == "l" ? {
            top: mouseCoords[0],
            left: mouseCoords[1] - 5
        } :
            {
                flexDirection: "row-reverse",
                top: mouseCoords[0],
                right: window.innerWidth - mouseCoords[1] - 10
            }
    }
    if (columnData) {
        return (
            <div className="flex flex-row z-30 absolute pointer-events-none"
                style={getOffset(mouseCoords)}
            >
                <TooltipPointer direction={getDirection(mouseCoords[1])} ></TooltipPointer>
                <TooltipContents columnData={columnData} statName={statName} target={target}></TooltipContents>
            </div >
        );
    }
}

interface TooltipPointerProps {
    direction: "l" | "r";
}

function TooltipPointer({ direction }: TooltipPointerProps) {
    const styleLeft = {
        width: 0,
        height: 0,
        borderLeft: "0.5em solid transparent",
        borderBottom: "0.5em solid transparent",
        borderRight: "2em solid rgb(96 165 250)",
    }

    const styleRight = {
        width: 0,
        height: 0,
        borderRight: "0.5em solid transparent",
        borderBottom: "0.5em solid transparent",
        borderLeft: "2em solid rgb(96 165 250)",
    }

    return (
        <div className=""
            style={direction == "r" ? styleRight : styleLeft}
        ></div>
    )
}

interface TooltipContentsProps {
    columnData: ColumnData;
    statName: StatID;
    target: SelectedPokemon;
}

function TooltipContents({ columnData, target, statName }: TooltipContentsProps) {

    function getBorderStyle(dir: "l" | "r"): React.CSSProperties {
        let borderProperties: React.CSSProperties = {
            borderBottomRightRadius: "0.5em",
            borderBottomLeftRadius: "0.5em"
        }

        if (dir == "r") {
            borderProperties.borderTopLeftRadius = "0.5em"
        }
        else {
            borderProperties.borderTopRightRadius = "0.5em"
        }

        return borderProperties
    }

    return (
        <div className="bg-blue-100 w-52 h-fit border-blue-400 border-4" style={{}}>
            <div className="px-4 flex flex-col gap-2">
                <div className="flex-col flex content-center">
                    {/* % Range */}
                    <span className="text-center text-lg">
                        {Math.round(1000 * columnData.calcs.low / target.calcData.stats.hp) / 10}% - {Math.round(1000 * columnData.calcs.high / target.calcData.stats.hp) / 10}%
                    </span>

                    <span className="">{statName} stat: {columnData.inputStats[0].stat}</span>

                    {/* HP Range */}
                    <span>dmg (hp): {columnData.calcs.low}hp - {columnData.calcs.high}hp</span>
                </div>
                <div>
                    <span>Sets:     </span>
                    {columnData.inputStats.map((stat: InputStats) => {
                        return (
                            <div className="flex flex-row">
                                <div className="flex flex-row gap-2 min-w-30 ">
                                    <span className="w-[1ch]">{stat.nature}</span>
                                    <span className="w-[3ch] text-right">{stat.evs}</span>
                                    <span className="">{statName} EVs </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}