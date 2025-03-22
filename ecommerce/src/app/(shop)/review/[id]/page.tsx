import { getProductById } from '@/actions/products/products';
import { getReviewByProductIdAndUserId } from '@/actions/reviews/reviews-server';
import { ReviewForm } from '@/components/review/ReviewForm';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ReviewPage ({ params }: Props) {
    const { id: productId } = await params;

    const [product, review] = await Promise.all([getProductById(productId), getReviewByProductIdAndUserId(productId)]);
    const isEdit = review.id.length > 0

    if(!product) {
        return (
            <div>
                No product was found
            </div>
        )
    }

    return (
        <div className='flex justify-center items-center w-full min-h-screen px-3 bg-[var(--white-color)] xs:px-10 py-28 '>
            <div className='grid grid-rows-[min-content,minmax(0,1fr)] grid-cols-1 justify-center bg-white 
        items-center gap-5 p-5 px-6 w-full max-w-[1800px] rounded-2xl md:grid-cols-[minmax(0,350px),minmax(350px,1fr)] md:pl-20 md:p-10'>
                <img className='w-full max-w-[350px] justify-self-center h-auto animate-fadeIn md:mr-10' src={product ? product.product!.images[0] : ''} alt='product'></img>

                <ReviewForm isEdit={isEdit} productId={productId} product={product.product!} review={review}  />

            </div>
        </div>
    )
}
