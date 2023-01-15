import '../styles/CartCard.css'
import { RemoveElementContext } from '../App';
import { useContext } from 'react';

const CartCard = ({submission}) => {
    const removeElement = useContext(RemoveElementContext);

    return(
        submission.map(
            function iterateSubmission(item, iterator){
                const {image, name, price, id, quantity} = item;
                return(
                    <div id={id} key = {iterator} className="card-cart">
                        <div id={id} className='remove-product' onClick={removeElement}>
                            <svg id={id} viewBox="0 0 24 24">
                                <path id={id} fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
                            </svg>
                        </div>
                        <div className="image-cart-product">
                            <img className="image-cart" src = {image} alt = {name}></img>
                        </div>
                        <div className='name-price-quantity'>
                            <div className='name-price'>
                                <div className="name-cart">{name}</div>
                                <div className="price-cart">Unit price: ${price}</div>
                                <div data-testid={`${iterator}-quantity-display`} className="quantity-cart">Quantity: {quantity}</div>
                            </div>
                            
                        </div>
                    </div>
                )
            }
        )
    )
}

export default CartCard;