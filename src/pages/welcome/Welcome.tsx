import { Link } from "react-router-dom";
import { ContainerProps } from "../../components/ThemeContainer";
import visualizer from "../../assets/visualizer.png"

export default function Welcome() {
    return (
        <div className="flex-grow w-[100%] px-5 flex flex-col gap-2">
            <Hero></Hero>
            <ProjectEntry link={"calculator"} title={"Pokemon EV Visualizer"} image={visualizer}>
                <span>When teambuilding for competitive Pokemon, it can be hard to tell how an EV investment translates into damage or survivability.</span>
                <span>This tool visualizes the space of possible damage so the user can optimize their EVs to squeeze the most out of their stats.</span>
            </ProjectEntry>
        </div>
    )
}

function Hero() {
    return (
        <div className="border bg-gradient-to-t to-white from-yellow-100 p-5 rounded-xl gap-2 flex flex-col sm:max-w-[50%]">
            <div>
                <span className="text-4xl">Welcome!</span>
            </div>
            <div>
                <span className="text-xl"><p>This site is a collection of tools and projects that I have built for myself and want to share with the world!</p></span>
            </div>
        </div>
    )
}

interface ProjectEntryProps extends ContainerProps {
    link: string;
    title: string;
    image: string;
}

function ProjectEntry({ link, children, title, image }: ProjectEntryProps) {
    return (
        <div className="border bg-yellow-100  p-5 rounded-xl gap-2 flex flex-col">
            <Link to={link}>
                <div><span className="text-2xl underline">{title}</span></div>
            </Link>
            <div className="flex flex-row gap-4 h-32 ">
                <div className="max-w-32 p-2 bg-white shadow-inner shadow-gray-400">
                    {/* <div className="w-[100%] h-[100%] bg-contain bg-no-repeat bg-center border" style={{ backgroundImage: `url(${image})` }} /> */}
                    <img className="w-[100%]" src={image} alt="" />
                </div>
                <div className="w-[100%] h-[100%] overflow-y-scroll p-2 sm:text-lg bg-white shadow-inner shadow-gray-400">{children}</div>

            </div>
        </div>
    )
}