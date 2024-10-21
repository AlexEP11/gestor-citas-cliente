import { Calendar, momentLocalizer } from "react-big-calendar";
import { useState } from "react";
import ScheduleModal from "./ScheduleModa";
import moment from "moment/moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Schedule() {
    const isMobile = window.innerWidth < 768;
    const localizer = momentLocalizer(moment);

    // Estado para controlar el modal y la cita seleccionada
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCita, setSelectedCita] = useState(null);

    // Eventos de prueba
    const events = [
        {
            id: 1,
            title: "Cita con Juan",
            start: new Date(2024, 9, 21, 10, 0), // Octubre 21, 2024 a las 10:00 AM
            end: new Date(2024, 9, 21, 11, 0),
            cliente: "Juan Pérez",
            fecha_inicio: "2024/10/21",
            hora_inicio: "10:00 AM",
            barbero: "Carlos",
            servicio: "Corte de cabello",
            estado: "Confirmada",
        },
        {
            id: 1,
            title: "Cita con Juan",
            start: new Date(2024, 9, 21, 19, 0), // Octubre 21, 2024 a las 10:00 AM
            end: new Date(2024, 9, 21, 20, 0),
            cliente: "Juan Pérez",
            fecha_inicio: "2024/10/21",
            hora_inicio: "10:00 AM",
            barbero: "Carlos",
            servicio: "Corte de cabello",
            estado: "Confirmada",
        },
        {
            id: 1,
            title: "Cita con Juan",
            start: new Date(2024, 9, 21, 13, 0), // Octubre 21, 2024 a las 10:00 AM
            end: new Date(2024, 9, 21, 14, 0),
            cliente: "Juan Pérez",
            fecha_inicio: "2024/10/21",
            hora_inicio: "10:00 AM",
            barbero: "Carlos",
            servicio: "Corte de cabello",
            estado: "Confirmada",
        },
        {
            id: 1,
            title: "Cita con Juan",
            start: new Date(2024, 9, 21, 14, 0), // Octubre 21, 2024 a las 10:00 AM
            end: new Date(2024, 9, 21, 15, 0),
            cliente: "Juan Pérez",
            fecha_inicio: "2024/10/21",
            hora_inicio: "10:00 AM",
            barbero: "Carlos",
            servicio: "Corte de cabello",
            estado: "Confirmada",
        },
        {
            id: 2,
            title: "Cita con María",
            start: new Date(2024, 9, 22, 12, 0),
            end: new Date(2024, 9, 22, 13, 0),
            cliente: "María López",
            fecha_inicio: "2024/10/22",
            hora_inicio: "12:00 PM",
            barbero: "David",
            servicio: "Tinte",
            estado: "Pendiente",
        },
    ];

    // Función para abrir el modal cuando se hace clic en un evento
    // Poner el type de Citas de los eventos
    const handleSelectEvent = (e) => {
        setSelectedCita(e); // Guardar la cita seleccionada
        setModalOpen(true); // Abrir el modal
    };

    return (
        <>
            <Calendar
                events={events}
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
                            : moment(date).format("dddd").toUpperCase(), // Iniciales en móviles
                    weekdayFormat: (date) =>
                        isMobile
                            ? moment(date).format("dd").toUpperCase()
                            : moment(date).format("dddd").toUpperCase(), // Iniciales en móviles
                }}
            />

            {/* Modal para mostrar los detalles de la cita */}
            <ScheduleModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                cita={selectedCita!}
            />
        </>
    );
}
