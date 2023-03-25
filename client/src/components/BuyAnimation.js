import React, { useEffect, useRef, useContext } from 'react'
import buyAnimation from '../assets/Animations/purchaseAnimation.json'
import Lottie from 'lottie-web';
import { CartContext } from '../App';

const BuyAnimation = () => {
    const purchaseAnimation = useRef(null);
    const animationContainer = useRef(null);
    const showAnimation = useContext(CartContext).showAnimation;
    const setShowAnimation = useContext(CartContext).setShowAnimation;

    useEffect(() => {
        const instance = Lottie.loadAnimation({
            container: purchaseAnimation.current,
            loop:false,
            autoplay:false,
            animationData: buyAnimation,
            renderer:'svg',
        })

        if(showAnimation){
          instance.play()
          instance.addEventListener('complete', ()=> {
            setShowAnimation(false)
          })   
        } 

        return() => {
          instance.destroy()
        }
    }, [showAnimation])

  return (
    <div ref={animationContainer} 
    className={`flex flex-row justify-center items-center w-full h-full top-0 left-0 z-50 fixed
    ${showAnimation ? 'translate-x-0':'-translate-x-full'}`}>
      <div ref={purchaseAnimation} className={'w-[300px]'}></div>
    </div>
  )
}

export default BuyAnimation