import React from 'react'
import '../styles/TestimonialCard.css'

const TestimonialCard = () => {
  return (
    <div className='testimonial-card'>

        <div className='testimonial-border'></div>

        <svg className='testimonial-quote quote-up' viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
        </svg>

        <svg className='testimonial-quote quote-down' viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
        </svg>


        <h3>Lorem</h3>
        <div id='testimonial-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia nunc eget felis volutpat pretium. 
        </div>
    </div>
  )
}

export default TestimonialCard