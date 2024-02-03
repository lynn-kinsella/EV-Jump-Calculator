import { Species, Dex, StatID, NatureName, Item, StatusName, AbilityName, StatsTable, TypeName } from "@pkmn/dex";
import { Generations, Pokemon, STATS, Stats } from "@smogon/calc";

export interface SelectedPokemon {
    calcData: Pokemon;
    speciesData: Species
}

export function createSelectedPokemon(name: string): SelectedPokemon {
    const species = Dex.forGen(9).species.get(name);
    const calcData = new Pokemon(9, species.name, {
        level: 50,
        ivs: {
            hp: 31,
            atk: 31,
            def: 31,
            spa: 31,
            spd: 31,
            spe: 31
        }
    })
    return { speciesData: species, calcData: calcData }
}

export function updateSelectedSpecies(pkmn: SelectedPokemon, newSpecies: Species): SelectedPokemon {
    try {
        const newPkmn = {
            speciesData: newSpecies,
            calcData: new Pokemon(9, newSpecies.name, {
                level: pkmn.calcData.level,
                item: pkmn.calcData.item,
                nature: pkmn.calcData.nature,
                evs: pkmn.calcData.evs,
                ivs: pkmn.calcData.ivs,
                boosts: pkmn.calcData.boosts
            })
        };
        (Object.keys(newPkmn.calcData.stats) as StatID[]).forEach((stat: StatID) => {
            newPkmn.calcData.stats[stat] = calcStatWrapper(newPkmn, stat)
        })
        return newPkmn
    }
    catch (e) {
        alert("@smogon/calc not updated to support calcs for DLC 2 Pokemon");
        return pkmn;
    }
}

export function updateSelectedEVs(pkmn: SelectedPokemon, stat: StatID, evs: number): SelectedPokemon {
    var workingPokemon = {
        speciesData: pkmn.speciesData,
        calcData: pkmn.calcData
    }

    workingPokemon.calcData.evs[stat] = evs;
    workingPokemon.calcData.stats[stat] = calcStatWrapper(workingPokemon, stat)
    return workingPokemon
}

export function updateSelectedIVs(pkmn: SelectedPokemon, stat: StatID, ivs: number): SelectedPokemon {
    var workingPokemon = {
        speciesData: pkmn.speciesData,
        calcData: pkmn.calcData
    }

    workingPokemon.calcData.ivs[stat] = ivs;
    workingPokemon.calcData.stats[stat] = calcStatWrapper(workingPokemon, stat)
    return workingPokemon
}

export function updateSelectedBoosts(pkmn: SelectedPokemon, stat: StatID, boost: number): SelectedPokemon {
    var workingPokemon = {
        speciesData: pkmn.speciesData,
        calcData: pkmn.calcData
    }

    workingPokemon.calcData.boosts[stat] = boost;
    workingPokemon.calcData.stats[stat] = calcStatWrapper(workingPokemon, stat)
    return workingPokemon
}

export function updateSelectedNature(pkmn: SelectedPokemon, nature: NatureName): SelectedPokemon {
    var workingPokemon = {
        speciesData: pkmn.speciesData,
        calcData: pkmn.calcData
    }

    workingPokemon.calcData.nature = nature;
    (Object.keys(pkmn.calcData.stats) as StatID[]).forEach((stat: StatID) => {
        workingPokemon.calcData.stats[stat] = calcStatWrapper(workingPokemon, stat)
    })
    return workingPokemon
}

export function updateSelectedAbility(pkmn: SelectedPokemon, ability: AbilityName): SelectedPokemon {
    var workingPokemon = {
        speciesData: pkmn.speciesData,
        calcData: pkmn.calcData
    }

    workingPokemon.calcData.ability = ability;
    return workingPokemon
}

export function updateSelectedAbilityActive(pkmn: SelectedPokemon, abilityOn: boolean): SelectedPokemon {
    var workingPokemon = {
        speciesData: pkmn.speciesData,
        calcData: pkmn.calcData
    }

    workingPokemon.calcData.abilityOn = abilityOn;
    return workingPokemon
}

export function updateSelectedItem(pkmn: SelectedPokemon, item: Item | undefined): SelectedPokemon {
    var workingPokemon = {
        speciesData: pkmn.speciesData,
        calcData: pkmn.calcData
    }

    workingPokemon.calcData.item = item?.name;
    return workingPokemon
}

export function updateSelectedTera(pkmn: SelectedPokemon, teraType: TypeName | undefined): SelectedPokemon {
    var workingPokemon = {
        speciesData: pkmn.speciesData,
        calcData: pkmn.calcData
    }

    workingPokemon.calcData.teraType = teraType ? teraType : undefined;

    return workingPokemon
}


export function getItemBoosts(pkmn: SelectedPokemon, statName: StatID): number {
    var rawStat = pkmn.calcData.stats[statName];
    if (pkmn.calcData.item) {
        switch (statName) {
            case "spe":
                if (["Choice Scarf"].includes(pkmn.calcData.item)) {
                    rawStat = -Math.round(-rawStat * 1.5);
                }
                else if (["Iron Ball", "Power Anklet", "Power Band", "Power Bracer", "Power Lens", "Power Weight", "Power Belt"].includes(pkmn.calcData.item)) {
                    rawStat = -Math.round(-rawStat / 2);
                }
                break;
            case "atk":
                if (["Choice Band"].includes(pkmn.calcData.item)) {
                    rawStat = -Math.round(-rawStat * 1.5);
                }
                break;
            case "spa":
                if (["Choice Specs"].includes(pkmn.calcData.item)) {
                    rawStat = -Math.round(-rawStat * 1.5);
                }
                break;
        }
    }
    return rawStat;
}

export function calcStatWrapper(pkmn: SelectedPokemon, statName: StatID): number {
    let rawStat = Stats.calcStat(
        Generations.get(9),
        statName,
        pkmn.speciesData.baseStats[statName],
        pkmn.calcData.ivs[statName],
        pkmn.calcData.evs[statName],
        pkmn.calcData.level,
        pkmn.calcData.nature)
    let boostedStat = -Math.round(-rawStat * (2 / (Math.abs(pkmn.calcData.boosts[statName]) + 2)) ** (pkmn.calcData.boosts[statName] > 0 ? -1 : 1))

    return boostedStat
}