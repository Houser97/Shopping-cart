import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartContext } from '../App'
import { updateProducts } from '../slices/products'
import { updateReviews, userSelector } from '../slices/user'
import StarRate from './StarRate'

const ReviewCard = ({likes, dislikes, comment, author, rating, date ,formatted_date, _id, productId}) => {

    const dispatch = useDispatch()

    const API = useContext(CartContext).API
    const { user } = useSelector(userSelector)
    /*Estados LOCAL ayudan a actualizar interfaz sin tener que refrescar página para recuperar REVIEWS de DB. */
    const [localLikes, setLocalLikes] = useState(new Set(likes))
    const [localDislikes, setLocalDislikes] = useState(new Set(dislikes));

    const updateLikesDislikes = (mainSet, secondarySet) => {
        if(mainSet.has(user.id)){
            mainSet.delete(user.id)
        } else {
            mainSet.add(user.id)
            secondarySet.delete(user.id)
        }
    }
    
    const updateReviewLikes = (e) => {
        const isLike = e.target.getAttribute('data') === 'like'

        if(!user) return

        let likesSet = new Set(localLikes)
        let dislikesSet = new Set(localDislikes)

        if(isLike){
            updateLikesDislikes(likesSet, dislikesSet)
        } else {
            updateLikesDislikes(dislikesSet, likesSet)
        }
        
        fetch(`${API}/update_review`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id,
                author: user.id,
                item: parseInt(productId),
                rating: parseFloat(rating),
                date: new Date(date),
                comment,
                dislikes: Array.from(dislikesSet),
                likes: Array.from(likesSet)
            })
        })
        .then(() => {
            setLocalLikes(likesSet);
            setLocalDislikes(dislikesSet);
        })
    }

    const deleteReview = () => {
        fetch(`${API}/delete_review`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: _id})
        })
        .then(data => data.json())
        .then(data => {
            if(data){
                dispatch(updateProducts())
                /*Se actualiza el arreglo reviews en user para evitar hacer fetch */
                /*Se trabaja con la variable de usuario local para no tener que recuperar el usuario del servidor. */
                const updatedUser = structuredClone(user);
                const reviewIndex = updatedUser.reviews.indexOf(parseInt(productId))
                updatedUser.reviews.splice(reviewIndex,1)
                dispatch(updateReviews({updatedUser}))
            }
        })
    }
  return (
    <div className='flex flex-col w-full justify-evenly bg-white mb-3 rounded-lg p-3 relative sm:px-9'>
        <div className='flex flex-row flex-wrap w-full justify-between'>
            <h3 className='font-bold text-2xl mr-4'>{author.username}</h3>
            <div>
                <StarRate rating={rating} />
            </div>
        </div>
        <div className='w-full my-4 text-base text-justify sm:text-xl'>{comment}</div>
        <div className='flex flex-row w-full my-3 mb-5 relative'>
            <div data = 'like' className={`flex flex-row items-center mr-3 ${user ? `cursor-pointer`:''}`} onClick={(e) => updateReviewLikes(e)}>
                <svg className={`w-5 h-5 mr-2 pointer-events-none
                ${user ? `${localLikes.has(user.id) ? 'fill-blue-600':''}`:''}`} viewBox="0 0 24 24"><path d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" /></svg>
                <div className='text-lg'>{localLikes.size}</div>
            </div>
            <div data = 'dislike' className={`flex flex-row items-center ${user ? 'cursor-pointer':''}`} onClick={(e) => updateReviewLikes(e)}>
                <svg className={`w-5 h-5 mr-2 pointer-events-none
                ${user ? `${localDislikes.has(user.id) ? 'fill-orange-600':''}`:''}`} viewBox="0 0 24 24"><path d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z" /></svg>
                <div className='text-lg'>{localDislikes.size}</div>
            </div>
            <div className='flex flex-row absolute right-0 top-0'>
                <Link className={`rounded-lg font-bold text-lg bg-blue-600 text-white
                py-1 tracking-wider cursor-pointer mr-1 ${user ? author._id === user.id ? 'flex':'hidden':'hidden'} text-base px-2 sm:px-3 sm:mr-2 sm:text-lg`
                } to={`/${productId}/1/review`}>Edit</Link>
                <button className={`rounded-lg font-bold text-lg bg-orange-600 text-white
                py-1 tracking-wider cursor-pointer ${user ? author._id === user.id ? 'flex':'hidden':'hidden'} text-base px-2 sm:px-3 sm:text-lg`}
                onClick={() => deleteReview()}>
                    Delete
                </button>
            </div>
        </div>
        <div className='w-full text-end text-xl font-bold'>{formatted_date}</div>
    </div>
  )
}

export default ReviewCard