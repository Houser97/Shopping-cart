import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { StarRate } from '../../ui/StarRate';
import { IncDecProduct } from '../../ui/buttons/IncDecProduct';
import useTotalReviewMessage from '../../../../hooks/useTotalReviewMessage';
import { ProductBtns } from '../../ui/buttons/ProductBtns';
import { Product } from '../../../../domain/entities/product';

interface Props {
    product: Product,
    isLazy: boolean
}

const initialState = { numberOfProducts: 1 }

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { numberOfProducts: state.numberOfProducts + 1 }
        case 'decrement':
            if (state.numberOfProducts !== 1) {
                return { numberOfProducts: state.numberOfProducts - 1 }
            }
            return initialState;
        default:
            return initialState;
    }
}


export const ProductCard = ({ product, isLazy }: Props) => {

    const { id, title, price, images, rating, totalReviews } = product;

    const [state, dispatch] = useReducer(reducer, initialState)
    const totalReviewsMessage = useTotalReviewMessage(totalReviews);


    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] grid-rows-[repeat(auto-fit,minmax(0px,max-content))] 
        auto-rows-fr w-full h-full gap-2 gap-x-6 p-2 relative bg-white rounded-xl shadow-cardShadow 2sm:grid-cols-[max-content_auto] animate-fadeIn">
            <Link className='justify-self-center self-center' to={`/product/${id}`}>
                <img className='max-w-[230px] w-full h-auto self-center justify-self-center 2sm:max-w-auto 2sm:w-auto 2sm:h-[230px] 2sm:justify-self-start' src={images[0]} alt="Apple" loading={`${isLazy ? 'lazy' : 'eager'}`}></img>
            </Link>
            <div className='flex flex-col justify-evenly items-center w-full'>
                <div className='text-xl text-start font-light 2sm:text-2xl'>{title}</div>

                <div className='flex flex-row flex-wrap justify-center gap-x-0 text-2xl'>
                    <StarRate product={id} rating={rating} isCustomizable={false} setRating={undefined} />
                    <Link to={`/product/${id}`} className='font-light text-center text-blue-700 text-lg'>{totalReviewsMessage}</Link>
                </div>

                <div className='flex flex-row-reverse flex-wrap gap-x-10 justify-center'>
                    <IncDecProduct dispatch={dispatch} state={state} />
                    <div className='flex flex-row justify-center items-center 
                    rounded-full text-3xl font-normal text-black'>${price}</div>
                </div>

                <ProductBtns productId={id} reduceState={state} />
            </div>
        </div>
    )
}
