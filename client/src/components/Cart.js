import { useContext } from 'react';
import { CartContext } from '../App';
import '../styles/Cart.css'
import CartCard from './CartCard';
import LogoutBtn from './LogoutBtn';

const Cart = ({toggleCart}) => {
    const productsInCart = useContext(CartContext).productsInCart;
    const totalPrice = useContext(CartContext).totalPrice;
    const user = useContext(CartContext).user;
    const setProductsInCar = useContext(CartContext).setProductsInCar;
    const isEmpty = productsInCart.length === 0;

    const cleanProductsInCart = () => {
        setProductsInCar([])
    }

    return(
        <div className={`cart-container absolute opacity-0 top-0 left-0 h-screen w-full z-0 bg-black/80 ${toggleCart ? 'show-cart-container' : ''}`}>
            <div className={`cart flex flex-col items-center justify-center absolute top-0 right-0 w-[320px] h-screen z-0 bg-white py-8 px-3 pt-20 overflow-y-auto overflow-x-hidden ${toggleCart ? 'show-cart':''}`}>
                <div className='flex flex-col items-center justify-center w-full h-full gap-5'>
                <div className='absolute text-black top-3 left-2 text-xl'>
                    {
                        user ? (
                            <div className='flex flex-col items-center'>
                                {user.username}
                                <LogoutBtn />
                            </div>) : ''
                    }
                </div>
                {
                    !isEmpty ? (
                        <div className='flex flex-col h-full w-full gap-5'>
                            <div className='flex flex-col flex-1 w-full p-3 overflow-y-auto overflow-x-hidden gap-5 bg-white cart-scrollbar'>
                                <CartCard submission={productsInCart} />
                            </div>
                            <div className='flex flex-row text-black text-xl justify-evenly'>
                                <div>Total price:</div>
                                <div>${totalPrice}</div>
                            </div>
                            <button className='bg-gray-600 text-white text-3xl px-3 py-2 rounded-lg hover:bg-gray-500'
                            onClick={() => cleanProductsInCart()}>Pay</button>
                        </div>
                    ) 
                    : (
                        <h2 className='flex self-center justify-self-center text-gray-600'> Cart empty</h2>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Cart;