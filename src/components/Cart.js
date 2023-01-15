import { useContext } from 'react';
import { CartContext } from '../App';
import '../styles/Cart.css'
import CartCard from './CartCard';

const Cart = ({toggleCart}) => {
    const productsInCar = useContext(CartContext).productsInCar;
    const totalPrice = useContext(CartContext).totalPrice;
    const isEmpty = productsInCar.length > 0;
    return(
        <div className={`cart ${toggleCart ? 'show-cart':''}`}>
            <div className='cart-content'>
            {
                isEmpty ? (
                    <div className='cart-content-submission'>
                        <div className='products-section-cart'>
                            <CartCard submission={productsInCar} />
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
                <h2 className='no-submission'> Cart empty</h2>)
            }
            </div>
        </div>
    )
}

export default Cart;