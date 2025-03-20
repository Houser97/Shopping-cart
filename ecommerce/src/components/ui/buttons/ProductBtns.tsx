'use client'

import { createProduct, updateCart, updateProduct } from '@/actions/cart/cart';
import { ProductCart } from '@/domain/entities/product.cart';
import { useAuthStore } from '@/store/auth/auth-store';
import { useCartStore } from '@/store/cart/cart-store';
import Link from 'next/link';

export const ProductBtns = ({ productId, reduceState = { numberOfProducts: 1 } }: {
  productId: string,
  reduceState: { numberOfProducts: number }
}) => {

  /*reduceState se inicializa con 1 para el caso en que se agregue producto
  desde ProductData, en donde no se puede indicar el número de productos a agregar. */
  const user = useAuthStore(state => state.user);
  const status = useAuthStore(state => state.status);
  const productsInCart = useCartStore(state => state.cart);
  const updateCartData = useCartStore(state => state.updateCart);
  //const { productsInCart, createProduct, updateProduct, updateCart } = useCartStore();



  const handleProductAddition = async () => {
    let productCartEntity;
    console.log(productsInCart)
    if (!(productId in productsInCart)) {

      productCartEntity = await createProduct(user!.id, productId, reduceState.numberOfProducts)
    } else {
      const product = productsInCart[productId];
      productCartEntity = await updateProduct(product.id, reduceState.numberOfProducts)
    }

    const cartData = updateCart(productCartEntity as ProductCart, productsInCart);
    updateCartData(cartData);
  }

  return (
    <div>
      {status === 'authenticated' &&
        <div className='flex flex-row flex-wrap items-center justify-center gap-2'>
          <button className='bg-[#ffa41c] font-bold p-2 w-34 rounded-lg text-whi' onClick={async () => await handleProductAddition()}>Add to cart</button>
          <Link className={`justify-center bg-[#CDCDCD] font-bold rounded-lg text-black w-24 p-2 text-center ${false ? 'hidden' : 'flex'}`} href={`/review/${productId}`}>Review</Link>
        </div>
      }
    </div>
  )
}