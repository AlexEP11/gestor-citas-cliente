import moment from "moment";

// Función para formatear la hora para mostrar en modo 12 horas en el Modal
export const formatearHora = (fechaISO: Date) => {
    return moment.utc(fechaISO).format("HH:mm A"); // Mantiene UTC y solo formatea la hora
};
