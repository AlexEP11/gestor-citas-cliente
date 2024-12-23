import { ChangeEvent, useEffect, useState } from "react";
import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";
import { AppointmentFormData, AvailableHours, Client, Service } from "../../types";
import { getClients } from "../../api/ClientAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getServices } from "../../api/ServicesAPI";
import { createValidHour } from "../../api/HoursAPI";
import ErrorMessage from "../ErrorMessage";

type FormAppointmentProps = {
    errors: FieldErrors<AppointmentFormData>;
    register: UseFormRegister<AppointmentFormData>;
    trigger: UseFormTrigger<AppointmentFormData>;
    clearErrors: UseFormClearErrors<AppointmentFormData>;
    resetStatesForm: boolean;
};

export default function FormAppointment({
    errors,
    register,
    trigger,
    clearErrors,
    resetStatesForm,
}: FormAppointmentProps) {
    const [selectedDate, setSelectedDate] = useState("");
    const [availableHours, setAvailableHours] = useState<string[]>([]); // Estado para las horas disponibles
    const [dataToCreateHour, setDataToCreateHour] = useState({
        id_servicio: 0,
        fecha: "",
    });

    // Efecto para reiniciar el estado local cuando se resetea el formulario
    useEffect(() => {
        setSelectedDate(""); // Resetea la fecha
        setAvailableHours([]); // Resetea las horas disponibles
        setDataToCreateHour({ id_servicio: 0, fecha: "" }); // Resetea los datos de la cita
    }, [resetStatesForm]);

    // Función manejadora para el evento onChange de la fecha
    const handleChangeDate = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newDate = e.target.value;
        setSelectedDate(newDate);
        setDataToCreateHour((prev) => ({
            ...prev,
            fecha: newDate,
        }));
    };

    // Función manejadora para el evento onChange de servicios
    const handleSelectChangeServices = (e: ChangeEvent<HTMLSelectElement>) => {
        const serviceId = parseInt(e.target.value);
        setDataToCreateHour((prev) => ({
            ...prev,
            id_servicio: serviceId,
        }));
        clearErrors("id_servicio");
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
            clearErrors(["fecha_inicio", "hora_inicio"]);
        },
        onError: () => {
            trigger("fecha_inicio");
        },
    });

    useEffect(() => {
        if (dataToCreateHour.id_servicio > 0 && dataToCreateHour.fecha) {
            mutate(dataToCreateHour); // Se invoca solo cuando se tiene que mutar, pero no causa recarga
        }
    }, [dataToCreateHour, mutate]);

    const sortedClients =
        Array.isArray(clients) && clients.length > 0
            ? clients.slice().sort((a, b) => {
                  const nameA =
                      `${a.nombre} ${a.apellido_paterno} ${a.apellido_materno}`.toLowerCase();
                  const nameB =
                      `${b.nombre} ${b.apellido_paterno} ${b.apellido_materno}`.toLowerCase();
                  return nameA.localeCompare(nameB);
              })
            : [];

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
                    onKeyDown={(e) => e.preventDefault()}
                    min={getCurrentDate()}
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    {...register("fecha_inicio", {
                        required: "Debes seleccionar una fecha valida",
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
                        validate: (value) => value !== "" || "Debe seleccionar una hora disponible", // Verifica si el valor no está vacío
                    })}
                >
                    <option value="" disabled>
                        --- Seleccionar Hora ---
                    </option>{" "}
                    {/* Opción por defecto */}
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
