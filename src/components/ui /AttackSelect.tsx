import { SelectedPokemon } from "../../util/SelectedPokemon_old";
import { Dex, Learnset, Move } from "@pkmn/dex";
import React, { useEffect, useState } from "react";

interface AttackSelectInterface {
    pkmn: SelectedPokemon;
    attack: Move;
    setAttack: React.Dispatch<React.SetStateAction<Move>>;
}
export function AttackSelect({ pkmn, setAttack, attack }: AttackSelectInterface) {
    const [attackCategory, setAttackCategory] = useState<"All" | "Special" | "Physical">("All");

    function handleCategoryChange(attackCategory: "All" | "Special" | "Physical") {
        setAttackCategory(attackCategory);
    }

    function handleUpdateAttack(newAttack: Move) {
        setAttack(newAttack);
    }

    return (
        <div className="flex flex-row gap-8 w-[100%]">
            <div className="w-48 flex flex-col gap-1">
                <AttackCategoryFilter setAttackCategory={handleCategoryChange}></AttackCategoryFilter>
                <AttackList pkmn={pkmn} handleUpdateAttack={handleUpdateAttack} attackCategory={attackCategory}></AttackList>
            </div>
            <AttackInfo attack={attack}></AttackInfo>
        </div>
    );
}
interface AttackCategoryFilterProps {
    setAttackCategory: (attackCategory: "All" | "Special" | "Physical") => void;
}
function AttackCategoryFilter({ setAttackCategory }: AttackCategoryFilterProps) {
    return (
        <div className="h-6 w-48 flex-row flex justify-between">
            <label>Attack Category: </label>
            <select className="w-16 px-1 border-gray-400 border-solid border"
                onChange={(e) => setAttackCategory(e.target.value as "All" | "Special" | "Physical")}>
                {["All", "Special", "Physical"].map((cat) => <option value={cat}>{cat.slice(0, 4)}</option>)}
            </select>
        </div>
    );
}
interface AttackListProps {
    pkmn: SelectedPokemon;
    handleUpdateAttack: (newAttack: Move) => void;
    attackCategory: "All" | "Special" | "Physical";
}
function AttackList({ pkmn, handleUpdateAttack, attackCategory }: AttackListProps) {
    const gen9Dex = Dex.forGen(9);
    const [moves, setMoves] = useState<Move[]>([]);

    useEffect(() => {
        gen9Dex.learnsets.get(pkmn.speciesData.name)
            .then((ls: Learnset) => {
                if (ls.learnset) {
                    let moves = [...Object.keys(ls.learnset)];
                    setMoves(moves.map(learnsetEntry => gen9Dex.moves.get(learnsetEntry))
                        .filter((move) => attackCategory == "All" || move.category == attackCategory));
                }
                else {
                    setMoves([]);
                }
            });
    }, [pkmn, attackCategory]);

    function handleAttackChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let index = parseInt(e.target.value);
        handleUpdateAttack(moves[index]);
    }

    return (
        <div className="h-6 w-48 flex flex-row justify-between gap-4">
            <label>Attack: </label>
            <select className="w-[100%] px-1 border-gray-400 border-solid border" onChange={handleAttackChange}>
                {moves && moves.map((mv, idx) => <option value={idx}>{mv.name}</option>)}
            </select>
        </div>
    );
}
interface AttackInfoProps {
    attack: Move;
}
function AttackInfo({ attack }: AttackInfoProps) {
    return (
        <div className="flex flex-row gap-4 pr-4 w-[100%]">
            <div className="flex flex-col gap-1 min-w-fit">
                <div className="w-fit"><span>Base Power: {attack.basePower}</span></div>
                <div className="w-fit"><span>Type: {attack.type}</span></div>
            </div>
            <div className="flex flex-col flex-grow basis-0">
                <div className="flex flex-row gap-2">
                    <span>Effect: </span>
                    <span>{attack.shortDesc}</span>
                </div>
            </div>
        </div>
    );
}
