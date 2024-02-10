import { Link, Route, Routes } from "react-router-dom";
import { ContainerProps } from "./ThemeContainer";
import { EVCalcCredits } from "../pages/evCalcs/credit";

export function Footer() {
    return (
        <div className="w-[100%] h-[100%] px-5">
            <div className="py-4 gap-10 px-5 flex flex-row border border-black rounded-2xl bg-gradient-to-t to-white from-yellow-100 w-[100%] h-fit">
                <FooterColumn title={"Pages"}>
                    <Link to="" className="underline">Home</Link>
                    <Link to="calculator" className="underline">EV Visualizer</Link>
                </FooterColumn>

                <FooterColumn title={"Contact"}>
                    <a href="mailto:silkendev@gmail.com" className="underline">Send Feedback</a>
                </FooterColumn>

                <Routes>
                    <Route path="calculator" element={
                        <FooterColumn title={"Credit"}>{EVCalcCredits()}</FooterColumn>
                    }>
                    </Route>

                </Routes>
            </div>
        </div>
    );
}


interface FooterColumnProps extends ContainerProps {
    title: string;
}

function FooterColumn({ title, children }: FooterColumnProps) {
    return (
        <div className="flex flex-col w-[100%]">
            <span className="text-lg font-bold">{title}</span>
            <div className="flex flex-col gap-x-2 gap-y-0.5 flex-wrap max-h-16 pl-2">
                {children}
            </div>
        </div>
    )
}