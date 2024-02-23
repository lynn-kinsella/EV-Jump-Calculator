/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContainerProps, ThemeContainer, ThemeRow } from "../../../components/ThemeContainer";
import React, { useState } from "react";
import { Field } from "@smogon/calc";
import { ThemeCheck, ThemeInputGroup, ThemeRadio } from "./ThemeInput";
import { Terrain, Weather } from "@smogon/calc/dist/data/interface";

interface FieldDataProps {
    field: Field;
    updateField: (newFeild: Field) => void;
}
export default function FieldData({ field, updateField }: FieldDataProps) {

    function updateWeather(e: React.ChangeEvent<HTMLInputElement>) {
        const newWeather: Weather | "" = e.target.value as Weather | "";
        field.weather = newWeather ? newWeather : undefined;
        updateField(field);
    }

    function updateTerrain(e: React.ChangeEvent<HTMLInputElement>) {
        const newTerrain: Terrain | "" = e.target.value as Terrain | "";
        field.terrain = newTerrain ? newTerrain : undefined;
        updateField(field);
    }

    function updateLightScreen(e: React.ChangeEvent<HTMLInputElement>) {
        field.defenderSide.isLightScreen = e.target.checked;
        updateField(field);
    }

    function updateReflect(e: React.ChangeEvent<HTMLInputElement>) {
        field.defenderSide.isReflect = e.target.checked;
        updateField(field);
    }

    function updateAuroraVeil(e: React.ChangeEvent<HTMLInputElement>) {
        field.defenderSide.isAuroraVeil = e.target.checked;
        updateField(field);
    }

    function updateFriendGuard(e: React.ChangeEvent<HTMLInputElement>) {
        field.defenderSide.isFriendGuard = e.target.checked;
        updateField(field);
    }

    function updateGravity(e: React.ChangeEvent<HTMLInputElement>) {
        field.isGravity = e.target.checked;
        updateField(field);
    }

    function updateSoR(e: React.ChangeEvent<HTMLInputElement>) {
        field.isSwordOfRuin = e.target.checked;
        updateField(field);
    }

    function updateBoR(e: React.ChangeEvent<HTMLInputElement>) {
        field.isBeadsOfRuin = e.target.checked;
        updateField(field);
    }

    function updateToR(e: React.ChangeEvent<HTMLInputElement>) {
        field.isTabletsOfRuin = e.target.checked;
        updateField(field);
    }

    function updateVoR(e: React.ChangeEvent<HTMLInputElement>) {
        field.isVesselOfRuin = e.target.checked;
        updateField(field);
    }

    function updateHelpingHand(e: React.ChangeEvent<HTMLInputElement>) {
        field.attackerSide.isHelpingHand = e.target.checked;
        updateField(field);
    }

    function updateBattery(e: React.ChangeEvent<HTMLInputElement>) {
        field.attackerSide.isBattery = e.target.checked;
        updateField(field);
    }

    function updatePowerSpot(e: React.ChangeEvent<HTMLInputElement>) {
        field.attackerSide.isPowerSpot = e.target.checked;
        updateField(field);
    }

    return (
        <ThemeContainer direction={"flex-col"}>
            <ThemeRow justify="justify-between">
                <span className="w-[100%] text-center text-xl">Field</span>
            </ThemeRow>

            <FieldOptionsRow category="Weather">
                <FieldOption type="radio" value="" name="weather" state={!field.weather} updateState={updateWeather} label={"Clear"}></FieldOption>
                <FieldOption type="radio" value="Rain" name="weather" state={field.weather == "Rain"} updateState={updateWeather} label={"Rain"}></FieldOption>
                <FieldOption type="radio" value="Sun" name="weather" state={field.weather == "Sun"} updateState={updateWeather} label={"Sun"}></FieldOption>
                <FieldOption type="radio" value="Snow" name="weather" state={field.weather == "Snow"} updateState={updateWeather} label={"Snow"}></FieldOption>
                <FieldOption type="radio" value="Sand" name="weather" state={field.weather == "Sand"} updateState={updateWeather} label={"Sand"}></FieldOption>
            </FieldOptionsRow>

            <FieldOptionsRow category="Terrain">
                <FieldOption type="radio" value="" name="terrain" state={!field.terrain} updateState={updateTerrain} label={"No Terrain"}></FieldOption>
                <FieldOption type="radio" value="Psychic" name="terrain" state={field.terrain == "Psychic"} updateState={updateTerrain} label={"Psychic"}></FieldOption>
                <FieldOption type="radio" value="Misty" name="terrain" state={field.terrain == "Misty"} updateState={updateTerrain} label={"Misty"}></FieldOption>
                <FieldOption type="radio" value="Electric" name="terrain" state={field.terrain == "Electric"} updateState={updateTerrain} label={"Electric"}></FieldOption>
                <FieldOption type="radio" value="Grassy" name="terrain" state={field.terrain == "Grassy"} updateState={updateTerrain} label={"Grassy"}></FieldOption>
            </FieldOptionsRow>

            <FieldOptionsRow category="Defender">
                <FieldOption state={field.defenderSide.isLightScreen} updateState={updateLightScreen} label={"Light Screen"}></FieldOption>
                <FieldOption state={field.defenderSide.isReflect} updateState={updateReflect} label={"Reflect"}></FieldOption>
                <FieldOption state={field.defenderSide.isAuroraVeil} updateState={updateAuroraVeil} label={"Aurora Veil"}></FieldOption>
                <FieldOption state={field.defenderSide.isFriendGuard} updateState={updateFriendGuard} label={"Friend Guard"}></FieldOption>
                <FieldOption state={field.isGravity} updateState={updateGravity} label={"Gravity"}></FieldOption>
                <FieldOption state={!!field.isSwordOfRuin} updateState={updateSoR} label={"Sword of Ruin"}></FieldOption>
                <FieldOption state={!!field.isBeadsOfRuin} updateState={updateBoR} label={"Beads of Ruin"}></FieldOption>
            </FieldOptionsRow>

            <FieldOptionsRow category="Attacker">
                <FieldOption state={field.attackerSide.isHelpingHand} updateState={updateHelpingHand} label={"Helping Hand"}></FieldOption>
                <FieldOption state={field.attackerSide.isPowerSpot} updateState={updatePowerSpot} label={"Power Spot"}></FieldOption>
                <FieldOption state={field.attackerSide.isBattery} updateState={updateBattery} label={"Battery"}></FieldOption>
                <FieldOption state={!!field.isTabletsOfRuin} updateState={updateToR} label={"Tablets of Ruin"}></FieldOption>
                <FieldOption state={!!field.isVesselOfRuin} updateState={updateVoR} label={"Vessel of Ruin"}></FieldOption>
            </FieldOptionsRow>
        </ThemeContainer>
    );
}

interface FieldOptionsRow extends ContainerProps {
    category: string;
}

function FieldOptionsRow({ children, category }: FieldOptionsRow) {
    const [collapse, setCollapse] = useState<boolean>(false);
    return (
        <div className="py-0.5">
            <div className="flex flex-col gap-0">
                <div className="flex flex-row gap-2 items-end">
                    <span className="text-lg">{category}</span>
                    <span className="underline text-blue-700 cursor-pointer hover:font-bold"
                        onClick={() => setCollapse((prev) => !prev)}>
                        ({collapse ? "hide" : "show"})
                    </span>
                </div>
                {collapse && <div className="flex flex-row flex-wrap gap-x-4 gap-y-0">
                    {children}
                </div>}
            </div>
        </div>
    )
}

interface FieldOption {
    label: string;
    updateState: (e: React.ChangeEvent<any>) => void
    state: boolean;
    type?: "check" | "radio"
    value?: string;
    name?: string;
}

function FieldOption({ label, updateState, state, type = "check", value, name }: FieldOption) {
    return (
        <ThemeInputGroup label={label} id={label.replace(" ", "").toLowerCase()}>
            {type == "radio" && (value !== undefined && name !== undefined) ?
                <ThemeRadio state={state} updateState={updateState} value={value} name={name} id={label.replace(" ", "").toLowerCase()}></ThemeRadio> :
                <ThemeCheck state={state} updateState={updateState} id={label.replace(" ", "").toLowerCase()}></ThemeCheck>
            }
        </ThemeInputGroup>
    )
}