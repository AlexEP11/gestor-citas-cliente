import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateAppointment from "./views/appointments/CreateAppointment";
import CreateClient from "./views/clients/CreateClient";
import HistoryView from "./views/history/HistoryView";
import AuthView from "./views/auth/AuthView";
import RescheduleView from "./views/reschedule/RescheduleView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthView />} index />
                <Route element={<AppLayout />}>
                    <Route path="/citas" element={<DashboardView />} index /> {/* Agenda */}
                    <Route path="/citas/agendar" element={<CreateAppointment />} />{" "}
                    {/* Agendar cita */}
                    <Route path="/clientes/registrar" element={<CreateClient />} />{" "}
                    {/* Registrar cliente */}
                    <Route path="/citas/historial" element={<HistoryView />} />{" "}
                    {/* Registrar cliente */}
                    <Route path="/citas/reagendar" element={<RescheduleView />} />{" "}
                    {/* Registrar cliente */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
