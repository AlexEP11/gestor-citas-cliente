import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function AppLayout() {
    return (
        <>
            <Header />

            <main className="container mx-w-7xl px-5 mx-auto">
                <Outlet />
            </main>
        </>
    );
}
