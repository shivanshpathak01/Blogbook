import { Link } from "react-router-dom"

interface blogcardtype {
    title: string
    content: string
    image: string
    authorname: string
    publishedDate: string
    id: string
    topic?: string
}

export const Blogcard = ({
    title,
    content,
    authorname,
    publishedDate,
    id,
    image,
    topic
}: blogcardtype) => {
    const label = topic ?? title.split(" ").slice(0, 2).join(" ")
    const excerpt = content.length > 110 ? `${content.slice(0, 110)}...` : content
    const readTime = Math.max(1, Math.ceil(content.split(" ").length / 180))

    return (
        <Link to={`/blog/${id}`} className="group">
            <article className="relative flex h-[560px] flex-col border border-[#d8ccb5] bg-[#f2eadb]/95 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1">
                <div className="absolute right-3 top-3 h-7 w-7 rounded-sm border border-[#d7cab3] opacity-70" />
                <div className="absolute right-4 top-4 h-7 w-7 rounded-sm border border-[#d7cab3] opacity-50" />

                <div className="relative overflow-hidden border border-[#d8ccb5]">
                    <img
                        src={image}
                        alt={title}
                        className="h-44 w-full object-cover grayscale-0 transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/45 px-3 py-2 text-center text-[10px] uppercase tracking-[0.2em] text-[#f4ead7]">
                        Blog File #{id.slice(0, 5)}
                    </div>
                </div>

                <div className="flex flex-1 flex-col pt-4">
                    <div className="space-y-3 border-b border-[#d8ccb5] pb-4">
                        <h2 className="font-['Cinzel'] text-[38px] font-semibold uppercase leading-[1.1] tracking-tight text-[#1e1b17]">
                            {label}
                        </h2>
                        <h3 className="min-h-[68px] font-['Cinzel'] text-[24px] font-semibold uppercase leading-tight text-[#1f1b17]">
                            {title.length > 42 ? `${title.slice(0, 42)}...` : title}
                        </h3>
                        <p className="min-h-[96px] font-['Cormorant_Garamond'] text-[24px] italic leading-6 text-[#433d35]">"{excerpt}"</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 text-[11px] uppercase tracking-[0.12em] text-[#5c5142]">
                        <div className="flex items-center gap-2">
                            <span>Reading Time : {readTime} mins</span>
                        </div>
                        <div className="flex items-center gap-3 font-semibold text-[#2d261f]">
                            <span>Read Journal</span>
                            <span className="text-base leading-none">[]</span>
                        </div>
                    </div>
                    <div className="pt-2 text-[12px] text-[#6b5d4d]">
                        <span className="font-semibold">{authorname}</span>
                        <span className="px-2">•</span>
                        <span>{publishedDate}</span>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}