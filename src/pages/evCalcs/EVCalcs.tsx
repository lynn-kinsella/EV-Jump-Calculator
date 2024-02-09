import { useState, lazy, Suspense, useEffect } from "react";
import { Field, Pokemon } from "@smogon/calc";
import { Move } from "@pkmn/dex";
import SelectedPokemon, { SelectedPokemonInterface } from "./util/SelectedPokemon";
import { ColumnContainer, ThemeContainer } from "./ui/ThemeContainer";

const PokemonData = lazy(() => import("./ui/PokemonData"));
const FieldData = lazy(() => import("./ui/FieldData"));
const MoveData = lazy(() => import("./ui/MoveData"));
const GraphFeature = lazy(() => import("./ui/GraphContainer"));


function EVCalcs() {
    const [attacker, setAttacker] = useState<SelectedPokemonInterface>(new SelectedPokemon("bulbasaur"));
    const [defender, setDefender] = useState<SelectedPokemonInterface>(new SelectedPokemon("charmander"));
    const [field, setField] = useState<Field>(new Field());
    const [move, setMove] = useState<Move>();

    // useEffect(() => {
    //     import("./util/SelectedPokemon").then((module) => {
    //         setAttacker(new module.default("bulbasaur"));
    //         setAttacker(new module.default("charmander"));
    //     })
    // })

    function updateAttacker(newPokemon: SelectedPokemonInterface) {
        setAttacker(newPokemon.clone());
    }

    function updateDefender(newPokemon: SelectedPokemonInterface) {
        setDefender(newPokemon.clone());
    }

    function updateField(newField: Field) {
        setField(newField.clone());
    }

    function updateMove(newMove: Move) {
        setMove(newMove);
    }


    return (
        <ColumnContainer>
            <div className="flex md:flex-row flex-col gap-2 w-[100%]">
                <div className="flex flex-col gap-2 w-[100%] max-w-[30rem]">
                    {/* Pokemon */}
                    <Suspense fallback={<ThemeContainer direction={""}><div className="w-[100%] h-[40rem]"></div></ThemeContainer>}>
                        {(attacker != undefined && defender != undefined) && <PokemonData attacker={attacker} defender={defender} updateAttacker={updateAttacker} updateDefender={updateDefender}></PokemonData>}
                    </Suspense>
                    {/* Attack, Field Options */}
                    <div className="flex flex-row gap-2 w-[100%]">
                        <Suspense fallback={<ThemeContainer direction={""}><div className="w-[100%] h-[20rem]"></div></ThemeContainer>}>
                            {(attacker != undefined && defender != undefined) && <MoveData updateMove={updateMove} pkmn={attacker} move={move}></MoveData>}
                        </Suspense>
                        <Suspense fallback={<ThemeContainer direction={""}><div className="w-[100%] h-[20rem]"></div></ThemeContainer>}>
                            <FieldData field={field} updateField={updateField}></FieldData>
                        </Suspense>
                    </div>
                </div>
                {/* Graph, Graph Options */}
                <Suspense fallback={<ThemeContainer direction={""}><div className="w-[100%] h-[50rem"></div></ThemeContainer>}>
                    {(attacker != undefined && defender != undefined) && <GraphFeature attacker={attacker} defender={defender} move={move} field={field}></GraphFeature>}
                </Suspense>
            </div>
        </ColumnContainer>
    );
}

export default EVCalcs;