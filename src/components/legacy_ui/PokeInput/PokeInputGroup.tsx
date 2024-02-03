import { useEffect, useState } from "react";
import { Species } from "@pkmn/dex";
import { SelectedPokemon } from "../../../util/SelectedPokemon_old";
import PokeInput from "./PokeInput";
import { getPokedex } from "../../../hooks/apiData";
import { Field } from "../../../util/FieldClass";


interface PokeInputGroupProps {
    setAttacker: React.Dispatch<React.SetStateAction<SelectedPokemon>>
    attacker: SelectedPokemon
    setDefender: React.Dispatch<React.SetStateAction<SelectedPokemon>>
    defender: SelectedPokemon
    setField: React.Dispatch<React.SetStateAction<Field>>;
    setAttack: React.Dispatch<React.SetStateAction<string>>;
}

function PokeInputGroup({ setAttacker, attacker, setDefender, defender, setField, setAttack }: PokeInputGroupProps) {

    return (
        <div className="flex flex-row w-[100%] px-[15%] content-center h-min-content">
            <div className="flex flex-col gap-1 w-[100%] p-5 justify-start items-center ">
                Attacker
                <PokeInput setSelected={setAttacker} selectedPokemon={attacker} attacker={true} setField={setField} setAttack={setAttack}></PokeInput>
            </div>

            <div className="flex flex-col gap-1 w-[100%] p-5 justify-start items-center ">
                Defender
                <PokeInput setSelected={setDefender} selectedPokemon={defender} attacker={false} setField={setField} setAttack={setAttack}></PokeInput>
            </div >
        </div >
    );
}

export default PokeInputGroup;