import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { Auth } from "../context/context"

export const Appbar = () => {
    const { loggedin, setloggedin } = useContext(Auth)
    const navigate = useNavigate()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const username = localStorage.getItem("username") ?? localStorage.getItem("name") ?? ""
    const initials = username ? username[0].toUpperCase() : "A"

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("name")
        localStorage.removeItem("role")
        setloggedin(false)
        setIsProfileOpen(false)
        setMenuOpen(false)
        navigate("/signin")
    }

    return (
        <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
            <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-[#c6b99f] bg-[#4b4b4b]/90 px-4 py-3 text-[#f4ead6] shadow-[0_8px_25px_rgba(0,0,0,0.22)] backdrop-blur sm:px-6">
                <Link to="/" className="flex items-center gap-3">
                    <div className="rounded bg-[#3b3b3b] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f1e4cd]">
                        BlogBook
                    </div>
                </Link>

                {/* Hamburger for mobile */}
                <button
                    className="sm:hidden flex flex-col justify-center items-center w-8 h-8 ml-2 focus:outline-none"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-[#f4ead6] mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-[#f4ead6] mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-[#f4ead6] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>

                {/* Desktop nav */}
                <nav className="hidden sm:flex items-center gap-3 text-sm">
                    <Link to="/" className="px-2 text-[#f3e9d6] transition hover:text-white">
                        Home
                    </Link>
                    <Link to="/dashboard" className="px-2 text-[#f3e9d6] transition hover:text-white">
                        Dashboard
                    </Link>
                    <Link to="/publish" className="rounded-full border border-[#d6c9b0] bg-[#f1e5cf] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#3f372f] transition hover:bg-[#ead9ba]">
                        Write
                    </Link>
                    {loggedin ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsProfileOpen((prev) => !prev)}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#cabd9f] bg-[#1a1a1a] text-xs font-semibold text-[#f6ead5]"
                            >
                                {initials}
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 top-10 min-w-[140px] rounded-xl border border-[#c7b896] bg-[#f7efd9] p-1.5 shadow-lg">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#3f372f] transition hover:bg-[#ebdfc5]"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/signin" className="px-2 text-[#f3e9d6] transition hover:text-white">
                                Signin
                            </Link>
                            <Link to="/signup" className="rounded-full border border-[#d6c9b0] bg-[#f1e5cf] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#3f372f] transition hover:bg-[#ead9ba]">
                                Signup
                            </Link>
                        </>
                    )}
                </nav>

                {/* Mobile nav */}
                {menuOpen && (
                    <nav className="absolute top-20 left-0 w-full flex flex-col items-center gap-3 bg-[#4b4b4b] border-t border-[#c6b99f] py-4 z-50 sm:hidden rounded-b-2xl shadow-lg animate-fade-in">
                        <Link to="/" className="px-2 py-2 w-full text-center text-[#f3e9d6] transition hover:text-white" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                        <Link to="/dashboard" className="px-2 py-2 w-full text-center text-[#f3e9d6] transition hover:text-white" onClick={() => setMenuOpen(false)}>
                            Dashboard
                        </Link>
                        <Link to="/publish" className="rounded-full text-center border border-[#d6c9b0] bg-[#f1e5cf] px-4 py-2 w-5/6 text-xs font-semibold uppercase tracking-[0.12em] text-[#3f372f] transition hover:bg-[#ead9ba]" onClick={() => setMenuOpen(false)}>
                            Write
                        </Link>
                        {loggedin ? (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-5/6 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#3f372f] bg-[#f7efd9] border border-[#c7b896] transition hover:bg-[#ebdfc5]"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/signin" className="px-2 py-2 w-full text-center text-[#f3e9d6] transition hover:text-white" onClick={() => setMenuOpen(false)}>
                                    Signin
                                </Link>
                                <Link to="/signup" className="rounded-full border border-[#d6c9b0] bg-[#f1e5cf] px-4 py-2 w-5/6 text-xs font-semibold uppercase tracking-[0.12em] text-[#3f372f] transition hover:bg-[#ead9ba]" onClick={() => setMenuOpen(false)}>
                                    Signup
                                </Link>
                            </>
                        )}
                    </nav>
                )}
            </div>
        </header>
    )
}