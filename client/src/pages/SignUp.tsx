import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Toast from "../components/ui/Toast";

export default function SignUp() {
  const [loginActive, setLoginActive] = useState(true);
  
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{message:string,type?:'success'|'error'|'info'}|null>(null)



  function onChange(e: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name as string]: value }))
  }



  async function login(){
    try {
      setLoading(true)
      const apiUrl = import.meta.env.VITE_API_URL
      if(!apiUrl){
        setToast({message:'No api url found.', type:'error'})
        setLoading(false)
        return 
      }

      const payload = {email:formData.email, password:formData.password}
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/signin`, {
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
      })

      if(!response.ok){
        const text = await response.text().catch(()=>response.statusText)
        setToast({message:text || 'Login failed', type:'error'})
        setLoading(false)
        return
      }

      const result = await response.json()
      localStorage.setItem('token', result.token)
      setToast({message:'Logged in', type:'success'})
      setLoading(false)
      navigate('/')
    }catch{
      setLoading(false)
      setToast({message:'An unexpected error occurred', type:'error'})
    }
  }


  async function signup(){
    try{
      setLoading(true)
      const apiUrl = import.meta.env.VITE_API_URL
      if(!apiUrl){
        setToast({message:'No api url found', type:'error'})
        setLoading(false)
        return 
      }
      if(formData.password.length < 8){
        setToast({message:'Password must be at least 8 characters long', type:'error'})
        setLoading(false)
        return
      }

      if(formData.password !== formData.confirmPassword){
        setToast({message:'Passwords do not match', type:'error'})
        setLoading(false)
        return
      }
      const payload = {email:formData.email, password:formData.password, name:formData.name}
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/signup`, {
        method:"POST",
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
      })

      if(!response.ok){
        const text = await response.text().catch(()=>response.statusText)
        setToast({message:text || 'Signup failed', type:'error'})
        setLoading(false)
        return
      }

      const result = await response.json()
      localStorage.setItem('token', result.token)
      setToast({message:'Account created', type:'success'})
      setLoading(false)
      navigate('/')
    }catch{
      setLoading(false)
      setToast({message:'An unexpected error occurred', type:'error'})
    }
  }




  return (
    <div className="w-full bg-white py-5 px-40 ">
      <div className="max-w-[960px] mx-auto py-5 flex flex-col items-center gap-3">
        <h1 className="text-[28px] font-bold text-[#121717]">
          Welcome to TheBlog
        </h1>

        <div className="flex justify-items-start w-full border-b border-[#DBE3E5] px-4">
          <div className="flex gap-8">
            <div onClick={()=>setLoginActive(!loginActive)} className={`text-[14px] font-bold ${loginActive?'text-[#617d8a]':'text-[#121717]'} border-b-[3px]  pt-4 pb-[13px]`}>
              Sign Up
            </div>
            <div onClick={()=>setLoginActive(!loginActive)} className={`text-[14px] font-bold ${loginActive?'text-[#121717]':'text-[#617D8A]'} border-b-[3px]  pt-4 pb-[13px]`}>
              Log In
            </div>
          </div>
          <hr className="h-px text-[#e5e8eb]" />
        </div>

        <div className="flex flex-col w-full justify-items-start gap-6 px-4 pt-3">
             {!loginActive ? (
                <>
                    <Input type="text" name="name" value={formData.name} onChange={onChange} placeholder="Name"/>
                    <Input type="email" name="email" value={formData.email} onChange={onChange} placeholder="email@theblog.com"/>
                    <Input type="password" name="password" value={formData.password} onChange={onChange} placeholder="password"/>
                    <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={onChange} placeholder="confirm password"/>

          <button onClick={signup} disabled={loading} className="w-[448px] bg-[#12a3ed] rounded-[8px] px-4 text-white text-[14px] font-bold h-10 hover:bg-[#2980ac] flex items-center justify-center">
            {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"/> : null}
            Sign Up
          </button>
                </>

             ):(
                <>
                 <Input type="email" name="email" value={formData.email} onChange={onChange} placeholder="your@emai.com" />
                <Input type="password" name="password" value={formData.password} onChange={onChange} placeholder="secret123" />
        <button onClick={login} disabled={loading} className="w-[448px] bg-[#12a3ed] rounded-[8px] px-4 text-white text-[14px] font-bold h-10 hover:bg-[#2980ac] flex items-center justify-center">
          {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"/> : null}
          Log In
        </button>
                </>
             )
             }

         
        </div>

        <div className="py-4 px-4 text-[14px] font-normal text-[#617D8A]">
          or sign up with
        </div>

        <div className="flex gap-3 px-4">
          <div className="bg-[#F0F2F5] px-4 h-10 w-56 rounded-[8px] flex items-center justify-center font-bold text-[14px] text-[#121717]">
            Continue with Google
          </div>
          <div className="bg-[#F0F2F5] px-4 h-10 w-56 rounded-[8px] flex items-center justify-center font-bold text-[14px] text-[#121717]">
            Continue with Github
          </div>
        </div>
        <div className="text-[14px] font-normal text-[#617D8A] py-3">
          Forgot password?
        </div>
        {toast ? <Toast message={toast.message} type={toast.type} onClose={()=>setToast(null)} /> : null}
      </div>
    </div>
  );
}
