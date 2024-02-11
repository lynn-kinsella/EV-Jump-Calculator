import { ContainerProps } from "./ThemeContainer";
import { Footer } from "./Footer";
import { Header } from "./Header";

function Layout({ children }: ContainerProps) {
    return (
        <>
            <div className="min-h-[100vh] h-[100%] w-[100%] flex flex-col gap-2 sm:px-[20%] border-black text-black bg-white">
                <Header></Header>
                {children}
                <Footer></Footer>
            </div>
        </>
    )
}
export default Layout

