import { Link } from 'react-router-dom'
import { StarRate } from '../../ui/StarRate'
import { DetailedReview } from '../../../../domain/entities/review'
import { Reactions } from '../ui/Reactions'
import { Reaction } from '../../../../domain/entities/reaction'
import { useAuthStore } from '../../../hooks/useAuthStore'
import { useReview } from '../../../hooks/useReview'

interface Props {
    review: DetailedReview,
    productId: string,
    userReaction: Reaction
}


export const ReviewCard = ({ review, productId, userReaction }: Props) => {

    const { comment, author, rating, createdAt, id: _id, authorId } = review;
    const date = new Date(createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

    const { user, status } = useAuthStore();
    const { deleteReview } = useReview();

    const handleDelete = async (id: string) => {
        await deleteReview(id);
        window.location.reload();
    }

    return (
        <div className='flex flex-col w-full justify-evenly bg-white mb-3 rounded-lg p-3 relative sm:px-9'>
            <div className='flex flex-row flex-wrap w-full justify-between'>
                <h3 className='font-bold text-2xl mr-4'>{author.username}</h3>
                <div>
                    <StarRate rating={rating} isCustomizable={false} product='' setRating={undefined} />
                </div>
            </div>
            <div className='w-full my-4 text-base text-justify sm:text-xl'>{comment}</div>
            <div className='flex flex-row w-full my-3 mb-5 relative'>
                <Reactions totalReactions={review.reactions} userReaction={userReaction} productId={productId} reviewId={_id} />
                <div className={`flex-row absolute right-0 top-0 ${status === 'authenticated' && user.id === authorId ? 'flex' : 'hidden'}`}>
                    <Link className='rounded-lg font-bold text-lg bg-blue-600 text-white
                py-1 tracking-wider mr-1 px-2 sm:px-3 sm:mr-2 sm:text-lg'
                        to={`/review/${productId}`}>Edit</Link>
                    <button className='rounded-lg font-bold text-lg bg-orange-600 text-white
                py-1 tracking-wider px-2 sm:px-3 sm:text-lg'
                        onClick={() => handleDelete(_id)}>
                        Delete
                    </button>
                </div>
            </div>
            <div className='w-full text-end text-xl font-bold'>{date}</div>
        </div>
    )
}
