import  React, { useReducer, useState } from 'react'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5'
import axios, { isAxiosError } from "axios"
import { Input } from '@material-tailwind/react'

interface Props{
  type?:string,
}
interface FormReducer {
    type: string | undefined;
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
const Form = ({ type }:Props) => {
    const [state, dispatch]=useReducer(formReducer, { username:"", password:"", email:"" })
    const [showPassword, setShowPassword]=useState<boolean>(false)
    const handleInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const  { name, value }=e.target
      dispatch({ type:name, payload:value })
  }
    const handleSignUp=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
          const res= await axios.post("http://localhost:4000/auth/signup",{
            ...state
          },{
            withCredentials:true,
          })
          if(res.status<400){
            dispatch({type:'username',payload:""})
            dispatch({type:'password',payload:""})
            dispatch({type:'email',payload:""})
          }
        }catch(error:unknown){
          if (isAxiosError(error)) {
            console.error('An error occurred', error.message);
          } else {
            console.error('An unknown error occurred:', error);
          }          
        }
    }

    const handleSignIn=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      try{
        const res= await axios.post("http://localhost:4000/auth/signin",{
          email:state.email,
          password:state.password
        },{
          withCredentials:true,
        })
        if(res.status<400){
          dispatch({type:'username',payload:""})
          dispatch({type:'password',payload:""})
          dispatch({type:'email',payload:""})
        }
      }catch(error:unknown){
        if (isAxiosError(error)) {
          console.error('An error occurred', error.message);
        } else {
          console.error('An unknown error occurred:', error);
        }          
      }
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-semibold font-sans">{type?"Sign Up":"Sign In"}</h1>
        <form onSubmit={type==="signup"?handleSignUp:handleSignIn} className="w-full max-w-sm mt-8 flex flex-col gap-4 px-7 py-5 rounded-lg border-2 border-accent">
            {(type==='signup')&&(
                <Input variant="standard" color="white" crossOrigin={'Username'} type="text" name="username" minLength={3} value={state.username} onChange={handleInput} required label="Username"/>
            )}
            <Input variant="standard" color="white" crossOrigin={'Email'} type="email" name="email" value={state.email} onChange={handleInput} required label="Email"/>
            <div className="relative w-full">
                <Input variant="standard" color="white" crossOrigin={'password'} name="password" value={state.password} type={showPassword?'text':'password'} onChange={handleInput} required label="Password" minLength={8}/>
                <button onClick={()=>setShowPassword(prev=>!prev)} type="button" className="absolute top-1/2 -translate-y-1/2 right-3 hover:scale-110 transition-transform duration-150">
                  {showPassword?<IoEyeOffSharp />:<IoEyeSharp />}
                </button>
                <span className={`${state.password.length<8 && state.password.length>0?"block":"hidden"} text-xs text-red-500 mt-2`}>password must be at least 8 characters</span>
            </div>
            <button type="submit" className="w-32 py-2 btn shadow shadow-white/10 font-semibold text-lg">Sign Up</button>
        </form>
    </div>
  )
}

export default Form
