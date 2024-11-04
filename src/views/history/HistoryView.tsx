import { useQuery } from "@tanstack/react-query";
import HistoryCard from "../../components/history/HistoryCard";
import { getAppointments, getSatesAppointments } from "../../api/AppointmentAPI";
import { getClients } from "../../api/ClientAPI";
import { getServices } from "../../api/ServicesAPI";
import { Appointment, Client, FilterOption, Service, State } from "../../types";
import moment from "moment";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { extractDateFromISO, extractTimeFromISO } from "../../utils";
import HistoryTable from "../../components/history/HistoryTable";

export default function HistoryView() {
    const [filter, setFilter] = useState<FilterOption>("week");
    const [selectedClient, setSelectedClient] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    const getFilteredAndSortedAppointments = (currentFilter: FilterOption) => {
        const now = moment();

        const filteredAppointments = appointments?.filter((appointment) => {
            const appointmentDate = moment(appointment.fecha_inicio);
            const filterByDate = (() => {
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
            })();
            const matchesClient = selectedClient
                ? String(appointment.id_cliente) === selectedClient
                : true;
            const matchesService = selectedService
                ? String(appointment.id_servicio) === selectedService
                : true;

            return filterByDate && matchesClient && matchesService;
        });

        return filteredAppointments?.sort((a, b) =>
            moment(b.fecha_inicio).diff(moment(a.fecha_inicio))
        );
    };

    const filteredAppointments = getFilteredAndSortedAppointments(filter);

    const generatePDF = (currentFilter: FilterOption) => {
        const sortedAppointments = getFilteredAndSortedAppointments(currentFilter);

        const doc = new jsPDF({ compress: true });
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text("Historial de Citas", 105, 15, { align: "center" });
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
                fontSize: 8,
                fontStyle: "normal",
                halign: "center",
            },
            margin: { top: 20, left: 10, right: 10 },
        });

        doc.save(
            `reporte_${currentFilter}_${new Date().getDate()}-${
                new Date().getMonth() + 1
            }-${new Date().getFullYear()}.pdf`
        );
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
                    onClick={() => setFilter("week")}
                >
                    Filtro Semanal
                </button>
                <button
                    className={`cursor-pointer px-10 py-3 rounded-md text-white font-bold font-outfit transition-colors ${
                        filter === "month"
                            ? "bg-deep_crimson"
                            : "bg-scarlet_red hover:bg-deep_crimson"
                    }`}
                    onClick={() => setFilter("month")}
                >
                    Filtro Mensual
                </button>
                <button
                    className={`cursor-pointer px-10 py-3 rounded-md text-white font-bold font-outfit transition-colors ${
                        filter === "year"
                            ? "bg-deep_crimson"
                            : "bg-scarlet_red hover:bg-deep_crimson"
                    }`}
                    onClick={() => setFilter("year")}
                >
                    Filtro Anual
                </button>
                <button
                    className="fixed bottom-7 right-7 md:static cursor-pointer px-10 py-3 rounded-md text-white font-bold font-outfit bg-scarlet_red hover:bg-deep_crimson ml-auto"
                    onClick={() => generatePDF(filter)}
                >
                    {isMobileView ? "PDF" : "Generar PDF"}
                </button>
            </div>
            <div className="flex flex-col gap-5 mb-5 md:flex-row">
                <select
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    onChange={(e) => setSelectedClient(e.target.value || null)}
                    value={selectedClient || ""}
                >
                    <option value="" disabled>
                        Filtrar por Cliente
                    </option>
                    {clients?.map((client) => (
                        <option key={client.id_cliente} value={client.id_cliente}>
                            {clientMap[client.id_cliente]}
                        </option>
                    ))}
                </select>
                <select
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                    onChange={(e) => setSelectedService(e.target.value || null)}
                    value={selectedService || ""}
                >
                    <option value="" disabled>
                        Filtrar por Servicio
                    </option>
                    {services?.map((service) => (
                        <option key={service.id_servicio} value={service.id_servicio}>
                            {serviceMap[service.id_servicio]}
                        </option>
                    ))}
                </select>
            </div>

            {isMobileView ? (
                filteredAppointments?.map((appointment) => (
                    <HistoryCard
                        key={appointment.id_cita}
                        appointment={{
                            ...appointment,
                            client: clientMap[appointment.id_cliente] || "Cliente Desconocido",
                            service: serviceMap[appointment.id_servicio] || "Servicio Desconocido",
                            state: stateMap[appointment.id_estado] || "Estado Desconocido",
                        }}
                    />
                ))
            ) : (
                <HistoryTable
                    appointments={filteredAppointments || []}
                    clientMap={clientMap}
                    serviceMap={serviceMap}
                    stateMap={stateMap}
                />
            )}
        </>
    );
}
