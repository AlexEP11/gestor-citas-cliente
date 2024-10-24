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
