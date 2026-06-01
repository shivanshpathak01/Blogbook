import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import type { Blogposttype } from "@ayushdevinfer1/medium-common"
import { Appbar } from "../components/Appbar"
import axios from "axios"
import { baseurl, cloudName, uploadPreset } from "../../config"
import { Auth } from "../context/context"
import { Skeleton } from "../components/Skeleton"

export const Publish = () => {
    const { loggedin } = useContext(Auth)
    const navigate = useNavigate()
    const location = useLocation()

    const [publish, setpublish] = useState<Blogposttype>({
        title: "",
        content: "",
        image: ""
    })
    const [isSaving, setIsSaving] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isEditMode, setIsEditMode] = useState(false)

    const query = new URLSearchParams(location.search)
    const editId = query.get("edit")

    const isFormValid =
        publish.title.trim().length >= 8 &&
        publish.content.trim().length >= 50 &&
        publish.image.trim().length > 0

    useEffect(() => {
        if (loggedin === null) return
        if (loggedin === false) navigate("/signin")
    }, [loggedin, navigate])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (!editId) return
        setIsEditMode(true)
        const token = localStorage.getItem("token")
        axios
            .get(`${baseurl}/api/v1/blog/${editId}`, {
                headers: token ? { Authorization: token } : undefined
            })
            .then((response) => {
                setpublish({
                    title: response.data.title,
                    content: response.data.content,
                    image: response.data.image
                })
            })
            .catch(() => setErrorMessage("Unable to load blog for editing."))
    }, [editId])

    const uploadImage = () => {
        // @ts-ignore
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName,
                uploadPreset,
                sources: ["local", "url", "camera"],
                multiple: false,
                folder: "medium-blog",
                styles: {
                    palette: {
                        window: "#ffffff",
                        windowBorder: "#90A0B7",
                        tabIcon: "#0a84ff",
                        menuIcons: "#5A5A5A",
                        textDark: "#000000",
                        textLight: "#FFFFFF",
                        link: "#0a84ff",
                        action: "#0a84ff",
                        inactiveTabIcon: "#8A8A8A",
                        error: "#f44336",
                        inProgress: "#0a84ff"
                    },
                    fonts: {
                        default: null,
                        "'Manrope', sans-serif": {
                            url: "https://fonts.googleapis.com/css?family=Manrope",
                            active: true
                        }
                    }
                }
            },
            (error: any, result: any) => {
                if (!error && result && result.event === "success") {
                    setpublish((prev:any) => ({ ...prev, image: result.info.secure_url }))
                }
            }
        )
        widget.open()
    }

    const handlePublish = async () => {
        if (!isFormValid) {
            setErrorMessage("Please add a title, meaningful content, and upload an image first.")
            return
        }
        setErrorMessage("")
        setIsSaving(true)

        const token = localStorage.getItem("token")
        const headers = token ? { Authorization: token } : undefined

        try {
            const response = editId
                ? await axios.put(`${baseurl}/api/v1/blog/${editId}`, publish, { headers })
                : await axios.post(`${baseurl}/api/v1/blog`, publish, { headers })
            navigate(`/blog/${response.data.id}`)
        } catch (error) {
            console.error("Error publishing:", error)
            setErrorMessage("Unable to publish right now. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    if (loggedin === null)
        return (
            <div className="flex justify-center px-4 py-16">
                <div className="max-w-5xl w-full p-6 space-y-4">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            </div>
        )

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Appbar />
            <main className="mx-auto max-w-5xl px-4 py-10">
                <section className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-200/80 backdrop-blur-sm">
                    <div className="mb-8 space-y-3">
                        <p className="text-sm uppercase tracking-[0.24em] text-sky-600">
                            {isEditMode ? "Update post" : "Create post"}
                        </p>
                        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                            {isEditMode ? "Edit your blog" : "Publish your next blog"}
                        </h1>
                        <p className="max-w-2xl text-sm leading-7 text-slate-600">
                            {isEditMode
                                ? "Update the post content, cover image, or title. Changes will appear immediately after save."
                                : "Share your ideas with a clean publishing experience. Add a title, strong content, and a cover image to make your post stand out."}
                        </p>
                    </div>

                    <div className="grid gap-8">
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-700">Post title</label>
                            <input
                                value={publish.title}
                                onChange={(e) => setpublish({ ...publish, title: e.target.value })}
                                type="text"
                                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none ring-2 ring-transparent transition focus:border-sky-400 focus:ring-sky-200"
                                placeholder="Write a title that grabs attention..."
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-700">Blog content</label>
                            <TextEditor
                                value={publish.content}
                                onChange={(e) => setpublish({ ...publish, content: e.target.value })}
                            />
                            <p className="text-sm text-slate-500">{publish.content.trim().length} / 100+ characters</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-5">
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">Cover image</p>
                                    <p className="text-sm text-slate-500">
                                        Add a featured image so your post looks polished on listings.
                                    </p>
                                </div>
                                <button
                                    onClick={uploadImage}
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                                >
                                    {publish.image ? "Change image" : "Upload image"}
                                </button>
                            </div>

                            {publish.image && (
                                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900/5">
                                    <img src={publish.image} alt="Uploaded preview" className="h-[260px] w-full object-cover" />
                                </div>
                            )}
                        </div>

                        {errorMessage && (
                            <div className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                {errorMessage}
                            </div>
                        )}

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-sm text-slate-500">
                                {isFormValid
                                    ? isEditMode
                                        ? "Ready to save your update."
                                        : "Ready to publish."
                                    : "Add a title, enough content, and an image for the best result."}
                            </div>
                            <button
                                onClick={handlePublish}
                                disabled={!isFormValid || isSaving}
                                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                            >
                                {isSaving ? "Saving..." : isEditMode ? "Save blog" : "Publish post"}
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

function TextEditor({
    value,
    onChange
}: {
    value: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}) {
    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <textarea
                value={value}
                onChange={onChange}
                rows={10}
                className="min-h-[240px] w-full resize-none border-0 bg-white px-5 py-4 text-base leading-7 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0"
                placeholder="Write your blog here..."
                required
            />
        </div>
    )
}
