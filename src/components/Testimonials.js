import React from 'react'
import HomeLottie from './HomeLottie'
import '../styles/Testimonials.css'
import TestimonialCard from './TestimonialCard'

const Testimonials = () => {
  return (
    <section className='about'>
        <HomeLottie />
        <div className='about-text'>
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