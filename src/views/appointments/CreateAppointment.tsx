import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormAppointment from "../../components/appointments/FormAppointment";
import { AppointmentFormData } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { createAppointment } from "../../api/AppointmentAPI";
import { toast } from "react-toastify";

export default function CreateAppointment() {
    const initialValues: AppointmentFormData = {
        id_barbero: 1, // Cambiar dinamicamente
        id_cliente: 0,
        id_servicio: 0,
        fecha_inicio: "",
        hora_inicio: "",
    };

    // Hook de formulario para la cita
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationKey: ["createAppointment"],
        mutationFn: createAppointment,
        onSuccess: (data) => {
            toast.success(data.message);
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleForm = (data: AppointmentFormData) => {
        const dataFinal = { ...data, fecha_inicio: `${data.fecha_inicio} ${data.hora_inicio}` };
        mutate(dataFinal);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-outfit font-extrabold text-charcoal">
                    Registrar Cita
                </h1>
                <p className="text-2xl mt-5 text-bronze_earth font-bold">
                    Llena el siguiente formulario para registrar una cita
                </p>

                <nav className="mt-5 mb-10 flex flex-col md:flex-row justify-between gap-6">
                    <Link
                        className="bg-steelGray hover:bg-deep_teal cursor-pointer px-10 py-3 rounded-md font-outfit text-white font-bold transition-colors text-center"
                        to="/"
                    >
                        Agenda de Citas
                    </Link>
                </nav>

                <form
                    className="bg-ivory_sand shadow-md p-10 rounded-md mt-10"
                    noValidate
                    onSubmit={handleSubmit(handleForm)}
                >
                    <FormAppointment register={register} errors={errors} />

                    <input
                        type="submit"
                        className="w-full bg-bronze_earth p-3 font-bold text-white uppercase rounded-md cursor-pointer mt-3 hover:bg-[#473c2f] transition-colors"
                        value="Registrar Cita"
                    />
                </form>
            </div>
        </>
    );
}
