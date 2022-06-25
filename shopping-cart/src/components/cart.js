import '../styles/cart.css'

const Cart = ({submission}) => {
    const hasSubmissions = submission.length > 0;
    return(
        <div className="cart">
            <div className='cart-content'>
            {
                hasSubmissions ? (
                    <div className='submissions'>Hi, there are submission</div>
                ) 
                : (
                <div className='no-submission'> No submission</div>)
            }
            </div>
        </div>
    )
}

export default Cart;