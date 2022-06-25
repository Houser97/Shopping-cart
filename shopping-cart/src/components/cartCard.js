import '../styles/cartCard.css'

const CartCard = ({submission}) => {
    

    return(
        submission.map(
            function iterateSubmission(item, iterator){
                const {image, name, price, id, quantity} = item;
                return(
                    <div id={id} key = {iterator} className="card-cart">
                        <div className="image-cart-product">
                            <img className="image-cart" src = {image} alt = {name}></img>
                        </div>
                        <div className='name-price-quantity'>
                            <div className='name-price'>
                                <div className="name-cart">{name}</div>
                                <div className="price-cart">{price}</div>
                            </div>
                            <div className="quantity-cart">{quantity}</div>
                        </div>
                    </div>
                )
            }
        )
    )
}

export default CartCard;