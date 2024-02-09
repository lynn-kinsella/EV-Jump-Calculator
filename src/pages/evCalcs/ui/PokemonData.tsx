import { useState } from "react";
import { ThemeContainer, ThemeRow } from "./ThemeContainer";
import SelectedPokemon, { SelectedPokemonInterface } from "../util/SelectedPokemon";
import { IntrinsicPokemon } from "./IntrinsicPokemon";
import { StatTable } from "./StatTable";
import { RoleRow } from "./RoleRow";
import { ImportBox } from "./ImportBox";
import { ThemeSubmit } from "./ThemeInput";

interface PokemonDataProps {
    attacker: SelectedPokemonInterface;
    defender: SelectedPokemonInterface;
    updateAttacker: (pkmn: SelectedPokemonInterface) => void
    updateDefender: (pkmn: SelectedPokemonInterface) => void
}

export default function PokemonData({ attacker, defender, updateAttacker, updateDefender }: PokemonDataProps) {
    const [showAttacker, setShowAttacker] = useState<boolean>(true);
    const [importMode, setImportMode] = useState<boolean>(false);

    function handleSwap() {
        updateAttacker(defender.clone());
        updateDefender(attacker.clone());
    }

    if (!importMode) {
        return (
            <ThemeContainer direction="flex-col h-fit">
                <RoleRow showAttacker={showAttacker} handleSwap={handleSwap} setShowAttacker={setShowAttacker}></RoleRow>
                <IntrinsicPokemon updatePkmn={showAttacker ? updateAttacker : updateDefender} pkmn={showAttacker ? attacker : defender}></IntrinsicPokemon>
                <StatTable pkmn={showAttacker ? attacker : defender} updatePkmn={showAttacker ? updateAttacker : updateDefender}></StatTable>
                <ThemeRow justify="justify-center">
                    <ThemeSubmit updateState={() => { setImportMode(true) }}>Import Set</ThemeSubmit>
                </ThemeRow>
            </ThemeContainer>
        )
    }
    else {
        return (
            <ThemeContainer direction={"flex-col"}>
                <ImportBox setImportMode={setImportMode} updatePkmn={showAttacker ? updateAttacker : updateDefender}></ImportBox>
            </ThemeContainer>
        );
    };
}
