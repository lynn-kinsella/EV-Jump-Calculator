import { SelectedPokemon } from "../../../util/SelectedPokemon";

interface DumpStatsInterface {
    selectedPokemon: SelectedPokemon | undefined;
}

export function DumpStatsDebug({ selectedPokemon }: DumpStatsInterface) {
    return (
        <div>
            {selectedPokemon != undefined && (
                <div className="flex flex-col">
                    <span>{selectedPokemon.name}</span>
                    <div className="flex flew-row gap-10">
                        <span>{selectedPokemon.baseStats.hp}</span>
                        <span>{selectedPokemon.evs.hp}</span>
                        <span>{selectedPokemon.stats.hp}</span>
                    </div>

                    <div className="flex flew-row gap-10">
                        <span>{selectedPokemon.baseStats.atk}</span>
                        <span>{selectedPokemon.evs.atk}</span>
                        <span>{selectedPokemon.stats.atk}</span>
                    </div>

                    <div className="flex flew-row gap-10">
                        <span>{selectedPokemon.baseStats.def}</span>
                        <span>{selectedPokemon.evs.def}</span>
                        <span>{selectedPokemon.stats.def}</span>
                    </div>

                    <div className="flex flew-row gap-10">
                        <span>{selectedPokemon.baseStats.spa}</span>
                        <span>{selectedPokemon.evs.spa}</span>
                        <span>{selectedPokemon.stats.spa}</span>
                    </div>

                    <div className="flex flew-row gap-10">
                        <span>{selectedPokemon.baseStats.spdf}</span>
                        <span>{selectedPokemon.evs.spdf}</span>
                        <span>{selectedPokemon.stats.spdf}</span>
                    </div>

                    <div className="flex flew-row gap-10">
                        <span>{selectedPokemon.baseStats.spe}</span>
                        <span>{selectedPokemon.evs.spe}</span>
                        <span>{selectedPokemon.stats.spe}</span>
                    </div>
                </div>
            )}

        </div>
    )
}