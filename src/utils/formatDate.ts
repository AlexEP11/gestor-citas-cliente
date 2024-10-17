// Función para formatear la fecha a YYYY/MM/DD
export const formatDate = (date: string) => {
    const [year, month, day] = date.split("-"); // Suponiendo que la fecha viene en formato 'YYYY-MM-DD'
    return `${year}-${month}-${day}T`;
};
