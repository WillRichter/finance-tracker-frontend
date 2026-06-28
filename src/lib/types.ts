import type { UseFormRegister } from "react-hook-form"

export interface ErrorDetails {
    timestamp: Date
    statusCode: number
    error: string
    messages: string[]
    path: string
}

export interface ApiResponseWrapper<T> {
    timestamp: Date
    statusCode: number
    message: string
    data: T
}

export interface PagedResponse<T> {
    content: T[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    last: boolean
}

export interface TransactionDTO {
    id: number
    amount: number
    date: Date
    description: string
    type: string
}

export interface SummaryDTO {
    totalIncome: number
    totalExpense: number
    balance: number
}

export interface UserDTO {
    id: number
    username: string
    firstName: string
    lastName: string
    role: string
}

export interface RegisterFormFields {
    firstName: string
    lastName: string
    username: string
    password: string
}

export interface LoginFormFields {
    username: string
    password: string
}

export interface TransactionFormFields {
    amount: number
    date: string
    description: string
    type: "INCOME" | "EXPENSE"
}

export interface TransactionSearchFormFields {
    query: string
    page: number
    size: number
    startDate: string | null
    endDate: string | null
}

export interface UserContextType {
    user: UserDTO | null
    setUser: (user: UserDTO | null) => void
    setIsAuthenticated: (isAuthenticated: boolean) => void
    logout: () => void
    isAuthenticated: boolean
    isLoading: boolean
}

export interface UseFormRegisterProps {
    register: UseFormRegister<TransactionSearchFormFields>
}