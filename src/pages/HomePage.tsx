import { useNavigate } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { deleteUser, logoutUser } from "../api/UserService.ts"
import { useUser } from "../context/UserContext.tsx"
import { getSummary } from "../api/TransactionService.ts"
import { formatCurrency } from "../lib/utils.ts"

export default function HomePage() {

    const { logout } = useUser()
    const navigate = useNavigate()

    async function handleLogout() {
        await logoutUser()
        logout()
        navigate("/login")
    }

    async function handleDelete() {
        await deleteUser()
        logout()
        navigate("/login")
    }

    const { data, isLoading }  = useQuery({
        queryKey: ["summary"],
        queryFn: getSummary,
    })

    return (
        <div className="flex flex-col items-center w-full px-4">
            <h1 className="text-3xl text-center underline my-5 md:text-4xl">Finance Tracker</h1>
            <h2 className="text-2xl mb-5 md:text-3xl">
                Stats for {new Date().toLocaleString("en-GB", { month: "long", year: "numeric" })}
            </h2>
            <div className="grid grid-cols-1 gap-4 w-full max-w-2xl md:grid-cols-3 ">
                <div className="border rounded p-6 flex flex-col items-center justify-center">
                    <p className="text-lg text-gray-500">Total Income</p>
                    <p className="text-green-500 text-2xl font-semibold mt-2 md:text-3xl">
                        {isLoading ? "..." : formatCurrency(data?.data.totalIncome ?? 0)}
                    </p>
                </div>
                <div className="border rounded p-6 flex flex-col items-center justify-center">
                    <p className="text-lg text-gray-500">Total Expenses</p>
                    <p className="text-red-500 text-2xl font-semibold mt-2 md:text-3xl">
                        {isLoading ? "loading" : formatCurrency(data?.data.totalExpense ?? 0)}
                    </p>
                </div>
                <div className="border rounded p-6 flex flex-col items-center justify-center">
                    <p className="text-lg text-gray-500">Balance</p>
                    <p className={`text-2xl font-semibold mt-2 ${(data?.data.balance ?? 0) > 0 ? "text-green-500" : "text-red-500"} md:text-3xl`}>
                        {isLoading ? "loading" : formatCurrency(data?.data.balance ?? 0)}
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-4 mt-10">
                <button
                    className="text-lg px-4 py-2 border rounded hover:bg-gray-100"
                    onClick={handleDelete}
                >
                    Delete account
                </button>
                <button
                    className="text-lg px-4 py-2 border rounded hover:bg-gray-100"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}