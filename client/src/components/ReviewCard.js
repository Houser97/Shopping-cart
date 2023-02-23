import React, { useContext, useState } from 'react'
import { CartContext } from '../App'
import StarRate from './StarRate'

const ReviewCard = ({likes, dislikes, comment, author, rating, date, _id, productId, setReviews}) => {

    const API = useContext(CartContext).API
    const user = useContext(CartContext).user
    const [localLikes, setLocalLikes] = useState(likes)
    const [localDislikes, setLocalDislikes] = useState(dislikes);

    const removeUserFromArray = (user, array) => {
        const indexUser = array.indexOf(user.id)
        array.splice(indexUser,1)
        return array
    }

    const updateLikesDislikes = (mainArray, secondaryArray) => {
        let result = {mainResult: [...mainArray], secondaryResult: [...secondaryArray]}
        if(mainArray.includes(user.id)){
            result.mainResult = removeUserFromArray(user, [...mainArray])
        } else {
            mainArray.push(user.id)
            if(secondaryArray.includes(user.id)){
                result.secondaryResult = removeUserFromArray(user, [...secondaryArray])
            }
        }
        return result
    }
    
    const updateReviewLikes = (e) => {
        const isLike = e.target.getAttribute('data') === 'like'
        if(user){
            let likesCopy = [...localLikes]
            let dislikesCopy = [...localDislikes]
            let likesDislikes = {}
            if(isLike){
                likesDislikes = updateLikesDislikes(likesCopy, dislikesCopy)
                console.log(likesDislikes.secondaryResult)
                likesCopy = likesDislikes.mainResult
                dislikesCopy = likesDislikes.secondaryResult
                setLocalLikes(likesCopy)
                setLocalDislikes(dislikesCopy)
            } else {
                likesDislikes = updateLikesDislikes(dislikesCopy, likesCopy)
                likesCopy = likesDislikes.secondaryResult
                dislikesCopy = likesDislikes.mainResult
                setLocalLikes(likesCopy)
                setLocalDislikes(dislikesCopy)
            }
            fetch(`${API}/update_review`, {
                method: 'POST',
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
                    dislikes: dislikesCopy,
                    likes: likesCopy
                })
            })
            .then(response => response.json())
            .then(data => {
                setReviews(oldArray => {
                    const index = oldArray.findIndex(review => review._id === _id)
                    oldArray[index] = data
                    return oldArray
                })
            })
        }
    }
  return (
    <div className='flex flex-col w-full justify-evenly bg-white mb-3 rounded-lg p-3 sm:px-9'>
        <div className='flex flex-row flex-wrap w-full justify-between'>
            <h3 className='font-bold text-2xl mr-4'>{author.username}</h3>
            <div>
                <StarRate rating={rating} />
            </div>
        </div>
        <div className='w-full my-4 text-base text-justify sm:text-xl'>{comment}</div>
        <div className='flex flex-row w-full my-3'>
            <div data = 'like' className={`flex flex-row items-center mr-3 ${user ? `cursor-pointer`:''}`} onClick={(e) => updateReviewLikes(e)}>
                <svg className={`w-5 h-5 mr-2 pointer-events-none
                ${user ? `${localLikes.includes(user.id) ? 'fill-blue-600':''}`:''}`} viewBox="0 0 24 24"><path d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" /></svg>
                <div className='text-lg'>{localLikes.length}</div>
            </div>
            <div data = 'dislike' className='flex flex-row items-center'>
                <svg className={`w-5 h-5 mr-2 pointer-events-none
                ${user ? `${localDislikes.includes(user.id) ? 'fill-blue-600':''}`:''}`} viewBox="0 0 24 24"><path d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z" /></svg>
                <div className='text-lg'>{dislikes.length}</div>
            </div>
        </div>
        <div className='w-full text-end text-xl font-bold'>{date}</div>
    </div>
  )
}

export default ReviewCard