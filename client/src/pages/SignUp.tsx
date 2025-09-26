import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";

export default function SignUp() {
  const [loginActive, setLoginActive] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })
  const navigate = useNavigate()



  function onChange(e: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name as string]: value }))
  }



  async function login(){
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      if(!apiUrl){
        setError('No api url found.')
        return 
      }

      const payload = {email:formData.email, password:formData.password}
      const response = await fetch(`http://localhost:3000/api/v1/user/signin`, {
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
      })

      if(!response.ok){
        console.error(response.statusText, error)
        return
      }

      const result = await response.json()
      localStorage.setItem('token', result.token)
      console.log(result)
      navigate('/')
    }catch{
      // 
    }
  }


  async function signup(){
    try{
      const apiUrl = import.meta.env.VITE_API_URL
      if(!apiUrl){
        setError('No api url found')
        return 
      }
      if(formData.password.length < 8){
        setError('Password must be at least 8 characters long')
        return
      }

      if(formData.password !== formData.confirmPassword){
        setError('Passwords do not match')
        return
      }
      const payload = {email:formData.email, password:formData.password, name:formData.name}
      const response = await fetch(`http://localhost:3000/api/v1/user/signup`, {
        method:"POST",
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
      })

      if(!response.ok){
        console.error(response.statusText)
        return
      }

      const result = await response.json()
      localStorage.setItem('token', result.token)
      console.log(result)
      navigate('/')
    }catch{
      // 
    }
  }




  return (
    <div className="w-full py-5 px-40 " style={{backgroundColor:'var(--bg)'}}>
      <div className="max-w-[960px] mx-auto py-5 flex flex-col items-center gap-3">
        <h1 className="text-[28px] font-bold text-[#121717]">
          Welcome to TheBlog
        </h1>

        <div className="flex justify-items-start w-full px-4" style={{borderBottom: '1px solid var(--border)'}}>
          <div className="flex gap-8">
            <div onClick={()=>setLoginActive(!loginActive)} className={`text-[14px] font-bold border-b-[3px]  pt-4 pb-[13px]`} style={{color: loginActive ? 'var(--muted)' : 'var(--text-primary)'}}>
              Sign Up
            </div>
            <div onClick={()=>setLoginActive(!loginActive)} className={`text-[14px] font-bold border-b-[3px]  pt-4 pb-[13px]`} style={{color: loginActive ? 'var(--text-primary)' : 'var(--muted)'}}>
              Log In
            </div>
          </div>
          <hr className="h-px" style={{borderTop: '1px solid var(--border)'}} />
        </div>

  <div className="flex flex-col w-full justify-items-start gap-6 px-4 pt-3">
             {!loginActive ? (
                <>
                    <Input type="text" name="name" value={formData.name} onChange={onChange} placeholder="Name"/>
                    <Input type="email" name="email" value={formData.email} onChange={onChange} placeholder="email@theblog.com"/>
                    <Input type="password" name="password" value={formData.password} onChange={onChange} placeholder="password"/>
                    <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={onChange} placeholder="confirm password"/>

          <button onClick={signup} className="w-[448px] rounded-[8px] px-4 text-white text-[14px] font-bold h-10" style={{backgroundColor:'var(--primary)'}}>
                        Sign Up
                    </button>
                </>

             ):(
                <>
                 <Input type="email" name="email" value={formData.email} onChange={onChange} placeholder="your@emai.com" />
                <Input type="password" name="password" value={formData.password} onChange={onChange} placeholder="secret123" />
        <button onClick={login} className="w-[448px] rounded-[8px] px-4 text-white text-[14px] font-bold h-10" style={{backgroundColor:'var(--primary)'}}>
                    Log In
                </button>
                </>
             )
             }

         
        </div>

        <div className="py-4 px-4 text-[14px] font-normal" style={{color:'var(--muted)'}}>
          or sign up with
        </div>

        <div className="flex gap-3 px-4">
          <div className="px-4 h-10 w-56 rounded-[8px] flex items-center justify-center font-bold text-[14px]" style={{backgroundColor:'var(--input-bg)', color:'var(--text-primary)'}}>
            Continue with Google
          </div>
          <div className="px-4 h-10 w-56 rounded-[8px] flex items-center justify-center font-bold text-[14px]" style={{backgroundColor:'var(--input-bg)', color:'var(--text-primary)'}}>
            Continue with Github
          </div>
        </div>
        <div className="text-[14px] font-normal py-3" style={{color:'var(--muted)'}}>
          Forgot password?
        </div>
      </div>
    </div>
  );
}
