import { Link } from "react-router-dom";
import Schedule from "../components/Schedule";

// Configuración del localizador

export default function DashboardView() {
    return (
        <>
            <h1 className="text-5xl font-outfit font-extrabold  text-charcoal">Agenda De Citas</h1>
            <p className="text-2xl mt-5 text-bronze_earth font-bold">
                Maneja y administra tus citas
            </p>

            <nav className="mt-5 mb-10">
                <Link
                    className="bg-steelGray hover:bg-deep_teal cursor-pointer px-10 py-3 rounded-md text-white font-bold transition-colors"
                    to="/citas/agendar"
                >
                    Registrar Cita
                </Link>
            </nav>

            <Schedule />
        </>
    );
}
