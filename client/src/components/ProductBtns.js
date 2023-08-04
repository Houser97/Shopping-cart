import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProductsToCart } from '../slices/cart'
import { userSelector } from '../slices/user'

const ProductBtns = ({productId, reduceState = {numberOfProducts: 1}}) => {
  const dispatch = useDispatch()
  /*reduceState se inicializa con 1 para el caso en que se agregue producto
  desde ProductData, en donde no se puede indicar el número de productos a agregar. */
    const {user} = useSelector(userSelector);
    
    const handleProductAddition = () => {
      dispatch(addProductsToCart({numberOfProducts: reduceState.numberOfProducts, id: productId}))
    }
    
  return (
    <div>
      {user ? 
          <div className='flex flex-row flex-wrap items-center justify-center gap-2'>
            <button className='bg-[#ffa41c] font-bold p-2 w-24 rounded-lg' onClick={() => handleProductAddition()}>Add to cart</button>
            <Link className={`justify-center bg-[var(--blue-color)] font-bold rounded-lg text-white w-24 p-2 text-center ${user.reviews.includes(productId) ? 'hidden':'flex'}`} to={`/${productId}/0/review`}>Review</Link>
          </div>
          :
          <div className='text-lg font-bold text-center min-w-full 2sm:text-2xl'>
            Sign in to add and review products
          </div>
      }
    </div>
  )
}

export default ProductBtns