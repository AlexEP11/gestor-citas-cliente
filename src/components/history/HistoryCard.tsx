import { Appointment } from "../../types";
import { extractDateFromISO, extractTimeFromISO } from "../../utils";

type HistoryCardProps = {
    appointment: Appointment & {
        client: string;
        service: string;
        state: string;
    };
};

export default function HistoryCard({ appointment }: HistoryCardProps) {
    return (
        <div className="bg-silver_fog p-8 mt-8 rounded-lg shadow-lg">
            <div className="space-y-5 md:space-y-2">
                <div className="flex flex-col items-center text-center md:flex-row md:gap-10 md:text-start ">
                    <h3 className="text-black font-bold text-lg w-32">Cliente:</h3>
                    <p className="text-gray-700 text-lg font-medium">{appointment.client}</p>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:gap-10 md:text-start ">
                    <h3 className="text-black font-bold text-lg w-32">Servicio:</h3>
                    <p className="text-gray-700 text-lg font-medium">{appointment.service}</p>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:gap-10 md:text-start ">
                    <h3 className="text-black font-bold text-lg w-32">Fecha:</h3>
                    <p className="text-gray-700 text-lg font-medium">
                        {extractDateFromISO(appointment.fecha_inicio.toString())}
                    </p>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:gap-10 md:text-start ">
                    <h3 className="text-black font-bold text-lg w-32">Hora inicio:</h3>
                    <p className="text-gray-700 text-lg font-medium">
                        {extractTimeFromISO(appointment.fecha_inicio.toString())}
                    </p>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:gap-10 md:text-start ">
                    <h3 className="text-black font-bold text-lg w-32">Hora fin:</h3>
                    <p className="text-gray-700 text-lg font-medium">
                        {extractTimeFromISO(appointment.fecha_finalizacion.toString())}
                    </p>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:gap-10 md:text-start ">
                    <h3 className="text-black font-bold text-lg w-32">Estado:</h3>
                    <p className="text-gray-700 text-lg font-medium">{appointment.state}</p>
                </div>
            </div>
        </div>
    );
}
