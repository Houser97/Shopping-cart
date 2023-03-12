import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../App'

const ProductBtns = ({productId, reduceState = {numberOfProducts: 1}}) => {
  /*reduceState se inicializa con 1 para el caso en que se agregue producto
  desde ProductData, en donde no se puede indicar el número de productos a agregar. */
    const addProduct = useContext(CartContext).addProduct
    const user = useContext(CartContext).user;
    
    const handleProductAddition = () => {
      addProduct(reduceState.numberOfProducts, productId);
    }
  return (
    <div>
      {user ? 
          <div className='flex flex-row flex-wrap items-center justify-center gap-2'>
            <button className='bg-[#ffa41c] font-bold p-2 w-24 rounded-lg' onClick={() => handleProductAddition()}>Add to cart</button>
            <Link className='bg-[var(--blue-color)] font-bold rounded-lg text-white w-24 p-2 text-center' to={`/${productId}/0/review`}>Review</Link>
          </div>
          :
          <div className='text-lg font-bold text-center w-full 2sm:text-2xl'>
            Sign in to add and review products
          </div>
      }
    </div>
  )
}

export default ProductBtns