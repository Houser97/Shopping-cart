import React, { useState } from 'react'
import '../styles/StarRate.css'

const StarRate = ({product, isCustomizable, rating, setRating}) => {

    const [localRating, setLocalRating] = useState(rating)

    const attributes = {
      type: isCustomizable ? 'radio':'checkbox',
      class: isCustomizable ? 'customizable' : '',
      name: isCustomizable ? 'rating' : product,
    }

    const updateRating = (e) => {
      if(isCustomizable){
        setLocalRating(parseInt(e.target.value))
        setRating(parseInt(e.target.value))
      }
    }

  return (
    <div className='rate-container'>
        <input type={attributes.type} className={attributes.class} name={attributes.name}  disabled = {!isCustomizable} value={5} checked = {isCustomizable ? localRating === 5 : rating === 5} onChange={(e) => updateRating(e)}></input>
        <input type={attributes.type} className={attributes.class} name={attributes.name}  disabled = {!isCustomizable} value={4} checked = {isCustomizable ? localRating === 4 : rating === 4} onChange={(e) => updateRating(e)}></input>
        <input type={attributes.type} className={attributes.class} name={attributes.name}  disabled = {!isCustomizable} value={3} checked = {isCustomizable ? localRating === 3 : rating === 3} onChange={(e) => updateRating(e)}></input>
        <input type={attributes.type} className={attributes.class} name={attributes.name}  disabled = {!isCustomizable} value={2} checked = {isCustomizable ? localRating === 2 : rating === 2} onChange={(e) => updateRating(e)}></input>
        <input type={attributes.type} className={attributes.class} name={attributes.name}  disabled = {!isCustomizable} value={1} checked = {isCustomizable ? localRating === 1 : rating === 1} onChange={(e) => updateRating(e)} required></input>
    </div>
  )
}
export default StarRate