import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Graph from "../ui/Graph";
import { useEffect, useState } from "react";
import { SelectedPokemon } from "../../util/SelectedPokemon";
import PokeInputGroup from "./PokeInput/PokeInputGroup";
import { Field } from "../../util/FieldClass";
import { DumpFieldDebug } from "./debug/DumpFieldDebug";
import { DumpStatsDebug } from "./debug/DumpStatsDebug";
import AttackSelect from "./PokeInput/AttackSelect";
import { DumpAttackDebug } from "./debug/DumpAttackDebug";
import { Dex } from "@pkmn/dex";


function Layout() {
    const [attacker, setAttacker] = useState<SelectedPokemon>(new SelectedPokemon(Dex.forGen(9).species.get("Bulbasaur")));
    const [defender, setDefender] = useState<SelectedPokemon>(new SelectedPokemon(Dex.forGen(9).species.get("Bulbasaur")));
    const [field, setField] = useState<Field>(new Field());
    const [attack, setAttack] = useState<string>("")

    return (
        <div className="flex flex-col items-center gap-10">
            <Header></Header>
            <PokeInputGroup
                attacker={attacker}
                defender={defender}
                setAttacker={setAttacker}
                setDefender={setDefender}
                setField={setField}
                setAttack={setAttack}>
            </PokeInputGroup>
            {/* <DumpFieldDebug fieldConditions={field}></DumpFieldDebug> */}
            {/* <DumpAttackDebug attack={attack} ></DumpAttackDebug> */}

            {/* <Graph attacker={attacker} defender={defender} attack={attack} field={field}></Graph> */}
            <Footer></Footer>
        </div >
    );
}

export default Layout;