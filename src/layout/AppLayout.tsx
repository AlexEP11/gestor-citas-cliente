import { Outlet, Link } from "react-router-dom";
import Logo from "../components/Logo";
import { NavMenu } from "../components/NavMenu";

export default function AppLayout() {
    return (
        <>
            <header className="bg-ebony_black  p-10">
                <div className="flex flex-col gap-7 px-2 lg:flex-row lg:gap-0 lg:px-0 items-center justify-between">
                    <div className="flex items-center gap-3 justify-center">
                        <Logo />
                        <Link className="font-outfit font-bold text-3xl text-white" to="/">
                            King´s Man Barberia
                        </Link>
                    </div>

                    <NavMenu />
                </div>
            </header>

            <main className="container max-w-screen-xl mx-auto mt-10 p-5">
                <Outlet />
            </main>
        </>
    );
}
