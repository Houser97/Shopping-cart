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
    <div className='flex justify-center items-center w-full min-h-screen px-10 py-20 bg-[#091F44] mt-10'>
        <div className='flex p-5 flex-col w-full bg-white rounded-2xl sm:p-7 sm:grid sm:grid-cols-2 md:flex md:flex-row'>
            <img className='h-auto p-4 max-w-auto sm:h-auto mg:h-96' src={item ? item.image : ''} alt='product'></img>
            <form className='flex flex-col w-full h-80 text-3xl'>
                {item ? item.name : ''}
                <StarRate product={item ? item.name : ''} />
                <textarea className='h-full text-xl p-2 border-solid border-black border-2'></textarea>
                <button>submit</button>
            </form>
        </div>
    </div>
  )
}

export default ReviewForm