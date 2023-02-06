import React from 'react'
import '../styles/CardItemPromotion.css'

const CardItemPromotion = ({section, image, price}) => {
  return (
    <div className='cardItemPromotion'>
        <div className='promotion_data'>
            <div className='section_promotion'>{section}</div>
            <div className='offer_duration'>Offer available only this week</div>
            <div className='price_promotion'>Only {price}</div>
        </div>
        <img className='item_promotion_img' alt='item_promotion' src = {image}></img>
    </div>
  )
}

export default CardItemPromotion