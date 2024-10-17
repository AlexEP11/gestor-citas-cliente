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
    token: z.boolean(),
});

export type Appointment = z.infer<typeof appointmentSchema>;
export type DraftAppointment = Omit<Appointment, "id_cita">;
export type AppointmentFormData = Pick<
    Appointment,
    "id_servicio" | "fecha_inicio" | "id_cliente"
> & { hora_inicio: string };

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
