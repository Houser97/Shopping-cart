import React from 'react'
import BannerVertical from '../assets/Home/bannerVertical2.jpg'
import Banner from '../assets/Home/banner.jpg'
import { itemsPromotion } from '../assets/constants'
import CardItemPromotion from './CardItemPromotion';
import '../styles/Presentation.css'

const Presentation = () => {
  return (
    <section className='presentation'>
        <div className='presentation-subcontainer'>
            <picture className='home-main-img'>
                <source 
                    srcSet={Banner}
                    media="(min-width: 600px)"
                />
                <img 
                    src={BannerVertical}
                    alt="Banner"
                ></img>
            </picture>
            <div className='promotions-grid'>
                {
                    itemsPromotion.map((item, index) => {
                        return(
                            <CardItemPromotion 
                            key={`promotion-${index}`} 
                            {...item} />
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default Presentation