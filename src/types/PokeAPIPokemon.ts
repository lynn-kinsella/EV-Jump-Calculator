export interface PokeAPIPokemonInterface {
    abilities: Ability[]
    base_experience: number
    forms: Form[]
    game_indices: Index[]
    height: number
    held_items: HeldItem[]
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: MoveGroup[]
    name: string
    order: number
    past_abilities: any[]
    past_types: any[]
    species: Species
    sprites: Sprites
    stats: Stat[]
    types: Type[]
    weight: number
}

export interface Ability {
    ability: AbilityInfo
    is_hidden: boolean
    slot: number
}

export interface AbilityInfo {
    name: string
    url: string
}

interface Form {
    name: string
    url: string
}

interface Index {
    game_index: number
    version: Version
}

interface Version {
    name: string
    url: string
}

interface HeldItem {
    item: Item
    version_details: VersionDetail[]
}

interface Item {
    name: string
    url: string
}

interface VersionDetail {
    rarity: number
    version: Version2
}

interface Version2 {
    name: string
    url: string
}

interface MoveGroup {
    move: Move
    version_group_details: VersionGroupDetail[]
}

interface Move {
    name: string
    url: string
}

interface VersionGroupDetail {
    level_learned_at: number
    move_learn_method: MoveLearnMethod
    version_group: VersionGroup
}

interface MoveLearnMethod {
    name: string
    url: string
}

interface VersionGroup {
    name: string
    url: string
}

interface Species {
    name: string
    url: string
}

export interface Sprites {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
    other: Other
    versions: Versions
}

interface Other {
    dream_world: DreamWorld
    home: Home
    "official-artwork": OfficialArtwork
}

interface DreamWorld {
    front_default: string
    front_female: any
}

interface Home {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

interface OfficialArtwork {
    front_default: string
    front_shiny: string
}

interface Versions {
    "generation-i": Generation1
    "generation-ii": Generation2
    "generation-iii": Generation3
    "generation-iv": Generation4
    "generation-v": Generation5
    "generation-vi": Generation6
    "generation-vii": Generation7
    "generation-viii": Generation8
}

interface Generation1 {
    "red-blue": RedBlue
    yellow: Yellow
}

interface RedBlue {
    back_default: string
    back_gray: string
    back_transparent: string
    front_default: string
    front_gray: string
    front_transparent: string
}

interface Yellow {
    back_default: string
    back_gray: string
    back_transparent: string
    front_default: string
    front_gray: string
    front_transparent: string
}

interface Generation2 {
    crystal: Crystal
    gold: Gold
    silver: Silver
}

interface Crystal {
    back_default: string
    back_shiny: string
    back_shiny_transparent: string
    back_transparent: string
    front_default: string
    front_shiny: string
    front_shiny_transparent: string
    front_transparent: string
}

interface Gold {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
    front_transparent: string
}

interface Silver {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
    front_transparent: string
}

interface Generation3 {
    emerald: Emerald
    "firered-leafgreen": FireredLeafgreen
    "ruby-sapphire": RubySapphire
}

interface Emerald {
    front_default: string
    front_shiny: string
}

interface FireredLeafgreen {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

interface RubySapphire {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

interface Generation4 {
    "diamond-pearl": DiamondPearl
    "heartgold-soulsilver": HeartgoldSoulsilver
    platinum: Platinum
}

interface DiamondPearl {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

interface HeartgoldSoulsilver {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

interface Platinum {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

interface Generation5 {
    "black-white": BlackWhite
}

interface BlackWhite {
    animated: Animated
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

interface Animated {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

interface Generation6 {
    "omegaruby-alphasapphire": OmegarubyAlphasapphire
    "x-y": XY
}

interface OmegarubyAlphasapphire {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

interface XY {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

interface Generation7 {
    icons: Icons
    "ultra-sun-ultra-moon": UltraSunUltraMoon
}

interface Icons {
    front_default: string
    front_female: any
}

interface UltraSunUltraMoon {
    front_default: string
    front_female?: any
    front_shiny?: string
    front_shiny_female?: any
}

interface Generation8 {
    icons: Icons2
}

interface Icons2 {
    front_default: string
    front_female: any
}

export interface Stat {
    base_stat: number
    effort: number
    stat: StatInfo
}

interface StatInfo {
    name: string
    url: string
}

interface Type {
    slot: number
    type: TypeInfo
}

interface TypeInfo {
    name: string
    url: string
}
