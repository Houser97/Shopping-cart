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
import { NotFound } from "../layouts/NotFound";


export const AppRouter = createBrowserRouter([
    {
        element: <MainLayout />,
        errorElement:
            <NotFound>
                <span>404</span>
                <span>Not Found</span>
            </NotFound>,
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
                path: '/review/:productId',
                element:
                    <ProtectedRoute>
                        <ReviewScreen />
                    </ProtectedRoute>
            },
        ]
    },
]);