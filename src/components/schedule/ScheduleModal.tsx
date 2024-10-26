import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useEffect, MouseEvent, useState } from "react";
import {
    cancelAppointment,
    completeAppointment,
    missedAppointment,
} from "../../api/AppointmentAPI";
import { Appointment } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";

type ScheduleModalProps = {
    isOpen: boolean;
    onClose: () => void;
    citaId: Appointment["id_cita"];
    cita: {
        cliente: string | number;
        hora_inicio: Appointment["fecha_inicio"];
        servicio: Appointment["id_servicio"];
        id_estado: Appointment["id_estado"];
        id_cliente: Appointment["id_cliente"];
        id_servicio: Appointment["id_servicio"];
    };
};

export default function ScheduleModal({ isOpen, onClose, cita, citaId }: ScheduleModalProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const [isCompleting, setIsCompleting] = useState(false);
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [isMissing, setIsMissing] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [isConfirmingCancel, setIsConfirmingCancel] = useState(false); // Nuevo estado para el modal de confirmación

    // Completa la cita
    const { mutate: completeAppointmentMutate } = useMutation({
        mutationKey: ["completeAppointment"],
        mutationFn: () => completeAppointment(citaId),
        onSuccess: () => {
            toast.success("Cita completada correctamente");
            onClose();
            queryClient.invalidateQueries({
                queryKey: ["appointmentFilter"],
                exact: true,
            });
            setIsRescheduling(false);
        },
        onError: () => {
            toast.error("Ocurrió un error al completar la cita");
            setIsRescheduling(false);
        },
    });

    // Faltó a la cita
    const { mutate: missedAppointmentMutate } = useMutation({
        mutationKey: ["missedAppointment"],
        mutationFn: () => missedAppointment(citaId),
        onSuccess: () => {
            toast.success(`Cita de ${cita.cliente} marcada como no asistida`);
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

    // Cancela la cita
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

    // Manejador para el clic en el fondo del modal
    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Manejadores de clic para cada acción
    const handleClickComplete = () => {
        setIsCompleting(true);
        completeAppointmentMutate();
    };

    const handleClickReschedule = async () => {
        setIsRescheduling(true);
        toast.info(`Reagende la cita de ${cita.cliente}`);
        navigate("/citas/reagendar", {
            state: {
                clientId: cita.id_cliente,
                clientName: cita.cliente,
                citaId,
            },
        });
    };

    const handleClickMissed = () => {
        setIsMissing(true);
        missedAppointmentMutate();
    };

    const handleClickCancel = () => {
        setIsConfirmingCancel(true); // Abrir el modal de confirmación
    };

    const handleConfirmCancel = () => {
        setIsCancelling(true);
        cancelAppointmentMutate();
        setIsConfirmingCancel(false); // Cerrar el modal de confirmación
    };

    const handleCancelCancel = () => {
        setIsConfirmingCancel(false); // Cerrar el modal de confirmación
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" onClick={handleBackdropClick} />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                                            value={moment(new Date(cita?.hora_inicio)).format(
                                                "HH:mm A"
                                            )}
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

                                <div className="mt-10 w-full flex flex-col gap-5 justify-center lg:flex-row lg:gap-8 lg:justify-end">
                                    {cita.id_estado === 1 && (
                                        <>
                                            <button
                                                className={`px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 ${
                                                    isRescheduling &&
                                                    "bg-yellow-300 cursor-not-allowed"
                                                }`}
                                                onClick={handleClickReschedule}
                                                disabled={isRescheduling}
                                            >
                                                {isRescheduling
                                                    ? "Reagendando..."
                                                    : "Reagendar Cita"}
                                            </button>

                                            <button
                                                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${
                                                    isCancelling && "bg-red-300 cursor-not-allowed"
                                                } w-full lg:w-auto`}
                                                onClick={handleClickCancel}
                                                disabled={isCancelling}
                                            >
                                                {isCancelling ? "Cancelando..." : "Cancelar Cita"}
                                            </button>
                                        </>
                                    )}

                                    {cita.id_estado === 2 && (
                                        <button
                                            className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${
                                                isCompleting && "bg-green-300 cursor-not-allowed"
                                            }`}
                                            onClick={handleClickComplete}
                                            disabled={isCompleting}
                                        >
                                            {isCompleting ? "Completando..." : "Completar Cita"}
                                        </button>
                                    )}

                                    {cita.id_estado === 3 && (
                                        <button
                                            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                                                isMissing && "bg-blue-300 cursor-not-allowed"
                                            }`}
                                            onClick={handleClickMissed}
                                            disabled={isMissing}
                                        >
                                            {isMissing ? "Marcando..." : "No Asistió"}
                                        </button>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>

                {/* Modal de confirmación de cancelación */}
                <Transition appear show={isConfirmingCancel} as={Fragment}>
                    <Dialog as="div" className="relative z-20" onClose={handleCancelCancel}>
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/50" />
                        </TransitionChild>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <DialogPanel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <DialogPanel
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Confirmar Cancelación
                                        </DialogPanel>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                ¿Estás seguro de que deseas cancelar esta cita?
                                            </p>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                type="button"
                                                className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                                onClick={handleCancelCancel}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                                onClick={handleConfirmCancel}
                                            >
                                                Aceptar
                                            </button>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </Dialog>
        </Transition>
    );
}
