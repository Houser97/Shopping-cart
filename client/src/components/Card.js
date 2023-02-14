import { useReducer } from 'react';
import {Link} from 'react-router-dom';
import StarRate from './StarRate';
import ProductBtns from './ProductBtns';

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

    const [state, dispatch] = useReducer(reducer, initialState)
    
    return(
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] grid-rows-[repeat(auto-fit,minmax(0px,max-content))] 
        auto-rows-fr w-full h-full gap-2 gap-x-6 p-2 relative bg-white shadow-cardShadow 2sm:grid-cols-[max-content_minmax(300px,1fr)]">
            <div className='flex flex-row justify-center items-center absolute top-[-15px] left-[-15px] bg-[var(--yellow-color)] w-16 h-16 
            rounded-full text-xl font-bold text-black'>${price}</div>
            <Link className='justify-self-center self-center' to={`/product/${id}`}>
                <img className='max-w-[230px] w-full h-auto self-center justify-self-center 2sm:max-w-auto 2sm:w-auto 2sm:h-[230px] 2sm:justify-self-start' src = {image} alt = "Apple" loading={`${isLazy ? 'lazy':''}`}></img>
            </Link>
            <div className='flex flex-col justify-evenly items-center w-full'>
                <div className='text-xl text-center font-bold'>{name}</div>
                <StarRate product={name} />
                <div className="flex flex-row justify-evenly my-2 mb-4">
                    <button className='h-8 w-8 text-[var(--blue-color)] cursor-pointer' onClick={() => dispatch({type: 'decrement'})}>
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
                        </svg>
                    </button>
                    <div className='flex flex-row justify-center items-center text-xl rounded-2xl w-12 h-8 border-2 border-[var(--blue-color)]'>{state.numberOfProducts}</div>
                    <button data-testid="0" className='h-8 w-8 text-[var(--blue-color)] cursor-pointer' onClick={() => dispatch({type: 'increment'})}>
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                        </svg>
                    </button>
                </div>
            <ProductBtns productId = {id} reduceState = {state} />
            </div>
        </div>
    )
}

export default Card;