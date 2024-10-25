import { useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import ErrorMessage from "../../components/ErrorMessage";
import { Auth } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { authLogin } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AuthView() {
    const navigate = useNavigate();

    // Función para manejar la navegación al admin
    const goToAdmin = () => {
        window.location.href = `https://kings-man-barber-shop-api.software/admin`; // Redirigir a la URL del admin de Django
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken"); // Obtener el Access Token
        if (token) {
            navigate("/citas"); // Si hay un token, redirigir a la página de citas
        }
    });

    const initialValuesAuth: Auth = {
        username: "",
        password: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValuesAuth });

    // Mutación para enviar los datos de autenticación
    const { mutate } = useMutation({
        mutationKey: ["auth"],
        mutationFn: authLogin,
        onSuccess: () => {
            toast.success("Inicio de sesión exitoso");
            toast.info("Para mas opciones, de clic en un evento de la agenda", {
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            navigate("/citas");
        },
        onError: () => {
            toast.error("Ocurrió un error al iniciar sesión, verifique bien sus credenciales");
            navigate("/");
        },
    });

    // Manejar el envío del formulario
    const handleSubmitAuth = (formData: Auth) => {
        mutate(formData); // Llamar la mutación con los datos del formulario
    };

    return (
        <div className="bg-ebony_black h-screen flex items-center  justify-center p-4 ">
            <div className="flex flex-col gap-8 items-center">
                {/* Contenedor del logo y título */}
                <div className="flex flex-col items-center gap-3 animate-pulse transition-transform duration-300 hover:scale-105 text-center">
                    <Logo />
                    <h1 className="font-outfit font-bold text-4xl text-white">
                        King´s Man Barberia
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit(handleSubmitAuth)}
                    className="max-w-md mx-auto bg-light_sand_gray p-16 rounded-md shadow-md shadow-silver_fog"
                >
                    <div className="space-y-10 ">
                        <div className="space-y-3">
                            <label htmlFor="username" className="text-base font-bold uppercase">
                                Usuario
                            </label>
                            <input
                                type="text"
                                id="username"
                                className=" w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                                placeholder="Ingresa tu usuario"
                                autoComplete="username"
                                {...register("username", { required: "Este campo es requerido" })}
                            />
                            {errors.username && (
                                <ErrorMessage>{errors.username.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="password" className="text-base font-bold uppercase">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                className=" w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:border-transparent text-black cursor-pointer"
                                placeholder="Ingresa tu contraseña"
                                autoComplete="current-password"
                                {...register("password", { required: "Este campo es requerido" })}
                            />
                            {errors.password && (
                                <ErrorMessage>{errors.password.message}</ErrorMessage>
                            )}
                        </div>
                    </div>

                    <input
                        type="submit"
                        className="w-full bg-dark_earth p-4 font-bold text-white uppercase rounded-md cursor-pointer hover:bg-black transition-colors mt-10"
                        value="Iniciar Sesión"
                    />
                </form>

                {/* Botón para ir al admin de Django */}
                <button
                    onClick={goToAdmin}
                    className="mt-5 w-full bg-scarlet_red p-3 text-white font-bold rounded-md hover:bg-deep_crimson transition-colors"
                >
                    Vista de Administrador
                </button>
            </div>
        </div>
    );
}
