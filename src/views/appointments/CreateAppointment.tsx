import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormAppointment from "../../components/appointments/FormAppointment";

export default function CreateAppointment() {
    const initialValues = {
        id_cliente: "",
        id_servicio: "",
        id_barbero: 0,
        fecha_inicio: "",
        hora_inicio: "",
        id_estado: 1,
    };

    // Hook de formulario para la cita
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const handleForm = (data: any) => {
        console.log(data);
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
