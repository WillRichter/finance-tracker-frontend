import type { UseFormRegisterProps } from "../lib/types.ts"

export default function SearchTransactionForm({ register }: UseFormRegisterProps) {
    return (
        <div className="w-full max-w-2xl mx-auto mt-8">

            <h2 className="text-2xl underline mb-5">Search transactions</h2>

            <form className="grid grid-cols-1 gap-3 text-xl md:grid-cols-2">

                <div className="flex flex-col">
                    <label htmlFor="query">Query:</label>
                    <input id="query" className="border rounded h-10 px-3" {...register("query")} />
                </div>


                <div className="flex flex-col">
                    <label htmlFor="startDate">Start date:</label>
                    <input id="startDate" className="border rounded h-10 px-3" {...register("startDate")} type="date" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="endDate">End date:</label>
                    <input id="endDate" className="border rounded h-10 px-3" {...register("endDate")} type="date" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="page">Page:</label>
                    <input id="page" className="border rounded h-10 px-3" {...register("page")} type="number" min={0} />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="size">Size:</label>
                    <input id="size" className="border rounded h-10 px-3" {...register("size")} type="number" min={1} />
                </div>

            </form>
        </div>

    )
}