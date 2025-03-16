import { getProductById } from "@/actions/products/products";
import { getReactions } from "@/actions/reactions/reactions";
import { ReviewCard } from "@/components/Product/ReviewCard";
import { ProductBtns } from "@/components/ui/buttons/ProductBtns";
import { StarRate } from "@/components/ui/StarRate";
import Image from "next/image";

interface Props {
    params: { id: string };
}

export default async function ProductPage({ params }: Props) {
    const param = await params
    const { id } = param;

    const productPromise = getProductById(id);
    const reactionsPromise = getReactions(id);
    
    const [ {reviews, product, totalReactions }, reactions ] = await Promise.all([productPromise, reactionsPromise]);
    console.log(product)
    const totalReviews = reviews?.length;
    

  return (
    <div className='flex w-full'>
        <div className='flex justify-center items-center bg-[var(--white-color)] w-full min-h-screen py-28 px-2 sm:px-8 md:px-14'>
            <div className='flex flex-col bg-white rounded-lg w-full max-w-[1800px] p-2 sm:p-6'>
                <div className='grid auto-rows-auto grid-cols-1 2sm:grid-cols-[minmax(200px,max-content)_minmax(250px,1fr)] gap-3 mb-14'>
                    <Image className='max-w-[300px] w-full justify-self-center self-center animate-fadeIn' alt='a' src={product!.images[0]} width={500} height={500}></Image>
                    <div className='flex flex-col w-full h-full justify-evenly items-center p-1 md:p-10'>
                        <h1 className='w-full text-center text-4xl md:text-5xl opacity-0 animate-showContent'>{product!.title}</h1>
                        <h3 className='w-full text-center text-2xl mt-2 animate-showContent opacity-0 animate-delay-200'>{product!.description}</h3>
                        <div className='flex w-full px-1 justify-evenly text-3xl animate-showContent opacity-0 animate-delay-[400ms] sm:px-4 sm:text-4xl my-5'>
                            <StarRate product={product!.title} rating={product!.rating ?? 0}  isCustomizable={false} setRating={undefined} />
                        </div>
                        <div className='animate-showContent opacity-0 animate-delay-[600ms] '>
                            <ProductBtns productId={id} reduceState={{ numberOfProducts: 1 }} />
                        </div>
                    </div>
                </div>
                <div className='w-full font-bold text-4xl text-center animate-showContent opacity-0 animate-delay-[400ms]'>Reviews</div>
                <div className='flex flex-col justify-evenly w-full bg-slate-200 rounded-lg p-2 animate-showContent opacity-0 animate-delay-400 sm:p-5'>
                    <div className={`font-bold text-2xl ${totalReviews! > 0 ? 'flex' : 'hidden'}`}>Reviews: {totalReviews}</div>
                    {totalReviews! > 0 ?
                        reviews!.map((review, index) => {
                            const { id: reviewId } = review;

                            const reviewUserReactions = reactions[reviewId] || undefined;

                            return (
                                <ReviewCard
                                    key={`review-card-${index}`}
                                    review={review}
                                    productId={id}
                                    userReaction={reviewUserReactions}
                                />
                            )
                        })
                        :
                        <div className='text-2xl text-black w-full text-center font-bold py-12  animate-showContent opacity-0 animate-delay-400 2sm:text-4xl'>This product has no reviews.</div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}


