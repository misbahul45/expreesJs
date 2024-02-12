import { motion } from  "framer-motion"

const Animate = () => {
  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-full max-w-xl -z-10">
        {
        Array.from({length:2}).map((_,index)=>(
            <motion.div
            key={index}
            initial={{ opacity:0, top:0 }}
            animate={{ opacity:1, top:100 }}
            transition={{ duration:(index%2===0?1:2), repeat: Infinity, repeatType: "reverse" }}
            className="w-5 h-5 rounded-full bg-yellow-700 absolute left-0 top-0" />
        ))
        }
        {Array.from({length:2}).map((_,index)=>(
            <motion.div
            key={index}
            initial={{ opacity:0, bottom:0 }}
            animate={{ opacity:1, bottom:100 }}
            transition={{ duration:(index%2===0?1:2), repeat: Infinity, repeatType: "reverse" }}
            className="w-5 h-5 rounded-full bg-yellow-700 absolute bottom-0 left-0" />
        ))
        }
        {Array.from({length:2}).map((_,index)=>(
            <motion.div
            key={index}
            initial={{ opacity:0, top:0 }}
            animate={{ opacity:1, top:100 }}
            transition={{ duration:(index%2===0?1:2), repeat: Infinity, repeatType: "reverse" }}
            className="w-5 h-5 rounded-full bg-yellow-700 absolute right-0" />
        ))
        }
        {Array.from({length:2}).map((_,index)=>(
            <motion.div
            key={index}
            initial={{ opacity:0, bottom:0 }}
            animate={{ opacity:1, bottom:100 }}
            transition={{ duration:(index%2===0?1:2), repeat: Infinity, repeatType: "reverse" }}
            className="w-5 h-5 rounded-full bg-yellow-700 absolute right-0" />
        ))
        }
     </div>
     <div className="hidden absolute h-full w-full lg:flex flex-col lg:max-w-xs top-0 right-0 rotate-180">
        <div className="w-[70%] bg-blue-gray-800 h-[25%] rounded-r-md shadow-yellow-500 shadow-2xl" />
        <div className="w-[80%] bg-blue-gray-700 h-[35%] rounded-r-lg shadow-orange-500 shadow-2xl" />
        <div className="w-full bg-blue-gray-600 flex-1 rounded-r-xl shadow-red-500 shadow-2xl" />
     </div>
     <div className="hidden absolute h-full w-full lg:flex flex-col lg:max-w-xs top-0 left-0">
        <div className="w-full bg-blue-gray-600 flex-1 rounded-r-xl shadow-red-500 shadow-2xl" />
        <div className="w-[80%] bg-blue-gray-700 h-[35%] rounded-r-lg shadow-orange-500 shadow-2xl" />
        <div className="w-[70%] bg-blue-gray-800 h-[25%] rounded-r-md shadow-yellow-500 shadow-2xl" />
     </div>
    </>
  )
}

export default Animate
