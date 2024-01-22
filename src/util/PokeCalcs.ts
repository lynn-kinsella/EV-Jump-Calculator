

export function getStat(base: number, ev: number, natureMultiplier: number): number {
    const step1 = Math.floor((2 * base + 31 + Math.floor(ev / 4)) * 50 / 100);
    return Math.floor((step1 + 5) * natureMultiplier)
}

export function getHP(base: number, ev: number): number {
    return Math.floor((2 * base + 31 + Math.floor(ev / 4)) * 50 / 100) + 50 + 10;
}

export function pointsToEvs(points: number): number {
    return points && (points - 1) * 8 + 4
}


export function evsToPoints(evs: number): number {
    return evs && (evs - 4) / 8 + 1
}

export function getNatureMod(stat: "atk" | "def" | "spa" | "spdf" | "spe", nature: string): number {
    const natures = {
        atk: { plus: ["lonely", "adamant", "naughty", "brave"], minus: ["bold", "modest", "calm", "timid"] },
        def: { plus: ["bold", "impish", "lax", "relaxed"], minus: ["lonely", "mild", "gentle", "hasty"] },
        spa: { plus: ["modest", "mild", "rash", "quiet"], minus: ["adamant", "impish", "careful", "jolly"] },
        spdf: { plus: ["calm", "gentle", "careful", "sassy"], minus: ["naughty", "lax", "rash", "naive"] },
        spe: { plus: ["timid", "hasty", "jolly", "naive"], minus: ["brave", "relaxed", "quiet", "sassy"] },
        neutral: ["serious", "docile", "bashful", "quirky", "hardy"]
    };
    if (natures["neutral"].includes(nature)) {
        return 1;
    }
    else if (natures[stat]["plus"].includes(nature)) {
        return 1.1;
    }
    else if (natures[stat]["minus"].includes(nature)) {
        return 1 / 1.1;
    }
    return 1;
}