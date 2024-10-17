import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormClient from "../../components/clients/FormClient";

export default function CreateClient() {
    const initialValues = {
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        telefono: "",
    };

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
                    Registrar Cliente
                </h1>
                <p className="text-2xl mt-5 text-bronze_earth font-bold">
                    Llena el siguiente formulario para registrar un nuevo cliente
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
                    onSubmit={handleSubmit(handleForm)}
                >
                    <FormClient register={register} errors={errors} />

                    <input
                        type="submit"
                        className="w-full bg-bronze_earth p-3 font-bold text-white uppercase rounded-md cursor-pointer hover:bg-[#473c2f] transition-colors"
                        value="Registrar Cliente"
                    />
                </form>
            </div>
        </>
    );
}
