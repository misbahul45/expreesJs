import Form from "../../components/auth/Form"
import Animate from "../../components/auth/Animate"
import { Link } from "react-router-dom"
const Signup = () => {
  return (
    <main className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <Form type="signup"  />
      <Animate />
      <p>Don't have an account?<Link to={'/auth/sign-in'} className="ml-2 text-blue-500 hover:text-blue-700 hover:border-b hover:scale-105 transition-all duration-200 cursor-pointer">SignUp</Link> </p>
    </main>
  )
}

export default Signup
