import React from "react";
import { ContainerProps, ThemeRow } from "./ThemeContainer";
import { PokemonProps } from "./IntrinsicPokemon";
import { NatureName, StatID } from "@pkmn/dex";
import { ThemeSelect, ThemeText } from "./ThemeInput";
import { validateEVs, validateIVs } from "../../util/PokeCalcs";
import { NATURES } from "@smogon/calc";

interface StatTableProps extends PokemonProps {
}
export function StatTable({ pkmn, updatePkmn }: StatTableProps) {
    return (
        <ThemeRow>
            <div className="w-[100%] bg-white flex flex-col gap-1 p-2">
                <StatRow pkmn={pkmn} updatePkmn={updatePkmn}></StatRow>
                <StatRow statName={"hp"} pkmn={pkmn} updatePkmn={updatePkmn}></StatRow>
                <StatRow statName={"atk"} pkmn={pkmn} updatePkmn={updatePkmn}></StatRow>
                <StatRow statName={"def"} pkmn={pkmn} updatePkmn={updatePkmn}></StatRow>
                <StatRow statName={"spa"} pkmn={pkmn} updatePkmn={updatePkmn}></StatRow>
                <StatRow statName={"spd"} pkmn={pkmn} updatePkmn={updatePkmn}></StatRow>
                <StatRow statName={"spe"} pkmn={pkmn} updatePkmn={updatePkmn}></StatRow>
            </div>
        </ThemeRow>
    );
}
interface StatRowProps extends StatTableProps {
    statName?: StatID;
}
function StatRow({ pkmn, updatePkmn, statName }: StatRowProps) {

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

    function handleEVChange(e: React.ChangeEvent<HTMLInputElement>) {
        var newStat = parseInt(e.target.value);

        newStat = Number.isNaN(newStat) ? 0 : newStat;
        newStat = validateEVs(pkmn, statName as StatID, newStat);

        pkmn.updateEVs(statName as StatID, newStat);
        updatePkmn(pkmn);
        e.target.value = String(newStat);
    }

    function handleIVChange(e: React.ChangeEvent<HTMLInputElement>) {
        var newStat = parseInt(e.target.value);

        newStat = validateIVs(newStat);

        pkmn.updateIVs(statName as StatID, newStat);
        updatePkmn(pkmn);
        e.target.value = String(newStat);
    }

    function handleBoostChange(e: React.ChangeEvent<HTMLSelectElement>) {
        var boostLevel = parseInt(e.target.value);

        pkmn.updateBoosts(statName as StatID, boostLevel);
        updatePkmn(pkmn);
        e.target.value = String(boostLevel);
    }

    const boostOptions = [...Array(13).keys()].map(
        (num) => <option value={num - 6}>
            {(num > 5 ? "+" : "") + String(num - 6)}
        </option>
    );

    if (!statName) {
        return (
            <ThemeStatRow colour="border-gray-400 border-solid border-b">
                <ThemeStatEntry><span className="text-center">Name</span></ThemeStatEntry>
                <ThemeStatEntry><span className="text-center">EVs</span></ThemeStatEntry>
                <ThemeStatEntry><span className="text-center">IVs</span></ThemeStatEntry>
                <ThemeStatEntry><span className="text-center">Boosts</span></ThemeStatEntry>
                <ThemeStatEntry><span className="text-center">Stat</span></ThemeStatEntry>
                <ThemeStatEntry><span className="text-center">w/Item</span></ThemeStatEntry>
            </ThemeStatRow>
        );
    }

    return (
        <ThemeStatRow colour={getNatureColour(pkmn.calcData.nature)}>
            <ThemeStatEntry><span className="text-center">{statName}</span></ThemeStatEntry>
            <ThemeStatEntry>
                <ThemeText
                    align="center"
                    inputMode="numeric"
                    width="w-10"
                    defaultValue={pkmn.calcData.evs[statName]}
                    handleChange={handleEVChange}>
                </ThemeText>
            </ThemeStatEntry>
            <ThemeStatEntry>
                <ThemeText align="center"
                    inputMode="numeric"
                    width="w-10"
                    defaultValue={pkmn.calcData.ivs[statName]}
                    handleChange={handleIVChange}>
                </ThemeText>
            </ThemeStatEntry>
            <ThemeStatEntry>
                {statName != "hp" &&
                    <ThemeSelect width="w-fit"
                        value={pkmn.calcData.boosts[statName]}
                        handleChange={handleBoostChange}>
                        {boostOptions}
                    </ThemeSelect>}
            </ThemeStatEntry>
            <ThemeStatEntry><span className="text-center">{pkmn.calcData.stats[statName]}</span></ThemeStatEntry>
            <ThemeStatEntry><span className="text-center">{pkmn.getItemBoosts(statName)}</span></ThemeStatEntry>

        </ThemeStatRow>
    );
}
interface ThemeStatRow extends ContainerProps {
    colour?: string;
}
function ThemeStatRow({ children, colour }: ThemeStatRow) {
    const twStyle = `flex flex-row w-[100%] justify-between ${colour}`;
    return (
        <div className={twStyle}>
            {children}
        </div>
    );
}
function ThemeStatEntry({ children }: ContainerProps) {
    return (
        <div className="w-[100%] h-6 text-center">
            {children}
        </div>
    );
}
