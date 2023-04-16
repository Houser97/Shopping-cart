import React from 'react'
import { useSelector } from 'react-redux';
import { userSelector } from '../slices/user';

const IncDecProduct = ({dispatch, state}) => {

    const { user } = useSelector(userSelector);

  return (
    <div className={`${user ? 'flex':'hidden'} flex-row justify-evenly my-2 mb-4`}>
        <button className='h-8 w-8 text-[var(--blue-color)] cursor-pointer' onClick={() => dispatch({type: 'decrement'})}>
            <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
            </svg>
        </button>
        <div className='flex flex-row justify-center items-center text-xl rounded-2xl w-12 h-8 border-2 border-[var(--blue-color)]'>{state.numberOfProducts}</div>
        <button data-testid="0" className='h-8 w-8 text-[var(--blue-color)] cursor-pointer' onClick={() => dispatch({type: 'increment'})}>
            <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
            </svg>
        </button>
    </div>
  )
}

export default IncDecProduct