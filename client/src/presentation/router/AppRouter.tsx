import { createBrowserRouter } from "react-router-dom";
import { HomeScreen } from "../screens/home/HomeScreen";
import { LoginScreen } from "../auth/pages/LoginScreen";
import { RegisterScreen } from "../auth/pages/RegisterScreen";
import { MainLayout } from "../layouts/MainLayout";
import { PublicRoute } from "./routes/PublicRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { CreateProductScreen } from "../screens/products/CreateProductScreen";
import { ShopScreen } from "../screens/shop/ShopScreen";
import { ProductScreen } from "../screens/products/ProductScreen";
import ReviewScreen from "../screens/reviews/CreateReview";

export const AppRouter = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomeScreen />

            },
            {
                path: '/login',
                element: (
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                )
            },
            {
                path: '/register',
                element: (
                    <PublicRoute>
                        <RegisterScreen />
                    </PublicRoute>
                )
            },
            {
                path: '/product/create',
                element: (
                    <ProtectedRoute>
                        <CreateProductScreen />
                    </ProtectedRoute>
                )
            },
            {
                path: '/shop',
                element: <ShopScreen />
            },
            {
                path: '/product/:id',
                element: <ProductScreen />
            },
            {
                path: '/review/:productId/:reviewId',
                element: <ReviewScreen />
            },
        ]
    },
]);