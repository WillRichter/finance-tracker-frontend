import { Outlet } from "react-router"
import Navbar from "../components/Navbar.tsx"

export default function RootLayout() {
    return (
        <div className="font-mono w-full max-w-[1920px] p-5 mx-auto">

            <Navbar />

            <main>
                <Outlet />
            </main>

        </div>
    )
}