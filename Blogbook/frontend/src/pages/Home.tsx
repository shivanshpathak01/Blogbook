import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useContext } from "react"
import { Appbar } from "../components/Appbar"
import { Auth } from "../context/context"

export const Home = () => {
    const { loggedin } = useContext(Auth)
    const navigate = useNavigate()

    if (loggedin === null) return null

    return (
        <div className="min-h-screen bg-[#efede7] text-[#1c1814]">
            <Appbar />

            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex rounded-full border border-[#d7cab2] bg-[#f3e6cf] px-4 py-2 text-xs uppercase tracking-[0.32em] text-[#4f432f]">
                            Blog-driven writing for every reader
                        </div>

                        <div className="space-y-6">
                            <h1 className="font-[Cinzel] text-5xl font-semibold uppercase leading-tight text-[#1d1914] sm:text-6xl">
                                Your next favorite blog awaits.
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-[#5a4f38]">
                                Discover thoughtful reads, publish your own voice, and join a modern writing space that feels warm, polished, and easy to use.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/blogs")}
                                className="inline-flex items-center justify-center rounded-full border border-[#4a4339] bg-[#f3e6cf] px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#2f271e] transition hover:bg-[#ead8b8]"
                            >
                                Explore blogs
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/publish")}
                                className="inline-flex items-center justify-center rounded-full bg-[#1c1814] px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition hover:bg-[#2f2b28]"
                            >
                                Publish your blog
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[28px] border border-[#d7cab2] bg-white/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
                                <p className="text-sm uppercase tracking-[0.24em] text-[#8c7f68]">Verified blogs</p>
                                <p className="mt-3 text-base leading-7 text-[#4e4438]">Every post is presented in a calm, elegant layout designed for easy reading.</p>
                            </div>
                            <div className="rounded-[28px] border border-[#d7cab2] bg-white/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
                                <p className="text-sm uppercase tracking-[0.24em] text-[#8c7f68]">Write with confidence</p>
                                <p className="mt-3 text-base leading-7 text-[#4e4438]">Publish clean content quickly and keep your writing experience consistent with the rest of the app.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9 }}
                        className="relative"
                    >
                        <div className="absolute -right-10 top-10 h-80 w-80 rounded-full bg-[#d5c89f] opacity-70 blur-2xl" />
                        <div className="relative overflow-hidden rounded-[40px] border border-[#d7cab2] bg-white px-8 py-10 shadow-[0_28px_80px_rgba(0,0,0,0.08)]">
                            <div className="space-y-6">
                                <div className="rounded-[32px] border border-[#e3d7c0] bg-[#f9f2e8] p-6">
                                    <p className="text-xs uppercase tracking-[0.28em] text-[#7e6f57]">Featured read</p>
                                    <h2 className="mt-3 text-3xl font-semibold text-[#1f1b17]">A modern writing ritual</h2>
                                    <p className="mt-4 text-sm leading-7 text-[#6a5c46]">
                                        A clean reading experience, designed to keep the focus on beautiful blogs and meaningful ideas.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl border border-[#e6d9c0] bg-[#fff9f0] p-5">
                                        <p className="text-xs uppercase tracking-[0.24em] text-[#8b7d63]">Write</p>
                                        <p className="mt-3 text-sm leading-6 text-[#5e5240]">Publish your ideas in a refined interface.</p>
                                    </div>
                                    <div className="rounded-3xl border border-[#e6d9c0] bg-[#fff9f0] p-5">
                                        <p className="text-xs uppercase tracking-[0.24em] text-[#8b7d63]">Read</p>
                                        <p className="mt-3 text-sm leading-6 text-[#5e5240]">Browse blogs curated for calm focus and compelling content.</p>
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-[#d7cab2] bg-[#fbf5eb] p-5 text-sm text-[#5f5041]">
                                    Join a thoughtful reading space that feels balanced, warm, and polished.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                <section className="mt-16 grid gap-6 sm:grid-cols-3">
                    <div className="rounded-[32px] border border-[#d7cab2] bg-white p-6 shadow-[0_20px_45px_rgba(0,0,0,0.06)]">
                        <p className="text-sm uppercase tracking-[0.24em] text-[#8c7f68]">Engaging</p>
                        <h3 className="mt-4 text-xl font-semibold text-[#1f1b17]">Easy discovery</h3>
                        <p className="mt-3 text-sm leading-6 text-[#5d5244]">Find the latest blogs faster with a pleasant browsing experience.</p>
                    </div>
                    <div className="rounded-[32px] border border-[#d7cab2] bg-white p-6 shadow-[0_20px_45px_rgba(0,0,0,0.06)]">
                        <p className="text-sm uppercase tracking-[0.24em] text-[#8c7f68]">Clean</p>
                        <h3 className="mt-4 text-xl font-semibold text-[#1f1b17]">Consistent UI</h3>
                        <p className="mt-3 text-sm leading-6 text-[#5d5244]">The homepage now follows the same refined styling as the rest of the app.</p>
                    </div>
                    <div className="rounded-[32px] border border-[#d7cab2] bg-white p-6 shadow-[0_20px_45px_rgba(0,0,0,0.06)]">
                        <p className="text-sm uppercase tracking-[0.24em] text-[#8c7f68]">Warm</p>
                        <h3 className="mt-4 text-xl font-semibold text-[#1f1b17]">Inviting design</h3>
                        <p className="mt-3 text-sm leading-6 text-[#5d5244]">A softer palette and polished cards make the entry page feel more welcoming.</p>
                    </div>
                </section>
            </main>
        </div>
    )
}
