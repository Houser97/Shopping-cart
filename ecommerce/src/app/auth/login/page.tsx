'use client'

import { ProcessLoader } from "@/components/ui/loaders/ProcessLoader";
import { useForm } from "@/hooks/useForm";
import { login } from "@/actions/auth/auth";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/store/auth/auth-store";


export default function LoginPage() {

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    })

    const setUserData = useAuthStore(state => state.setUserData);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await login(email, password);
        if (data?.user) {
            console.log(data.user)
            setUserData(data.user);
            redirect('/');
        }
    }

    const errorMessage = '';
    let status = '';

    return (
        <div className='flex flex-row relative gradient-background justify-center items-center min-h-screen w-full p-5 overflow-x-hidden'>
            {/* <button onClick={async () => await validate()}>Validate</button> */}
            <form className='flex flex-col rounded-md w-full max-w-lg text-lg p-6 items-center justify-center mt-5 sm:text-xl'
                onSubmit={(e) => handleSubmit(e)}>
                <div className='flex flex-col w-full'>
                    <label htmlFor='email' className='font-light'>E-mail</label>
                    <input type='email' id='email' name='email'
                        className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' onChange={onChange} required></input>
                </div>
                <div className='flex flex-col mt-4 w-full'>
                    <label htmlFor='password' className='font-light'>Password</label>
                    <input type='password' id='password' name='password'
                        className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' onChange={onChange} required></input>
                </div>

                {status !== 'checking' ?
                    <button className='bg-[var(--blue-color)] text-white px-3 py-1 my-4 rounded-md font-light'>Login</button>
                    :
                    <ProcessLoader />
                }
                {errorMessage &&
                    <ul className='list-disc list-inside text-base text-justify sm:text-xl'>
                        <li className='list-disc list-inside w-full'>{errorMessage}</li>
                    </ul>
                }
            </form>
        </div>
    )

}