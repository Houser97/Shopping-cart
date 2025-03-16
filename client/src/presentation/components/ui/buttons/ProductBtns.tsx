import { Link } from 'react-router-dom'
import { useCartStore } from '../../../hooks/useCartStore'
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useCallback } from 'react';


export const ProductBtns = ({ productId, reduceState = { numberOfProducts: 1 } }) => {

  /*reduceState se inicializa con 1 para el caso en que se agregue producto
  desde ProductData, en donde no se puede indicar el número de productos a agregar. */
  const { user, status } = useAuthStore();

  const { productsInCart, createProduct, updateProduct, updateCart } = useCartStore();

  const handleProductAddition = async () => {
    console.log(productsInCart)
    console.log(productId)
    let productCartEntity;
    if (!(productId in productsInCart)) {
      console.log('creacion')
      console.log(productId)
      console.log(user.id)
      console.log('fin creacion')
      productCartEntity = await createProduct(user.id, productId, reduceState.numberOfProducts)
    } else {
      console.log('update')
      const product = productsInCart[productId];
      console.log(product)
      productCartEntity = await updateProduct(product.id, reduceState.numberOfProducts)
      console.log(productCartEntity)
    }

    console.log(productCartEntity)
    updateCart(productCartEntity);
    //dispatch(addProductsToCart({ numberOfProducts: reduceState.numberOfProducts, id: productId }))
  }

  return (
    <div>
      {status === 'authenticated' &&
        <div className='flex flex-row flex-wrap items-center justify-center gap-2'>
          <button className='bg-[#ffa41c] font-bold p-2 w-24 rounded-lg text-whi' onClick={async () => await handleProductAddition()}>Add to cart</button>
          <Link className={`justify-center bg-[#CDCDCD] font-bold rounded-lg text-black w-24 p-2 text-center ${false ? 'hidden' : 'flex'}`} to={`/review/${productId}`}>Review</Link>
        </div>
      }
    </div>
  )
}