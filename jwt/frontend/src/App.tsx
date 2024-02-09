import React, { useRef, useState } from 'react'

const App:React.FC = () => {
  const titleRef=useRef<HTMLInputElement>(null)
  const [file, setFile]=useState<File | null>(null)

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.append("title",titleRef.current?.value ?? "")
    formData.append("file", file ?? "")
    console.log(formData)   
  }
  
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-900">
        <h1 className="text-4xl mb-4 text-slate-700 font-semibold">Upload Files React</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-7 border px-4 py-5 rounded-md">
          <input ref={titleRef} type="text" placeholder="Title.." className="pl-3 pt-2 pb-1.5 rounded-lg outline-none bg-transparent ring-2 ring-slate-500 text-slate-200 focus:ring-red-600"  />
          <input
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          type="file" className="text-slate-100" />
          <button type='submit' className="text-slate-100 bg-blue-600 hover:bg-blue-800 w-32 py-1 rounded-md">Submit</button>
        </form>
    </div>
  )
}

export default App
