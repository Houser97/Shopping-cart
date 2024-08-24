import { PropsWithChildren, useEffect } from "react"
import { useAuthStore } from "../hooks/useAuthStore";


export const AuthProvider = ({ children }: PropsWithChildren) => {

    const { checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])

    return (
        <>{children}</>
    )
}
