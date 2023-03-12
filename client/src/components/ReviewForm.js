import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productsData } from '../assets/constants'
import { CartContext } from '../App';
import StarRate from './StarRate'

const ReviewForm = () => {

    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [comment, setComment] = useState(null);
    const [rating, setRating] = useState(0);
    const [localReviews, setLocalReviews] = useState([])
    const [alreadyReviewed, setAlreadyReviewed] = useState(false)

    const {id, edit} = useParams()
    const API = useContext(CartContext).API;
    const user = useContext(CartContext).user;
    const reviews = useContext(CartContext).globalReviews;
    /*Permite llamar a la base de datos para actualizar reviews después de publicar una. */
    const setUpdateReviews = useContext(CartContext).setUpdateReviews;
    /*Estado que guardará los datos de la review del usuario para poder hacer edit*/
    const [userReview, setUserReview] = useState(null)

    useEffect(() => {
        setItem(productsData.filter(product => product.id === parseInt(id))[0])
        setLocalReviews(reviews.filter(review => review.item === parseInt(id)))
    }, [])

    /*useEffect que asigna si ya se hizo review o recupera datos de review para poder hacer edit */
    useEffect(() => {
        const review = localReviews.filter((review) => review.author._id === user.id)
        if(review.length && parseInt(edit)){
            setUserReview(review[0])
        } else if (review.length){
            setAlreadyReviewed(true)
        }
    }, [localReviews])  

    const createReview = () => {
        fetch(`${API}/create_review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({itemId: id, comment, authorId: user.id, rating})
        })
        .then(response => response.json())
        .then(data => {
            setUpdateReviews(prev => !prev)
            if(data){
                navigate('/')
            }
        })
    }

    const updateReview = () => {
        const {date, dislikes, item, _id, likes} = userReview
        fetch(`${API}/update_review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id,
                author: user.id,
                item: parseInt(item),
                rating: parseFloat(rating),
                date: new Date(date),
                comment,
                dislikes,
                likes
            })
        })
        .then(response => response.json())
        .then(data => {
            setUpdateReviews(prev => !prev)
            if(data){
                navigate('/')
            }
        })
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault()
        if(userReview && parseInt(edit)){
            updateReview()
        } else {
            createReview()
        }
    }
    
  return (
    <div className='flex justify-center items-center w-full min-h-screen px-3 py-20 bg-[#091F44] mt-10 xs:px-10'>
        <div className='grid grid-rows-[min-content,minmax(0,1fr)] grid-cols-1 justify-center 
        items-center gap-5 p-5 px-6 w-full bg-white rounded-2xl md:grid-cols-[minmax(0,350px),minmax(350px,1fr)] md:pl-20 md:p-10'>
            <img className='w-full max-w-[350px] justify-self-center h-auto md:mr-10' src={item ? item.image : ''} alt='product'></img>
            { !alreadyReviewed ?
            <form className='flex flex-col w-full h-full text-3xl justify-around' onSubmit={(e) => handleReviewSubmit(e)}>
                <h1 className='w-full text-center md:text-5xl'>{item ? item.name : ''}</h1>
                <div className='flex w-full px-10 justify-center text-3xl my-5 md:text-4xl'>
                    <StarRate key={`update-Review-${userReview ? userReview._id : id}`} product={item ? item.name : ''} isCustomizable={true} setRating={setRating} rating = {userReview ? userReview.rating:0} />
                </div>
                <textarea className='max-h-60 h-56 text-xl p-2 w-full border-solid border-gray-400 border-2 
                outline-none rounded-md' minLength='4' required onChange={(e) => setComment(e.target.value)}
                defaultValue = {userReview ? userReview.comment:''}></textarea>
                <button className='flex text-2xl bg-[#fcc902] rounded-lg w-[min-content] mt-5
                px-4 py-2 font-bold self-center transition-transform hover:bg-[#fcd01f] sm:px-5 sm:py-3'>Submit</button>
            </form>
            :
            <div className='flex flex-row w-full h-full text-3xl text-center font-bold items-center justify-center my-10 2sm:text-5xl'>You have already reviewed this article</div>
            }
        </div>
    </div>
  )
}

export default ReviewForm