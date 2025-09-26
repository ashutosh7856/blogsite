import { useState } from "react";
import { TiptapEditor } from "../components/TextEditor";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [blog, setBlog] = useState({
        title:'',
        body:''
    })
    const navigate = useNavigate()

    async function createBlog(){
        try{
            const token = localStorage.getItem('token')
            const payload = {title:blog.title, body:blog.body}
            const response = await fetch(`http://localhost:3000/api/v1/user/create-blog`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    authorization : `Bearer ${token}`
                },
                body:JSON.stringify(payload)
            })
            const result = await response.json()
            alert(result.message)
            navigate('/')
        }catch{
            // 
        }
    }
  return (
    <div className="w-full px-40 py-5">
      <div className="max-w-[960px] mx-auto flex flex-col py-5 justify-start">
        <div className="text-[#121717] text-3xl font-bold p-4">
          Create a new post
        </div>

        <input
          value={blog.title}
          onChange={(e)=>setBlog(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Title"
          className="p-4 m-4 border border-[#DBE3E5] bg-white max-w-[448px] rounded-[8px] placeholder:text-[#617D8A] font-normal text-[16px]"
        />

        <div className="p-4">
          <div className="border border-[#DBE3E5] rounded-[8px]">
            <TiptapEditor isEditable={true} onChange={(value: string) => setBlog(prev => ({ ...prev, body: value }))} value={blog.body} />
          </div>
        </div>

        <div className="py-4 px-4 flex justify-end">
          <button 
          onClick={createBlog}
          className="bg-[#12A3ED] rounded-[8px] text-[14px] font-medium px-3 py-1.5  text-white flex items-center justify-center overflow-clip whitespace-nowrap">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
