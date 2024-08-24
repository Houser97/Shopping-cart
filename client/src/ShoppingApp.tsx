import { RouterProvider } from "react-router-dom"
import { AppRouter } from "./presentation/router/AppRouter"
import { Toaster } from "./config/helpers/Toaster/Toaster";
import { AuthProvider } from "./presentation/providers/AuthProvider";

export const ShoppingApp = () => {
    return (
        <AuthProvider>
            <Toaster />
            <RouterProvider router={AppRouter} />
        </AuthProvider>
    )
} 