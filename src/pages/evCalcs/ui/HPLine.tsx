
interface HPLineProps {
    maxDmg: number;
    defenderHP: number;
    fraction: number;
    overheadMargin: number;
}

export function HPLine({ maxDmg, defenderHP, fraction, overheadMargin }: HPLineProps) {
    return (
        <div className="w-[100%] z-20 flex flex-col absolute opacity-70 bg-red-800 min-h-[1px]"
            style={{
                bottom: 100 * (defenderHP) / (maxDmg * overheadMargin) * (fraction / 10000) + "%",
                height: (100 / maxDmg * overheadMargin) + "%"
            }}>
            <span className="text-sm pt-1">{fraction / 10000 * 100}%</span>
        </div >
    );
}
