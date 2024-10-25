import { Appointment } from "../../types";
import { extractDateFromISO, extractTimeFromISO, getStatusColor } from "../../utils";

type HistoryCardProps = {
    appointment: Appointment & {
        client: string;
        service: string;
        state: string;
    };
};

export default function HistoryCard({ appointment }: HistoryCardProps) {
    return (
        <div className="bg-white p-6 mt-8 rounded-lg shadow-md border-l-4 border-ebony_black">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-stone-400 font-extrabold text-sm uppercase">Cliente</h3>
                    <p className="text-gray-800 font-medium text-base">{appointment.client}</p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-stone-400 font-extrabold text-sm uppercase">Servicio</h3>
                    <p className="text-gray-800 font-medium text-base">{appointment.service}</p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-stone-400 font-extrabold text-sm uppercase">Fecha</h3>
                    <p className="text-gray-800 font-medium text-base">
                        {extractDateFromISO(appointment.fecha_inicio.toString())}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-stone-400 font-extrabold text-sm uppercase">Hora Inicio</h3>
                    <p className="text-gray-800 font-medium text-base">
                        {extractTimeFromISO(appointment.fecha_inicio.toString())}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-stone-400 font-extrabold text-sm uppercase">Hora Fin</h3>
                    <p className="text-gray-800 font-medium text-base">
                        {extractTimeFromISO(appointment.fecha_finalizacion.toString())}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-stone-400 font-extrabold text-sm uppercase">Estado</h3>
                    <p className={`text-base font-medium ${getStatusColor(appointment.state)}`}>
                        {appointment.state}
                    </p>
                </div>
            </div>
        </div>
    );
}
