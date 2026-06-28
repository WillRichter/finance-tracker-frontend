import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserProvider } from "./context/UserContext.tsx"
import RootLayout from "./pages/RootLayout.tsx"
import HomePage from "./pages/HomePage.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import RegisterPage from "./pages/RegisterPage.tsx"
import TransactionsPage from "./pages/TransactionsPage.tsx"
import WelcomePage from "./pages/WelcomePage.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import HideRoute from "./components/HideRoute.tsx"
import "./index.css"

export const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<RootLayout />}>

                        <Route element={<HideRoute />}>
                            <Route path="/welcome" element={<WelcomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Route>

                        <Route element={<ProtectedRoute />}>
                            <Route index element={<HomePage />} />
                            <Route path="/transactions" element={<TransactionsPage />} />
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    </QueryClientProvider>
)