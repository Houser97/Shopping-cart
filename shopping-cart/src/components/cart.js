import '../styles/cart.css'
import CartCard from './cartCard';

const Cart = ({submission}) => {
    const hasSubmissions = submission.length > 0;
    return(
        <div className="cart">
            <div className='cart-content'>
            {
                hasSubmissions ? (
                    <div className='cart-content-submission'>
                        <div className='products-section-cart'>
                            <CartCard submission={submission} />
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