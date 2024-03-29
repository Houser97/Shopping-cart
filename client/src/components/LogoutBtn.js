import React from 'react'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../slices/user';

const LogoutBtn = () => {

    const dispatch = useDispatch()

    const logout = async () => {
        const result = await dispatch(logoutUser())
        if(result) {
            window.location.reload()
        }
    }

  return (
    <button onClick={() => logout()}
    className='flex flex-row p-1 px-2 text-base items-center text-white bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg'>
        <svg className='w-4 h-4 fill-white' viewBox="0 0 24 24"><path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" /></svg>
        <div className='ml-2'>Logout</div>
    </button>
  )
}

export default LogoutBtn