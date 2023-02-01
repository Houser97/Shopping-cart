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
    <div className='productData-container'>
        <img src={product ? product.image : ''}></img>
        <h1>{product ? product.name : ''}</h1>
    </div>
  )
}

export default ProductData