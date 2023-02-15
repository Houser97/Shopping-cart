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

    const {id} = useParams()
    const API = useContext(CartContext).API;
    const user = useContext(CartContext).user;

    useEffect(() => {
        setItem(productsData.filter(product => product.id === parseInt(id))[0])
    }, [])

    const createReview = (e) => {
        e.preventDefault()
        fetch(`${API}/create_review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({itemId: id, comment, authorId: user.id, rating})
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                navigate('/')
            }
        })
    }
    
  return (
    <div className='flex justify-center items-center w-full min-h-screen px-3 py-20 bg-[#091F44] mt-10 xs:px-10'>
        <div className='grid grid-rows-[min-content,minmax(0,1fr)] grid-cols-1 justify-center 
        items-center gap-5 p-5 px-6 w-full bg-white rounded-2xl md:grid-cols-[minmax(0,350px),minmax(350px,1fr)] md:pl-20 md:p-10'>
            <img className='w-full max-w-[350px] justify-self-center h-auto md:mr-10' src={item ? item.image : ''} alt='product'></img>
            <form className='flex flex-col w-full h-full text-3xl justify-around' onSubmit={(e) => createReview(e)}>
                <h1 className='w-full text-center md:text-5xl'>{item ? item.name : ''}</h1>
                <div className='flex w-full px-10 justify-center text-3xl my-5 md:text-4xl'>
                    <StarRate product={item ? item.name : ''} isCustomizable={true} setRating={setRating} />
                </div>
                <textarea className='max-h-60 h-56 text-xl p-2 w-full border-solid border-gray-400 border-2 
                outline-none rounded-md' minLength='4' required onChange={(e) => setComment(e.target.value)}></textarea>
                <button className='flex text-2xl bg-[#fcc902] rounded-lg w-[min-content] mt-5
                px-4 py-2 font-bold self-center transition-transform hover:bg-[#fcd01f] sm:px-5 sm:py-3'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ReviewForm