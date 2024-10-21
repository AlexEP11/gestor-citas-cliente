import { ChangeEvent, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { formatDate } from "../../utils/formatDate";
import { AppointmentFormData, Client, Service } from "../../types";
import { getClients } from "../../api/ClientAPI";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../api/ServicesAPI";
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

    // Función manejadora para el evento onChange
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
    };

    // Extraccion de clientes
    const { data: clients, isLoading: isLoadingClients } = useQuery<Client[]>({
        queryKey: ["clients-list"],
        queryFn: getClients,
    });

    // Obtener los servicios
    const { data: services, isLoading: isLoadingServices } = useQuery<Service[]>({
        queryKey: ["services", "all"],
        queryFn: getServices,
    });

    // Ordenar los clientes alfabéticamente por nombre
    const sortedClients = clients?.slice().sort((a, b) => {
        const nameA = `${a.nombre} ${a.apellido_paterno} ${a.apellido_materno}`.toLowerCase();
        const nameB = `${b.nombre} ${b.apellido_paterno} ${b.apellido_materno}`.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    return (
        <>
            <div className="space-y-3 mb-5 flex flex-col">
                <label htmlFor="id_cliente" className="text-base font-bold uppercase">
                    Cliente
                </label>
                <select
                    defaultValue="0"
                    id="id_cliente"
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("id_cliente", {
                        required: "Debe seleccionar un cliente",
                    })}
                    onChange={handleSelectChange} // Maneja el valor de cada option (id del cliente)
                >
                    {isLoadingClients ? (
                        <option disabled value="0">
                            Cargando clientes...
                        </option>
                    ) : (
                        <option disabled value="0">
                            --- Seleccionar Cliente --
                        </option>
                    )}

                    {/* Aquí va el map de opciones */}
                    {sortedClients?.map((client) => (
                        <option key={client.id_cliente} value={client.id_cliente}>
                            {client.nombre} {client.apellido_paterno} {client.apellido_materno}
                        </option>
                    ))}
                </select>

                {errors.id_cliente && <ErrorMessage>{errors.id_cliente.message}</ErrorMessage>}
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
                    {isLoadingServices ? (
                        <option disabled value="0">
                            Cargando servicios...
                        </option>
                    ) : (
                        <option disabled value="0">
                            --- Seleccionar Servicio --
                        </option>
                    )}
                    {/* Aquí va el map de servicio */}
                    {services?.map((service) => (
                        <option key={service.id_servicio} value={service.id_servicio}>
                            {service.nombre}
                        </option>
                    ))}
                </select>
                {errors.id_servicio && <ErrorMessage>{errors.id_servicio.message}</ErrorMessage>}
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
        </>
    );
}
