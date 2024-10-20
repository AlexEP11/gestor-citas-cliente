import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment/moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Schedule() {
    const isMobile = window.innerWidth < 768;
    const localizer = momentLocalizer(moment);

    return (
        <Calendar
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
    );
}
