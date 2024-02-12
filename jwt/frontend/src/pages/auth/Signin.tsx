import { Link } from "react-router-dom"
import Animate from "../../components/auth/Animate"
import Form from "../../components/auth/Form"

const Signin = () => {
  return (
    <main className="w-full h-screen flex flex-col gap-4 justify-center items-center">
        <Form />
        <Animate />
        <p>Don't have an account?<Link to={'/auth/sign-up'} className="ml-2 text-blue-500 hover:text-blue-700 hover:border-b hover:scale-105 transition-all duration-200 cursor-pointer">SignUp</Link> </p>
    </main>
  )
}

export default Signin
