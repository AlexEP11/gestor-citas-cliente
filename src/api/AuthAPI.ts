import axios, { isAxiosError } from "axios";
import { Auth } from "../types";

export async function authLogin(dataAuth: Auth) {
    try {
        const { data } = await axios.post("https://146.190.217.249/api/token/", dataAuth);

        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
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
