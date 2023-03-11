import React from 'react'
import { Link } from 'react-router-dom'

const AuthButtons = ({setToggleNavbar}) => {
  const toggleNavbar = () => {
    if(setToggleNavbar){
      setToggleNavbar(false)
    }
  }
  return (
    <div className='flex flex-row flex-wrap text-base gap-5 items-center justify-center'>
        <Link to='/sign-up' className='bg-white text-black px-3 py-1 rounded-lg' onClick={() => toggleNavbar()}>Sign up</Link>
        <Link to='/login' className='bg-[var(--yellow-color)] text-black px-3 py-1 rounded-lg' onClick={() => toggleNavbar()}>Sign in</Link>
    </div>
  )
}

export default AuthButtons