import moment from "moment";
// Función para formatear la fecha a YYYY/MM/DD
export const formatDate = (date: string) => {
    const [year, month, day] = date.split("-"); // Suponiendo que la fecha viene en formato 'YYYY-MM-DD'
    return `${year}-${month}-${day}T`;
};

// Función para formatear la hora para mostrar en modo 12 horas en el Modal
export const formatearHora = (fechaISO: Date) => {
    return moment.utc(fechaISO).format("hh:mm A"); // Mantiene UTC y solo formatea la hora
};
