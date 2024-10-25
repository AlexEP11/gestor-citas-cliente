import axios from "axios";

// Crear instancia de Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para agregar el Access Token a las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken"); // Obtener el Access Token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Añadir el token a los headers
    }
    return config;
});

// Interceptor para manejar errores y refrescar el token si es necesario
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y no hemos reintentado
        if (error.response.status === 401) {
            if (!originalRequest._retry) {
                originalRequest._retry = true; // Marcar que estamos intentando refrescar el token

                try {
                    // Llamar a la función que refresca el Access Token
                    const newAccessToken = await refreshAccessToken();

                    // Actualizar el token en los headers de la petición original
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                    // Reintentar la petición original con el nuevo token
                    return api(originalRequest);
                } catch (err) {
                    console.log("Error al refrescar el token", err);
                    // Redirigir al usuario si no se puede refrescar el token
                    window.location.href = "/"; // Aquí rediriges a login
                }
            } else {
                // Si ya intentamos refrescar, redirigimos a login
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);

// Función para refrescar el Access Token
const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken"); // Obtener el Refresh Token
        const { data } = await api.post("/token/refresh/", {
            refresh: refreshToken,
        });
        const newAccessToken = data.access;

        // Guardar el nuevo Access Token en el localStorage
        localStorage.setItem("accessToken", newAccessToken);

        return newAccessToken;
    } catch (error) {
        console.error("Error al refrescar el Access Token", error);
        throw error;
    }
};
export default api;
