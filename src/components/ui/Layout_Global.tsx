import Header from "./Header";
import Footer from "./Footer";
import { SelectedPokemon, createSelectedPokemon } from "../../util/SelectedPokemon";

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
            <ColumnScroll></ColumnScroll>
            <Footer></Footer>
        </div >
    );
}

function ColumnScroll() {
    return (
        <div>

        </div>
    )
}

export default Layout;