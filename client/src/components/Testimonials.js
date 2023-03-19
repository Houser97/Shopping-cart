import React from 'react'
import { TestimonialData } from '../assets/constants'
import HomeLottie from './HomeLottie'
import TestimonialCard from './TestimonialCard'

const Testimonials = () => {
  return (
    <section className='grid grid-cols-[minmax(100px,1fr)] 
    grid-rows-[minmax(0px,1fr)_minmax(200px,400px)] gap-3 py-7 px-2
    bg-[var(--blue-color)] text-[var(--yellow-color)] w-full lg:px-14
    lg:grid-cols-[minmax(200px,400px)_minmax(200px,1200px)]
    lg:grid-rows-1 justify-center'>
        <HomeLottie />
        <div className='self-center h-full row-start-1 lg:row-auto overflow-y-visible'>
            <h2 className='mb-7 text-center'>Testimonials</h2>
            <div className='flex flex-row justify-start items-center pl-0 py-16 gap-32 transition-transform overflow-x-hidden overflow-y-visible sm:pl-16'>
                {
                  TestimonialData.map((testimonial, index) => {
                    return(
                      <TestimonialCard {...testimonial} key={`testimonial-card-${index}`} />
                    )
                  })
                }
            </div>
        </div>
    </section>
  )
}

export default Testimonials