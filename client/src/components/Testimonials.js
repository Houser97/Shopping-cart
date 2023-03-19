import React, { useState } from 'react'
import { TestimonialData } from '../assets/constants'
import HomeLottie from './HomeLottie'
import TestimonialCard from './TestimonialCard'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) return TestimonialData.length - 1
      return prevIndex - 1;
    });
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === TestimonialData.length - 1) return 0;
      return prevIndex + 1;
    });
  };
  return (
    <section className='grid grid-cols-[minmax(100px,1fr)] 
    grid-rows-[minmax(0px,1fr)_minmax(200px,400px)] gap-3 py-7 px-2
    bg-[var(--blue-color)] text-[var(--yellow-color)] w-full lg:px-14
    lg:grid-cols-[minmax(200px,400px)_minmax(200px,1200px)]
    lg:grid-rows-1 justify-center'>
        <HomeLottie />
        <div className='self-center h-full row-start-1 lg:row-auto overflow-y-visible'>
            <h2 className='mb-7 text-center'>Testimonials</h2>
            <div className='flex flex-row justify-start items-center pl-0 py-16 overflow-x-hidden overflow-y-visible sm:pl-16'>
              <div className='flex flex-row justify-start items-center transition-transform duration-300 ease-in-out transform w-full gap-32'
                style={{ transform: `translateX(calc(-${currentIndex * 100 }% - ${currentIndex*128}px))` }}>
                {
                  TestimonialData.map((testimonial, index) => (
                    <TestimonialCard
                      {...testimonial}
                      key={`testimonial-card-${index}`}
                      iterator = {index}
                    />
                  ))
                }
              </div>
            </div>
            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none transition-colors'
            onClick={handlePrevClick}>
              &#8592;
            </button>
          <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none transition-colors'
          onClick={handleNextClick}>
              &#8594;
          </button>
        </div>
    </section>
  )
}

export default Testimonials