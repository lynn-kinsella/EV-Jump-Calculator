import Header from "./Header";
import Footer from "./Footer";
import { SelectedPokemon, createSelectedPokemon } from "../../util/SelectedPokemon_old";

import { Dex, LearnsetData, Move } from "@pkmn/dex";
import PokeSet from "./PokeSet";
import React, { useState } from "react";
import { AttackSelect } from "./AttackSelect";
import EVSlider from "./EVSlider";
import { Graph, GraphContainer } from "./Graph";


function Layout() {
    const [attacker, setAttacker] = useState<SelectedPokemon>(createSelectedPokemon("Bulbasaur"));
    const [defender, setDefender] = useState<SelectedPokemon>(createSelectedPokemon("Bulbasaur"));
    const [attack, setAttack] = useState<Move>(Dex.forGen(9).moves.get("Select Move"));
    // const [field, setField] = useState<Field>(new Field());

    return (
        <div className="flex flex-col items-center gap-10">
            <Header></Header>
            <div className="flex flex-row gap-48">
                {/* TODO: Attacker/Defender Slider */}
                <div className="flex flex-col gap-16">
                    {/* Attacker */}
                    <div className="flex-col flex gap-4"> {/*12rem (Sprite) + (8 (Sprite Gap) + 16 * 6 (Stat Columns) + 4 * 5 (Stat Gaps) + 4 * 2 (Stat Padding))/4 */}
                        <PokeSet pkmn={attacker} setPkmn={setAttacker}></PokeSet>
                    </div>
                    {/* Defender */}
                    <div className="flex-col flex gap-4">
                        <PokeSet pkmn={defender} setPkmn={setDefender}></PokeSet>
                    </div>
                </div>
                {/* TODO: Field Conditions */}
                <div className="flex flex-col gap-8 border">
                    <AttackSelect pkmn={attacker} attack={attack} setAttack={setAttack} ></AttackSelect>
                    <GraphContainer attacker={attacker} setAttacker={setAttacker} defender={defender} setDefender={setDefender} attack={attack}></GraphContainer>
                </div>
            </div>
            <Footer></Footer>
        </div >
    );
}

export default Layout;