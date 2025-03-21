import { useCartStore } from '@/store/cart/cart-store';
import { ProductCart } from '../../../domain/entities/product.cart';
import { removeProduct } from '@/actions/cart/cart';

interface Props {
    product: ProductCart
}

export const CartCard = ({ product }: Props) => {

    const { id, image, quantity, name, price } = product;
    const cart = useCartStore(state => state.cart);
    const updateCart = useCartStore(state => state.updateCart);


    const handleRemove = async (id: string) => {
        const updatedCart = await removeProduct(id, cart);
        if (updatedCart) updateCart(updatedCart);

    }

    return (

        <div className="flex flex-row w-full min-h-[120px] max-h-[120px] flex-1 shadow-[rgba(0,0,0,0.35)_0px_5px_15px] bg-white p-2 relative
        rounded-lg overflow-hidden text-black group">
            <svg viewBox="0 0 24 24" className='flex w-[15px] h-[15px] absolute top-[2px] right-[5px] z-10 opacity-0 cursor-pointer group-hover:opacity-100' onClick={() => handleRemove(id)}>
                <path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
            </svg>
            <img className="h-full w-auto" src={image} alt={name}></img>
            <div className='flex flex-col justify-around items-center text-[16px] py-[15px] px-[5px] w-full flex-1'>
                <div className="font-semibold text-[17px] text-center">{name}</div>
                <div className="font-extralight text-[15px]">Unit price: ${price}</div>
                <div data-testid={`quantity-display`} className="font-extralight text-[15px]">Quantity: {quantity}</div>
            </div>
        </div>
    )
}
