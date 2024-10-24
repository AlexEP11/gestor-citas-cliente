import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormClient from "../../components/clients/FormClient";
import { ClientFormData } from "../../types";
import { createClient } from "../../api/ClientAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateClient() {
    const navigate = useNavigate();

    const initialValues: ClientFormData = {
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

    const { mutate } = useMutation({
        mutationFn: createClient,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleForm = async (formData: ClientFormData) => {
        mutate(formData);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-outfit font-extrabold text-black">
                    Registrar Cliente
                </h1>
                <p className="text-2xl mt-5 text-dark_earth font-bold">
                    Llena el siguiente formulario para registrar un nuevo cliente
                </p>

                <nav className="mt-5 mb-10 flex flex-col md:flex-row justify-between gap-6">
                    <Link
                        className="bg-scarlet_red hover:bg-deep_crimson cursor-pointer px-10 py-3 rounded-md font-outfit text-white font-bold transition-colors text-center"
                        to="/"
                    >
                        Agenda de Citas
                    </Link>
                    <Link
                        className="bg-scarlet_red hover:bg-deep_crimson cursor-pointer px-10 py-3 rounded-md font-outfit text-white font-bold transition-colors text-center"
                        to="/citas/agendar"
                    >
                        Registrar Cita
                    </Link>
                </nav>

                <form
                    className="bg-silver_fog shadow-md p-10 rounded-md mt-10"
                    onSubmit={handleSubmit(handleForm)}
                >
                    <FormClient register={register} errors={errors} />

                    <input
                        type="submit"
                        className="w-full bg-dark_earth p-3 font-bold text-white uppercase rounded-md cursor-pointer hover:bg-[#473c2f] transition-colors"
                        value="Registrar Cliente"
                    />
                </form>
            </div>
        </>
    );
}
