import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import type { UserContextType, UserDTO } from "../lib/types.ts"
import { getCurrentUser } from "../api/UserService.ts"

const UserContext = createContext<UserContextType| null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
    const [ user, setUser ] = useState<UserDTO | null>(null)
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false)
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    useEffect(() => {
        getCurrentUser()
            .then(response => {
                setUser(response.data)
                setIsAuthenticated(true)
            })
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false))
    }, [])

    function logout() {
        setUser(null)
        setIsAuthenticated(false)
    }

    return (
        <UserContext.Provider value={{ user, setUser, setIsAuthenticated, logout, isAuthenticated, isLoading }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) throw new Error("useUser must be used within the context")
    return context
}