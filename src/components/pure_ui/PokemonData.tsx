import { useState } from "react";
import { ThemeContainer } from "./ThemeContainer";
import { SelectedPokemon } from "../../util/SelectedPokemon";
import { IntrinsicPokemon } from "./IntrinsicPokemon";
import { StatTable } from "./StatTable";
import { RoleRow } from "./RoleRow";

interface PokemonDataProps {
    attacker: SelectedPokemon;
    defender: SelectedPokemon;
    updateAttacker: (pkmn: SelectedPokemon) => void
    updateDefender: (pkmn: SelectedPokemon) => void
}

export function PokemonData({ attacker, defender, updateAttacker, updateDefender }: PokemonDataProps) {
    const [showAttacker, setShowAttacker] = useState<boolean>(true);

    function handleSwap() {
        updateAttacker(defender.clone());
        updateDefender(attacker.clone());
    }

    return (
        <ThemeContainer direction="flex-col h-fit">
            <RoleRow showAttacker={showAttacker} handleSwap={handleSwap} setShowAttacker={setShowAttacker}></RoleRow>
            <IntrinsicPokemon updatePkmn={showAttacker ? updateAttacker : updateDefender} pkmn={showAttacker ? attacker : defender}></IntrinsicPokemon>
            <StatTable pkmn={showAttacker ? attacker : defender} updatePkmn={showAttacker ? updateAttacker : updateDefender}></StatTable>
        </ThemeContainer>
    );
}


