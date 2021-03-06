import '../styles/card.css';
import { useState, useEffect, useContext } from 'react';
import App from '../App';
import { AddProductContext } from '../App';

const Card = ({image, imageName, price, id}) => {

    const addProduct = useContext(AddProductContext)

    const [numberOfProducts, setNumberOfProducts] = useState(1);
    const [currentId, setCurrentId] = useState(0);

    useEffect(()=>{
        const divNumberProducts = document.getElementById(`${currentId}-DIV-products`);
        divNumberProducts.textContent = numberOfProducts;
        if (numberOfProducts < 1) {
            setNumberOfProducts(1);
        } 
    },[numberOfProducts, currentId])

    function decrementProduct(e){
        if (numberOfProducts !== 1) {
            setNumberOfProducts(numberOfProducts => numberOfProducts - 1);
            setCurrentId(e.target.id);
        } 
    }
    
    function incrementProduct(e){
        setNumberOfProducts(numberOfProducts => numberOfProducts + 1);
        setCurrentId(e.target.id);
    }

    return(
        <div id={`${id}-card`} className="card">
            <div className='price-product'>${price}</div>
            <div className="card-image-section">
                <img src = {image} alt = "Apple"></img>
            </div>
            <div className="card-name-section">
                <div className='name-product'>{imageName}</div>
            </div>
            <div className="card-decrase-increase">
                <button id={id} data-testid = "decrement" className='decrease-button button-IncDec' onClick={decrementProduct}>
                    <svg id={id}  className='minus-svg svg-IncDec' viewBox="0 0 24 24">
                        <path id={id}  fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
                    </svg>
                </button>
                <div id={`${id}-DIV-products`} data-testid="01" className='number-products'>{numberOfProducts}</div>
                <button id={id} data-testid="0" className='increase-button button-IncDec' onClick={incrementProduct}>
                    <svg id={id}  className='plus-svg svg-IncDec' viewBox="0 0 24 24">
                        <path id={id}  fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                    </svg>
                </button>
            </div>
            <div className='add-product'>
                <button id={id} data-testid={`${id}-add-to-cart`}  className='add-to-cart' onClick={addProduct}>Add to cart</button>
            </div>
        </div>
    )
}

export default Card;