import { Link } from "react-router-dom";
import Schedule from "../components/schedule/Schedule";

// Configuración del localizador

export default function DashboardView() {
    return (
        <>
            <h1 className="text-5xl font-outfit font-extrabold  text-charcoal">Agenda De Citas</h1>
            <p className="text-2xl mt-5 text-dark_earth font-bold">Maneja y administra tus citas</p>

            <nav className="mt-5 mb-10 flex flex-col md:flex-row gap-7 text-center justify-between">
                <Link
                    className="bg-scarlet_red hover:bg-deep_crimson cursor-pointer px-10 py-3 rounded-md text-white font-bold font-outfit transition-colors"
                    to="/citas/agendar"
                >
                    Registrar Cita
                </Link>
                <Link
                    className="bg-scarlet_red hover:bg-deep_crimson cursor-pointer px-10 py-3 rounded-md text-white font-bold font-outfit transition-colors"
                    to="/clientes/registrar"
                >
                    Registrar Cliente
                </Link>
            </nav>

            <Schedule />
        </>
    );
}
