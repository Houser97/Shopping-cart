import React from 'react'
import HomeLottie from './HomeLottie'
import TestimonialCard from './TestimonialCard'

const Testimonials = () => {
  return (
    <section className='grid grid-cols-[minmax(200px,1fr)] 
    grid-rows-[minmax(200px,1fr)_minmax(200px,400px)] gap-3 py-7 px-6
    bg-[var(--blue-color)] text-[var(--yellow-color)] w-full lg:px-14
    lg:grid-cols-[minmax(200px,400px)_minmax(200px,1fr)]
    lg:grid-rows-1'>
        <HomeLottie />
        <div className='self-center h-full row-start-1 lg:row-auto'>
            <h2 className='mb-7 text-center'>Testimonials</h2>
            <div className='flex flex-row justify-center items-center w-full py-12 px-5 bg-green-400'>
              <TestimonialCard />
            </div>
        </div>
    </section>
  )
}

export default Testimonials