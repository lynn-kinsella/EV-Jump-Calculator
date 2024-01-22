
interface DumpFieldInterface {
    attack: string
}

export function DumpAttackDebug({ attack }: DumpFieldInterface) {
    return (
        <div className="flex flex-col">
            <span>Attack Name: {attack}</span>

        </div>
    )
}