import React, { useRef } from "react";
import { StatID } from "@pkmn/dex";
import { ColumnData, InputStats } from "./Graph";
import { SelectedPokemonInterface } from "../util/SelectedPokemon";

interface StatTooltipProps {
    columnData: ColumnData | undefined;
    statName: StatID;
    mouseCoords: [number, number];
    target: SelectedPokemonInterface;
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
    target: SelectedPokemonInterface;
}

function TooltipContainer({ columnData, statName, mouseCoords, target }: TooltipContainerProps) {
    const contentRef = useRef<HTMLDivElement>(null)
    function getDirection(mouseX: number): "l" | "r" {
        let dir: "l" | "r" = "r"
        if (contentRef.current) {
            if (mouseX < window.innerWidth - contentRef.current.getBoundingClientRect().width) {
                dir = "l"
            }
            if (mouseX > contentRef.current.getBoundingClientRect().width) {
                dir = "r"
            }
        }
        return dir;
    }

    function getOffset(mouseCoords: [number, number]): React.CSSProperties | undefined {
        if (contentRef.current) {
            return getDirection(mouseCoords[1]) == "l" ? {
                top: mouseCoords[0],
                left: mouseCoords[1]
            } :
                {
                    flexDirection: "row-reverse",
                    top: mouseCoords[0],
                    left: mouseCoords[1] - contentRef.current.getBoundingClientRect().width
                }

        }
    }

    if (columnData) {
        return (
            <div className="flex flex-row z-30 absolute pointer-events-none"
                style={getOffset(mouseCoords)}
                ref={contentRef}
            >
                <TooltipPointer direction={getDirection(mouseCoords[1])} ></TooltipPointer>
                <TooltipContents direction={getDirection(mouseCoords[1])} columnData={columnData} statName={statName} target={target}></TooltipContents>
            </div >
        );
    }
}

interface TooltipPointerProps {
    direction: "l" | "r";
}

function TooltipPointer({ direction }: TooltipPointerProps) {
    const styleLeft = {
        left: -5,
        width: 5,
        height: 5,
        // borderLeft: "10px solid transparent",
        // borderBottom: "10px solid transparent",
        // borderRight: "20px solid rgb(96 165 250)",
        // borderLeft: "0px solid transparent",
        borderBottom: "5px solid transparent",
        borderRight: "10px solid rgb(96 165 250)",
    }

    const styleRight = {
        left: -5,
        width: 5,
        height: 5,
        // borderRight: "0px solid transparent",
        borderBottom: "5px solid transparent",
        borderLeft: "10px solid rgb(96 165 250)",
    }

    return (
        <div className=""
            style={direction == "r" ? styleRight : styleLeft}
        ></div>
    )
}

interface TooltipContentsProps extends TooltipPointerProps {
    columnData: ColumnData;
    statName: StatID;
    target: SelectedPokemonInterface;
}

function TooltipContents({ columnData, target, statName, direction }: TooltipContentsProps) {

    function getBorderStyle(dir: "l" | "r"): React.CSSProperties {
        const borderProperties: React.CSSProperties = {
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
        <div className="bg-blue-100 w-30 sm:w-52 h-fit border-blue-400 border-4 overflow-clip text-xs sm:text-base" style={getBorderStyle(direction)}>
            <div className="px-4 flex flex-col gap-2">
                <div className="flex-col flex content-center">
                    {/* % Range */}
                    <span className="text-center text-base sm:text-lg">
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