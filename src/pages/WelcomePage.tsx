import { Link } from "react-router"

export default function WelcomePage() {
    return (
        <div className="flex flex-col items-center text-center mt-20 gap-6">
            <h2 className="text-3xl md:text-4xl font-semibold">
                Take control of your finances
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-md">
                Track your income and expenses, monitor your monthly balance, and stay on top of your financial goals.
            </p>
            <div className="flex flex-row gap-4">

                <Link
                    to="/register"
                    className="text-xl px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
                >
                    Get started
                </Link>

                <Link
                    to="/login"
                    className="text-xl px-6 py-3 border rounded hover:bg-gray-100"
                >
                    Login
                </Link>

            </div>
        </div>
    )
}