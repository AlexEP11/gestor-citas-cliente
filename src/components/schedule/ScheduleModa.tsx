import { useEffect, MouseEvent } from "react";
import ReactDOM from "react-dom";

type ScheduleModalProps = {
    isOpen: boolean;
    onClose: () => void;
    // Modificar este tipo para las verdaderas citas
    cita: {
        cliente: string;
        hora_inicio: string;
        servicio: string;
    };
};

export default function ScheduleModal({ isOpen, onClose, cita }: ScheduleModalProps) {
    const modalRoot = document.getElementById("modal-root");

    // Efecto para manejar el scroll del body
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Deshabilitar el scroll
        } else {
            document.body.style.overflow = "unset"; // Habilitar el scroll
        }

        // Cleanup: Restaurar el scroll cuando el componente se desmonte
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !modalRoot) return null; // Verifica si está abierto y si modalRoot existe

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        // Verifica si el clic se realizó en el fondo (backdrop) y no en el contenido del modal
        if (e.target === e.currentTarget) {
            onClose(); // Cerrar el modal
        }
    };

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-ivory_sand p-5 md:p-10 rounded-lg shadow-lg w-11/12 md:w-6/12 ">
                <h2 className="text-xl md:text-2xl font-extrabold text-center mb-4 font-outfit">
                    Detalles de la Cita
                </h2>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="cliente" className="text-base font-bold ">
                            Cliente:
                        </label>
                        <input
                            type="text"
                            id="cliente"
                            className="block w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                            value={cita?.cliente}
                            disabled
                        />
                    </div>

                    <div>
                        <label htmlFor="hora" className="text-base font-bold ">
                            Hora inicio:
                        </label>
                        <input
                            type="text"
                            id="hora"
                            className="block w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                            value={cita?.hora_inicio}
                            disabled
                        />
                    </div>

                    <div>
                        <label htmlFor="servicio" className="text-base font-bold ">
                            Servicio:
                        </label>
                        <input
                            type="text"
                            id="servicio"
                            className="block w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                            value={cita?.servicio}
                            disabled
                        />
                    </div>
                </div>

                <div className="mt-10 flex justify-end gap-8">
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                        Posponer Cita
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                        Cancelar Cita
                    </button>
                </div>
            </div>
        </div>,
        modalRoot
    );
}
