import { CircleX, Search } from "lucide-react";
import Blog from "../components/layout/BlogCard";
import { useEffect, useState } from "react";



interface blogType{
    id: string;
    userId: string;
    title: string;
    body: string;
    created_at: Date | string;
}

export default function Home(){
        const [searchQuery, setSearchQuery] = useState<string>('')
        const [blogs, setBlogs] = useState<blogType[]>([])
            const [currentPage, setCurrentPage] = useState<number>(1)
        
            // reset to first page when the search query changes
            useEffect(() => {
                setCurrentPage(1)
            }, [searchQuery])
    const BLOGS_PER_PAGE = 4

    useEffect(()=>{
        async function fetchBlogs(){
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/blog/all`, {
                headers:{
                    'Content-Type':'application/json'
                }
            })

            const result = await response.json()
            setBlogs(result.blogs)
        }

        fetchBlogs()
    }, [])
    return <div className="w-full bg-white py-5 px-40">
        <div className="max-w-[960px] flex flex-col mx-auto">
        <div className="relative py-3 px-4 text-[#617D8A]">
            <Search
                size={20}
                aria-hidden="true"
                className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#617D8A]"
            />
            <CircleX
                size={16}
                onClick={()=>setSearchQuery('')}
                className={`${searchQuery ? 'block':'hidden'} absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#617D8A]`}
            />
            <input
                type="text"
                placeholder="search here"
                onChange={(e)=>setSearchQuery(e.target.value)}
                value={searchQuery}
                className="bg-[#f0f2f5] min-w-[128px] w-full p-2 pl-9 pr-9 rounded-[8px] text-[#121717] text-[16px] font-normal  placeholder:text-[#121717]"
            />
        </div>

        <div className="pt-5 pb-3 px-4 text-[22px] font-bold text-[#121717]">
            Latest Posts
        </div>

            {(() => {
                const q = searchQuery?.trim().toLowerCase() ?? ''
                const filtered = q
                    ? blogs.filter(b => (b.title ?? '').toLowerCase().includes(q) || (b.body ?? '').toLowerCase().includes(q))
                    : blogs

                const totalPages = Math.max(1, Math.ceil(filtered.length / BLOGS_PER_PAGE))
                const start = (currentPage - 1) * BLOGS_PER_PAGE
                const paginated = filtered.slice(start, start + BLOGS_PER_PAGE)

                return (
                    <>
                        {paginated.length === 0 ? (
                            <div className="p-4 text-[#617D8A]">No posts found.</div>
                        ) : (
                            paginated.map(blog => (
                                <div key={blog.id}>
                                    <Blog blog={blog} />
                                </div>
                            ))
                        )}

                        <div className="flex items-center justify-center gap-2 mt-6">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Prev
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <button
                                    key={p}
                                    onClick={() => setCurrentPage(p)}
                                    className={`px-3 py-1 rounded border ${p === currentPage ? 'bg-[#12A3ED] text-white' : ''}`}
                                >
                                    {p}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )
            })()}

        </div>
        
    </div>
}