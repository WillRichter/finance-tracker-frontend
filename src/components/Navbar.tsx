import { useState } from "react"
import { Link } from "react-router"
import { ListIcon, XIcon } from "@phosphor-icons/react"
import SignedOut from "./SignedOut.tsx"
import SignedIn from "./SignedIn.tsx"

export default function Navbar() {

    const [ menuOpen, setMenuOpen ] = useState<boolean>(false)

    return (
        <nav className="border-b pb-3">
            <div className="flex flex-row items-center justify-between">
                <Link className="text-3xl md:text-4xl" to="/">Finance Tracker</Link>
                <button
                    className="md:hidden text-3xl"
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    { menuOpen ? <XIcon size={32} /> : <ListIcon size={32} />}
                </button>
                <div className="hidden md:flex flex-row items-center gap-6">
                    <SignedOut>
                        <Link className="text-2xl hover:underline" to="/login">Login</Link>
                        <Link className="text-2xl hover:underline" to="/register">Register</Link>
                    </SignedOut>
                    <SignedIn>
                        <Link className="text-2xl hover:underline" to="/">Home</Link>
                        <Link className="text-2xl hover:underline" to="/transactions">Transactions</Link>
                    </SignedIn>
                </div>
            </div>
            { menuOpen && (
                <div className="flex flex-col items-center gap-4 mt-3 md:hidden">
                    <SignedOut>
                        <Link className="text-2xl hover:underline" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                        <Link className="text-2xl hover:underline" to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                    </SignedOut>

                    <SignedIn>
                        <Link className="text-2xl hover:underline" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link className="text-2xl hover:underline" to="/transactions" onClick={() => setMenuOpen(false)}>Transactions</Link>
                    </SignedIn>
                </div>
            )}
        </nav>
    )
}