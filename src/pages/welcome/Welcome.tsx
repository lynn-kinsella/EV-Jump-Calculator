import { Link } from "react-router-dom";

export default function Welcome() {
    return (
        <div className="flex flex-col">
            <span>Welcome</span>
            <Link to="/asdf">Error</Link>
            <Link to="/calculator">EVCalcs</Link>
        </div>
    )
}