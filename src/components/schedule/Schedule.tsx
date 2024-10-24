import { Calendar, momentLocalizer } from "react-big-calendar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentsFilter } from "../../api/AppointmentAPI";
import { getClients } from "../../api/ClientAPI";
import { Appointment, AppointmentFormDataSchedule, Client, Service } from "../../types";
import { getServices } from "../../api/ServicesAPI";
import { toast } from "react-toastify";
import ScheduleModal from "./ScheduleModal";
import moment from "moment/moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Schedule() {
    const isMobile = window.innerWidth < 768;
    const localizer = momentLocalizer(moment);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCita, setSelectedCita] = useState<AppointmentFormDataSchedule | null>(null);

    const { data: citas, isLoading } = useQuery<Appointment[]>({
        queryKey: ["appointmentFilter"],
        queryFn: () => getAppointmentsFilter(1),
    });

    // Mostrar un toast cuando el estado sea 'isLoading'
    useEffect(() => {
        if (isLoading) {
            toast.info("Para mas opciones, de clic en un evento de la agenda", {
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }, [isLoading]); // Se ejecutará solo cuando 'isLoading' cambie

    const { data: clients } = useQuery<Client[]>({
        queryKey: ["clients"],
        queryFn: getClients,
    });

    const { data: services } = useQuery<Service[]>({
        queryKey: ["services", "all"],
        queryFn: getServices,
    });

    // Crear un mapa de clientes que incluye nombre y apellido
    const clientMap = clients
        ? Object.fromEntries(
              clients.map((client) => [
                  client.id_cliente,
                  `${client.nombre} ${client.apellido_paterno} ${client.apellido_materno}`,
              ])
          )
        : {};

    const serviceMap = services
        ? Object.fromEntries(services.map((service) => [service.id_servicio, service.nombre]))
        : {};

    const events =
        citas?.map((cita) => ({
            id: cita.id_cita,
            title: `Cita con ${clientMap[cita.id_cliente] || "Cliente Desconocido"}`,
            start: moment(cita.fecha_inicio).toDate(),
            end: moment(cita.fecha_finalizacion).toDate(),
            cliente: clientMap[cita.id_cliente] || "Cliente Desconocido",
            hora_inicio: cita.fecha_inicio,
            servicio: serviceMap[cita.id_servicio] || "Servicio Desconocido",
            id_estado: cita.id_estado,
        })) || ([] as AppointmentFormDataSchedule[]);

    const handleSelectEvent = (e: AppointmentFormDataSchedule) => {
        setSelectedCita(e);
        setModalOpen(true);
    };

    const eventStyleGetter = (event: AppointmentFormDataSchedule) => {
        let backgroundColor = "";

        if (event.id_estado === 1) {
            backgroundColor = "#3f72af"; // Color verde para estado 1
        } else if (event.id_estado === 7) {
            backgroundColor = "#b8c7d7"; // Color gris para estado 7
        }

        const style = {
            backgroundColor,
            borderRadius: "5px",
            opacity: 1,
            color: "black",
            fontWeight: 600,
            cursor: "pointer",
            border: "none",
        };

        return {
            style,
        };
    };

    // Función para aplicar estilos a las casillas del calendario
    const dayPropGetter = (date: Date) => {
        const today = new Date();
        if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        ) {
            return {
                style: {
                    backgroundColor: "white", // Cambia a tu color deseado
                },
            };
        }
        return {};
    };

    return (
        <>
            <Calendar
                events={events as AppointmentFormDataSchedule[]}
                onSelectEvent={handleSelectEvent}
                min={new Date(0, 0, 0, 8, 0)} // Horario de apertura
                max={new Date(0, 0, 0, 21, 0)} // Horario de cierre
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                className="bg-silver_fog text-black p-4 rounded-lg shadow-2xl"
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
                eventPropGetter={eventStyleGetter} // Aquí se asignan los estilos a los eventos
                dayPropGetter={dayPropGetter} // Aquí se asignan los estilos a los días
            />

            {/* Modal para mostrar los detalles de la cita */}
            <ScheduleModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                cita={{
                    cliente: String(selectedCita?.cliente) || "",
                    hora_inicio: new Date(selectedCita?.hora_inicio!) || new Date(),
                    servicio: selectedCita?.servicio || 0,
                }}
                citaId={selectedCita?.id || 0}
            />
        </>
    );
}
