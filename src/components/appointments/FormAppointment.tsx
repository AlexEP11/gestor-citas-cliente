import { ChangeEvent, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { formatDate } from "../../utils/formatDate";
import { AppointmentFormData } from "../../types";
import ErrorMessage from "../ErrorMessage";

type FormAppointmentProps = {
    register: UseFormRegister<AppointmentFormData>;
    errors: FieldErrors<AppointmentFormData>;
};

export default function FormAppointment({ register, errors }: FormAppointmentProps) {
    const [selectedDate, setSelectedDate] = useState("");

    const finalDate = () => {
        const formattedDate = formatDate(selectedDate); // Formatear la fecha
        console.log(formattedDate);
        // Concatenar la fecha formateada con la hora seleccionada
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    return (
        <>
            <div className="space-y-3 mb-5 flex flex-col">
                <label htmlFor="id_cliente" className="text-base font-bold uppercase">
                    Cliente
                </label>
                <select
                    id="id_cliente"
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("id_cliente", {
                        required: "Debe seleccionar un cliente",
                    })}
                >
                    <option disabled value="">
                        --- Seleccionar Cliente --
                    </option>

                    {/* Aquí va el map de opciones */}
                </select>

                {errors.id_cliente && <ErrorMessage>{errors.id_cliente.message}</ErrorMessage>}
            </div>
            <div className="space-y-3 mb-5 flex flex-col">
                <label htmlFor="fecha_inicio" className="text-base font-bold uppercase">
                    Fecha de la Cita
                </label>
                <input
                    type="date"
                    id="fecha_inicio"
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("fecha_inicio", {
                        required: "La fecha de cita es obligatoria",
                    })}
                    onChange={handleChange}
                    value={selectedDate}
                />

                {errors.fecha_inicio && <ErrorMessage>{errors.fecha_inicio.message}</ErrorMessage>}
            </div>
            <div className="space-y-3 mb-5 flex flex-col">
                <label htmlFor="hora_inicio" className="text-base font-bold uppercase">
                    Hora de la Cita
                </label>
                <select
                    id="hora_inicio"
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("hora_inicio", {
                        required: "Debe seleccionar una hora disponible",
                    })}
                >
                    <option disabled value="">
                        --- Seleccionar Hora --
                    </option>
                    {/* Aquí va el map de horas */}
                </select>
                {errors.hora_inicio && <ErrorMessage>{errors.hora_inicio.message}</ErrorMessage>}
            </div>
            <div className="space-y-3 mb-5 flex flex-col">
                <label htmlFor="id_servicio" className="text-base font-bold uppercase">
                    Servicio
                </label>
                <select
                    id="id_servicio"
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("id_servicio", {
                        required: "Debe seleccionar un servicio",
                    })}
                >
                    <option disabled value="">
                        --- Seleccionar Servicio --
                    </option>
                    {/* Aquí va el map de servicio */}
                </select>
                {errors.id_servicio && <ErrorMessage>{errors.id_servicio.message}</ErrorMessage>}
            </div>
        </>
    );
}
