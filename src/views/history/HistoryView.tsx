import { useQuery } from "@tanstack/react-query";
import HistoryCard from "../../components/history/HistoryCard";
import { getAppointments, getSatesAppointments } from "../../api/AppointmentAPI";
import { getClients } from "../../api/ClientAPI";
import { getServices } from "../../api/ServicesAPI";
import { Appointment, Client, FilterOption, Service, State } from "../../types";
import moment from "moment";
import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { extractDateFromISO, extractTimeFromISO } from "../../utils";

export default function HistoryView() {
    const [filter, setFilter] = useState<FilterOption>("week");

    const { data: appointments } = useQuery<Appointment[]>({
        queryKey: ["allAppointments"],
        queryFn: getAppointments,
    });
    const { data: clients } = useQuery<Client[]>({ queryKey: ["clients"], queryFn: getClients });
    const { data: services } = useQuery<Service[]>({
        queryKey: ["services", "all"],
        queryFn: getServices,
    });
    const { data: states } = useQuery<State[]>({
        queryKey: ["states", "all"],
        queryFn: getSatesAppointments,
    });

    // Crear mapas para clientes, servicios y estados
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
    const stateMap = states
        ? Object.fromEntries(states.map((state) => [state.id_estado, state.nombre]))
        : {};

    // Función para filtrar y ordenar las citas
    const getFilteredAndSortedAppointments = (currentFilter: FilterOption) => {
        const now = moment();

        const filteredAppointments = appointments?.filter((appointment) => {
            const appointmentDate = moment(appointment.fecha_inicio);
            switch (currentFilter) {
                case "week":
                    return appointmentDate.isBetween(
                        now.clone().startOf("week"),
                        now.clone().endOf("week"),
                        null,
                        "[]"
                    );
                case "month":
                    return appointmentDate.isBetween(
                        now.clone().startOf("month"),
                        now.clone().endOf("month"),
                        null,
                        "[]"
                    );
                case "year":
                    return appointmentDate.isBetween(
                        now.clone().startOf("year"),
                        now.clone().endOf("year"),
                        null,
                        "[]"
                    );
                default:
                    return true;
            }
        });

        return filteredAppointments?.sort((a, b) =>
            moment(b.fecha_inicio).diff(moment(a.fecha_inicio))
        );
    };

    // Función para generar el PDF
    const generatePDF = (currentFilter: FilterOption) => {
        const sortedAppointments = getFilteredAndSortedAppointments(currentFilter);

        const doc = new jsPDF({
            compress: true,
        });
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text("Historial de Citas", 105, 15, { align: "center" });
        doc.setFontSize(12);
        doc.setTextColor(218, 0, 55);
        const headers = [["Cliente", "Servicio", "Fecha", "Hora Inicio", "Hora Fin", "Estado"]];

        const data = sortedAppointments?.map((appointment) => [
            clientMap[appointment.id_cliente] || "Cliente Desconocido",
            serviceMap[appointment.id_servicio] || "Servicio Desconocido",
            extractDateFromISO(appointment.fecha_inicio.toString()),
            extractTimeFromISO(appointment.fecha_inicio.toString()),
            extractTimeFromISO(appointment.fecha_finalizacion.toString()),
            stateMap[appointment.id_estado] || "Estado Desconocido",
        ]);

        autoTable(doc, {
            head: headers,
            body: data || [],
            startY: 30,
            styles: {
                fillColor: [240, 240, 240],
                textColor: [0, 0, 0],
                fontSize: 8,
                halign: "center",
                lineWidth: 0.1,
                cellPadding: 2,
            },
            headStyles: {
                fillColor: [23, 23, 23],
                textColor: [255, 255, 255],
                fontSize: 11,
                fontStyle: "bold",
                halign: "center",
            },
            margin: { top: 20, left: 10, right: 10 },
        });

        doc.save(`reporte_${currentFilter}.pdf`);
    };

    // Función para manejar el clic en los botones y generar el PDF
    const handleButtonClick = (newFilter: "week" | "month" | "year") => {
        // Primero, generamos el PDF con el filtro actual
        generatePDF(newFilter);
        // Luego, actualizamos el estado
        setFilter(newFilter);
    };

    return (
        <>
            <h1 className="text-5xl font-outfit font-extrabold text-black">Historial de Citas</h1>
            <p className="text-2xl mt-5 text-dark_earth font-bold">
                Visualiza el historial de citas y genera reportes
            </p>

            <div className="mt-5 mb-10 flex flex-col md:flex-row gap-7 text-center justify-start">
                <button
                    className={`cursor-pointer px-10 py-3 rounded-md text-white font-bold font-outfit transition-colors ${
                        filter === "week"
                            ? "bg-deep_crimson"
                            : "bg-scarlet_red hover:bg-deep_crimson"
                    }`}
                    onClick={() => handleButtonClick("week")}
                >
                    Generar Reporte Semanal
                </button>
                <button
                    className={`cursor-pointer px-10 py-3 rounded-md text-white font-bold font-outfit transition-colors ${
                        filter === "month"
                            ? "bg-deep_crimson"
                            : "bg-scarlet_red hover:bg-deep_crimson"
                    }`}
                    onClick={() => handleButtonClick("month")}
                >
                    Registrar Reporte Mensual
                </button>
                <button
                    className={`cursor-pointer px-10 py-3 rounded-md text-white font-bold font-outfit transition-colors ${
                        filter === "year"
                            ? "bg-deep_crimson"
                            : "bg-scarlet_red hover:bg-deep_crimson"
                    }`}
                    onClick={() => handleButtonClick("year")}
                >
                    Generar Reporte Anual
                </button>
            </div>

            {appointments?.map((appointment) => (
                <HistoryCard
                    key={appointment.id_cita}
                    appointment={{
                        ...appointment,
                        client: clientMap[appointment.id_cliente] || "Cliente Desconocido",
                        service: serviceMap[appointment.id_servicio] || "Servicio Desconocido",
                        state: stateMap[appointment.id_estado] || "Estado Desconocido",
                    }}
                />
            ))}
        </>
    );
}
