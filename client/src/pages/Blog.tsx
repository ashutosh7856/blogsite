import { Heart, MessageCircleMore, Send, UserCircle2Icon } from "lucide-react";
import DOMPurify from 'dompurify';
import { Link, useLocation } from 'react-router-dom';


interface blogType {
  id: string;
  userId: string;
  title: string;
  body: string;
  created_at: Date | string;
}

export default function BlogPage() {
  const location = useLocation();
  type LocationState = { blog?: blogType } | undefined;
  const state = location.state as LocationState;
  const blog = state?.blog;

  if (!blog) {
    return (
      <div className="max-w-[960px] mx-auto p-6">
        <p className="text-[#121717] font-medium">No blog data available.</p>
        <p className="text-[#617D8A] text-sm mt-2">Please go back to the homepage and open a post.</p>
      </div>
    );
  }
  return (
    <div className="bg-white max-w-[960px] mx-auto flex  flex-col">
      <div className="flex gap-2 p-4">
        <p className="flex gap-2 text-[#617D8A] font-medium text-[16px]">
         <Link to={'/'}>Home</Link><span>/</span>
        </p>
        <p className="text-[#121717] font-medium text-[16px]">Tech</p>
      </div>

      <div className=" pb-4 px-4">
        <h1 className="text-[28px] text-[#121717] font-bold">
          {blog.title}
        </h1>
      </div>

      <div className="pb-3 px-4">
        <p className="text-[#617d8a] text-[14px] font-normal">
          By Ashutosh · Published on Sept 26, 2025
        </p>
      </div>

      <div className="py-3">
        <img src="/thumbnail.png" alt="thumbnail" className="" />
      </div>

      <div>
        {/* render sanitized HTML with 14px text and bold text */}
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.body as string) }}
        />
      </div>


      <div className="flex items-center justify-start gap-4 py-4 ">
        <div className="flex items-center justify-center gap-2 text-[#617D8A] text-[14px]">
          <Heart size={20} />
          <span className="leading-none">24</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-[#617D8A] text-[14px]">
          <MessageCircleMore size={20} />
          <span className="leading-none">12</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-[#617D8A] text-[14px]">
          <Send size={20} />
          <span className="leading-none">34</span>
        </div>
      </div>


      <div className="py-4 px-4 font-bold text-[#121717] text-[18px]">
        Comments
      </div>

      <div className="flex items-center gap-3 p-4">

        <UserCircle2Icon className="w-10 h-10 text-[#617d8a] rounded-full"/>
        <div className="flex flex-col text-[#121717] text-[14px] ">
            <h1 className="font-bold flex gap-3">Sumit Shrestha <span className="text-[#617D8A] font-normal">2 days ago</span></h1>
            <p className="font-normal">Great Article! AI is indeed changing the game.</p>

        </div>
      </div>

      <div className="bg-white py-3 px-4 max-w-[480x] w-full">
        <textarea name="comments" rows={10} cols={40} className="border bordeer-[#DBE3E5] rounded-[8px]"/>
      </div>


      <div className="py-4 px-4 flex justify-end">
        <button className="bg-[#12A3ED] hover:bg-[#2980ac] rounded-[8px] text-[14px] font-medium px-3 py-1.5  text-white flex items-center justify-center overflow-clip whitespace-nowrap">
            Post Comment
        </button>
      </div>
    </div>
  );
}
