import { Calendar, momentLocalizer } from "react-big-calendar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../api/AppointmentAPI";
import { getClients } from "../../api/ClientAPI";
import { Appointment, AppointmentFormData, Client, Service } from "../../types";
import { getServices } from "../../api/ServicesAPI";
import ScheduleModal from "./ScheduleModa";
import moment from "moment/moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Schedule() {
    const isMobile = window.innerWidth < 768;
    const localizer = momentLocalizer(moment);

    // Estado para controlar el modal y la cita seleccionada
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCita, setSelectedCita] = useState<AppointmentFormData | null>(null);

    // EN TODAS ESTAS SE LES DEBE PONER EL ID DEL BARBERO

    // Obtener las citas
    const { data: citas } = useQuery<Appointment[]>({
        queryKey: ["appointment"],
        queryFn: getAppointments,
    });

    // Obtener los clientes
    const { data: clients } = useQuery<Client[]>({
        queryKey: ["clients"],
        queryFn: getClients,
    });

    // Obtener los servicios
    const { data: services } = useQuery<Service[]>({
        queryKey: ["services", "all"],
        queryFn: getServices,
    });

    // Crear un mapa de clientes para acceso rápido
    const clientMap = clients
        ? Object.fromEntries(clients.map((client) => [client.id_cliente, client.nombre]))
        : {};

    // Crear un mapa de servicios para acceso rápido
    const serviceMap = services
        ? Object.fromEntries(services.map((service) => [service.id_servicio, service.nombre]))
        : {};

    // Crear eventos con nombres de clientes
    const events =
        citas?.map((cita) => ({
            id: cita.id_cita,
            title: `Cita con ${clientMap[cita.id_cliente] || "Cliente Desconocido"}`,
            start: new Date(cita.fecha_inicio),
            end: new Date(cita.fecha_finalizacion),
            cliente: clientMap[cita.id_cliente] || "Cliente Desconocido",
            hora_inicio: cita.fecha_inicio,
            servicio: serviceMap[cita.id_servicio] || "Servicio Desconocido", // Cambia aquí
        })) || ([] as AppointmentFormData[]);

    // Función para abrir el modal cuando se hace clic en un evento
    const handleSelectEvent = (e: AppointmentFormData) => {
        setSelectedCita(e); // Guardar la cita seleccionada
        setModalOpen(true); // Abrir el modal
    };

    return (
        <>
            <Calendar
                events={events as AppointmentFormData[]}
                onSelectEvent={handleSelectEvent}
                min={new Date(0, 0, 0, 8, 0)} // Horario de apertura
                max={new Date(0, 0, 0, 21, 0)} // Horario de cierre
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                className="bg-ivory_sand text-black p-4 rounded-lg shadow-lg"
                messages={{
                    next: "Siguiente",
                    previous: "Anterior",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                }}
                defaultView={isMobile ? "day" : "month"}
                formats={{
                    monthHeaderFormat: (date) => moment(date).format("MMM").toUpperCase(),
                    dayFormat: (date) =>
                        isMobile
                            ? moment(date).format("dd").toUpperCase()
                            : moment(date).format("dddd").toUpperCase(),
                    weekdayFormat: (date) =>
                        isMobile
                            ? moment(date).format("dd").toUpperCase()
                            : moment(date).format("dddd").toUpperCase(),
                }}
            />

            {/* Modal para mostrar los detalles de la cita */}
            <ScheduleModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                cita={{
                    cliente: String(selectedCita?.cliente) || "", // Convertir a string
                    hora_inicio: new Date(selectedCita?.hora_inicio!) || new Date(), // Usar aserción no nula
                    servicio: selectedCita?.servicio || 0, // Asignar un valor por defecto
                }}
            />
        </>
    );
}
