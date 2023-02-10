import React from 'react'
import { Link } from 'react-router-dom'

const AuthButtons = () => {
  return (
    <div className='flex flex-row flex-wrap text-base gap-5 items-center justify-center'>
        <Link to='/sign-up' className='bg-white text-black px-3 py-1 rounded-lg'>Sign up</Link>
        <Link to='/login' className='bg-[var(--yellow-color)] text-black px-3 py-1 rounded-lg'>Sign in</Link>
    </div>
  )
}

export default AuthButtons