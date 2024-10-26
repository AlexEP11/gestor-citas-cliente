import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppointmentFormData } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment, rescheduleAppointment } from "../../api/AppointmentAPI";
import { toast } from "react-toastify";
import { useState } from "react"; // Importar useState
import FormReschedule from "../../components/reschedule/FormReschedule";

export default function RescheduleView() {
    const initialValues: AppointmentFormData = {
        id_cliente: 0,
        id_servicio: 0,
        fecha_inicio: "",
        hora_inicio: "",
    };

    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();
    const { clientId, clientName, citaId } = location.state || {};
    const [resetStatesForm, setResetStatesForm] = useState(false); // Estado para reiniciar los estados del formulario

    // Hook de formulario para la cita
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
        clearErrors,
    } = useForm({ defaultValues: initialValues });

    console.log(clientName);
    // Estado para controlar la carga
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reagenda la cita
    const { mutate: rescheduleAppointmentMutate } = useMutation({
        mutationKey: ["rescheduleAppointment"],
        mutationFn: () => rescheduleAppointment(citaId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["appointmentFilter"],
                exact: true,
            });
        },
        onError: () => {
            toast.error("Ocurrió un error al reagendar la cita");
        },
    });

    const { mutate } = useMutation({
        mutationKey: ["createAppointment"],
        mutationFn: createAppointment,
        onSuccess: (data) => {
            rescheduleAppointmentMutate();
            toast.success(data.message);
            reset();
            setIsSubmitting(false); // Restablecer el estado después de la mutación
        },
        onError: () => {
            toast.error("Ocurrió un error al registrar la cita");
            setIsSubmitting(false); // Restablecer el estado en caso de error
        },
    });

    const handleForm = (data: AppointmentFormData) => {
        const dataFinal = {
            ...data,
            id_cliente: clientId,
            fecha_inicio: `${data.fecha_inicio} ${data.hora_inicio}`,
        };
        setIsSubmitting(true);
        setResetStatesForm(true);
        mutate(dataFinal);
        // Maybe aqui poner lo del location.state en 0
        navigate("/citas");
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-outfit font-extrabold text-black">Reagendar Cita</h1>
                <p className="text-2xl mt-5 text-dark_earth font-bold">
                    Llena el siguiente formulario para reagendar una cita
                </p>

                <nav className="mt-5 mb-10 flex flex-col md:flex-row justify-between gap-6">
                    <Link
                        className="bg-scarlet_red hover:bg-deep_crimson cursor-pointer px-10 py-3 rounded-md font-outfit text-white font-bold transition-colors text-center"
                        to="/citas"
                    >
                        Agenda de Citas
                    </Link>
                </nav>

                <form
                    className="bg-silver_fog shadow-md p-10 rounded-md mt-10"
                    noValidate
                    onSubmit={handleSubmit(handleForm)}
                >
                    <FormReschedule
                        register={register}
                        errors={errors}
                        trigger={trigger}
                        clearErrors={clearErrors}
                        resetStatesForm={resetStatesForm}
                        clientName={clientName}
                    />

                    <input
                        type="submit"
                        className={`w-full p-3 font-bold text-white uppercase rounded-md mt-3 transition-colors ${
                            isSubmitting || !clientName
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-dark_earth hover:bg-black"
                        }`}
                        value={
                            isSubmitting
                                ? "Reagendando..."
                                : !clientName
                                ? "No hay usuario para reagendar"
                                : "Reagendar Cita"
                        }
                        disabled={isSubmitting || !clientName}
                    />
                </form>
            </div>
        </>
    );
}
