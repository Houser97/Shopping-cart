import { RouterProvider } from "react-router-dom"
import { AppRouter } from "./presentation/router/AppRouter"
import { Toaster } from "./config/helpers/Toaster/Toaster";
import { AuthProvider } from "./presentation/providers/AuthProvider";
import { useAuthStore } from "./presentation/hooks/useAuthStore";

export const ShoppingApp = () => {
    useAuthStore();
    return (
        <AuthProvider>
            <Toaster />
            <RouterProvider router={AppRouter} />
        </AuthProvider>
    )
} 