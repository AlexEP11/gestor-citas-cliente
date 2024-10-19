import { ClientFormData } from "../types";
import api from "../lib/axios";
import { isAxiosError } from "axios";

export async function createClient(formData: ClientFormData) {
    try {
        const { data } = await api.post("/cliente/", formData);
        return {
            success: true,
            message: "Cliente creado exitosamente.",
            data: data,
        };
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.message.includes("ERR_CONNECTION_REFUSED")) {
                throw new Error(
                    "No se pudo establecer una conexión con el servidor. Por favor, inténtelo de nuevo más tarde."
                );
            }
            if (error.response) {
                throw new Error(error.response.data.message);
            }
        }
        throw new Error("Ocurrió un error inesperado. Por favor, inténtelo de nuevo.");
    }
}
