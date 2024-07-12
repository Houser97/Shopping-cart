import { RouterProvider } from "react-router-dom"
import { AppRouter } from "./presentation/router/AppRouter"

export const ShoppingApp = () => {
    return (
        <RouterProvider router={AppRouter} />
    )
} 