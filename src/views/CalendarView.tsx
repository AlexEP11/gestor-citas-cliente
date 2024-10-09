import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { viewWeek, viewMonthAgenda, viewDay, viewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";

export default function CalendarView() {
    const calendar = useCalendarApp({
        views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
        locale: "es-ES",
        isDark: true,
    });
    return (
        <div className="my-10">
            <h1 className="text-4xl font-outfit font-extrabold text-center mb-10 uppercase text-charcoal">
                Calendario
            </h1>
            <div>
                <ScheduleXCalendar calendarApp={calendar} />
            </div>
        </div>
    );
}
