import Header from "../pure_ui/Header";
import Footer from "../pure_ui/Footer";
import { ColumnContainer } from "../pure_ui/ThemeContainer";
import { PokemonData } from "../pure_ui/PokemonData";
import { useState } from "react";
import { SelectedPokemon } from "../../util/SelectedPokemon";
import { Field } from "@smogon/calc";
import { FieldData } from "../pure_ui/FieldData";
import { Move } from "@pkmn/dex";
import { MoveData } from "../pure_ui/MoveData";
import { GraphFeature } from "../pure_ui/GraphContainer";


function Page() {
    const [attacker, setAttacker] = useState<SelectedPokemon>(new SelectedPokemon());
    const [defender, setDefender] = useState<SelectedPokemon>(new SelectedPokemon());
    const [field, setField] = useState<Field>(new Field());
    const [move, setMove] = useState<Move>();

    function updateAttacker(newPokemon: SelectedPokemon) {
        setAttacker(newPokemon.clone());
    }

    function updateDefender(newPokemon: SelectedPokemon) {
        setDefender(newPokemon.clone());
    }

    function updateField(newField: Field) {
        setField(newField.clone());
    }

    function updateMove(newMove: Move) {
        setMove(newMove);
    }

    return (
        // <Layout></Layout>
        <ColumnContainer>
            <Header></Header>
            {/* Pokemon */}
            <PokemonData attacker={attacker} defender={defender} updateAttacker={updateAttacker} updateDefender={updateDefender}></PokemonData>

            {/* Attack, Graph Options */}
            <div className="flex flex-row gap-2 max-w-[50rem] w-[100%]">
                <FieldData field={field} updateField={updateField}></FieldData>
                <MoveData updateMove={updateMove} pkmn={attacker} move={move}></MoveData>
            </div>

            <GraphFeature attacker={attacker} defender={defender} move={move} field={field}></GraphFeature>
            <Footer></Footer>
        </ColumnContainer>
    );
}

export default Page;