import { useUser } from "../context/UserContext.tsx"
import { Navigate, Outlet } from "react-router"

export default function HideRoute() {
    const { isAuthenticated, isLoading } = useUser()
    if (isLoading) return null
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}