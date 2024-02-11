import { useState } from "react"

export function AboutCalculator() {
    const [showHelp, setShowHelp] = useState<boolean>(false)
    return (
        <div className="w-[100%]">
            <h1 className="text-xl">Pokemon EV Visualizer <span className="text-blue-700 underline hover:font-bold cursor-pointer" onClick={() => setShowHelp(prev => !prev)}>{showHelp ? "Hide Help" : "Help"}</span></h1>
            {showHelp ? <p className="text-sm">This tool helps optimize your Pokemon's EV Investment by helping identify "jump numbers", or EV values where you get more damage or survivability for your marginal investment</p>
                : <div className="flex flex-col gap-1 text-sm">
                    <p>This tool allows has two modes, that can be toggled by changing "Fixed EVs" in the Graph Options section.</p>
                    <p>Fixing Atk EVs shows how much damage an attacker can do to a defender with defense invesment ranging from 0- to 255+.</p>
                    <p>Fixing Def EVs shows how much damage an defender takes from an attacker with offense invesment ranging from 0- to 255+.</p>
                    <p>HP EVs are always fixed. Both fixed stats can by varied by dragging the sliders above the graph or changing the EVs in your set.</p>
                    <p className="text-lg">Choose a damaging attack to get started!</p>
                </div>}
        </div>
    )
}