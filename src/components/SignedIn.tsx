import type { ReactNode } from "react"
import { useUser } from "../context/UserContext.tsx"

export default function SignedIn({ children } : { children: ReactNode }) {
    const { isAuthenticated } = useUser()
    return isAuthenticated ? children : null
}