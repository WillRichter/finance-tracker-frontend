import AddTransactionForm from "../components/AddTransactionForm.tsx"
import { useQuery } from "@tanstack/react-query"
import { searchTransactions } from "../api/TransactionService.ts"
import { useForm } from "react-hook-form"
import TransactionTable from "../components/TransactionTable.tsx"
import type { TransactionSearchFormFields } from "../lib/types.ts"
import SearchTransactionForm from "../components/SearchTransactionForm.tsx"
import {useState} from "react";

type Tab = "add" | "search"

export default function TransactionsPage() {

    const [ activeTab, setActiveTab ] = useState<Tab>("search")

    const {
        register,
        watch
    } = useForm<TransactionSearchFormFields>({
        defaultValues: {
            query: "",
            page: 0,
            size: 10,
            startDate: null,
            endDate: null
        }
    })

    const formValues = watch()

    const { data } = useQuery({
        queryKey: ["transactions", formValues ],
        queryFn: () => searchTransactions(formValues)
    });

    return (
        <div className="flex flex-col w-full px-4">
            <h1 className="text-3xl text-center underline my-5 md:text-4xl">Transactions</h1>

            <div className="flex flex-row border-b w-full max-w-2xl mx-auto mb-6">
                <button
                    className={`text-xl px-6 py-2 transition-colors ${activeTab === "search" ? "border-b-2 border-black font-semibold" : "text-gray-500 hover:text-black"}`}
                    onClick={() => setActiveTab("search")}
                >
                    Search
                </button>
                <button
                    className={`text-xl px-6 py-2 transition-colors ${activeTab === "add" ? "border-b-2 border-black font-semibold" : "text-gray-500 hover:text-black"}`}
                    onClick={() => setActiveTab("add")}
                >
                    Add Transaction
                </button>
            </div>

            {activeTab === "add" && <AddTransactionForm onSuccess={() => setActiveTab("search")} />}
            {activeTab === "search" && <SearchTransactionForm register={register} />}

            <TransactionTable transactions={data?.data?.content ?? []} />

        </div>
    )
}