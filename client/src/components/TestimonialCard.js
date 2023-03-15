import React from 'react'
import '../styles/TestimonialCard.css'

const TestimonialCard = ({userPicture, country, username, mainSentence, testimonial}) => {
  return (
    <div className='flex flex-col items-start justify-between relative px-6 pb-5 bg-white text-black rounded-xl max-w-2xl'>
      <svg className='testimonial-quote quote-down' viewBox="0 0 24 24">
          <path fill="currentColor" d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
      </svg>
      <div className='flex flex-row relative -left-20 -top-10 text-lg font-bold py-2 px-20 bg-blue-900 rounded-tr-[50px]'>
        <div className='flex text-center items-center justify-center rounded-full w-24 h-24 border-[var(--yellow-color)] border-solid border-4 bg-white'>Image</div>
        <div className='flex flex-col items-start justify-center ml-2'>
          <div>Country</div>
          <div>Username</div>
        </div>
        <div className='absolute w-14 h-20 bg-black top-full left-0'></div>
      </div>
      <div className='font-bold text-xl text-center mb-5'>flex flex-col items-center justify-between relative bg-green-400 w-96 h-40 mt-40
      flex flex-col items-center justify-between relative bg-green-400 w-96 h-40 mt-40</div>
      <div className='text-justify text-lg'>Testimonial flex flex-col items-center justify-between relative bg-green-400 w-96 h-40 mt-40
      flex flex-col items-center justify-between relative bg-green-400 w-96 h-40 mt-40 flex flex-col items-center justify-between relative bg-green-400 w-96 h-40 mt-40
      </div>
    </div>
  )
}

export default TestimonialCard