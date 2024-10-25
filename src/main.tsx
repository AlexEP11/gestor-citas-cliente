import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, Slide } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router />
            <ToastContainer
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                position="bottom-right"
                theme="colored"
                transition={Slide}
                draggable
            />
        </QueryClientProvider>
    </StrictMode>
);
