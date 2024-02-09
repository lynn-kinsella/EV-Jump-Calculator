import React from "react";
import { ContainerProps, ThemeRow } from "./ThemeContainer";
import { PokemonProps } from "./IntrinsicPokemon";
import { NatureName, StatID } from "@pkmn/dex";
import { ThemeInputGroup, ThemeSelect, ThemeText } from "./ThemeInput";
import { validateEVs, validateIVs } from "../util/PokeCalcs";
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
                <ThemeStatEntry type={"fixed"} label={""} value={"Name"} handleUpdate={() => null}></ThemeStatEntry>
                <ThemeStatEntry type={"fixed"} label={""} value={"EVs"} handleUpdate={() => null}></ThemeStatEntry>
                <ThemeStatEntry type={"fixed"} label={""} value={"IVs"} handleUpdate={() => null}></ThemeStatEntry>
                <ThemeStatEntry type={"fixed"} label={""} value={"Boosts"} handleUpdate={() => null}></ThemeStatEntry>
                <ThemeStatEntry type={"fixed"} label={""} value={"Stat"} handleUpdate={() => null}></ThemeStatEntry>
                <ThemeStatEntry type={"fixed"} label={""} value={"w/Item"} handleUpdate={() => null}></ThemeStatEntry>
            </ThemeStatRow>
        );
    }

    return (
        <ThemeStatRow colour={getNatureColour(pkmn.calcData.nature)}>
            <ThemeStatEntry type={"fixed"} label={statName} value={statName} handleUpdate={() => null}></ThemeStatEntry>
            <ThemeStatEntry type={"text"} label={statName + "EVs"} value={pkmn.calcData.evs[statName]} handleUpdate={handleEVChange}></ThemeStatEntry>
            <ThemeStatEntry type={"text"} label={statName + "IVs"} value={pkmn.calcData.ivs[statName]} handleUpdate={handleIVChange}></ThemeStatEntry>
            <ThemeStatEntry type={"select"} label={statName + "Boost"} value={pkmn.calcData.boosts[statName]} handleUpdate={handleBoostChange} selectOptions={boostOptions}></ThemeStatEntry>
            <ThemeStatEntry type={"fixed"} label={statName + "Stat"} value={pkmn.calcData.stats[statName]} handleUpdate={() => null}></ThemeStatEntry>
            <ThemeStatEntry type={"fixed"} label={statName + "Boosted"} value={pkmn.getItemBoosts(statName)} handleUpdate={() => null}></ThemeStatEntry>

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

interface ThemeStatEntryProps {
    type: "fixed" | "text" | "select"
    label: string;
    value: string | number;
    handleUpdate: (e: any) => void;
    selectOptions?: JSX.Element[];
}

function ThemeStatEntry({ type, label, handleUpdate, value, selectOptions }: ThemeStatEntryProps) {
    return (
        <div className="w-[100%] h-6 text-center">
            <ThemeInputGroup label={label} id={label} hideLabel={true}>
                {type == "fixed" ? <span className="text-center w-[100%]">{value}</span>
                    :
                    type == "text" ? <ThemeText align="center"
                        inputMode="numeric"
                        width="w-10"
                        defaultValue={value}
                        handleChange={handleUpdate} id={label}>
                    </ThemeText>
                        :
                        <ThemeSelect width="w-fit"
                            value={value}
                            handleChange={handleUpdate} id={label}>
                            {selectOptions}
                        </ThemeSelect>}
            </ThemeInputGroup>
        </div>
    );
}