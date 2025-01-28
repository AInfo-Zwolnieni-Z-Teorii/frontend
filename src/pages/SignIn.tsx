import AuthFormSignIn from "../components/AuthFormSignIn"
import React from "react"


const SignIn = () => {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center py-12">
      <div className="w-full max-w-[480px] mx-auto px-4">
        <h1 className="text-[32px] font-bold text-[#1E293B] text-center mb-8">ZAREJESTRUJ SIĘ</h1>
        <AuthFormSignIn />
      </div>
    </div>
  )
}

export default SignIn