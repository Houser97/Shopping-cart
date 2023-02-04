import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productsData } from '../assets/constants'
import StarRate from './StarRate'

const ReviewForm = () => {

    const [item, setItem] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        setItem(productsData.filter(product => product.id === parseInt(id))[0])
    }, [])
    

  return (
    <div className='flex justify-center items-center w-full min-h-screen px-3 py-20 bg-[#091F44] mt-10 xs:px-10'>
        <div className='grid grid-rows-[min-content,minmax(0,1fr)] grid-cols-1 justify-center 
        items-center gap-5 p-5 px-6 w-full bg-white rounded-2xl md:grid-cols-[minmax(0,350px),minmax(350px,1fr)] md:pl-20 md:p-10'>
            <img className='w-full max-w-[350px] justify-self-center h-auto md:mr-10' src={item ? item.image : ''} alt='product'></img>
            <form className='flex flex-col w-full h-full text-3xl justify-around'>
                {item ? item.name : ''}
                <div className='flex w-full px-10 justify-center text-3xl md:text-4xl'>
                    <StarRate product={item ? item.name : ''} />
                </div>
                <textarea className='max-h-60 h-60 text-xl p-2 w-full border-solid border-gray-400 border-2 outline-none rounded-md'></textarea>
                <button className='flex text-2xl bg-[#fcc902] rounded-lg w-[min-content] mt-5
                px-4 py-2 font-bold self-center transition-transform hover:bg-[#fcd01f] sm:px-5 sm:py-3'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ReviewForm