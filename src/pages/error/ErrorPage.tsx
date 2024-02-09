import { PageProps } from "../../App";

export default function ErrorPage({ updatePage }: PageProps) {
    return (
        <div className="flex flex-col">
            <span>Page Not Found</span>
            <div onClick={() => updatePage("")}>Home</div>
        </div>
    )
}