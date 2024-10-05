import { FormEvent } from 'react'
import { useAuthStore } from '../../hooks/useAuthStore';
import { AuthLayout } from '../layouts/AuthLayout';
import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    })

    const { errorMessage, startLogin } = useAuthStore();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await startLogin({ email, password });
    }

    return (
        <AuthLayout handleSubmit={handleSubmit} errorMessage={errorMessage}>
            <div className='flex flex-col w-full'>
                <label htmlFor='email' className='font-bold'>E-mail</label>
                <input type='email' id='email' name='email'
                    className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' onChange={onChange} required></input>
            </div>
            <div className='flex flex-col mt-4 w-full'>
                <label htmlFor='password' className='font-bold'>Password</label>
                <input type='password' id='password' name='password'
                    className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' onChange={onChange} required></input>
            </div>

            <button className='bg-[var(--blue-color)] text-white px-3 py-1 my-4 rounded-md font-bold'>Sign in</button>
        </AuthLayout>
    )
}