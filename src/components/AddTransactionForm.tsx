import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ErrorDetails, TransactionFormFields } from "../lib/types.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTransaction } from "../api/TransactionService.ts"
import {useState} from "react";

const schema = z.object({
    amount: z.number().min(0.01, "Amount must be at least 0.01"),
    date: z.string(),
    description: z.string().min(2, "2 characters minimum").max(100, "100 characters maximum"),
    type: z.enum(["INCOME", "EXPENSE"])
})

export default function AddTransactionForm({ onSuccess }: { onSuccess?: () => void }) {

    const queryClient = useQueryClient()
    const [ errorMessages, setErrorMessages ] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TransactionFormFields>({ resolver: zodResolver(schema) })

    const { mutate, isPending,  } = useMutation({
        mutationFn: createTransaction,
        onSuccess: () => {
            reset()
            queryClient.invalidateQueries({ queryKey: ["transactions"] })
            onSuccess?.()
        },
        onError: (error: ErrorDetails) => setErrorMessages(error.messages)
    })

    return (
        <div className="w-full max-w-2xl mx-auto mt-5">

            <h2 className="text-2xl underline mb-4">Add transaction</h2>

            <form
                className="flex flex-col gap-3 text-xl"
                onSubmit={handleSubmit((form) => mutate(form))}
            >

                <div className="flex flex-col">
                    <label htmlFor="description">Description:</label>
                    <input id="description" className="border rounded h-10 px-3" {...register("description")} />
                    <p className="text-red-500 text-sm">{errors.description?.message}</p>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        id="amount"
                        className="border rounded h-10 px-3"
                        {...register("amount", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        min="0.01"
                    />
                    <p className="text-red-500 text-sm">{errors.amount?.message}</p>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="date" >Date:</label>
                    <input id="date" className="border rounded h-10 px-3" {...register("date")} type="date" />
                    <p className="text-red-500 text-sm">{errors.date?.message}</p>
                </div>


                <div className="flex flex-col">
                    <label htmlFor="type">Type:</label>
                    <select id="type" className="border rounded h-10 px-3" {...register("type")}>
                        <option value="INCOME">Income</option>
                        <option value="EXPENSE">Expense</option>
                    </select>
                    <p className="text-red-500 text-sm">{errors.type?.message}</p>
                </div>

                <input
                    className="h-10 text-white bg-black rounded mt-5"
                    type="submit"
                    value={isPending ? "Adding..." : "Add Transaction"}
                    disabled={isPending}
                />

                { errorMessages.map((message, index) => (
                   <p key={index} className="text-red-500">{message}</p>
                ))}

            </form>
        </div>

    )
}