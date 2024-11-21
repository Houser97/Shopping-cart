import { useEffect, useState } from 'react'
import { TestimonialData } from '../../../assets/constants'
import { TestimonialCard } from './cards'

export const Testimonials = () => {
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

  const handleCustomPosition = (position) => {
    setCurrentIndex(position)
  }


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHovering) {
        handleNextClick()
      }
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [isHovering])


  return (
    <section className='testimonials flex flex-col min-h-[800px] max-w-7xl w-full justify-center items-center relative  self-center gap-20 p-4 sm:p-0'>
      <h2 className='text-center'>TESTIMONIALS</h2>
      <div className='flex flex-row justify-center items-center pl-0 py-2 overflow-x-hidden overflow-y-visible h-full w-full sm:pb-16 max-w-4xl'
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        <div className='flex flex-row justify-start items-center transition-transform duration-300 ease-in-out transform w-full gap-32 mb-10 sm:mb-0'
          style={{ transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 128}px))` }}>
          {
            TestimonialData.map((testimonial, index) => (
              <TestimonialCard
                {...testimonial}
                key={`testimonial-card-${index}`}
              // iterator = {index}
              />
            ))
          }
        </div>
      </div>
      <div className='flex flex-row w-full justify-center'>
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
      <div className='flex flex-row absolute bottom-0 right-0 sm:bottom-5 sm:right-20'>
        {
          TestimonialData.map((_, index) => {
            return (
              <div
                key={`Caroussel-indicator-${index}`}
                className={`flex w-[10px] h-[10px] rounded-full mr-4 bg-white cursor-pointer ${index === currentIndex ? 'opacity-100' : 'opacity-20'}`}
                onClick={() => handleCustomPosition(index)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
              </div>
            )
          })
        }
      </div>
    </section>
  )
}
