import { CartCard } from './cards/CartCard';

import { useTypedSelector } from '../../store/config/typed-selector';
import { useCartStore } from '../../hooks/useCartStore';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useEffect, useState } from 'react';
import BuyAnimation from '../ui/BuyAnimation';

const Cart = ({ toggleCart }) => {

    const { productsInCart, totalPrice } = useTypedSelector(state => state.cart);
    const { status } = useAuthStore();
    const { loadDbProducts, handlePayment } = useCartStore();

    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
            loadDbProducts();
        }
    }, [])

    const isEmpty = Object.keys(productsInCart).length === 0;

    const pay = async () => {
        await handlePayment();
        setShowAnimation(true);
    }

    return (
        <div className={`cart-container absolute opacity-10 top-0 left-0 h-screen w-full z-0 bg-black/80 ${toggleCart && 'show-cart-container'}`}>
            <div className={`cart flex flex-col items-center justify-center absolute top-0 right-0 w-[320px] sm:w-[500px]
            h-screen z-0 bg-slate-100 py-5 px-3 pt-20 overflow-y-auto overflow-x-hidden ${toggleCart ? 'show-cart' : ''}`}>
                <div className='flex flex-col items-center justify-center w-full h-full gap-5'>
                    <div className='absolute text-black top-3 left-2 text-xl'>
                        {!isEmpty &&
                            <div className='flex flex-row text-black text-2xl justify-evenly gap-5 mt-5'>
                                <div>Total price:</div>
                                <div>${totalPrice}</div>
                            </div>}

                    </div>
                    {
                        !isEmpty ? (
                            <div className='flex flex-col h-full w-full gap-3'>
                                <div className='flex flex-col flex-1 w-full p-3 overflow-y-auto overflow-x-hidden gap-5 rounded-lg bg-slate-100 cart-scrollbar'>
                                    {Object.keys(productsInCart).map((id) =>
                                        <CartCard product={productsInCart[id]} key={id} />
                                    )}

                                </div>
                                <button className='bg-gray-600 text-white text-3xl px-3 py-2 rounded-lg hover:bg-gray-500'
                                    onClick={() => pay()}>Pay</button>
                            </div>
                        )
                            : (
                                <h2 className='flex self-center justify-self-center text-gray-600'> Cart empty</h2>
                            )
                    }
                </div>
            </div>
            <BuyAnimation showAnimation={showAnimation} setShowAnimation={setShowAnimation} />
        </div>
    )
}

export default Cart;