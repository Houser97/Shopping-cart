import React from 'react'
import '../styles/TestimonialCard.css'

const TestimonialCard = ({userPicture, country, username, mainSentence, testimonial}) => {
  return (
    <div className='flex flex-col items-start justify-between relative px-6 pb-5 bg-white text-black rounded-xl w-full max-w-2xl'>
      <svg className='testimonial-quote rotate-180 top-2 right-0 sm:top-10 sm:right-10' viewBox="0 0 24 24">
          <path fill="currentColor" d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
      </svg>
      <div className='hidden flex-row justify-between relative -left-16 -top-10 text-lg font-bold py-2 px-12 w-80 bg-blue-600 rounded-tr-[50px] sm:flex'>
        <div className='flex text-center items-center justify-center rounded-full w-24 h-24 border-[var(--yellow-color)] border-solid border-4 bg-white mr-6'>Image</div>
        <div className='flex flex-col items-start justify-center'>
          <div>Country</div>
          <div>Username</div>
        </div>
        <div className='absolute w-10 h-40 top-full left-0  overflow-hidden'>
          <div className='w-24 h-52 -rotate-[20deg] bg-blue-900 -right-[79px] -top-12 absolute'></div>
        </div>
      </div>
      <div className='flex flex-row text-lg font-bold w-full justify-center sm:hidden py-10'>
          <div className='flex text-center items-center justify-center rounded-full w-24 h-24 border-[var(--yellow-color)] border-solid border-4 bg-white mr-6'>Image</div>
          <div className='flex flex-col items-start justify-center'>
            <div>Country</div>
            <div>Username</div>
          </div>
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