import { ContainerProps, ThemeContainer, ThemeRow } from "./ThemeContainer";
import React, { useState } from "react";
import { Field } from "@smogon/calc";
import { ThemeCheck, ThemeInputGroup, ThemeRadio } from "./ThemeInput";
import { Terrain, Weather } from "@smogon/calc/dist/data/interface";

interface FieldDataProps {
    field: Field;
    updateField: (newFeild: Field) => void;
}
export function FieldData({ field, updateField }: FieldDataProps) {

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
            <ThemeRow gapType="between">
                <span className="w-[100%] text-center text-xl">Field</span>
            </ThemeRow>

            <FieldOptionsRow category="Weather">
                <ThemeInputGroup>
                    <span>Clear</span>
                    <ThemeRadio value="" name="weather" state={!!!field.weather} updateState={updateWeather}></ThemeRadio>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Rain</span>
                    <ThemeRadio value="Rain" name="weather" state={field.weather == "Rain"} updateState={updateWeather}></ThemeRadio>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Sun</span>
                    <ThemeRadio value="Sun" name="weather" state={field.weather == "Sun"} updateState={updateWeather}></ThemeRadio>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Snow</span>
                    <ThemeRadio value="Snow" name="weather" state={field.weather == "Snow"} updateState={updateWeather}></ThemeRadio>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Sand</span>
                    <ThemeRadio value="Sand" name="weather" state={field.weather == "Sand"} updateState={updateWeather}></ThemeRadio>
                </ThemeInputGroup>
            </FieldOptionsRow>

            <FieldOptionsRow category="Terrain">
                <ThemeInputGroup>
                    <span>Clear</span>
                    <ThemeRadio value="" name="terrain" state={!!!field.terrain} updateState={updateTerrain}></ThemeRadio>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Rain</span>
                    <ThemeRadio value="Psychic" name="terrain" state={field.terrain == "Psychic"} updateState={updateTerrain}></ThemeRadio>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Sun</span>
                    <ThemeRadio value="Misty" name="terrain" state={field.terrain == "Misty"} updateState={updateTerrain}></ThemeRadio>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Snow</span>
                    <ThemeRadio value="Electric" name="terrain" state={field.terrain == "Electric"} updateState={updateTerrain}></ThemeRadio>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Sand</span>
                    <ThemeRadio value="Grassy" name="terrain" state={field.terrain == "Grassy"} updateState={updateTerrain}></ThemeRadio>
                </ThemeInputGroup>
            </FieldOptionsRow>

            <FieldOptionsRow category="Defender">
                <ThemeInputGroup>
                    <span>Light Screen</span>
                    <ThemeCheck state={field.defenderSide.isLightScreen} updateState={updateLightScreen}></ThemeCheck>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Reflect</span>
                    <ThemeCheck state={field.defenderSide.isReflect} updateState={updateReflect}></ThemeCheck>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Aurora Veil</span>
                    <ThemeCheck state={field.defenderSide.isAuroraVeil} updateState={updateAuroraVeil}></ThemeCheck>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Friend Guard</span>
                    <ThemeCheck state={field.defenderSide.isFriendGuard} updateState={updateFriendGuard}></ThemeCheck>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Gravity</span>
                    <ThemeCheck state={field.isGravity} updateState={updateGravity}></ThemeCheck>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Sword of Ruin</span>
                    <ThemeCheck state={!!field.isSwordOfRuin} updateState={updateSoR}></ThemeCheck>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Beads of Ruin</span>
                    <ThemeCheck state={!!field.isBeadsOfRuin} updateState={updateBoR}></ThemeCheck>
                </ThemeInputGroup>
            </FieldOptionsRow>

            <FieldOptionsRow category="Attacker">
                <ThemeInputGroup>
                    <span>Helping Hand</span>
                    <ThemeCheck state={field.attackerSide.isHelpingHand} updateState={updateHelpingHand}></ThemeCheck>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Power Spot</span>
                    <ThemeCheck state={field.attackerSide.isPowerSpot} updateState={updatePowerSpot}></ThemeCheck>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Battery</span>
                    <ThemeCheck state={field.attackerSide.isBattery} updateState={updateBattery}></ThemeCheck>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Tablets of Ruin</span>
                    <ThemeCheck state={!!field.isTabletsOfRuin} updateState={updateToR}></ThemeCheck>
                </ThemeInputGroup>

                <ThemeInputGroup>
                    <span>Vessel of Ruin</span>
                    <ThemeCheck state={!!field.isVesselOfRuin} updateState={updateVoR}></ThemeCheck>
                </ThemeInputGroup>
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
                <div className="flex flex-row gap-2">
                    <span className="text-lg">{category}</span>
                    <span className="underline text-blue-700"
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
