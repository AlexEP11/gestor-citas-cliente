import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type FormClientProps = {
    register: UseFormRegister<{
        nombre: string;
        telefono: string;
    }>;
    errors: FieldErrors<{
        nombre: string;
        telefono: string;
    }>;
};

export default function FormClient({ register, errors }: FormClientProps) {
    return (
        <>
            <div className="space-y-3 mb-5 flex flex-col">
                <label htmlFor="nombre" className="text-base font-bold uppercase">
                    Nombre del cliente
                </label>
                <input
                    type="text"
                    id="nombre"
                    placeholder="Ej: Jose Lopez Martinez Gaspar"
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("nombre", {
                        required: "El nombre es obligatorio",
                    })}
                />

                {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
            </div>
            <div className="space-y-3 mb-5 flex flex-col">
                <label htmlFor="telefono" className="text-base font-bold uppercase">
                    Telefono
                </label>
                <input
                    type="tel"
                    id="telefono"
                    placeholder="Ej: 3421018315"
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("telefono", {
                        required: "El telefono es obligatorio",
                    })}
                />

                {errors.telefono && <ErrorMessage>{errors.telefono.message}</ErrorMessage>}
            </div>
        </>
    );
}
