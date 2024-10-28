import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormClient from "../../components/clients/FormClient";
import { ClientFormData } from "../../types";
import { createClient } from "../../api/ClientAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function CreateClient() {
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
        reset,
    } = useForm({ defaultValues: initialValues });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { mutate } = useMutation({
        mutationFn: createClient,
        onSuccess: (data) => {
            toast.success(data.message);
            setIsSubmitting(false); // Restablecer el estado después de la mutación
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleForm = async (formData: ClientFormData) => {
        setIsSubmitting(true); // Establecer el estado a verdadero al enviar el formulario
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
                        to="/citas"
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
                        className={`w-full p-3 font-bold text-white uppercase rounded-md cursor-pointer mt-3 transition-colors ${
                            isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-dark_earth hover:bg-black"
                        }`}
                        value={isSubmitting ? "Registrando..." : "Registrar Cliente"}
                        disabled={isSubmitting} // Deshabilitar el botón si se está enviando/>
                    />
                </form>
            </div>
        </>
    );
}
