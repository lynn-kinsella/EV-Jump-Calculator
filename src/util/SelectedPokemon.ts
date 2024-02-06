import { Species, Dex, StatID, NatureName, Item, StatusName, AbilityName, StatsTable, TypeName } from "@pkmn/dex";
import { Generations, Pokemon, STATS, Stats } from "@smogon/calc";


export class SelectedPokemon {
    calcData: Pokemon;
    speciesData: Species;

    constructor();
    constructor(name: string);
    constructor(name?: string) {
        this.calcData = new Pokemon(9, "Bulbasaur", { level: 50 });
        this.speciesData = Dex.forGen(9).species.get("Bulbasaur");
        if (name) {
            this.createSelectedPokemon(name);
        }
    }

    private createSelectedPokemon(name: string): void {
        this.speciesData = Dex.forGen(9).species.get(name);
        this.calcData = new Pokemon(9, this.speciesData.name, {
            level: 50,
            ivs: {
                hp: 31,
                atk: 31,
                def: 31,
                spa: 31,
                spd: 31,
                spe: 31
            }
        });
    }

    clone(): SelectedPokemon {
        const clone = new SelectedPokemon(this.speciesData.name)
        clone.calcData = this.calcData.clone();
        return clone;
    }

    updateSpecies(newSpecies: Species) {
        this.speciesData = newSpecies;
        this.calcData = new Pokemon(9, this.speciesData.name, {
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