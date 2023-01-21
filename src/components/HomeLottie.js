import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-web'
import '../styles/HomeLottie.css'
import animation from '../assets/Animations/homeAnimation.json'

const HomeLottie = () => {
    const lottieContainer = useRef(null)
    useEffect(() => {
        const instance = Lottie.loadAnimation({
            container: lottieContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animation,
          })
    
      return () => {
        instance.destroy()
      }
    }, [])
    
  return (
    <div ref={lottieContainer} className='home-lottie'>HomeLottie</div>
  )
}

export default HomeLottie