import { ContainerProps } from "../pages/evCalcs/ui/ThemeContainer";
import { Footer } from "./Footer";
import { Header } from "./Header";

function Layout({ children }: ContainerProps) {
    return (
        <>
            <div className="min-h-[100vh] flex flex-col justify-between sm:px-[20%] gap-2">
                <Header></Header>
                {children}
                <Footer></Footer>
            </div>
        </>
    )
}
export default Layout

