import { useContext } from 'react';
import { CartContext } from '../App';
import '../styles/Cart.css'
import CartCard from './CartCard';
import LogoutBtn from './LogoutBtn';

const Cart = ({toggleCart}) => {
    const productsInCart = useContext(CartContext).productsInCart;
    const totalPrice = useContext(CartContext).totalPrice;
    const user = useContext(CartContext).user;
    const isEmpty = productsInCart.length === 0;

    return(
        <div className={`cart-container ${toggleCart ? 'show-cart-container' : ''}`}>
            <div className={`cart ${toggleCart ? 'show-cart':''}`}>
                <div className='cart-content'>
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
                        <div className='cart-content-submission'>
                            <div className='products-section-cart'>
                                <CartCard submission={productsInCart} />
                            </div>
                            <div className='DIV-total-price'>
                                <div className='total-price'>Total price:</div>
                                <div data-testid="total-price-id" className='total-price-number'>${totalPrice}</div>
                            </div>
                            <div className='pay'>
                                <button className='pay-button'>Pay</button>
                            </div>
                        </div>
                    ) 
                    : (
                        <h2 className='no-submission'> Cart empty</h2>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Cart;