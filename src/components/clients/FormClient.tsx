import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type FormClientProps = {
    register: UseFormRegister<{
        nombre: string;
        apellido_paterno: string;
        apellido_materno: string;
        telefono: string;
    }>;
    errors: FieldErrors<{
        nombre: string;
        apellido_paterno: string;
        apellido_materno: string;
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
                    placeholder="Ej: Jose"
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("nombre", {
                        required: "El nombre es obligatorio",
                    })}
                />

                {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
            </div>
            <div className="space-y-3 mb-5 flex flex-col">
                <label htmlFor="apellido_paterno" className="text-base font-bold uppercase">
                    Apellido Paterno
                </label>
                <input
                    type="text"
                    id="apellido_paterno"
                    placeholder="Ej: Lopez"
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("apellido_paterno", {
                        required: "El apellido paterno es obligatorio",
                    })}
                />

                {errors.apellido_paterno && (
                    <ErrorMessage>{errors.apellido_paterno.message}</ErrorMessage>
                )}
            </div>
            <div className="space-y-3 mb-5 flex flex-col">
                <label htmlFor="apellido_materno" className="text-base font-bold uppercase">
                    Apellido Materno
                </label>
                <input
                    type="text"
                    id="apellido_materno"
                    placeholder="Ej: Martinez"
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("apellido_materno", {
                        required: "El apellido materno es obligatorio",
                    })}
                />

                {errors.apellido_materno && (
                    <ErrorMessage>{errors.apellido_materno.message}</ErrorMessage>
                )}
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
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Número de teléfono inválido, deben ser 10 dígitos",
                        },
                    })}
                />

                {errors.telefono && <ErrorMessage>{errors.telefono.message}</ErrorMessage>}
            </div>
        </>
    );
}
