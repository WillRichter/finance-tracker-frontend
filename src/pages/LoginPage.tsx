import {Link, useNavigate} from "react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorDetails, LoginFormFields } from "../lib/types.ts"
import {getCurrentUser, login} from "../api/UserService.ts"
import {useUser} from "../context/UserContext.tsx";

const schema = z.object({
    username: z.string().min( 4, "4 characters minimum").max(32, "32 characters maximum"),
    password: z.string().min(6, "6 characters minimum"),
})

export default function LoginPage() {

    const { register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<LoginFormFields>({ resolver: zodResolver(schema) })

    const navigate = useNavigate()

    const { setUser, setIsAuthenticated } = useUser()

    async function onFormSubmit(form: LoginFormFields) {
        try {
            await login(form)
            const me = await getCurrentUser()
            setUser(me.data)
            setIsAuthenticated(true)
            navigate("/")
        } catch (error) {
            const errorDetails = error as ErrorDetails
            errorDetails.messages.forEach((message, index) => {
                setError(`root.${index}` as any, { message })
            })
        }
    }

    return (
        <div className="flex flex-col items-center w-full px-4 mt-10">

            <div className="flex flex-col w-full max-w-md">

                <h1 className="text-3xl md:text-4xl text-center mb-8">Log in to your Finance Tracker account here</h1>

                <form className="flex flex-col gap-2 text-xl" onSubmit={handleSubmit(onFormSubmit)}>

                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        className="text-center h-12 border rounded px-3 w-full"
                        {...register("username")}
                    />
                    <p className="text-red-500 text-sm mb-2">{errors.username?.message}</p>

                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        className="text-center h-12 border rounded px-3 w-full"
                        {...register("password")}
                        type="password"
                    />
                    <p className="text-red-500 text-sm mb-2">{errors.password?.message}</p>

                    <input
                        className="h-12 text-white text-xl w-full mt-4 bg-black rounded"
                        type="submit"
                        value="Log in"
                    />

                </form>

                {Object.values(errors.root ?? {}).map((error, index) => (
                    <p key={index} className="text-red-500 text-sm">
                        {(error as { message: string }).message}
                    </p>
                ))}

                <p className="text-center text-lg mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="underline">Register here</Link>
                </p>

            </div>

        </div>
    )
}