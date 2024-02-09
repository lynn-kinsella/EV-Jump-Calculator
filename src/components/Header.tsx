import { Link } from "react-router-dom";
import silkendev from "../assets/silkendev.svg"

export function Header() {
    return (
        <div className="flex flex-row h-32 pt-5 px-5">
            <LogoBadge></LogoBadge>
        </div>
    );
}

function LogoBadge({ }) {
    return (
        <Link to="/"
            className="py-4 px-5 cursor-pointer border border-black rounded-2xl h-[100%] bg-gradient-to-t to-white from-yellow-100">
            <img className="h-[100%]" src={silkendev} loading="lazy" alt="logo" />
        </Link>
    )
}
