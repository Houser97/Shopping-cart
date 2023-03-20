import React, { useEffect, useState } from 'react'
import { TestimonialData } from '../assets/constants'
import HomeLottie from './HomeLottie'
import TestimonialCard from './TestimonialCard'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false)

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


  useEffect(() => {
    const intervalId = setInterval(() => {
      if(!isHovering) {
        handleNextClick()
      }
    }, 3000)
  
    return () => {
      clearInterval(intervalId)
    }
  }, [isHovering])
  

  return (
    <section className='grid grid-cols-[minmax(100px,1fr)] 
    grid-rows-[minmax(0px,1fr)_minmax(200px,400px)] gap-3 py-7 px-2
    bg-[var(--blue-color)] text-[var(--yellow-color)] w-full lg:px-14
    lg:grid-cols-[minmax(200px,400px)_minmax(200px,1200px)]
    lg:grid-rows-1 justify-center'>
        <HomeLottie />
        <div className='flex flex-col self-center items-center justify-center h-full row-start-1 lg:row-auto overflow-y-visible relative'>
            <h2 className='text-center'>Testimonials</h2>
            <div className='flex flex-row justify-start items-center pl-0 py-2 overflow-x-hidden overflow-y-visible sm:pl-16 h-full w-full sm:py-16'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
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
            <div className='flex flex-row w-full justify-center absolute bottom-0'>
              <button className='mx-2 focus:outline-none self-center' onClick={handlePrevClick} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                </button>
                <button className='mx-2 focus:outline-none' onClick={handleNextClick} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </button>
              </div>
        </div>
    </section>
  )
}

export default Testimonials