import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-[#141218] p-16">
            <div className="flex flex-col gap-7 px-2 lg:flex-row lg:gap-0 lg:px-0 items-center justify-between">
                <div className="flex items-center gap-3 justify-center">
                    <img
                        src="/logo-barber.png"
                        alt="Logo de King´s Man Barberia"
                        className="max-w-24 "
                    />
                    <h2 className="font-outfit font-bold text-3xl text-lightest_gray  ">
                        King´s Man Barberia
                    </h2>
                </div>

                <nav className="flex gap-4 md:gap-7 ">
                    <Link
                        to="/"
                        className="text-lightest_gray  text-xl uppercase font-outfit font-bold duration-300 hover:text-purple hover:scale-105"
                    >
                        Calendario
                    </Link>
                    <Link
                        to="/"
                        className="text-lightest_gray  text-xl uppercase font-outfit font-bold duration-300  hover:text-purple hover:scale-105"
                    >
                        Agendar
                    </Link>
                    <Link
                        to="/"
                        className="text-lightest_gray  text-xl uppercase font-outfit font-bold duration-300  hover:text-purple hover:scale-105"
                    >
                        Historial
                    </Link>
                </nav>
            </div>
        </header>
    );
}
