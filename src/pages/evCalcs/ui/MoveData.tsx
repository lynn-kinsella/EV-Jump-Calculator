import { ThemeContainer, ThemeRow } from "./ThemeContainer";
import React, { Suspense, useEffect, useState } from "react";
import { SelectedPokemonInterface } from "../util/SelectedPokemon";
import { Move, Learnset } from "@pkmn/dex";
import { ThemeInputGroup, ThemeSelect } from "./ThemeInput";

interface MoveDataProps {
    pkmn: SelectedPokemonInterface;
    updateMove: (newMove: Move) => void;
    move: Move | undefined;
}
export default function MoveData({ updateMove, move, pkmn }: MoveDataProps) {
    const [moveCategory, setMoveCategory] = useState<"All" | "Special" | "Physical" | "Set">("All");

    function handleCategoryChange(attackCategory: "All" | "Special" | "Physical" | "Set") {
        setMoveCategory(attackCategory);
    }

    function handleUpdateMove(newAttack: Move) {
        updateMove(newAttack);
    }
    return (
        <ThemeContainer direction={"flex-col"}>
            <ThemeRow justify="justify-between">
                <span className="w-[100%] text-center text-xl">Attack</span>
            </ThemeRow>
            <div className="flex flex-col w-[100%]">
                <Suspense>
                    <MoveList pkmn={pkmn} handleUpdateMove={handleUpdateMove} moveCategory={moveCategory}></MoveList>
                </Suspense>
                <MoveCategoryFilter updateCategory={handleCategoryChange}></MoveCategoryFilter>
                <MoveInfo move={move}></MoveInfo>
            </div>
        </ThemeContainer>
    );
}


interface MoveListProps {
    pkmn: SelectedPokemonInterface;
    handleUpdateMove: (newMove: Move) => void;
    moveCategory: "All" | "Special" | "Physical" | "Set";
}
function MoveList({ pkmn, handleUpdateMove, moveCategory }: MoveListProps) {
    const [moves, setMoves] = useState<Move[]>([]);

    useEffect(() => {
        import("@pkmn/dex").then((module) => {
            const gen9Dex = module.Dex.forGen(9);
            if (pkmn.moves && moveCategory == "Set") {
                setMoves(pkmn.moves.map(learnsetEntry => gen9Dex.moves.get(learnsetEntry)))
            }
            else {
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
            }
        })
    }, [pkmn, moveCategory]);

    function handleAttackChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let index = parseInt(e.target.value);
        handleUpdateMove(moves[index]);
    }

    return (
        <ThemeRow>
            <ThemeInputGroup label={"Attack: "} id={"attack"} width="w-[100%]" size="text-lg">
                <ThemeSelect handleChange={handleAttackChange} id={"attack"}>
                    {moves && [<option value={-1}>Select Move</option>, ...moves.map((mv, idx) => <option value={idx}>{mv.name}</option>)]}
                </ThemeSelect>
            </ThemeInputGroup>
        </ThemeRow>
    );
}


interface MoveCategoryFilterProps {
    updateCategory: (MoveCategory: "All" | "Special" | "Physical" | "Set") => void;
}
function MoveCategoryFilter({ updateCategory }: MoveCategoryFilterProps) {

    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        updateCategory(e.target.value as "All" | "Special" | "Physical" | "Set");
    }

    return (
        <ThemeRow>
            <ThemeInputGroup label={"Category: "} id={"category"} width="w-[100%]" size="text-lg">
                <ThemeSelect handleChange={handleCategoryChange} id={"category"}>
                    {["All", "Special", "Physical", "Set"].map((cat) => <option value={cat}>{cat.slice(0, 4)}</option>)}
                </ThemeSelect>
            </ThemeInputGroup>
        </ThemeRow>
    );
}


interface MoveInfoProps {
    move: Move | undefined;
}
function MoveInfo({ move }: MoveInfoProps) {
    return (
        <div className="flex flex-col gap-0 pr-4 w-[100%]">
            <ThemeRow>
                <div className=""><span className="text-lg">Power:</span><span>{move?.basePower}</span></div>
                <div className=""><span className="text-lg">Type:</span><span>{move?.type}</span></div>
            </ThemeRow>
            <ThemeRow>
                <span className="text-lg">Effect: </span>
                <span className="self-end">{move?.shortDesc}</span>
            </ThemeRow>
        </div>
    );
}
