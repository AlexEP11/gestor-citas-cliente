export function extractTimeFromISO(dateTimeString: string): string {
    // Dividir la cadena por la letra "T" para separar la fecha de la hora
    const timePart = dateTimeString.split("T")[1];
    // Dividir la parte de la hora por el signo "-" para eliminar el offset
    const timeOnly = timePart.split("-")[0];
    // Retornar solo la hora
    return timeOnly;
}

export function extractDateFromISO(dateTimeString: string): string {
    // Dividir la cadena por la letra "T" para separar la fecha de la hora
    const dateOnly = dateTimeString.split("T")[0];
    // Retornar solo la fecha
    return dateOnly;
}

// Función para determinar el color de texto según el estado
export function getStatusColor(state: string) {
    switch (state) {
        case "Reprogramada":
            return "text-yellow-500";
        case "Completada":
            return "text-[#58d68d]";

        case "Cancelada Barbero":
            return "text-deep_crimson";

        case "Cancelada Cliente":
            return "text-deep_crimson";

        case "Programada":
            return "text-[#a569bd]";

        case "Pendiente":
            return "text-[#5dade2]";

        case "No asistida":
            return "text-[#99a3a4]";

        default:
            return "text-black";
    }
}
