import React, { useState } from 'react'

const SignUpForm = () => {

    const [email, setEmail] = useState(null);
    const [pwd, setPwd] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/create_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, pwd})
        }).then(data => data.json()).then(data => console.log(data))
    }

  return (
    <div className='flex flex-row justify-center items-center 
    pt-[var(--header-height)] min-h-screen bg-[var(--blue-color)] w-full p-5'>
        <form className='flex flex-col bg-white rounded-md w-full max-w-lg text-xl p-3 items-center'
        onSubmit={(e) => handleSubmit(e)}>
            <div className='flex flex-col w-full'>
                <label htmlFor='email'>E-mail</label>
                <input type='email' id='email' name='email' onChange={(e) => setEmail(e.target.value)} required></input>
            </div>
            <div className='flex flex-col my-8 w-full'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='pwd' onChange={(e) => setPwd(e.target.value)} required></input>
            </div>
            <button className='bg-[var(--blue-color)] text-white px-3 py-1 rounded-md'>Login</button>
        </form>
    </div>
  )
}

export default SignUpForm