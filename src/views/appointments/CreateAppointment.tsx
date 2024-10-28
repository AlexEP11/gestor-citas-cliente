import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormAppointment from "../../components/appointments/FormAppointment";
import { AppointmentFormData } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { createAppointment } from "../../api/AppointmentAPI";
import { toast } from "react-toastify";
import { useState } from "react"; // Importar useState

export default function CreateAppointment() {
    const initialValues: AppointmentFormData = {
        id_cliente: 0,
        id_servicio: 0,
        fecha_inicio: "",
        hora_inicio: "",
    };

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

    // Estado para controlar la carga
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { mutate } = useMutation({
        mutationKey: ["createAppointment"],
        mutationFn: createAppointment,
        onSuccess: (data) => {
            toast.success(data.message);
            reset();
            setIsSubmitting(false); // Restablecer el estado después de la mutación
            setResetStatesForm(false); // Restablecer el estado para reiniciar los estados del formulario
        },
        onError: () => {
            toast.error("Ocurrió un error al registrar la cita");
            setIsSubmitting(false); // Restablecer el estado en caso de error
        },
    });

    const handleForm = (data: AppointmentFormData) => {
        const dataFinal = { ...data, fecha_inicio: `${data.fecha_inicio} ${data.hora_inicio}` };
        setIsSubmitting(true); // Establecer el estado a verdadero al enviar el formulario
        setResetStatesForm(true); // Establecer el estado para reiniciar los estados del formulario
        mutate(dataFinal);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-outfit font-extrabold text-black">Registrar Cita</h1>
                <p className="text-2xl mt-5 text-dark_earth font-bold">
                    Llena el siguiente formulario para registrar una cita
                </p>

                <nav className="mt-5 mb-10 flex flex-col md:flex-row justify-between gap-6">
                    <Link
                        className="bg-scarlet_red hover:bg-deep_crimson cursor-pointer px-10 py-3 rounded-md font-outfit text-white font-bold transition-colors text-center"
                        to="/citas"
                    >
                        Agenda de Citas
                    </Link>
                    <Link
                        className="bg-scarlet_red hover:bg-deep_crimson cursor-pointer px-10 py-3 rounded-md font-outfit text-white font-bold transition-colors text-center"
                        to="/clientes/registrar"
                    >
                        Registrar Cliente
                    </Link>
                </nav>

                <form
                    className="bg-silver_fog shadow-md p-10 rounded-md mt-10"
                    noValidate
                    onSubmit={handleSubmit(handleForm)}
                >
                    <FormAppointment
                        register={register}
                        errors={errors}
                        trigger={trigger}
                        clearErrors={clearErrors}
                        resetStatesForm={resetStatesForm}
                    />

                    <input
                        type="submit"
                        className={`w-full p-3 font-bold text-white uppercase rounded-md cursor-pointer mt-3 transition-colors ${
                            isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-dark_earth hover:bg-black"
                        }`}
                        value={isSubmitting ? "Registrando..." : "Registrar Cita"}
                        disabled={isSubmitting} // Deshabilitar el botón si se está enviando
                    />
                </form>
            </div>
        </>
    );
}
