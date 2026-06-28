import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TrashIcon } from "@phosphor-icons/react"
import type { ErrorDetails, TransactionDTO } from "../lib/types.ts"
import { deleteTransaction } from "../api/TransactionService.ts"
import {formatCurrency} from "../lib/utils.ts";
import {useState} from "react";

export default function TransactionTable({ transactions }: { transactions: TransactionDTO[] }   ) {

    const queryClient = useQueryClient()
    const [ errorMessages, setErrorMessages ] = useState<string[]>([])

    const { mutate } = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactions"] }),
        onError: (error: ErrorDetails) => setErrorMessages(error.messages)
    })

    if (transactions.length === 0) {
        return <p className="text-center text-gray-500 text-xl mt-10">No transactions found</p>
    }

    return (
        <div className="w-full overflow-x-auto mt-8 mb-5">
            <table className="text-lg w-full min-w-125 md:text-2xl">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-2">#</th>
                        <th className="text-left p-2">Description</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Date</th>
                        <th className="p1"></th>
                    </tr>
                </thead>
                <tbody>
                { transactions.map((transaction, index) => (
                    <tr key={transaction.id} className="odd:bg-black odd:text-white border-b">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{transaction.description}</td>
                        <td className={`p-2 ${transaction.type == "EXPENSE" ? "text-red-500" : "text-green-500"}`}>
                            {transaction.type == "EXPENSE" ? "-" : "+"}{formatCurrency(transaction.amount)}
                        </td>
                        <td className="p-2">{transaction.date.toLocaleString("en-GB", { timeZone: "UTC" })}</td>
                        <td className="p-2">
                            <TrashIcon
                                className="hover:cursor-pointer hover:text-red-500 transition-colors"
                                size={28}
                                onClick={() => mutate(transaction.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            { errorMessages.map((message, index) => (
                <p key={index} className="text-red-500">{message}</p>
            ))}
        </div>
    )
}