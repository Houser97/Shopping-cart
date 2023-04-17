import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../App';
import { getUser, getUserSuccess, setValidationErrors, userSelector } from '../slices/user';
import LoadingV2 from './LoadingV2';
import LoginMessage from './LoginMessage';

const SignUpForm = () => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [repeatPwd, setRepeatPwd] = useState(null);
    const [pwdMatch, setPwdMatch] = useState(true);
    const [username, setUsername] = useState(null);

    //Estados para indicar que mayús está activa
    const [isMayusActive, setIsMayusActive] = useState(false)
    const [selectedPwdInput, setSelectedPwdInput] = useState(null)

    const { user, validationErrors, isLoading } = useSelector(userSelector);
    const API = useContext(CartContext).API;

    const navigate = useNavigate();

    const handlePasswordInputCaps = (e) => {
        setIsMayusActive(e.getModifierState('CapsLock'))
        setSelectedPwdInput(e.target.name)
    }

    const handleBlur = () => {
        setIsMayusActive(false)
    }

    const handleSubmit = (e) => {
        dispatch(getUser())   
        e.preventDefault();
        if(pwdMatch){
            fetch(`${API}/create_user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, pwd, username})
            })
            .then(data => data.json())
            .then(data => {
                if(Array.isArray(data)){
                    dispatch(setValidationErrors(data))
                }
                else {
                    dispatch(getUserSuccess({user: data}))
                    navigate(-1);
                }
            })
        } else {
            const message = [{msg:'Passwords do not match.'}]
            dispatch(setValidationErrors(message))
        }
    }

    useEffect(() => {
        setPwdMatch(repeatPwd === pwd)
    }, [repeatPwd])


    //Si el usuario ya inicio sesión, no tiene acceso al formulario.
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
                <input type='email' id='email' name='email' 
                className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' onChange={(e) => setEmail(e.target.value)} required></input>
            </div>
            <div className='flex flex-col mt-4 w-full relative'>
                <label htmlFor='password' className='font-bold'>Password</label>
                <input type='password' id='password' name='pwd'
                className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' 
                onChange={(e) => setPwd(e.target.value)} 
                onKeyDown={handlePasswordInputCaps}
                onClick={handlePasswordInputCaps}
                onBlur={handleBlur}
                required></input>
                <div className={`absolute -bottom-8 right-0 text-base font-extrabold text-blue-700 ${isMayusActive && selectedPwdInput === 'pwd' ? 'flex':'hidden'}`}>Caps Lock is on</div>
            </div>
            <div className='flex flex-col my-4 w-full relative'>
                <label htmlFor='repeatPassword' className='font-bold'>Repeat password</label>
                <input type='password' id='repeatPassword' name='repeatPwd'
                className={`border-2 rounded-md p-1 px-3 
                ${pwdMatch ? 'border-slate-500 outline-[var(--blue-color)]':'border-red-400 outline-red-400'}`} 
                onChange={(e) => setRepeatPwd(e.target.value)} 
                onKeyDown={handlePasswordInputCaps}
                onClick={handlePasswordInputCaps}
                onBlur={handleBlur}
                required></input>
                <div className={`absolute -bottom-8 right-0 text-base font-extrabold text-blue-700 ${isMayusActive && selectedPwdInput === 'repeatPwd' ? 'flex':'hidden'}`}>Caps Lock is on</div>
            </div>
            <div className='flex flex-col w-full'>
                <label htmlFor='username' className='font-bold'>Username</label>
                <input type='text' id='username' name='username' 
                className='border-slate-500 border-2 rounded-md p-1 px-3 
                outline-[var(--blue-color)]' onChange={(e) => setUsername(e.target.value)} required></input>
            </div>
            {
                isLoading ? <LoadingV2 /> : <button className='bg-[var(--blue-color)] text-white px-3 py-1 my-4 rounded-md font-bold'>Sign up</button>
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

export default SignUpForm