import { ThemeContainer, ThemeRow } from "../../../components/ThemeContainer";
import React, { Suspense, useEffect, useState } from "react";
import { SelectedPokemonInterface } from "../util/SelectedPokemon";
import { Move, Learnset } from "@pkmn/dex";
import { ThemeInputGroup, ThemeRadio, ThemeSelect } from "./ThemeInput";
import { Field } from "@smogon/calc";

interface MoveDataProps {
    pkmn: SelectedPokemonInterface;
    updateMove: (newMove: Move) => void;
    move: Move | undefined;
    field: Field;
    updateField: (newField: Field) => void;
}
export default function MoveData({ updateMove, move, pkmn, field, updateField }: MoveDataProps) {
    const [moveCategory, setMoveCategory] = useState<"All" | "Special" | "Physical" | "Set">("All");

    useEffect(() => {
        console.log(pkmn.moves)
        setMoveCategory(pkmn.moves ? "Set" : "All")
    }, [pkmn.moves])

    function handleCategoryChange(attackCategory: "All" | "Special" | "Physical" | "Set") {
        setMoveCategory(attackCategory);
    }

    function handleUpdateMove(newAttack: Move) {
        updateMove(newAttack);
    }

    function handleUpdateGameType(isDoubles: boolean) {
        field.gameType = isDoubles ? "Doubles" : "Singles";
        updateField(field);
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
                <MoveCategoryFilter updateCategory={handleCategoryChange} category={moveCategory}></MoveCategoryFilter>
                <MoveTargetSelector field={field} handleUpdateGameType={handleUpdateGameType}></MoveTargetSelector>
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
    const [index, setIndex] = useState<number>(-1);

    useEffect(() => { setIndex(-1) }, [moveCategory]);

    useEffect(() => {
        import("@pkmn/dex").then((module) => {
            const gen9Dex = module.Dex.forGen(9);
            if (pkmn.moves && moveCategory == "Set") {
                const newMoves = pkmn.moves.map(learnsetEntry => gen9Dex.moves.get(learnsetEntry));
                setMoves(newMoves);
                handleUpdateMove(newMoves[0]);
            }
            else {
                gen9Dex.learnsets.get(pkmn.speciesData.name)
                    .then((ls: Learnset) => {
                        if (ls.learnset) {
                            let moves = [...Object.keys(ls.learnset)];
                            const newMoves = moves.map(learnsetEntry => gen9Dex.moves.get(learnsetEntry))
                                .filter((move) => moveCategory == "All" || move.category == moveCategory);
                            setMoves(newMoves);
                            handleUpdateMove(newMoves[index]);
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
        setIndex(index);
        handleUpdateMove(moves[index]);
    }

    return (
        <ThemeRow>
            <ThemeInputGroup label={"Attack: "} id={"attack"} width="w-[100%]" size="text-lg">
                <ThemeSelect handleChange={handleAttackChange} id={"attack"} value={index}>
                    {moves && [<option value={-1}>Select Move</option>, ...moves.map((mv, idx) => <option value={idx}>{mv.name}</option>)]}
                </ThemeSelect>
            </ThemeInputGroup>
        </ThemeRow>
    );
}

interface MoveTargetSelectorProps {
    field: Field;
    handleUpdateGameType: (isDoubles: boolean) => void
}

function MoveTargetSelector({ field, handleUpdateGameType }: MoveTargetSelectorProps) {
    return (
        <ThemeRow>
            <div className="flex flex-col">
                <span className="text-lg">Target(s)</span>
                <ThemeInputGroup label={"Single Target"} id={"singletarget"} width="w-[100%]" size="text-base">
                    <ThemeRadio state={field.gameType != "Doubles"} updateState={(e) => { handleUpdateGameType(!e.target.checked) }} value={"MultiTarget"} name={"targets"} id={"singletarget"}></ThemeRadio>
                </ThemeInputGroup>
                <ThemeInputGroup label={"Multi Target"} id={"multitarget"} width="w-[100%]" size="text-base">
                    <ThemeRadio state={field.gameType == "Doubles"} updateState={(e) => { handleUpdateGameType(e.target.checked) }} value={"SingleTarget"} name={"targets"} id={"multitarget"}></ThemeRadio>
                </ThemeInputGroup>
            </div>
        </ThemeRow>
    )
}

interface MoveCategoryFilterProps {
    updateCategory: (MoveCategory: "All" | "Special" | "Physical" | "Set") => void;
    category: "All" | "Special" | "Physical" | "Set";
}
function MoveCategoryFilter({ updateCategory, category }: MoveCategoryFilterProps) {

    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        updateCategory(e.target.value as "All" | "Special" | "Physical" | "Set");
    }

    return (
        <ThemeRow>
            <ThemeInputGroup label={"Category: "} id={"category"} width="w-[100%]" size="text-lg">
                <ThemeSelect handleChange={handleCategoryChange} id={"category"} value={category}>
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
                <div className=""><span className="text-lg">Power: </span><span>{move?.basePower}</span></div>
                <div className=""><span className="text-lg">Type: </span><span>{move?.type}</span></div>
            </ThemeRow>
            <ThemeRow>
                <span className="text-lg">Effect: </span>
                <span className="self-end">{move?.shortDesc}</span>
            </ThemeRow>
        </div>
    );
}
