import { ClientFormData } from "../types";
import api from "../lib/axios";

export async function createClient(formData: ClientFormData) {
    try {
        const { data } = await api.post("/cliente/", formData);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}
