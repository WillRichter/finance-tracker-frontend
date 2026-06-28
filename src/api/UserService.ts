import { BASE_URL } from "../lib/constants.ts"
import type { ApiResponseWrapper, ErrorDetails, LoginFormFields, RegisterFormFields, UserDTO } from "../lib/types.ts"
import { fetchWithAuth } from "../lib/fetchWithAuth.ts"

async function registerUser(form: RegisterFormFields) {
    const response = await fetchWithAuth(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    })

    const data = await response.json()

    if (!response.ok) {
        throw data as ErrorDetails
    }

    return data as ApiResponseWrapper<UserDTO>
}

async function login(form: LoginFormFields) {
    const response = await fetchWithAuth(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body: new URLSearchParams({
            username: form.username,
            password: form.password,
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw data as ErrorDetails
    }

    return data as ApiResponseWrapper<UserDTO>
}

async function logoutUser() {
    const response = await fetch(`${BASE_URL}/users/logout`, {
        credentials: "include",
        method: "POST"
    })

    const data = await response.json()

    if (!response.ok) {
        throw data as ErrorDetails
    }

    return data as ApiResponseWrapper<UserDTO>
}

async function getCurrentUser() {
    const response = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
        throw data as ErrorDetails
    }

    return data as ApiResponseWrapper<UserDTO>
}


async function deleteUser() {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
        throw data as ErrorDetails
    }

    return data as ApiResponseWrapper<UserDTO>
}

export { registerUser, login, logoutUser, getCurrentUser, deleteUser }