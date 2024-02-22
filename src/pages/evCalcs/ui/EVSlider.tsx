import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { SelectedPokemonInterface } from "../util/SelectedPokemon";
import { StatID } from "@pkmn/dex";
import { PokemonProps } from "./IntrinsicPokemon";
import { ThemeRow } from "../../../components/ThemeContainer";
import { evsToPoints, pointsToEVs } from "../util/PokeCalcs";

interface EVSliderProps extends PokemonProps {
    updatePkmn: React.Dispatch<SetStateAction<SelectedPokemonInterface>>;
    pkmn: SelectedPokemonInterface;
    referencePkmn: SelectedPokemonInterface;
    stat: StatID;
}
export function EVSlider({ stat, updatePkmn, referencePkmn }: EVSliderProps) {
    const [statPoints, setStatPoints] = useState<number>(evsToPoints(referencePkmn.calcData.evs[stat]));
    const [dragging, setDragging] = useState<boolean>(false);

    const sliderRef = useRef<HTMLDivElement>(null);
    const controlRef = useRef<HTMLDivElement>(null);

    function handleSlideMouse(e: React.MouseEvent<HTMLDivElement>) {
        if (dragging && sliderRef.current && controlRef.current) {
            const boundingBox = sliderRef.current.getBoundingClientRect();
            setStatPoints(Math.max(0, Math.min(Math.round((e.clientX - boundingBox.left) / (boundingBox.width / 35) - 1), 32)));
        }
    }

    function handleSlideTouch(e: React.TouchEvent<HTMLDivElement>) {
        if (dragging && sliderRef.current && controlRef.current) {
            const boundingBox = sliderRef.current.getBoundingClientRect();
            setStatPoints(Math.max(0, Math.min(Math.round((e.touches[0].clientX - boundingBox.left) / (boundingBox.width / 35) - 1), 32)));
        }
    }

    useEffect(() => {
        updatePkmn((prevPkmn: SelectedPokemonInterface) => {
            prevPkmn.updateEVs(stat, pointsToEVs(statPoints));
            return prevPkmn.clone();
        });
    }, [statPoints]);

    useEffect(() => {
        setStatPoints(evsToPoints(referencePkmn.calcData.evs[stat]));
    }, [referencePkmn]);

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        setDragging(true)
        if (sliderRef.current && controlRef.current) {
            const boundingBox = sliderRef.current.getBoundingClientRect();
            setStatPoints(Math.max(0, Math.min(Math.round((e.clientX - boundingBox.left) / (boundingBox.width / 35) - 1), 32)));
        }
    }

    function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        document.body.classList.add("overflow-hidden")
        setDragging(true)
        if (sliderRef.current && controlRef.current) {
            const boundingBox = sliderRef.current.getBoundingClientRect();
            setStatPoints(Math.max(0, Math.min(Math.round((e.touches[0].clientX - boundingBox.left) / (boundingBox.width / 35) - 1), 32)));
        }
    }

    function handleTouchEnd() {
        setDragging(false)
        document.body.classList.remove("overflow-hidden")
    }

    return (
        <ThemeRow>
            <div className="w-[100%] flex flex-col">
                <span className="text-lg">Fixed {stat[0].toUpperCase() + stat.slice(1)} EVs - {pointsToEVs(statPoints)}</span>
                <div className={"h-8 flex items-center w-[100%] " + (dragging ? "cursor-grab" : "cursor-pointer")}
                    onMouseMove={handleSlideMouse}
                    onMouseDown={handleClick}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleSlideTouch}
                    onMouseUp={() => setDragging(false)}
                    onTouchEnd={handleTouchEnd}
                    onMouseLeave={() => { if (dragging) { setDragging(false); } }}>
                    <div ref={sliderRef} className="h-8 relative min-w-[100%] overflow-clip">

                        <div className="top-2 absolute bg-white h-4 w-[100%] border-2 border-red-400 rounded-full" draggable={false}></div>
                        <div
                            ref={controlRef}
                            className={`${!dragging ? "bg-white" : "bg-red-400"} hover:bg-red-100 border-2 border-red-400 h-8 absolute rounded-full`}
                            style={{ width: `${100 / 35}%`, left: `${100 / 35 * (statPoints + 1)}%` }}>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeRow >
    );
}
