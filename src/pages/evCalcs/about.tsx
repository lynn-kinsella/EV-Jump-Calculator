import { useState } from "react"

export function AboutCalculator() {
    const [showHelp, setShowHelp] = useState<boolean>(false)
    return (
        <div className="w-[100%]">
            <div className="flex w-[100%] flex-row gap-4 pr-2">
	    	<h1 className="text-xl">Pokemon EV Visualizer</h1>
	    	<h2 className="text-xl text-blue-700 underline hover:font-bold cursor-pointer" onClick={() => setShowHelp(prev => !prev)}>{showHelp ? "Hide Help" : "Help"}</h2>
	    </div>
            {!showHelp ? <span  className="text-sm">
	    <p>This tool is a visual damage calculator and EV optimizer built for Pokemon Scarlet and Violet VGC.</p> 
	    <p>It is designed to help you choose the best EV investment by letting you see exactly where "jump numbers" are.</p>
	    <p>Jump numbers are EV values where you get more damage or survivability for your marginal investment, helping you get the most value out of each point you have for the matchups that matter.</p>
	    </span>
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
