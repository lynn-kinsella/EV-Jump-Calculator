import { Field } from "../../../util/FieldClass";

interface DumpFieldInterface {
    fieldConditions: Field
}

export function DumpFieldDebug({ fieldConditions }: DumpFieldInterface) {
    return (
        <div className="flex flex-col">
            <span>Attacker Item: {fieldConditions.attackerItem.name}</span>
            <span>Defender Item: {fieldConditions.defenderItem.name}</span>
            <span>Weather: {fieldConditions.weather}</span>
            <span>Terrain: {fieldConditions.terrainType}</span>
        </div>
    )
}