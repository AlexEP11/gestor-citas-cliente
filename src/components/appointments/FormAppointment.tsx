import { ChangeEvent, useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AppointmentFormData, AvailableHours, Client, Service } from "../../types";
import { getClients } from "../../api/ClientAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getServices } from "../../api/ServicesAPI";
import { createValidHour } from "../../api/HoursAPI";
import ErrorMessage from "../ErrorMessage";

type FormAppointmentProps = {
    register: UseFormRegister<AppointmentFormData>;
    errors: FieldErrors<AppointmentFormData>;
};

export default function FormAppointment({ register, errors }: FormAppointmentProps) {
    const [selectedDate, setSelectedDate] = useState("");
    const [availableHours, setAvailableHours] = useState<string[]>([]); // Estado para las horas disponibles
    const [dataToCreateHour, setDataToCreateHour] = useState({
        id_barbero: 1,
        id_servicio: 0,
        fecha: "",
    });

    // Función manejadora para el evento onChange de la fecha
    const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSelectedDate(e.target.value);
        setDataToCreateHour((prev) => ({
            ...prev,
            fecha: e.target.value,
        }));
    };

    // Función manejadora para el evento onChange de servicios
    const handleSelectChangeServices = (e: ChangeEvent<HTMLSelectElement>) => {
        const serviceId = parseInt(e.target.value);
        setDataToCreateHour((prev) => ({
            ...prev,
            id_servicio: serviceId,
        }));
    };

    // Extracción de clientes
    const { data: clients, isLoading: isLoadingClients } = useQuery<Client[]>({
        queryKey: ["clients"],
        queryFn: getClients,
    });

    // Obtener los servicios
    const { data: services, isLoading: isLoadingServices } = useQuery<Service[]>({
        queryKey: ["services", "all"],
        queryFn: getServices,
    });

    // Obtener las horas disponibles
    const { mutate, isSuccess } = useMutation({
        mutationKey: ["hours"],
        mutationFn: createValidHour,
        onSuccess: (data: AvailableHours) => {
            setAvailableHours(data.available_slots);
        },
    });

    useEffect(() => {
        if (dataToCreateHour.id_servicio > 0 && dataToCreateHour.fecha) {
            mutate(dataToCreateHour); // Se invoca solo cuando se tiene que mutar, pero no causa recarga
        }
    }, [dataToCreateHour, mutate]);

    // Ordenar los clientes alfabéticamente por nombre
    const sortedClients = clients?.slice().sort((a, b) => {
        const nameA = `${a.nombre} ${a.apellido_paterno} ${a.apellido_materno}`.toLowerCase();
        const nameB = `${b.nombre} ${b.apellido_paterno} ${a.apellido_materno}`.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    // Obtener la fecha actual en formato YYYY-MM-DD
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const day = today.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

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
                        validate: (value) =>
                            value.toString() !== "0" || "Debe seleccionar un cliente",
                    })}
                >
                    {isLoadingClients ? (
                        <option disabled value="0">
                            Cargando clientes...
                        </option>
                    ) : (
                        <option disabled value="0">
                            --- Seleccionar Cliente ---
                        </option>
                    )}
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
                    defaultValue="0"
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("id_servicio", {
                        required: "Debe seleccionar un servicio",
                        validate: (value) =>
                            value.toString() !== "0" || "Debe seleccionar un servicio",
                    })}
                    onChange={handleSelectChangeServices}
                >
                    {isLoadingServices ? (
                        <option disabled value="0">
                            Cargando servicios...
                        </option>
                    ) : (
                        <option disabled value="0">
                            --- Seleccionar Servicio ---
                        </option>
                    )}
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
                        required: "Debe seleccionar una fecha disponible",
                        validate: (value) =>
                            value >= getCurrentDate() || "La fecha no puede ser en el pasado",
                    })}
                    onChange={handleChangeDate}
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
                    disabled={!isSuccess}
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("hora_inicio", {
                        required: "Debe seleccionar una hora disponible",
                    })}
                >
                    {/* Aquí va el map de horas */}
                    {availableHours?.map((hour, index) => (
                        <option key={index} value={hour}>
                            {hour}
                        </option>
                    ))}
                </select>
                {errors.hora_inicio && <ErrorMessage>{errors.hora_inicio.message}</ErrorMessage>}
            </div>
        </>
    );
}
