import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import CalendarView from "./views/CalendarView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<CalendarView />} index /> {/* Calendario */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
