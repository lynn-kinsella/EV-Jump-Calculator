import Header from "../pure_ui/Header";
import Footer from "../pure_ui/Footer";
import { ColumnContainer } from "../pure_ui/ThemeContainer";
import { PokemonData } from "../pure_ui/PokemonData";
import { useState } from "react";
import { SelectedPokemon } from "../../util/SelectedPokemon";


function Page() {
    const [attacker, setAttacker] = useState<SelectedPokemon>(new SelectedPokemon());
    const [defender, setDefender] = useState<SelectedPokemon>(new SelectedPokemon("Kyogre"));

    function updateAttacker(newPokemon: SelectedPokemon) {
        setAttacker(newPokemon.clone());
    }

    function updateDefender(newPokemon: SelectedPokemon) {
        setDefender(newPokemon.clone());
    }

    return (
        // <Layout></Layout>
        <ColumnContainer>
            <Header></Header>
            <PokemonData attacker={attacker} defender={defender} updateAttacker={updateAttacker} updateDefender={updateDefender}></PokemonData>
            {/* Field */}
            {/* Attack, Graph Options */}
            {/* Graph */}
            {/* EV Sliders */}
            <Footer></Footer>
        </ColumnContainer>
    );
}


export default Page;