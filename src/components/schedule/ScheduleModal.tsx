import { useEffect, MouseEvent, useState } from "react";
import ReactDOM from "react-dom";
import { Appointment } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment, rescheduleAppointment } from "../../api/AppointmentAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";

type ScheduleModalProps = {
    isOpen: boolean;
    onClose: () => void;
    cita: {
        cliente: string | number;
        hora_inicio: Appointment["fecha_inicio"];
        servicio: Appointment["id_servicio"];
    };
    citaId: Appointment["id_cita"];
};

export default function ScheduleModal({ isOpen, onClose, cita, citaId }: ScheduleModalProps) {
    const modalRoot = document.getElementById("modal-root");

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const [isRescheduling, setIsRescheduling] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const queryClient = useQueryClient();

    const { mutate: rescheduleAppointmentMutate } = useMutation({
        mutationKey: ["rescheduleAppointment"],
        mutationFn: () => rescheduleAppointment(citaId),
        onSuccess: () => {
            toast.info(`Reagende la cita de ${cita.cliente}`);
            onClose();
            queryClient.invalidateQueries({
                queryKey: ["appointmentFilter"],
                exact: true,
            });
            setIsRescheduling(false);
        },
        onError: () => {
            toast.error("Ocurrió un error al reagendar la cita");
            setIsRescheduling(false);
        },
    });

    const { mutate: cancelAppointmentMutate } = useMutation({
        mutationKey: ["cancelAppointment"],
        mutationFn: () => cancelAppointment(citaId),
        onSuccess: () => {
            toast.success("Cita cancelada correctamente");
            onClose();
            queryClient.invalidateQueries({
                queryKey: ["appointmentFilter"],
                exact: true,
            });
            setIsCancelling(false);
        },
        onError: () => {
            toast.error("Ocurrió un error al cancelar la cita");
            setIsCancelling(false);
        },
    });

    if (!isOpen || !modalRoot) return null;

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleClickReschedule = async () => {
        setIsRescheduling(true);
        rescheduleAppointmentMutate();
        navigate("/citas/agendar"); // Cambiar a navigate para redirigir
    };

    const handleClickCancel = () => {
        setIsCancelling(true);
        cancelAppointmentMutate();
    };

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-silver_fog p-5 md:p-10 rounded-lg shadow-lg w-11/12 md:w-6/12 ">
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
                            value={moment(new Date(cita?.hora_inicio)).format("HH:mm A")}
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
                    <button
                        className={`px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 ${
                            isRescheduling && "bg-yellow-300 cursor-not-allowed"
                        }`}
                        onClick={handleClickReschedule}
                        disabled={isRescheduling}
                    >
                        {isRescheduling ? "Reagendando..." : "Reagendar Cita"}
                    </button>
                    <button
                        className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${
                            isCancelling && "bg-red-300 cursor-not-allowed"
                        }`}
                        onClick={handleClickCancel}
                        disabled={isCancelling}
                    >
                        {isCancelling ? "Cancelando..." : "Cancelar Cita"}
                    </button>
                </div>
            </div>
        </div>,
        modalRoot
    );
}
