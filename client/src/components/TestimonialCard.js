import React from 'react'
import '../styles/TestimonialCard.css'

const TestimonialCard = ({userPicture, country, username, mainSentence, testimonial}) => {
  return (
    <div className='flex flex-col items-center justify-between relative px-6 pb-5 bg-white text-black rounded-xl max-w-2xl'>
      <div className='flex flex-row w-full justify-start relative text-lg font-bold'>
        <div className='flex text-center items-center justify-center rounded-full relative -top-10 -left-3 w-20 h-20 border-[var(--yellow-color)] border-solid border-4 bg-white'>Image</div>
        <div className='flex flex-col items-start justify-center ml-2'>
          <div>Country</div>
          <div>Username</div>
        </div>
      </div>
      <div className='font-bold text-xl text-center'>flex flex-col items-center justify-between relative bg-green-400 w-96 h-40 mt-40
      flex flex-col items-center justify-between relative bg-green-400 w-96 h-40 mt-40</div>
      <div className='text-justify text-lg'>Testimonial flex flex-col items-center justify-between relative bg-green-400 w-96 h-40 mt-40
      flex flex-col items-center justify-between relative bg-green-400 w-96 h-40 mt-40 flex flex-col items-center justify-between relative bg-green-400 w-96 h-40 mt-40
      </div>
    </div>
  )
}

export default TestimonialCard