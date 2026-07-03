import type {
    ApiResponseWrapper,
    ErrorDetails, PagedResponse, SummaryDTO,
    TransactionDTO,
    TransactionFormFields,
    TransactionSearchFormFields
} from "../lib/types.ts"
import { BASE_URL } from "../lib/constants.ts"
import { fetchWithAuth } from "../lib/fetchWithAuth.ts"

async function searchTransactions(transactionQuery: TransactionSearchFormFields) {
    const { query, page, size, startDate, endDate } = transactionQuery
    const params = new URLSearchParams()
    params.append("query", query)
    params.append("page", String(page))
    params.append("size", String(size))
    if (startDate) params.append("startDate", startDate)
    if (endDate) params.append("endDate", endDate)
    
    const response = await fetchWithAuth(`${BASE_URL}/transactions?${params}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    })

    const data = await response.json()

    if (!response.ok) {
        throw data as ErrorDetails
    }

    return data as ApiResponseWrapper<PagedResponse<TransactionDTO>>
}

async function createTransaction(transaction: TransactionFormFields) {
    const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(transaction)
    })

    const data = await response.json()

    if (!response.ok) {
        throw data as ErrorDetails
    }

    return data as ApiResponseWrapper<TransactionDTO>
}

async function deleteTransaction(transactionId: number) {
    const response = await fetchWithAuth(`${BASE_URL}/transactions/${transactionId}`, {
        method: "DELETE",
        credentials: "include"
    })

    const data = await response.json()

    if (!response.ok) {
        throw data as ErrorDetails
    }

    return data as ApiResponseWrapper<TransactionDTO>
}

async function getSummary() {
    const response = await fetchWithAuth(`${BASE_URL}/transactions/summary`, {
        method: "GET"
    })

    const data = await response.json()
    if (!response.ok) {
        throw data as ErrorDetails
    }
    return data as ApiResponseWrapper<SummaryDTO>
}

export { searchTransactions, createTransaction, deleteTransaction, getSummary }