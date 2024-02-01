
import { Species } from "@pkmn/dex";
import { Field } from "../../../util/FieldClass.ts";
import { SelectedPokemon } from "../../../util/SelectedPokemon.ts";
import AttackSelect from "./AttackSelect.tsx";
import { DumpStatsDebug } from "../debug/DumpStatsDebug.tsx";
import Collapse from "../elements/Collapse.tsx";
import EVSlider from "../../ui/EVSlider.tsx";
import PokeItemChoice from "./PokeItemChoice.tsx";
import PokePicker from "./PokePicker.tsx";
import { getPokedex } from "../../../hooks/apiData.ts";


interface PokeInputProps {
    setSelected: React.Dispatch<React.SetStateAction<SelectedPokemon>>;
    selectedPokemon: SelectedPokemon;
    attacker: boolean;
    setAttack: React.Dispatch<React.SetStateAction<string>>
    setField: React.Dispatch<React.SetStateAction<Field>>;
}

function PokeInput({ setSelected, selectedPokemon, attacker, setField, setAttack }: PokeInputProps) {
    return (
        <div className="flex flex-row gap-2 w-[100%]">
            <div className="flex flex-col gap-5 items-center w-[100%]">
                <PokePicker setSelectedPokemon={setSelected} selectedPokemon={selectedPokemon} pokedex={getPokedex()}></PokePicker>
                <Collapse label={"Items"} dir="col" gap={"sm"}>
                    <PokeItemChoice attacker={attacker} setField={setField}></PokeItemChoice>
                </Collapse>
                {/* <EVSlider updatePokemon={setSelected} type={attacker ? "atk" : "def"}></EVSlider> */}
                {/* {attacker && <AttackSelect setAttack={setAttack} attackList={selectedPokemon.moves}></AttackSelect>} */}
                {/* {!attacker && <EVSlider updatePokemon={setSelected} type="hp"></EVSlider>} */}
                {/* <DumpStatsDebug selectedPokemon={selectedPokemon}></DumpStatsDebug> */}
            </div>
        </div >
    );
}

export default PokeInput;