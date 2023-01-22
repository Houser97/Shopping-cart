import React from 'react'
import HomeLottie from './HomeLottie'
import '../styles/Testimonials.css'
import TestimonialCard from './TestimonialCard'

const Testimonials = () => {
  return (
    <section className='testimonials'>
        <HomeLottie />
        <div className='testimonials-subcontainer'>
            <h2>Testimonials</h2>
            <div className='testimonials-grid'>
              <TestimonialCard />
              <TestimonialCard />
              <TestimonialCard />
              <TestimonialCard />
              <TestimonialCard />
              <TestimonialCard />
            </div>
        </div>
    </section>
  )
}

export default Testimonials