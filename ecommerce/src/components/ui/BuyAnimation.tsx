import { useEffect, useRef } from 'react'
import buyAnimation from '../../../assets/Animations/purchaseAnimation.json'
import Lottie from 'lottie-web';

export const BuyAnimation = ({ showAnimation, setShowAnimation }) => {
  const purchaseAnimation = useRef(null);
  const animationContainer = useRef(null);

  useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: purchaseAnimation.current,
      loop: false,
      autoplay: false,
      animationData: buyAnimation,
      renderer: 'svg',
    })

    if (showAnimation) {
      instance.play()
      instance.addEventListener('complete', () => {
        setShowAnimation(false)
      })
    }

    return () => {
      instance.destroy()
    }
  }, [showAnimation])

  return (
    <div ref={animationContainer}
      className={`flex flex-row justify-center items-center w-full h-full top-0 left-0 z-50 fixed
    ${showAnimation ? 'translate-x-0' : '-translate-x-full'}`}>
      <div ref={purchaseAnimation} className={'w-[300px]'}></div>
    </div>
  )
}

export default BuyAnimation