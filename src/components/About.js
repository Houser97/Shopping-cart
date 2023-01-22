import React from 'react'
import HomeLottie from './HomeLottie'
import '../styles/About.css'
import TestimonialCard from './TestimonialCard'

const About = () => {
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

export default About