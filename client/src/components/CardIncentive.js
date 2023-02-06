import React from 'react'
import '../styles/CardIncentive.css'


const CardIncentive = ({svg, text1, text2}) => {
  return (
    <div className='card-incentive'>
        <div className='card-incentive-text'>{text1}</div>
        <div className='card-incentive-text2'>{text2}</div>
        {svg}
    </div>
  )
}

export default CardIncentive