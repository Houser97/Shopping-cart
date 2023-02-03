import '../styles/Card.css';
import { useContext, useReducer } from 'react';
import { CartContext } from '../App';
import {Link} from 'react-router-dom';
import StarRate from './StarRate';

const initialState = {numberOfProducts: 1}

function reducer(state, action){
    switch(action.type){
        case 'increment':
            return {numberOfProducts: state.numberOfProducts + 1}
        case 'decrement':
            if(state.numberOfProducts !== 1){
                return {numberOfProducts: state.numberOfProducts - 1}
            }
            return initialState;
        default:
            return initialState;
    }
}

const Card = ({image, name, price, id, isLazy}) => {

    const addProduct = useContext(CartContext).addProduct

    const [state, dispatch] = useReducer(reducer, initialState)
    
    return(
        <div className="card">
            <div className='price-product'>${price}</div>
            <img src = {image} alt = "Apple" loading={`${isLazy ? 'lazy':''}`}></img>
            <div className='product-data'>
                <div className='name-product'>{name}</div>
                <StarRate product={name} />
                <div className="card-decrase-increase">
                    <button className='decrease-button button-IncDec' onClick={() => dispatch({type: 'decrement'})}>
                        <svg className='minus-svg svg-IncDec' viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
                        </svg>
                    </button>
                    <div className='number-products'>{state.numberOfProducts}</div>
                    <button data-testid="0" className='increase-button button-IncDec' onClick={() => dispatch({type: 'increment'})}>
                        <svg className='plus-svg svg-IncDec' viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                        </svg>
                    </button>
                </div>
                <button className='add-to-cart' onClick={() => addProduct(state.numberOfProducts, id)}>Add to cart</button>
                <Link to={`/${id}/review`}>review</Link>
            </div>
        </div>
    )
}

export default Card;