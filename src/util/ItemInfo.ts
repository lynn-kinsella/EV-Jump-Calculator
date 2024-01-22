import { Item } from "./FieldClass"

export function getTypeResistBerries(): Item[] {
    return [
        { name: "Chilan Berry", tooltip: "Reduces damage from super effective Normal type moves by 50%" },
        { name: "Occa Berry", tooltip: "Reduces damage from super effective Fire type moves by 50%" },
        { name: "Passho Berry", tooltip: "Reduces damage from super effective Water type moves by 50%" },
        { name: "Rindo Berry", tooltip: "Reduces damage from super effective Grass type moves by 50%" },
        { name: "Coba Berry", tooltip: "Reduces damage from super effective Flying type moves by 50%" },
        { name: "Chople Berry", tooltip: "Reduces damage from super effective Fighting type moves by 50%" },
        { name: "Kebia Berry", tooltip: "Reduces damage from super effective Poison type moves by 50%" },
        { name: "Wacan Berry", tooltip: "Reduces damage from super effective Electric type moves by 50%" },
        { name: "Shuca Berry", tooltip: "Reduces damage from super effective Ground type moves by 50%" },
        { name: "Charti Berry", tooltip: "Reduces damage from super effective Rock type moves by 50%" },
        { name: "Payapa Berry", tooltip: "Reduces damage from super effective Psychic type moves by 50%" },
        { name: "Yache Berry", tooltip: "Reduces damage from super effective Ice type moves by 50%" },
        { name: "Tanga Berry", tooltip: "Reduces damage from super effective Bug type moves by 50%" },
        { name: "Kasib Berry", tooltip: "Reduces damage from super effective Ghost type moves by 50%" },
        { name: "Babiri Berry", tooltip: "Reduces damage from super effective Steel type moves by 50%" },
        { name: "Haban Berry", tooltip: "Reduces damage from super effective Dragon type moves by 50%" },
        { name: "Colbur Berry", tooltip: "Reduces damage from super effective Dark type moves by 50%" },
        { name: "Roseli Berry", tooltip: "Reduces damage from super effective Fairy type moves by 50%" },
    ]
};

export function getTypeBoostItems(): Item[] {
    return [
        { name: "Silk Scarf", tooltip: "Boosts the power of Normal type moves by 10%" },
        { name: "Charcoal", tooltip: "Boosts the power of Fire type moves by 10%" },
        { name: "Mystic Water", tooltip: "Boosts the power of Water type moves by 10%" },
        { name: "Miracle Seed", tooltip: "Boosts the power of Grass type moves by 10%" },
        { name: "Sharp Beak", tooltip: "Boosts the power of Flying type moves by 10%" },
        { name: "Black Belt", tooltip: "Boosts the power of Fighting type moves by 10%" },
        { name: "Poison Barb", tooltip: "Boosts the power of Poison type moves by 10%" },
        { name: "Magnet", tooltip: "Boosts the power of Electric type moves by 10%" },
        { name: "Soft Sand", tooltip: "Boosts the power of Ground type moves by 10%" },
        { name: "Hard Stone", tooltip: "Boosts the power of Rock type moves by 10%" },
        { name: "Twisted Spoon", tooltip: "Boosts the power of Psychic type moves by 10%" },
        { name: "Never-Melt Ice", tooltip: "Boosts the power of Ice type moves by 10%" },
        { name: "Silver Powder", tooltip: "Boosts the power of Bug type moves by 10%" },
        { name: "Spell Tag", tooltip: "Boosts the power of Ghost type moves by 10%" },
        { name: "Metal Coat", tooltip: "Boosts the power of Steel type moves by 10%" },
        { name: "Dragon Fang", tooltip: "Boosts the power of Dragon type moves by 10%" },
        { name: "Black Glasses", tooltip: "Boosts the power of Dark type moves by 10%" },
        { name: "Pixie Plate", tooltip: "Boosts the power of Fairy type moves by 10%" },
    ]
};

export function getOffsenseItems(): Item[] {
    return [
        { name: "Choice Band", tooltip: "Increases attack by 50% but locks user into the first move it uses." },
        { name: "Choice Specs", tooltip: "Increases special attack by 50% but locks user into the first move it uses." },
        { name: "Expert Belt", tooltip: "Increases damage dealt by super effective moves by 20%" },
        { name: "Life Orb", tooltip: "Increases damage done by all attacks by 30% but the user takes 10% of the damage it deals as recoil." },
    ]
}

export function getDefenseItems(): Item[] {
    return [
        { name: "Assault Vest", tooltip: "Boosts user's special defense by 50% but the user cannot select status moves." },
        { name: "Eviolite", tooltip: "Boosts user's defense and special defense by 50% if the user can evolve." },
    ]
}

export function getHPItems(): Item[] {
    return [
        { name: "Leftovers", tooltip: "Restores 6.25% (1/16) of the holder's max hp at the end of each turn." },
        { name: "Sitrus Berry", tooltip: "Restores 25% (1/4) of the holder's max hp once the user drops below 50% hp." },
        { name: "Iapapa Berry", tooltip: "Restores 33% (1/3) of the holder's max hp once the user drops below 25% hp." },
    ]
}