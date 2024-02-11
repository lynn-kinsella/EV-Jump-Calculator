import { Link, Route, Routes } from "react-router-dom";
import Logo from "../assets/silkendev.svg";
import { ContainerProps } from "./ThemeContainer";
import { AboutCalculator } from "../pages/evCalcs/about";

export function Header() {
    return (
        <div className="flex sm:flex-row flex-col justify-center items-end sm:justify-start min-h-32 pt-5 px-5 w-[100%] gap-x-2 gap-y-2">
            <LogoBadge></LogoBadge>
            <Routes>
                <Route path="/calculator" element={<ProjectDetails><AboutCalculator></AboutCalculator></ProjectDetails>}></Route>
            </Routes>
        </div>
    );
}

function LogoBadge({ }) {
    return (
        <div className="w-[100%] max-w-[30rem]">
            <Link to="/">
                <div
                    className="py-4 px-5 cursor-pointer border border-black rounded-2xl h-32 bg-gradient-to-t to-white from-yellow-100 w-[100%] max-w-fit">
                    <img className="h-[100%]" src={Logo} alt="logo" rel="pre" />
                </div>
            </Link>
        </div>
    )
}

function ProjectDetails({ children }: ContainerProps) {
    if (children != undefined) {
        return (
            <div className="py-4 px-5 border border-black rounded-xl bg-gradient-to-t to-white from-yellow-100 w-[100%] max-w-[50rem] h-32" >
                <div className="h-[100%] overflow-y-auto pr-1">
                    {children}
                </div>
            </div>
        )
    }
}