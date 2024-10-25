import { Appointment } from "../../types";
import { extractDateFromISO, extractTimeFromISO, getStatusColor } from "../../utils";

interface HistoryTableProps {
    appointments: Appointment[];
    clientMap: Record<number, string>;
    serviceMap: Record<number, string>;
    stateMap: Record<number, string>;
}

const HistoryTable = ({ appointments, clientMap, serviceMap, stateMap }: HistoryTableProps) => {
    return (
        <div className="overflow-hidden rounded-lg shadow-lg">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-ebony_black text-white rounded-t-lg">
                        <th className="py-3 px-5 border-b-2 border-gray-600">Cliente</th>
                        <th className="py-3 px-5 border-b-2 border-gray-600">Servicio</th>
                        <th className="py-3 px-5 border-b-2 border-gray-600">Fecha</th>
                        <th className="py-3 px-5 border-b-2 border-gray-600">Hora Inicio</th>
                        <th className="py-3 px-5 border-b-2 border-gray-600">Hora Fin</th>
                        <th className="py-3 px-5 border-b-2 border-gray-600">Estado</th>
                    </tr>
                </thead>
                <tbody className="bg-light_sand_gray">
                    {appointments.map((appointment, index) => (
                        <tr
                            key={appointment.id_cita}
                            className={`text-center ${
                                index % 2 === 0 ? "bg-light_sand_gray" : "bg-white"
                            } hover:bg-gray-100 hover:scale-105 transition-transform `}
                        >
                            <td className="py-3 px-5 border-b border-gray-300">
                                {clientMap[appointment.id_cliente] || "Cliente Desconocido"}
                            </td>
                            <td className="py-3 px-5 border-b border-gray-300">
                                {serviceMap[appointment.id_servicio] || "Servicio Desconocido"}
                            </td>
                            <td className="py-3 px-5 border-b border-gray-300">
                                {extractDateFromISO(appointment.fecha_inicio.toString())
                                    .split("-")
                                    .reverse()
                                    .join("-")}
                            </td>
                            <td className="py-3 px-5 border-b border-gray-300">
                                {extractTimeFromISO(appointment.fecha_inicio.toString())}
                            </td>
                            <td className="py-3 px-5 border-b border-gray-300">
                                {extractTimeFromISO(appointment.fecha_finalizacion.toString())}
                            </td>
                            <td
                                className={`py-3 px-5 border-b border-gray-300 ${getStatusColor(
                                    stateMap[appointment.id_estado]
                                )} font-bold`}
                            >
                                {stateMap[appointment.id_estado] || "Estado Desconocido"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryTable;
