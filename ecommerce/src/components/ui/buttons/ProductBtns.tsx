
import Link from 'next/link';

export const ProductBtns = ({ productId, reduceState = { numberOfProducts: 1 } }: {
  productId: string,
  reduceState: { numberOfProducts: number }
}) => {

  /*reduceState se inicializa con 1 para el caso en que se agregue producto
  desde ProductData, en donde no se puede indicar el número de productos a agregar. */
  //const { user, status } = useAuthStore();

  //const { productsInCart, createProduct, updateProduct, updateCart } = useCartStore();
  const productsInCart = {}

  let status = 'un'

  const handleProductAddition = async () => {
    console.log(productsInCart)
    console.log(productId)
    let productCartEntity;
    if (!(productId in productsInCart)) {

      //productCartEntity = await createProduct(user.id, productId, reduceState.numberOfProducts)
    } else {
      //const product = productsInCart[productId];
      //console.log(product)
      //productCartEntity = await updateProduct(product.id, reduceState.numberOfProducts)
      console.log(productCartEntity)
    }

    console.log(productCartEntity)
    //updateCart(productCartEntity);
    //dispatch(addProductsToCart({ numberOfProducts: reduceState.numberOfProducts, id: productId }))
  }

  return (
    <div>
      {status === 'authenticated' &&
        <div className='flex flex-row flex-wrap items-center justify-center gap-2'>
          <button className='bg-[#ffa41c] font-bold p-2 w-24 rounded-lg text-whi' onClick={async () => await handleProductAddition()}>Add to cart</button>
          <Link className={`justify-center bg-[#CDCDCD] font-bold rounded-lg text-black w-24 p-2 text-center ${false ? 'hidden' : 'flex'}`} href={`/review/${productId}`}>Review</Link>
        </div>
      }
    </div>
  )
}