import { useState } from "react";
import { TiptapEditor } from "../components/TextEditor";
import { useNavigate } from "react-router-dom";
import Toast from "../components/ui/Toast";

export default function CreatePost() {
    const [blog, setBlog] = useState({
        title:'',
        body:''
    })
    const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{message:string,type?:'success'|'error'|'info'}|null>(null)

    async function createBlog(){
        try{
      setLoading(true)
            const token = localStorage.getItem('token')
            const payload = {title:blog.title, body:blog.body}
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/create-blog`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    authorization : `Bearer ${token}`
                },
                body:JSON.stringify(payload)
            })
      if(!response.ok){
        const text = await response.text().catch(()=>response.statusText)
        setToast({message: text || 'Failed to create post', type:'error'})
        setLoading(false)
        return
      }
      const result = await response.json()
      setToast({message: result.message || 'Post created', type:'success'})
      setLoading(false)
      navigate('/')
        }catch{
      setLoading(false)
      setToast({message:'An unexpected error occurred', type:'error'})
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
          disabled={loading}
          className="bg-[#12A3ED] rounded-[8px] text-[14px] font-medium px-3 py-1.5  text-white flex items-center justify-center overflow-clip whitespace-nowrap">
            {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"/> : null}
            Publish
          </button>
        </div>
      </div>
      {toast ? <Toast message={toast.message} type={toast.type} onClose={()=>setToast(null)} /> : null}
    </div>
  );
}
