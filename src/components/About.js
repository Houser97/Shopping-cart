import React from 'react'
import HomeLottie from './HomeLottie'
import '../styles/About.css'

const About = () => {
  return (
    <section className='about'>
        <HomeLottie />
        <div className='about-text'>
            <h2>Sign up for new offers</h2>
            <div>Get our app to receive %15 discount in your first purchase.</div>
        </div>
    </section>
  )
}

export default About