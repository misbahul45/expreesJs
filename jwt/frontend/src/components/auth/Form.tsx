import  React, { useReducer, useState } from 'react'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5'
import axios from "axios"
import { Input } from '@material-tailwind/react'
interface FormReducer {
    type: string;
    payload: string;
  }
  
  interface State {
    username: string;
    password: string;
    email: string;
  }
  const formReducer=(state:State, action:FormReducer)=>{
    switch (action.type) {
      case "username":
        return { ...state, username: action.payload };
      case "password":
        return { ...state, password: action.payload };
      case "email":
        return { ...state, email: action.payload };
      default:
        return state;
    }
  }
interface Props{
    type:string,
}
const Form = ({ type }:Props) => {
    const [state, dispatch]=useReducer(formReducer, { username:"", password:"", email:"" })
    const [showPassword, setShowPassword]=useState<boolean>(false)
    const handleSignUp=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const res= await axios.post("http://localhost:3000/auth/sign-up",state)
    }
    const handleInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const  { name, value }=e.target
        dispatch({ type:name, payload:value })
    }
  return (
    <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-5xl font-semibold font-sans">Sign Up</h1>
        <form onSubmit={handleSignUp} className="w-full max-w-sm mt-8 flex flex-col gap-4 px-7 py-5 rounded-lg border-2 border-accent">
            {(type==='signup')&&(
                <Input variant="standard" color="white" crossOrigin={'Username'} type="text" name="username" minLength={3} onChange={handleInput} required label="Username" />
            )}
            <Input  variant="standard" color="white" crossOrigin={'Email'} type="email" name="email" onChange={handleInput} required label="Email" />
            <div className="relative w-full">
                <Input  variant="standard" color="white" crossOrigin={'password'} name="password" type={showPassword?'text':'password'} onChange={handleInput} required label="Password" minLength={8} />
                <button onClick={()=>setShowPassword(prev=>!prev)} type="button" className="absolute top-1/2 -translate-y-1/2 right-3 hover:scale-110 transition-transform duration-150">
                  {showPassword?<IoEyeOffSharp />:<IoEyeSharp />}
                </button>
            </div>
            <button type="submit" className="w-32 py-2 btn shadow shadow-white/10 font-semibold text-lg">Sign Up</button>
        </form>
    </div>
  )
}

export default Form
