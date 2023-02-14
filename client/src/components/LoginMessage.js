import React from 'react'
import { Link } from 'react-router-dom'

const LoginMessage = () => {
  return (
    <div className='flex flex-row justify-center items-center 
    pt-[var(--header-height)] min-h-screen bg-[var(--blue-color)] w-full p-3 sm:p-5'>
        <div className='flex flex-col bg-white rounded-md w-full max-w-xl text-4xl items-center 
        justify-center mt-5 font-bold text-center p-3 sm:p-6'>
            <div className='mb-3 sm:mb-6'>You are currently logged in</div>
            <Link className='flex flex-row p-1 px-2 text-lg items-center text-white 
            bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg sm:text-3xl' to='/'>Home</Link>
        </div>
    </div>
  )
}

export default LoginMessage