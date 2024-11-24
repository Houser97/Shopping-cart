import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { StarRate } from '../../components/ui/StarRate';
import { ProcessLoader } from '../../components/ui/loaders/ProcessLoader';
import { PageLoader } from '../../components/ui/loaders/PageLoader';

import { useAuthStore } from '../../hooks/useAuthStore';

import { useReview } from '../../hooks/useReview';
import { useProductStore } from '../../hooks/useProductStore';

export const ReviewScreen = () => {

    const navigate = useNavigate();
    const { productId } = useParams()

    const { user, status } = useAuthStore();
    const { product, getProductById } = useProductStore();
    const { review, getReviewByProductIdAndUserId, createReview, updateReview } = useReview();

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const [isEdit, setIsEdit] = useState(false);
    const [isLoadingV2, setIsLoadingV2] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getData = async (productId: string) => {
        const [_, review] = await Promise.all([getProductById(productId), getReviewByProductIdAndUserId(productId)]);
        const reviewExists = review.id.length > 0
        if (reviewExists) {
            setRating(review.rating);
            setComment(review.comment);
            setIsEdit(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getData(productId);
    }, [])

    const create = async () => {
        const { id } = user;
        await createReview(id, comment, rating, productId)
    }

    const update = async () => {
        const { id } = review;
        const { id: userId } = user;

        await updateReview(id, userId, comment, rating);
    }

    const handleReviewSubmit = async (e) => {
        setIsLoadingV2(true)
        e.preventDefault()
        if (isEdit) {
            await update();
        } else {
            await create();
        }
        navigate(-1);
    }

    if (isLoading)
        return (<PageLoader />)

    return (
        <div className='flex justify-center items-center w-full min-h-screen px-3 bg-[var(--white-color)] xs:px-10'>
            <div className='grid grid-rows-[min-content,minmax(0,1fr)] grid-cols-1 justify-center 
        items-center gap-5 p-5 px-6 w-full max-w-[1800px] rounded-2xl md:grid-cols-[minmax(0,350px),minmax(350px,1fr)] md:pl-20 md:p-10'>
                <img className='w-full max-w-[350px] justify-self-center h-auto animate-fadeIn md:mr-10' src={product ? product.images[0] : ''} alt='product'></img>
                {status === 'authenticated' ?
                    <form className='flex flex-col w-full h-full text-3xl justify-around' onSubmit={(e) => handleReviewSubmit(e)}>
                        <h1 className='w-full text-center md:text-5xl opacity-0 animate-showContent'>{product ? product.title : ''}</h1>
                        <div className='flex w-full px-10 justify-center text-3xl my-5 opacity-0 animate-showContent animate-delay-200 md:text-4xl'>
                            <StarRate key={`${productId}`} product={product.title} isCustomizable={true} setRating={setRating} rating={rating} />
                        </div>
                        <textarea className='max-h-60 h-56 text-xl p-2 w-full border-solid border-gray-400 border-2 animate-showContent animate-delay-[400ms] 
                     opacity-0 outline-none rounded-md' minLength={4} required onChange={(e) => setComment(e.target.value)}
                            defaultValue={comment}></textarea>
                        {
                            isLoadingV2 ?
                                <ProcessLoader />
                                :
                                <button className='flex text-2xl bg-[#fcc902] rounded-lg w-[min-content] mt-5  opacity-0
                        px-4 py-2 font-light self-center transition-transform hover:bg-[#fcd01f] animate-showContent animate-delay-[600ms] sm:px-5 sm:py-3'>Submit</button>
                        }
                    </form>
                    :
                    <div className='flex flex-row w-full h-full text-3xl text-center font-bold items-center justify-center my-10 2sm:text-5xl'>You must log in to | products</div>
                }
            </div>
        </div>
    )
}
