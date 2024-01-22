enum Weather {
    Clear = 0,
    Rain,
    Sun,
    Sand,
    Snow
}

enum Terrain {
    Clear = 0,
    Electric,
    Misty,
    Grassy,
    Psychic
}

export type Item = {
    name: string;
    tooltip: string;
}

export class Field {
    attackerItem: Item = { name: "", tooltip: "" };
    defenderItem: Item = { name: "", tooltip: "" };
    terrainType: Terrain = Terrain.Clear;
    weather: Weather = Weather.Clear;

    constructor() { }
}