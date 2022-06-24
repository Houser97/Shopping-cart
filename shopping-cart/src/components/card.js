import '../styles/card.css';

const Card = (props) => {
    const {image, imageName, price} = props;
    return(
        <div className="card">
            <div className='price-product'>${price}</div>
            <div className="card-image-section">
                <img src = {image} alt = "Apple"></img>
            </div>
            <div className="card-name-section">
                <div className='name-product'>{imageName}</div>
            </div>
            <div className="card-decrase-increase">
                <button className='decrease-button button-IncDec'>
                    <svg className='minus-svg svg-IncDec' viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
                    </svg>
                </button>
                <div className='number-products'>1</div>
                <button className='increase-button button-IncDec'>
                    <svg className='plus-svg svg-IncDec' viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                    </svg>
                </button>
            </div>
            <div className='add-product'>
                <button className='add-to-cart'>Add to cart</button>
            </div>
        </div>
    )
}

export default Card;