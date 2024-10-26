import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

export const NavMenu = () => {
    const navigate = useNavigate(); // Hook para redireccionar

    // Función para cerrar sesión
    const handleLogout = () => {
        // Eliminar los tokens del localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Redirigir a la página de inicio de sesión
        navigate("/");
    };

    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-scarlet_red hover:bg-deep_crimson transition-colors">
                <Bars3Icon className="w-8 h-8 text-white " />
            </PopoverButton>

            <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
                    <div className="w-full lg:w-56 shrink rounded-xl bg-scarlet_red p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        <p className="text-center text-white font-outfit">Menú de Opciones</p>
                        <Link
                            to="/citas"
                            className="block p-2 text-white hover:scale-105 duration-300 font-outfit "
                        >
                            Agenda De Citas
                        </Link>
                        <Link
                            to="/citas/agendar"
                            className="block p-2 text-white hover:scale-105 duration-300 font-outfit "
                        >
                            Registrar Cita
                        </Link>
                        <Link
                            to="/clientes/registrar"
                            className="block p-2 text-white hover:scale-105 duration-300 font-outfit "
                        >
                            Registrar Cliente
                        </Link>
                        <Link
                            to="/citas/historial"
                            className="block p-2 text-white hover:scale-105 duration-300 font-outfit "
                        >
                            Historial de Citas
                        </Link>
                        <button
                            className="block p-2 text-white hover:scale-105 duration-300 font-outfit"
                            type="button"
                            onClick={handleLogout} // Llama a la función de cerrar sesión
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </PopoverPanel>
            </Transition>
        </Popover>
    );
};
