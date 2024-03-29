import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingV2 from './LoadingV2';
import LoginMessage from './LoginMessage';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser, userSelector } from '../slices/user';

const LoginForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPwd] = useState(null);

  const dispatch = useDispatch();
  const { isLoading, validationErrors, user } = useSelector(userSelector)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isUser = await dispatch(fetchUser(email, password))
    if(isUser) {
        setEmail(null)
        setPwd(null)
        navigate(-1)
    }
  }

  if(user){
    return(
        <LoginMessage />
    )
  }
  return (
    <div className='flex flex-row justify-center items-center 
    pt-[var(--header-height)] min-h-screen bg-[var(--blue-color)] w-full p-5'>
        <form className='flex flex-col bg-white rounded-md w-full max-w-lg text-lg p-6 items-center justify-center mt-5 sm:text-xl'
        onSubmit={(e) => handleSubmit(e)}>
            <div className='flex flex-col w-full'>
                <label htmlFor='email' className='font-bold'>E-mail</label>
                <input type='email' id='email'
                className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' onChange={(e) => setEmail(e.target.value)} required></input>
            </div>
            <div className='flex flex-col mt-4 w-full'>
                <label htmlFor='password' className='font-bold'>Password</label>
                <input type='password' id='password'
                className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' onChange={(e) => setPwd(e.target.value)} required></input>
            </div>
            {
                isLoading ? <LoadingV2 /> : <button className='bg-[var(--blue-color)] text-white px-3 py-1 my-4 rounded-md font-bold'>Sign in</button>
            }
            {validationErrors.length > 0 ? 
                <ul className='list-disc list-inside text-base text-justify sm:text-xl'>
                    {
                    validationErrors.map((error, index) => {
                        return(
                            <li key={`error-${index}`} className='list-disc list-inside w-full'>{error.msg}</li>
                        )
                    })}
                </ul>
                :
                <div className='hidden'></div>
            }
        </form>
    </div>
  )
}

export default LoginForm