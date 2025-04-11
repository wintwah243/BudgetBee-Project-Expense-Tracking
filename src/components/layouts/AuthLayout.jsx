import React from 'react'
import loginSignupimg from "../../assets/images/loginSignup.jpg"

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-medium text-black'>Budget<span className='text-yellow-500'>Bee</span></h2>
            {children}
        </div>
        <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
            
            <img src={loginSignupimg} className='' />
        </div>
    </div>
  )
}

export default AuthLayout
