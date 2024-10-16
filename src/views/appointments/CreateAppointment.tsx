import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function CreateAppointment() {
    const [secondForm, setSecondForm] = useState(false);

    const handleSumbitClient = (e: FormEvent) => {
        e.preventDefault();
        setSecondForm(false);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-outfit font-extrabold  text-charcoal">
                    Registrar Cita
                </h1>
                <p className="text-2xl mt-5 text-bronze_earth font-bold">
                    Llena el siguiente formulario para registrar una cita
                </p>

                <nav className="mt-5 mb-10 flex flex-col md:flex-row justify-between gap-6">
                    <Link
                        className="bg-steelGray hover:bg-deep_teal cursor-pointer px-10 py-3 rounded-md text-white font-bold transition-colors text-center"
                        to="/"
                    >
                        Agenda de Citas
                    </Link>
                    <button
                        className="border-none bg-steelGray hover:bg-deep_teal cursor-pointer px-10 py-3 rounded-md text-white font-bold transition-colors"
                        onClick={() => setSecondForm(!secondForm)}
                    >
                        {secondForm ? "Cancelar" : "Registrar Cliente"}
                    </button>
                </nav>

                {secondForm && (
                    <form
                        className="bg-ivory_sand shadow-md p-10 rounded-md mt-10"
                        onSubmit={handleSumbitClient}
                    >
                        <input
                            type="submit"
                            className="w-full bg-bronze_earth p-3 font-bold text-white uppercase rounded-md cursor-pointer hover:bg-[#473c2f] transition-colors"
                            value="Registrar Cliente"
                        />
                    </form>
                )}

                <form className="bg-ivory_sand shadow-md p-10 rounded-md mt-10">
                    <input
                        type="submit"
                        className="w-full bg-bronze_earth p-3 font-bold text-white uppercase rounded-md cursor-pointer hover:bg-[#473c2f] transition-colors"
                        value="Registrar Cita"
                    />
                </form>
            </div>
        </>
    );
}
