import { useContext, useEffect, useReducer, useState } from 'react';
import {Link} from 'react-router-dom';
import StarRate from './StarRate';
import ProductBtns from './ProductBtns';
import IncDecProduct from './IncDecProduct';
import { CartContext } from '../App';
import { FilterShopContext } from './Shop';

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
    const [rating, setRating] = useState(0)
    const reviews = useContext(FilterShopContext).reviews

    useEffect(() => {
        const localReviews = reviews.filter((currentReview) => currentReview.item === id)
        if(localReviews.length > 0){
            setRating(Math.round(localReviews.reduce((acc,current) => acc + current.rating, 0)/localReviews.length))
        } else {
            setRating(0)
        }
    }, [reviews])
    
    return(
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] grid-rows-[repeat(auto-fit,minmax(0px,max-content))] 
        auto-rows-fr w-full h-full gap-2 gap-x-6 p-2 relative bg-white shadow-cardShadow 2sm:grid-cols-[max-content_minmax(300px,1fr)]">
            <div className='flex flex-row justify-center items-center absolute top-[-15px] left-[-15px] bg-[var(--yellow-color)] w-16 h-16 
            rounded-full text-xl font-bold text-black'>${price}</div>
            <Link className='justify-self-center self-center' to={`/product/${id}`}>
                <img className='max-w-[230px] w-full h-auto self-center justify-self-center 2sm:max-w-auto 2sm:w-auto 2sm:h-[230px] 2sm:justify-self-start' src = {image} alt = "Apple" loading={`${isLazy ? 'lazy':''}`}></img>
            </Link>
            <div className='flex flex-col justify-evenly items-center w-full'>
                <div className='text-xl text-center font-bold 2sm:text-2xl'>{name}</div>
                <StarRate product={id} rating = {rating} isCustomizable={false} />
                <IncDecProduct dispatch={dispatch} state={state} />
                <ProductBtns productId = {id} reduceState = {state} />
            </div>
        </div>
    )
}

export default Card;