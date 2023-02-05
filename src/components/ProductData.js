import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productsData } from '../assets/constants'
import '../styles/ProductData.css'

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
    <div className='flex justify-center items-center bg-[var(--blue-color)] w-full py-28 px-2 sm:px-8 md:px-20'>
      <div className='flex flex-col bg-white rounded-lg p-6 w-full'>
        <div className='grid auto-rows-auto grid-cols-1 2sm:grid-cols-[minmax(200px,max-content),minmax(300px,1fr)]'>
          <img className='max-w-[300px] w-full justify-self-center' src={product ? product.image : ''}></img>
          <h1 className='w-full text-center text-4xl sm:text-5xl'>{product ? product.name : ''}</h1>
        </div>
        <div className='w-full font-bold text-4xl text-center'>Reviews</div>
      </div>
    </div>
  )
}

export default ProductData