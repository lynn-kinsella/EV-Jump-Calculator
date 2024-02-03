import React, { useEffect, useRef, useState } from "react";
import { SelectedPokemon, updateSelectedEVs } from "../../util/SelectedPokemon_old";
import { evsToPoints, pointsToEVs } from "../../util/PokeCalcs";
import { StatID } from "@pkmn/dex";

interface EVSliderProps {
    updatePokemon: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
    statName: StatID;
}

const stepWidth = 1; //rem

function EVSlider({ updatePokemon, statName }: EVSliderProps) {
    const [statPoints, setStatPoints] = useState<number>(0);
    const [dragging, setDragging] = useState<boolean>(false);

    const sliderRef = useRef<HTMLDivElement>(null)
    const controlRef = useRef<HTMLDivElement>(null)

    function handleSlide(e: React.MouseEvent<HTMLDivElement>) {
        if (dragging && sliderRef.current && controlRef.current) {
            const boundingBox = sliderRef.current.getBoundingClientRect()
            setStatPoints(Math.min(Math.round((e.clientX - boundingBox.left) / (boundingBox.width / 33)), 32))
        }
    }

    useEffect(() => {
        updatePokemon((prevPkmn: SelectedPokemon) => updateSelectedEVs(prevPkmn, statName, pointsToEVs(statPoints)))
    }, [statPoints])

    return (
        <div className="flex flex-col gap-1">
            <span className="h-6">{statName.charAt(0).toUpperCase() + statName.slice(1)} EVs: {pointsToEVs(statPoints)}</span>
            {/* Slider */}
            <div className="h-6 flex items-center">
                <div ref={sliderRef} className="h-4 bg-indigo-100 relative" style={{ "width": stepWidth * 33 + "rem" }}
                    onMouseMove={handleSlide}
                    onMouseDown={() => setDragging(true)}
                    onMouseUp={() => setDragging(false)}
                    onMouseLeave={() => { if (dragging) { setDragging(false) } }}>
                    <div ref={controlRef} className="bg-indigo-400 w-2 h-4 absolute" style={{ "left": statPoints * stepWidth + "rem", "width": stepWidth + "rem" }}> </div>
                </div>
            </div>
        </div>
    );
}

export default EVSlider;