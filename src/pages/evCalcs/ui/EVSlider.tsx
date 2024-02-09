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

    function handleSlide(e: React.MouseEvent<HTMLDivElement>) {
        if (dragging && sliderRef.current && controlRef.current) {
            const boundingBox = sliderRef.current.getBoundingClientRect();
            setStatPoints(Math.max(0, Math.min(Math.round((e.clientX - boundingBox.left) / (boundingBox.width / 35) - 1), 32)));
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
    }, [referencePkmn.calcData.evs[stat]]);

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        setDragging(true)
        if (sliderRef.current && controlRef.current) {
            const boundingBox = sliderRef.current.getBoundingClientRect();
            setStatPoints(Math.max(0, Math.min(Math.round((e.clientX - boundingBox.left) / (boundingBox.width / 35) - 1), 32)));
        }
    }

    return (
        <ThemeRow>
            <div className="w-[100%] flex flex-col">
                <span className="text-lg">Fixed {stat[0].toUpperCase() + stat.slice(1)} EVs - {pointsToEVs(statPoints)}</span>
                <div className={"h-8 flex items-center w-[100%] " + (dragging ? "cursor-grab" : "cursor-pointer")}
                    onMouseMove={handleSlide}
                    onMouseDown={handleClick}
                    onMouseUp={() => setDragging(false)}
                    onMouseLeave={() => { if (dragging) { setDragging(false); } }}>
                    <div ref={sliderRef} className="h-8 relative min-w-[100%] overflow-clip">

                        <div className="top-2 absolute bg-white h-4 w-[100%] border-2 border-red-400 rounded-full" draggable={false}></div>
                        <div
                            ref={controlRef}
                            className={"bg-white hover:bg-red-100 active:bg-red-400 border-2 border-red-400 h-8 absolute rounded-full"}
                            style={{ width: `${100 / 35}%`, left: `${100 / 35 * (statPoints + 1)}%` }}>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeRow >
    );
}
