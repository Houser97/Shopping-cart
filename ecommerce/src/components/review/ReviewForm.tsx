'use client'
import { Product } from "@/domain/entities/product";
import { ProcessLoader } from "../ui/loaders/ProcessLoader"
import { StarRate } from "../ui/StarRate"
import { FormEvent, useEffect, useState } from "react";
import { Review } from "@/domain/entities/review";
import { createReview, updateReview } from "@/actions/reviews/reviews";
import { Status, useAuthStore } from "@/store/auth/auth-store";
import { redirect } from "next/navigation";

interface Props {
  productId: string;
  product: Product;
  review: Review;
  isEdit: boolean;
}

export const ReviewForm = ({ productId, product, review, isEdit }: Props) => {
  
      const [comment, setComment] = useState('');
      const [rating, setRating] = useState(0);
      const [isLoadingV2, setIsLoadingV2] = useState(false);

      useEffect(() => {
        console.log(review)
        if(review){
          setComment(review.comment);
          setRating(review.rating);
        }
      }, [])

      const user = useAuthStore(state => state.user);
      const status = useAuthStore(state => state.status)

      const create = async () => {
          const { id } = user!;
          await createReview(id, comment, rating, productId)
      }
  
      const update = async () => {
          const { id } = review!;
          const { id: userId } = user!;
  
          await updateReview(id, userId, comment, rating);
      }

      
    const handleReviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoadingV2(true)
        e.preventDefault()
        if (isEdit) {
            await update();
            redirect('/shop')
        } else {
            await create();
            redirect('/shop')
        }
    }

    if(status !== Status.AUTHENTICATED) {
      return(
        <div className='flex flex-row w-full h-full text-3xl text-center font-bold items-center justify-center my-10 2sm:text-5xl'>You must log in to | products</div>
      )
    }
      

  return (
    <form className='flex flex-col w-full h-full text-3xl justify-around' onSubmit={(e) => handleReviewSubmit(e)}>
      <h1 className='w-full text-center md:text-5xl opacity-0 animate-showContent'>{product ? product.title : ''}</h1>
      <div className='flex w-full px-10 justify-center text-3xl my-5 opacity-0 animate-showContent animate-delay-200 md:text-4xl'>
          <StarRate key={`${productId}`} product={product!.title} isCustomizable={true} setRating={setRating} rating={rating} />
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
  )
}