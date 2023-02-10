import React, { useState } from 'react'

const SignUpForm = () => {

    const [email, setEmail] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [username, setUsername] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/create_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, pwd, username})
        }).then(data => data.json()).then(data => console.log(data))
    }

  return (
    <div className='flex flex-row justify-center items-center 
    pt-[var(--header-height)] min-h-screen bg-[var(--blue-color)] w-full p-5'>
        <form className='flex flex-col bg-white rounded-md w-full max-w-lg text-xl p-7 items-center'
        onSubmit={(e) => handleSubmit(e)}>
            <div className='flex flex-col w-full'>
                <label htmlFor='email' className='font-bold'>E-mail</label>
                <input type='email' id='email' name='email' 
                className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' onChange={(e) => setEmail(e.target.value)} required></input>
            </div>
            <div className='flex flex-col my-4 w-full'>
                <label htmlFor='password' className='font-bold'>Password</label>
                <input type='password' id='password' name='pwd'
                className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' onChange={(e) => setPwd(e.target.value)} required></input>
            </div>
            <div className='flex flex-col w-full'>
                <label htmlFor='username' className='font-bold'>Username</label>
                <input type='text' id='username' name='username' 
                className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' onChange={(e) => setUsername(e.target.value)} required></input>
            </div>
            <button className='bg-[var(--blue-color)] text-white px-3 py-1 my-4 rounded-md font-bold'>Sign up</button>
        </form>
    </div>
  )
}

export default SignUpForm