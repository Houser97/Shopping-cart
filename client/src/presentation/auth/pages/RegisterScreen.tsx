import { FormEvent, useEffect, useState } from 'react'

// import LoadingV2 from '../../components/ui/LoadingV2';
// import LoginMessage from './LoginMessage';
import { useAuthStore } from '../../hooks/useAuthStore';
import { AuthLayout } from '../layouts/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { ProcessLoader } from '../../components/ui/loaders/ProcessLoader';

export const RegisterScreen = () => {

    const [pwdMatch, setPwdMatch] = useState(true);

    const { email, password, repeatedPassword, username, onChange } = useForm({
        email: '',
        password: '',
        repeatedPassword: '',
        username: ''
    })

    //Estados para indicar que mayús está activa
    const [isMayusActive, setIsMayusActive] = useState(false)
    const [selectedPwdInput, setSelectedPwdInput] = useState(null)

    const { status, errorMessage, startRegister } = useAuthStore();

    const handlePasswordInputCaps = (e) => {
        setIsMayusActive(e.getModifierState('CapsLock'))
        setSelectedPwdInput(e.target.name)
    }

    const handleBlur = () => {
        setIsMayusActive(false)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (pwdMatch) {
            await startRegister({ email, password, username })
        } else {
            const message = [{ msg: 'Passwords do not match.' }]
            console.log(message)
        }
    }

    useEffect(() => {
        setPwdMatch(repeatedPassword === password)
    }, [repeatedPassword])

    return (
        <AuthLayout handleSubmit={handleSubmit} errorMessage={errorMessage}>
            <div className='flex flex-col w-full'>
                <label htmlFor='email' className='font-light'>E-mail</label>
                <input type='email' id='email' name='email'
                    className='border-slate-500 border-2 rounded-md p-1 px-3 
                        outline-[var(--blue-color)]' onChange={onChange} required></input>
            </div>

            <div className='flex flex-col mt-4 w-full relative'>
                <label htmlFor='password' className='font-light'>Password</label>
                <input type='password' id='password' name='password'
                    className='border-slate-500 border-2 rounded-md p-1 px-3 
                        outline-[var(--blue-color)]'
                    onChange={onChange}
                    onKeyDown={handlePasswordInputCaps}
                    onClick={handlePasswordInputCaps}
                    onBlur={handleBlur}
                    required></input>
                <div className={`absolute -bottom-8 right-0 text-base font-extrabold text-blue-700 ${isMayusActive && selectedPwdInput === 'pwd' ? 'flex' : 'hidden'}`}>Caps Lock is on</div>
            </div>

            <div className='flex flex-col my-4 w-full relative'>
                <label htmlFor='repeatPassword' className='font-light'>Repeat password</label>
                <input type='password' id='repeatPassword' name='repeatedPassword'
                    className={`border-2 rounded-md p-1 px-3 
                        ${pwdMatch ? 'border-slate-500 outline-[var(--blue-color)]' : 'border-red-400 outline-red-400'}`}
                    onChange={onChange}
                    onKeyDown={handlePasswordInputCaps}
                    onClick={handlePasswordInputCaps}
                    onBlur={handleBlur}
                    required></input>
                <div className={`absolute -bottom-8 right-0 text-base font-light text-blue-700 ${isMayusActive && selectedPwdInput === 'repeatPwd' ? 'flex' : 'hidden'}`}>Caps Lock is on</div>
            </div>

            <div className='flex flex-col w-full'>
                <label htmlFor='username' className='font-light'>Username</label>
                <input type='text' id='username' name='username'
                    className='border-slate-500 border-2 rounded-md p-1 px-3 
                    outline-[var(--blue-color)]' onChange={onChange} required></input>
            </div>

            {status !== 'checking' ?
                <button className='bg-[var(--blue-color)] text-white px-3 py-1 my-4 rounded-md font-light'>Sign up</button>
                :
                <ProcessLoader />
            }
        </AuthLayout>
    )
}
