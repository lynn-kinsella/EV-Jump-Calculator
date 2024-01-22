import { Species, Dex } from "@pkmn/dex";
import { Ability, PokeAPIPokemonInterface, Stat } from "../types/PokeAPIPokemon";
import { getHP, getNatureMod, getStat } from "./PokeCalcs"
import { Pokemon } from "@smogon/calc";

interface Stats {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spdf: number;
    spe: number;
}

interface BaseStats extends Stats {

}

interface EVStats extends Stats {

}

interface ItemStats extends Stats {

}


export class SelectedPokemon {
    pokeSpecies: Species;
    pokeCalc: Pokemon;

    constructor(species: Species) {
        this.pokeSpecies = species;
        this.pokeCalc = new Pokemon(9, this.pokeSpecies.name, { level: 50 })
    }

    // assignStats(apiRes: Stat[]) {
    //     this.baseStats.hp = apiRes[0].base_stat;
    //     this.baseStats.atk = apiRes[1].base_stat;
    //     this.baseStats.def = apiRes[2].base_stat;
    //     this.baseStats.spa = apiRes[3].base_stat;
    //     this.baseStats.spdf = apiRes[4].base_stat;
    //     this.baseStats.spe = apiRes[5].base_stat;
    // }

    // assignAbilities(apiRes: Ability[]) {
    //     apiRes.forEach(ability => {
    //         this.abilities.push(ability.ability.name);
    //     });
    // }

    // calcStats() {
    //     this.stats.hp = getHP(this.baseStats.hp, this.evs.hp);
    //     this.stats.atk = getStat(this.baseStats.atk * this.statModifier.atk, this.evs.atk, getNatureMod("atk", this.nature));
    //     this.stats.def = getStat(this.baseStats.def * this.statModifier.def, this.evs.def, getNatureMod("def", this.nature));
    //     this.stats.spa = getStat(this.baseStats.spa * this.statModifier.spa, this.evs.spa, getNatureMod("spa", this.nature));
    //     this.stats.spdf = getStat(this.baseStats.spdf * this.statModifier.spdf, this.evs.spdf, getNatureMod("spdf", this.nature));
    //     this.stats.spe = getStat(this.baseStats.spe * this.statModifier.spe, this.evs.spe, getNatureMod("spe", this.nature));
    // }

    // setSelectedAbility(index: number) {
    //     this.selectedAbility = index;
    // }
}