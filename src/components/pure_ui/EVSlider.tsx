import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { SelectedPokemon } from "../../util/SelectedPokemon";
import { StatID } from "@pkmn/dex";
import { PokemonProps } from "./IntrinsicPokemon";
import { ThemeContainer } from "./ThemeContainer";
import { evsToPoints, pointsToEVs } from "../../util/PokeCalcs";

interface EVSliderProps extends PokemonProps {
    updatePkmn: React.Dispatch<SetStateAction<SelectedPokemon>>;
    pkmn: SelectedPokemon;
    referencePkmn: SelectedPokemon;
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
        updatePkmn((prevPkmn: SelectedPokemon) => {
            prevPkmn.updateEVs(stat, pointsToEVs(statPoints));
            return prevPkmn.clone();
        });
    }, [statPoints]);

    useEffect(() => {
        setStatPoints(evsToPoints(referencePkmn.calcData.evs[stat]));
    }, [referencePkmn.calcData.evs[stat]]);


    return (
        <ThemeContainer direction={"flex-col"}>
            <span className="text-lg">{stat[0].toUpperCase() + stat.slice(1)} EVs - {pointsToEVs(statPoints)}</span>
            <div className="h-6 flex items-center w-[100%]">
                <div ref={sliderRef} className="h-4 relative min-w-[100%] overflow-clip"
                    onMouseMove={handleSlide}
                    onMouseDown={() => setDragging(true)}
                    onMouseUp={() => setDragging(false)}
                    onMouseLeave={() => { if (dragging) { setDragging(false); } }}>

                    <div className="top-1 absolute bg-white h-2 w-[100%]  border-2 border-pink-400 rounded-full"></div>
                    <div
                        ref={controlRef}
                        className="bg-white border-2 border-pink-400 h-4 absolute rounded-full"
                        style={{ width: `${100 / 35}%`, left: `${100 / 35 * (statPoints + 1)}%` }}>
                    </div>
                </div>
            </div>
        </ThemeContainer>
    );
}
