import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateAppointment from "./views/appointments/CreateAppointment";
import CreateClient from "./views/clients/CreateClient";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index /> {/* Agenda */}
                    <Route path="/citas/agendar" element={<CreateAppointment />} index />{" "}
                    {/* Agendar cita */}
                    <Route path="/clientes/registrar" element={<CreateClient />} index />{" "}
                    {/* Registrar cliente */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
