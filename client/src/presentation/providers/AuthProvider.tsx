import { PropsWithChildren, useEffect } from "react"
import { useAuthStore } from "../hooks/useAuthStore";
import { useCartStore } from "../hooks/useCartStore";


export const AuthProvider = ({ children }: PropsWithChildren) => {

    const { status, checkAuthToken } = useAuthStore();
    const { loadDbProducts } = useCartStore();

    useEffect(() => {
        checkAuthToken();
    }, [])

    useEffect(() => {
        if (status === 'authenticated') {
            loadDbProducts();
        }
    }, [status])

    return (
        <>{children}</>
    )
}
