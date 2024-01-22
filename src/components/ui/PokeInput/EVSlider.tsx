import React, { useEffect, useRef, useState } from "react";
import { SelectedPokemon } from "../../../util/SelectedPokemon";
import { pointsToEvs } from "../../../util/PokeCalcs";

interface EVSliderProps {
    updatePokemon: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
    type: "atk" | "def" | "hp"
}


const stepWidth = 1; //rem

function EVSlider({ updatePokemon, type }: EVSliderProps) {
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
        updatePokemon((prevPokemon: SelectedPokemon) => {
            prevPokemon.evs[type] = pointsToEvs(statPoints);
            console.log(prevPokemon.evs);
            return new SelectedPokemon(undefined, prevPokemon);
        })
    }, [statPoints])

    return (
        <div>
            <span>{type.charAt(0).toUpperCase() + type.slice(1)} EVs: {pointsToEvs(statPoints)}</span>
            {/* Slider */}
            <div ref={sliderRef} className="h-4 bg-indigo-100 relative" style={{ "width": stepWidth * 33 + "rem" }} onMouseMove={handleSlide} onMouseDown={() => setDragging(true)} onMouseUp={() => setDragging(false)}>
                <div ref={controlRef} className="bg-indigo-400 w-2 h-4 absolute" style={{ "left": statPoints * stepWidth + "rem", "width": stepWidth + "rem" }}> </div>
            </div>
        </div>
    );
}

export default EVSlider;