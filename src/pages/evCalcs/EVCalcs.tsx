import { useState, lazy, Suspense, useEffect } from "react";
import { Field } from "@smogon/calc";
import { Move } from "@pkmn/dex";
import { SelectedPokemonInterface } from "./util/SelectedPokemon";
import { ColumnContainer, ThemeContainer } from "../../components/ThemeContainer";

const PokemonData = lazy(() => import("./ui/PokemonData"));
const FieldData = lazy(() => import("./ui/FieldData"));
const MoveData = lazy(() => import("./ui/MoveData"));
const GraphFeature = lazy(() => import("./ui/GraphContainer"));

const placeholder = <ThemeContainer direction={""}><div className="w-[100%] h-[40rem]"></div></ThemeContainer>;

function EVCalcs() {
    const [attacker, setAttacker] = useState<SelectedPokemonInterface>();
    const [defender, setDefender] = useState<SelectedPokemonInterface>();
    const [field, setField] = useState<Field>(new Field({ gameType: "Doubles" }));
    const [move, setMove] = useState<Move>();

    useEffect(() => {
        import("./util/SelectedPokemon").then((module) => {
            setAttacker(new module.default("bulbasaur"));
            setDefender(new module.default("charmander"));
        })
    }, [])

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
                    <Suspense fallback={placeholder}>
                        {((attacker != undefined) && (defender != undefined)) ? <PokemonData attacker={attacker} defender={defender} updateAttacker={updateAttacker} updateDefender={updateDefender}></PokemonData> : placeholder}
                    </Suspense>
                    {/* Attack, Field Options */}
                    <div className="flex flex-row gap-2 w-[100%]">
                        <Suspense fallback={placeholder}>
                            {((attacker != undefined) && (defender != undefined)) ? <MoveData updateMove={updateMove} pkmn={attacker} move={move} field={field} updateField={updateField}></MoveData> : placeholder}
                        </Suspense>
                        <Suspense fallback={placeholder}>
                            <FieldData field={field} updateField={updateField}></FieldData>
                        </Suspense>
                    </div>
                </div>
                {/* Graph, Graph Options */}
                <Suspense fallback={placeholder}>
                    {((attacker != undefined && defender != undefined)) ? <GraphFeature attacker={attacker} defender={defender} move={move} field={field}></GraphFeature> : placeholder}
                </Suspense>
            </div>
        </ColumnContainer>
    );
}

export default EVCalcs;