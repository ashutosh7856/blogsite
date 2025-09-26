import { CircleX, Search } from "lucide-react";
import Blog from "../components/layout/BlogCard";

export default function Home(){
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
                className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#617D8A]"
            />
            <input
                type="text"
                placeholder="search here"
                className="bg-[#f0f2f5] min-w-[128px] w-full p-2 pl-9 pr-9 rounded-[8px] text-[#121717] text-[16px] font-normal  placeholder:text-[#121717]"
            />
        </div>

        <div className="pt-5 pb-3 px-4 text-[22px] font-bold text-[#121717]">
            Latest Posts
        </div>

        <Blog/>

        </div>
        
    </div>
}