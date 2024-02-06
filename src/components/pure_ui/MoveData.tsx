import { ThemeContainer, ThemeRow } from "./ThemeContainer";
import React, { useEffect, useState } from "react";
import { SelectedPokemon } from "../../util/SelectedPokemon";
import { Dex, Learnset, Move } from "@pkmn/dex";
import { ThemeSelect } from "./ThemeInput";

// function GraphOptions() {
//     return (
//         <ThemeContainer direction={"flex-col"}>
//         </ThemeContainer>
//     )
// }
interface MoveDataProps {
    pkmn: SelectedPokemon;
    updateMove: (newMove: Move) => void;
    move: Move | undefined;
}
export function MoveData({ updateMove, move, pkmn }: MoveDataProps) {
    const [moveCategory, setMoveCategory] = useState<"All" | "Special" | "Physical">("All");

    function handleCategoryChange(attackCategory: "All" | "Special" | "Physical") {
        setMoveCategory(attackCategory);
    }

    function handleUpdateMove(newAttack: Move) {
        updateMove(newAttack);
    }
    return (
        <ThemeContainer direction={"flex-col"}>
            <ThemeRow gapType="between">
                <span className="w-[100%] text-center text-xl">Attack</span>
            </ThemeRow>
            <div className="flex flex-col gap-0.5 p-y-0.5 w-[100%]">
                <MoveList pkmn={pkmn} handleUpdateMove={handleUpdateMove} moveCategory={moveCategory}></MoveList>
                <MoveCategoryFilter updateCategory={handleCategoryChange}></MoveCategoryFilter>
                <MoveInfo move={move}></MoveInfo>
            </div>
        </ThemeContainer>
    );
}


interface MoveListProps {
    pkmn: SelectedPokemon;
    handleUpdateMove: (newMove: Move) => void;
    moveCategory: "All" | "Special" | "Physical";
}
function MoveList({ pkmn, handleUpdateMove, moveCategory }: MoveListProps) {
    const gen9Dex = Dex.forGen(9);
    const [moves, setMoves] = useState<Move[]>([]);

    useEffect(() => {
        gen9Dex.learnsets.get(pkmn.speciesData.name)
            .then((ls: Learnset) => {
                if (ls.learnset) {
                    let moves = [...Object.keys(ls.learnset)];
                    setMoves(moves.map(learnsetEntry => gen9Dex.moves.get(learnsetEntry))
                        .filter((move) => moveCategory == "All" || move.category == moveCategory));
                }
                else {
                    setMoves([]);
                }
            });
    }, [pkmn, moveCategory]);

    function handleAttackChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let index = parseInt(e.target.value);
        handleUpdateMove(moves[index]);
    }

    return (
        <div className="h-6 flex flex-row gap-4 w-[100%]">
            <label>Attack: </label>
            <ThemeSelect handleChange={handleAttackChange}>
                {moves && [<option value={-1}>Select Move</option>, ...moves.map((mv, idx) => <option value={idx}>{mv.name}</option>)]}
            </ThemeSelect>

            {/* <select className="px-1 border-gray-400 border-solid border w-[100%]" onChange={handleAttackChange}>
            </select> */}
        </div>
    );
}


interface MoveCategoryFilterProps {
    updateCategory: (MoveCategory: "All" | "Special" | "Physical") => void;
}
function MoveCategoryFilter({ updateCategory }: MoveCategoryFilterProps) {

    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        updateCategory(e.target.value as "All" | "Special" | "Physical");
    }

    return (
        <div className="h-6 flex-row flex gap-4">
            <label>Category: </label>
            <select className="px-1 border-gray-400 border-solid border w-[100%]"
                onChange={handleCategoryChange}>
                {["All", "Special", "Physical"].map((cat) => <option value={cat}>{cat.slice(0, 4)}</option>)}
            </select>
        </div>
    );
}


interface MoveInfoProps {
    move: Move | undefined;
}
function MoveInfo({ move }: MoveInfoProps) {
    return (
        <div className="flex flex-col gap-0 pr-4 w-[100%]">
            <div className="flex flex-row gap-4">
                <div className=""><span>Power: {move?.basePower}</span></div>
                <div className=""><span>Type: {move?.type}</span></div>
            </div>
            <div className="flex flex-row gap-2">
                <span>Effect: </span>
                <span className="self-end">{move?.shortDesc}</span>
            </div>
        </div>
    );
}
