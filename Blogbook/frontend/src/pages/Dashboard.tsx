import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Spinner } from "../components/Spinner"
import { Auth } from "../context/context"
import { baseurl } from "../../config"
import { useMyBlogs, type Blog } from "../hooks/useblog"

export const Dashboard = () => {
    const { loggedin } = useContext(Auth)
    const navigate = useNavigate()
    const { loading, blogs } = useMyBlogs()
    const [deletingIds, setDeletingIds] = useState<Record<string, boolean>>({})
    const [error, setError] = useState("")

    useEffect(() => {
        if (loggedin === false) {
            navigate("/signin")
        }
    }, [loggedin, navigate])

    if (loggedin === null || loading) {
        return (
            <div className="min-h-screen bg-[#efede7] text-[#191512]">
                <Appbar />
                <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
                    <Spinner />
                </div>
            </div>
        )
    }

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Delete this blog from your dashboard?")
        if (!confirmDelete) return

        setDeletingIds((prev) => ({ ...prev, [id]: true }))
        try {
            const token = localStorage.getItem("token")
            await axios.delete(`${baseurl}/api/v1/blog/${id}`, {
                headers: token ? { Authorization: token } : undefined
            })
            setDeletingIds((prev) => {
                const next = { ...prev }
                delete next[id]
                return next
            })
            window.location.reload()
        } catch (err) {
            console.error(err)
            setError("Unable to delete the blog. Please try again.")
            setDeletingIds((prev) => ({ ...prev, [id]: false }))
        }
    }

    return (
        <div className="min-h-screen bg-[#efede7] text-[#1c1814]">
            <Appbar />
            <main className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
                <section className="border-b border-[#4a4339] pb-8 text-center">
                    <p className="text-sm uppercase tracking-[0.24em] text-[#4e4438]">Your Dashboard</p>
                    <h1 className="mt-4 text-5xl font-[Cinzel] uppercase tracking-tight text-[#1f1a15] sm:text-6xl">
                        My Blogs
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#4f4337]">
                        Only posts you created are visible here. Use the dashboard controls to update or delete your own blogs.
                    </p>
                </section>

                {error && (
                    <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                    </div>
                )}

                <section className="mt-10 space-y-6">
                    {blogs.length === 0 ? (
                        <div className="rounded-3xl border border-[#d8ccb5] bg-[#f7f1e6] p-8 text-center text-[#4f4337] shadow-sm">
                            <p className="text-lg font-semibold">You haven't published any blogs yet.</p>
                            <Link
                                to="/publish"
                                className="mt-4 inline-flex rounded-full border border-[#ccbda3] bg-[#f3e6cf] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#2f271e] transition hover:bg-[#ead8b8]"
                            >
                                Publish your first blog
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2">
                            {blogs.map((blog) => (
                                <DashboardCard
                                    key={blog.id}
                                    blog={blog}
                                    deleting={!!deletingIds[blog.id]}
                                    onDelete={() => handleDelete(blog.id)}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

function DashboardCard({
    blog,
    deleting,
    onDelete
}: {
    blog: Blog
    deleting: boolean
    onDelete: () => void
}) {
    const excerpt = blog.content.length > 120 ? `${blog.content.slice(0, 120)}...` : blog.content
    const formattedDate = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
          })
        : ""

    return (
        <article className="rounded-[32px] border border-[#d8ccb5] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
            <div className="overflow-hidden rounded-3xl border border-[#d8ccb5]">
                <img src={blog.image} alt={blog.title} className="h-56 w-full object-cover" />
            </div>
            <div className="mt-5 flex flex-col gap-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[#8b7f70]">{formattedDate}</p>
                    <h2 className="mt-2 text-2xl font-semibold uppercase text-[#1e1a17]">{blog.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-[#5c5245]">{excerpt}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        to={`/blog/${blog.id}`}
                        className="rounded-full border border-[#4a4339] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2f271e] transition hover:bg-[#e6ded0]"
                    >
                        View blog
                    </Link>
                    <Link
                        to={`/publish?edit=${blog.id}`}
                        className="rounded-full border border-[#ccbda3] bg-[#f3e6cf] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2f271e] transition hover:bg-[#ead8b8]"
                    >
                        Edit blog
                    </Link>
                    <button
                        type="button"
                        onClick={onDelete}
                        disabled={deleting}
                        className="rounded-full border border-[#8b3b31] bg-[#a9493d] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#f9eee8] transition hover:bg-[#923f34] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {deleting ? "Deleting…" : "Delete blog"}
                    </button>
                </div>
            </div>
        </article>
    )
}
