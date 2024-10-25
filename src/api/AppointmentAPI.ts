import api from "../lib/axios";
import { isAxiosError } from "axios";
import { Appointment, AppointmentFormData } from "../types";

// Obtiene todas las citas
export async function getAppointments() {
    try {
        const { data } = await api.get("/citas/barbero/general/");
        return data;
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

// Obtiene las citas filtradas por el id del barbero y trae las citas que están pendientes (no canceladas)
export async function getAppointmentsFilter() {
    try {
        const { data } = await api.get(`/citas/barbero/filter/`);
        return data;
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

// Crea una cita nueva
export async function createAppointment(dataForm: AppointmentFormData) {
    try {
        const { data } = await api.post(`/citas/crear`, dataForm);
        return data;
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

// Completa cita mediante modal
export async function completeAppointment(IdAppointment: Appointment["id_cita"]) {
    try {
        const { data } = await api.patch(`/citas/completar/${IdAppointment}/`);
        return data;
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

// Reagenda cita mediante modal
export async function rescheduleAppointment(IdAppointment: Appointment["id_cita"]) {
    try {
        const { data } = await api.patch(`/citas/reprogramar/${IdAppointment}/`);
        return data;
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

// No asistio a cita mediante modal
export async function missedAppointment(IdAppointment: Appointment["id_cita"]) {
    try {
        const { data } = await api.patch(`/citas/falto/${IdAppointment}/`);
        return data;
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

// Cancelar cita mediante modal
export async function cancelAppointment(IdAppointment: Appointment["id_cita"]) {
    try {
        const { data } = await api.patch(`/citas/cancelar/barbero/${IdAppointment}/`);
        return data;
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

// Obtiene los estados de que existen de citas
export async function getSatesAppointments() {
    try {
        const { data } = await api.get("/estado-citas/");
        return data;
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
