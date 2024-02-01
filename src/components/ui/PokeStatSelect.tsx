import { NatureName, StatID } from "@pkmn/dex";
import { SelectedPokemon, getItemBoosts, updateSelectedBoosts, updateSelectedEVs, updateSelectedIVs } from "../../util/SelectedPokemon";
import React, { useEffect } from "react";
import { validateEVs, validateIVs } from "../../util/PokeCalcs";
import { NATURES } from "@smogon/calc/dist/data/natures";

interface PokeStatSelectProps {
    pkmn: SelectedPokemon;
    setPkmn: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
}
export function PokeStatSelect({ pkmn, setPkmn }: PokeStatSelectProps) {

    function handleUpdateEVs(statName: StatID, evs: number) {
        setPkmn((prevPkmn: SelectedPokemon) => {
            return updateSelectedEVs(prevPkmn, statName, evs);
        });
    }

    function handleUpdateIVs(statName: StatID, evs: number) {
        setPkmn((prevPkmn: SelectedPokemon) => {
            return updateSelectedIVs(prevPkmn, statName, evs);
        });
    }

    function handleUpdateBoosts(statName: StatID, boostLevel: number) {
        setPkmn((prevPkmn: SelectedPokemon) => updateSelectedBoosts(prevPkmn, statName, boostLevel));
    }

    return (
        <div className="flex flex-col gap-1 w-[31rem]">
            <div className="flex flex-row gap-4 px-4 h-6 justify-center border-gray-400 border-solid border-b">
                <div className="w-16 min-w-16 overflow-clip text-center"><span className="text-center">Name</span></div>
                <div className="w-16 min-w-16 overflow-clip text-center"><span className="text-center">EVs</span></div>
                <div className="w-16 min-w-16 overflow-clip text-center"><span className="text-center">IVs</span></div>
                <div className="w-16 min-w-16 overflow-clip text-center"><span className="text-center">Boost</span></div>
                <div className="w-16 min-w-16 overflow-clip text-center"><span className="text-center">Stat</span></div>
                <div className="w-16 min-w-16 overflow-clip text-center"><span className="text-center">w/Item</span></div>
            </div>
            {/* HP */}
            <EditStat statName="hp" updatePkmnEVs={handleUpdateEVs} updatePkmnIVs={handleUpdateIVs} updatePkmnBoosts={handleUpdateBoosts} pkmn={pkmn}></EditStat>
            {/* Attack */}
            <EditStat statName="atk" updatePkmnEVs={handleUpdateEVs} updatePkmnIVs={handleUpdateIVs} updatePkmnBoosts={handleUpdateBoosts} pkmn={pkmn}></EditStat>
            {/* Defense */}
            <EditStat statName="def" updatePkmnEVs={handleUpdateEVs} updatePkmnIVs={handleUpdateIVs} updatePkmnBoosts={handleUpdateBoosts} pkmn={pkmn}></EditStat>
            {/* Special Attack */}
            <EditStat statName="spa" updatePkmnEVs={handleUpdateEVs} updatePkmnIVs={handleUpdateIVs} updatePkmnBoosts={handleUpdateBoosts} pkmn={pkmn}></EditStat>
            {/* Special Defense */}
            <EditStat statName="spd" updatePkmnEVs={handleUpdateEVs} updatePkmnIVs={handleUpdateIVs} updatePkmnBoosts={handleUpdateBoosts} pkmn={pkmn}></EditStat>
            {/* Speed */}
            <EditStat statName="spe" updatePkmnEVs={handleUpdateEVs} updatePkmnIVs={handleUpdateIVs} updatePkmnBoosts={handleUpdateBoosts} pkmn={pkmn}></EditStat>
        </div>
    );
}
interface EditStatProps {
    statName: StatID;
    updatePkmnEVs: (statName: StatID, evs: number) => void;
    updatePkmnIVs: (statName: StatID, evs: number) => void;
    updatePkmnBoosts: (statName: StatID, evs: number) => void;
    pkmn: SelectedPokemon;
}
function EditStat({ statName, updatePkmnEVs, updatePkmnIVs, updatePkmnBoosts, pkmn }: EditStatProps) {
    function getNatureColour(nature: NatureName): string {
        const natureEffects = NATURES[nature];
        var colour = "";
        if (natureEffects[0] != natureEffects[1]) {
            if (natureEffects[1] === statName) {
                colour = "bg-blue-100";
            }
            if (natureEffects[0] === statName) {
                colour = "bg-red-100";
            }
        }
        return colour;
    }

    function updateEVs(e: React.ChangeEvent<HTMLInputElement>) {
        var newStat = parseInt(e.target.value);
        newStat = Number.isNaN(newStat) ? 0 : newStat;
        newStat = validateEVs(pkmn, statName, newStat);
        updatePkmnEVs(statName, newStat);
        e.target.value = String(newStat);
    }

    function updateIVs(e: React.ChangeEvent<HTMLInputElement>) {
        var newStat = parseInt(e.target.value);

        newStat = validateIVs(newStat);
        updatePkmnIVs(statName, newStat);
        e.target.value = String(newStat);
    }

    function updateBoosts(e: React.ChangeEvent<HTMLSelectElement>) {
        var boostLevel = parseInt(e.target.value);
        updatePkmnBoosts(statName, boostLevel);
        e.target.value = String(boostLevel);
    }

    const boostOptions = [...Array(13).keys()].map((num) => { return <option value={num - 6}>{(num > 5 ? "+" : "") + String(num - 6)}</option>; });

    return (
        <div className={`flex flex-row gap-4 justify-center ${getNatureColour(pkmn.calcData.nature)}`}>
            <span className="min-w-16 text-center">{statName}</span>
            <div className="min-w-16 w-16 text-center">
                <input type="text"
                    className="w-10 px-0.5 text-right border-gray-400 border-solid border"
                    onBlur={updateEVs}
                    inputMode="numeric"
                    defaultValue={pkmn.calcData.evs[statName]}>
                </input>
            </div>
            <div className="min-w-16 w-16 text-center">
                <input type="text" className="w-10 px-0.5 text-right border-gray-400 border-solid border" onBlur={updateIVs} inputMode="numeric" defaultValue={pkmn.calcData.ivs[statName]}></input>
            </div>

            <div className="min-w-16 w-16 text-center">
                {statName != "hp" && <select className="w-12 text-center h-[100%] border-gray-400 border-solid border" defaultValue={0} onChange={updateBoosts}>
                    {boostOptions}
                </select>}
            </div>
            <span className="min-w-16 w-16 text-center">{pkmn.calcData.stats[statName]}</span>
            <span className="min-w-16 w-16 text-center">{getItemBoosts(pkmn, statName)}</span>
        </div>
    );
}

export default PokeStatSelect;