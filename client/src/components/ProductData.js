import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { productsData } from '../assets/constants'
import '../styles/ProductData.css'
import ReviewCard from './ReviewCard'
import StarRate from './StarRate'

const ProductData = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();

    useEffect(() => {
      const handleProduct = (product) => {
        setProduct(product)
      }  

      handleProduct(productsData.filter(product => product.id === parseInt(id))[0])      

    }, [])

  return (
    <div className='flex justify-center items-center bg-[var(--blue-color)] w-full py-28 px-2 sm:px-8 md:px-14'>
      <div className='flex flex-col bg-white rounded-lg w-full p-2 sm:p-6'>
        <div className='grid auto-rows-auto grid-cols-1 2sm:grid-cols-[minmax(200px,max-content),minmax(300px,1fr)] gap-5'>
          <img className='max-w-[300px] w-full justify-self-center self-center' src={product ? product.image : ''}></img>
          <div className='flex flex-col w-full h-full justify-between items-center p-1 md:p-10'>
            <h1 className='w-full text-center text-4xl md:text-5xl'>{product ? product.name : ''}</h1>
            <div className='flex w-full px-1 justify-evenly text-3xl sm:px-4 sm:text-4xl my-5'>
              <StarRate product={product ? product.name : ''} />
            </div>
            <div className='flex flex-row w-full justify-evenly'>
              <button className='bg-[#ffa41c] font-bold p-2 w-24 rounded-lg'>Add to cart</button>
              <Link className='bg-[var(--blue-color)] font-bold rounded-lg text-white w-24 p-2 text-center' to={`/${id}/review`}>Review</Link>
            </div>
          </div>
        </div>
        <div className='w-full font-bold text-4xl text-center'>Reviews</div>
        <div className='flex flex-col justify-evenly w-full bg-slate-200 rounded-lg p-2 sm:p-5'>
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </div>
  )
}

export default ProductData