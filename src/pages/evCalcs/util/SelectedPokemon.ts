import { Species, StatID, NatureName, Item, AbilityName, TypeName, Dex } from "@pkmn/dex";
import { Generations, Stats, StatsTable, Pokemon } from "@smogon/calc";


type CalcOptions = Partial<{ level: number, nature: string, item: string, evs: Partial<StatsTable>, ivs: Partial<StatsTable>, boosts: Partial<StatsTable> }>
export interface SelectedPokemonInterface {
    calcData: Pokemon;
    speciesData: Species;
    moves: string[] | undefined;
    clone: () => SelectedPokemon;
    // createSelectedPokemon: (name: string) => void;
    // createSpeciesData: (name: string) => void;
    // createCalcData: (name: string, options: CalcOptions) => void;
    updateSpecies: (newSpecies: Species) => void;
    updateEVs: (stat: StatID, evs: number) => void;
    updateIVs: (stat: StatID, ivs: number) => void;
    updateBoosts: (stat: StatID, boosts: number) => void;
    updateNature: (nature: NatureName) => void;
    updateAbility: (ability: AbilityName) => void;
    updateAbilityActive: (abilityOn: boolean) => void;
    updateItem: (item: Item | undefined) => void;
    updateTera: (teraType: TypeName | undefined) => void;
    updateMoves: (moves: string[]) => void;
    getItemBoosts: (statName: StatID) => number;
    calcStatWrapper: (statName: StatID) => number;
}

class SelectedPokemon implements SelectedPokemon {
    calcData: Pokemon;
    speciesData: Species;
    moves: string[] | undefined;

    constructor();
    constructor(name: string);
    constructor(name?: string) {
        if (name) {
            this.createSelectedPokemon(name);
        }
        if (!this.speciesData) {
            this.createSpeciesData("Bulbasaur");
        }
        if (!this.calcData) {
            this.createCalcData("Bulbasaur", {})
        }
    }

    private createSelectedPokemon(name: string): void {
        this.createSpeciesData(name)
        this.createCalcData(name, {});
    }

    // private async createSpeciesData(name: string) {
    //     const { Dex } = await import("@pkmn/dex");
    private createSpeciesData(name: string) {
        this.speciesData = Dex.forGen(9).species.get(name);
    }

    // private async createCalcData(name: string, options: Partial<{ level: number, nature: string, item: string, evs: Partial<StatsTable>, ivs: Partial<StatsTable>, boosts: Partial<StatsTable> }>) {
    //     const { Pokemon } = await import("@smogon/calc");
    private createCalcData(name: string, options: CalcOptions) {
        this.calcData = new Pokemon(9, name, {
            level: options.level ? options.level : 50,
            item: options.item ? options.item : undefined,
            nature: options.nature ? options.nature : undefined,
            evs: options.evs ? options.evs : undefined,
            ivs: options.ivs ? options.ivs : {
                hp: 31,
                atk: 31,
                def: 31,
                spa: 31,
                spd: 31,
                spe: 31
            },
            boosts: options.boosts ? options.boosts : undefined,
        });
    }

    clone(): SelectedPokemon {
        const clone = new SelectedPokemon(this.speciesData.name)
        clone.calcData = this.calcData.clone();
        clone.moves = this.moves;
        return clone;
    }

    updateSpecies(newSpecies: Species) {
        this.speciesData = newSpecies;
        this.createCalcData(this.speciesData.name, {
            level: this.calcData.level,
            item: this.calcData.item,
            nature: this.calcData.nature,
            evs: this.calcData.evs,
            ivs: this.calcData.ivs,
            boosts: this.calcData.boosts
        });

        (Object.keys(this.calcData.stats) as StatID[]).forEach((stat: StatID) => {
            this.calcData.stats[stat] = this.calcStatWrapper(stat);
        })
        this.moves = undefined;
    }

    updateEVs(stat: StatID, evs: number) {
        this.calcData.evs[stat] = evs;
        this.calcData.stats[stat] = this.calcStatWrapper(stat);
    }

    updateIVs(stat: StatID, ivs: number) {
        this.calcData.ivs[stat] = ivs;
        this.calcData.stats[stat] = this.calcStatWrapper(stat);
    }

    updateBoosts(stat: StatID, boost: number) {
        this.calcData.boosts[stat] = boost;
        this.calcData.stats[stat] = this.calcStatWrapper(stat);
    }

    updateNature(nature: NatureName) {
        this.calcData.nature = nature;
        (Object.keys(this.calcData.stats) as StatID[]).forEach((stat: StatID) => {
            this.calcData.stats[stat] = this.calcStatWrapper(stat)
        })
    }

    updateAbility(ability: AbilityName) {
        this.calcData.ability = ability;
    }

    updateAbilityActive(abilityOn: boolean) {
        this.calcData.abilityOn = abilityOn;
    }

    updateItem(item: Item | undefined) {
        this.calcData.item = item?.name;
    }

    updateTera(teraType: TypeName | undefined) {
        this.calcData.teraType = teraType ? teraType : undefined;
    }

    updateMoves(moves: string[]) {
        this.moves = moves;
    }

    getItemBoosts(statName: StatID): number {
        var rawStat = this.calcData.stats[statName];
        if (this.calcData.item) {
            switch (statName) {
                case "spe":
                    if (["Choice Scarf"].includes(this.calcData.item)) {
                        rawStat = -Math.round(-rawStat * 1.5);
                    }
                    else if (["Iron Ball", "Power Anklet", "Power Band", "Power Bracer", "Power Lens", "Power Weight", "Power Belt"].includes(this.calcData.item)) {
                        rawStat = -Math.round(-rawStat / 2);
                    }
                    break;
                case "atk":
                    if (["Choice Band"].includes(this.calcData.item)) {
                        rawStat = -Math.round(-rawStat * 1.5);
                    }
                    break;
                case "spa":
                    if (["Choice Specs"].includes(this.calcData.item)) {
                        rawStat = -Math.round(-rawStat * 1.5);
                    }
                    break;
            }
        }
        return rawStat;
    }

    calcStatWrapper(statName: StatID): number {
        let rawStat = Stats.calcStat(
            Generations.get(9),
            statName,
            this.speciesData.baseStats[statName],
            this.calcData.ivs[statName],
            this.calcData.evs[statName],
            this.calcData.level,
            this.calcData.nature)
        let boostedStat = -Math.round(-rawStat * (2 / (Math.abs(this.calcData.boosts[statName]) + 2)) ** (this.calcData.boosts[statName] > 0 ? -1 : 1))

        return boostedStat
    }
}

export default SelectedPokemon;