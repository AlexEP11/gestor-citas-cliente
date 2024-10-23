import { z } from "zod";

/* Appointment */
export const appointmentSchema = z.object({
    id_cita: z.number(),
    id_cliente: z.number(),
    id_barbero: z.number(),
    id_servicio: z.number(),
    fecha_inicio: z.date(),
    fecha_finalizacion: z.date(),
    id_estado: z.number(),
});

export type Appointment = z.infer<typeof appointmentSchema>;

export type AppointmentFormData = {
    id_barbero?: Appointment["id_barbero"];
    id_cliente: Appointment["id_cliente"];
    id_servicio: Appointment["id_servicio"];
    fecha_inicio: string;
    hora_inicio?: string;
};

export type AppointmentFormDataSchedule = {
    id: Appointment["id_cita"]; // ID de la cita
    cliente: Appointment["id_cliente"]; // ID del cliente
    hora_inicio: Appointment["fecha_inicio"]; // Fecha y hora de inicio
    id_estado: Appointment["id_estado"]; // ID del estado
    servicio: Appointment["id_servicio"]; // ID del servicio
    title: string; // Título del evento, para que sea compatible con el calendario
    start: Date; // Fecha y hora de inicio del evento
    end: Date; // Fecha y hora de finalización del evento
};

/* Clients */

export const clientSchema = z.object({
    id_cliente: z.number(),
    nombre: z.string(),
    apellido_paterno: z.string(),
    apellido_materno: z.string(),
    telefono: z.string(),
});
export type Client = z.infer<typeof clientSchema>;
export type DraftClient = Omit<Client, "id_cliente">;
export type ClientFormData = Pick<
    Client,
    "nombre" | "apellido_paterno" | "apellido_materno" | "telefono"
>;

/* Services */

export const serviceSchema = z.object({
    id_servicio: z.number(),
    nombre: z.string(),
    precio: z.string(),
    tiempo_aproximado: z.number(),
});
export type Service = z.infer<typeof serviceSchema>;

/* Hours */

export const hoursSchema = z.object({
    id_barbero: z.number(),
    id_servicio: z.number(),
    fecha: z.string(),
});

export type AvailableHours = {
    available_slots: string[];
};

export type DraftHours = z.infer<typeof hoursSchema>;
