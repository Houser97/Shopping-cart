import React from 'react'
import Controller from '../assets/Home/ControllerPlay.png'
import '../styles/CardItemPromotion.css'

const CardItemPromotion = () => {
  return (
    <div className='cardItemPromotion'>
        <div className='promotion_data'>
            <div className='section_promotion'>VR Video Games</div>
            <div className='offer_duration'>Offer available only this week</div>
            <div className='price_promotion'>Only</div>
        </div>
        <img className='item_promotion_img' alt='item_promotion' src = {Controller}></img>
    </div>
  )
}

export default CardItemPromotion