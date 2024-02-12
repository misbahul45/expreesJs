import React from 'react'
import Signup from './pages/auth/Signup'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import AuthLayout from './pages/auth/AuthLayout'
import Signin from './pages/auth/Signin'


const App: React.FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
            <Route path="sign-in" element={<Signin />} />
            <Route path="sign-up" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
