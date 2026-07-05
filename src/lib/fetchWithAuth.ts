import {queryClient} from "../main.tsx";

export async function fetchWithAuth(url: string, options?: RequestInit) {
    const response = await fetch(url, {
        ...options,
        credentials: "include"
    })

    if (response.status === 401 && !url.includes("/login")) {
        queryClient.clear()
        window.location.href = "/login"
        return Promise.reject("Unauthorised")
    }

    return response
}