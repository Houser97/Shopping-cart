import React, { useState } from 'react'
import '../styles/StarRate.css'

const StarRate = ({product, isCustomizable, rating = 0, setRating}) => {

    const [localRating, setLocalRating] = useState(rating)

    const attributes = {
      type: isCustomizable ? 'radio' : 'checkbox',
      class: isCustomizable ? 'customizable' : '',
      name: isCustomizable ? 'rating' : product,
    }

    const updateRating = (e) => {
      console.log(e.target.value)
      if(isCustomizable){
        setLocalRating(e.target.value)
        setRating(e.target.value)
      }
    }
  if(isCustomizable){
    return(
      <div className='rate-container'>
        <input type='radio' className={attributes.class} value={5} onChange={(e) => setRating(e)}></input>
        <input type='radio' className={attributes.class} value={4} onChange={(e) => setRating(e)}></input>
        <input type='radio' className={attributes.class} value={3} onChange={(e) => setRating(e)}></input>
        <input type='radio' className={attributes.class} value={2} onChange={(e) => setRating(e)}></input>
        <input type='radio' className={attributes.class} value={1} onChange={(e) => setRating(e)} required></input>
      </div>
    )
  }

  return (
    <div className='rate-container'>
        <input type='checkbox' className={attributes.class}  disabled = {!isCustomizable} value={5} checked = {rating === 5} onChange={(e) => updateRating(e)}></input>
        <input type='checkbox' className={attributes.class}  disabled = {!isCustomizable} value={4} checked = {rating === 4} onChange={(e) => updateRating(e)}></input>
        <input type='checkbox' className={attributes.class}  disabled = {!isCustomizable} value={3} checked = {rating === 3} onChange={(e) => updateRating(e)}></input>
        <input type='checkbox' className={attributes.class}  disabled = {!isCustomizable} value={2} checked = {rating === 2} onChange={(e) => updateRating(e)}></input>
        <input type='checkbox' className={attributes.class}  disabled = {!isCustomizable} value={1} checked = {rating === 1} onChange={(e) => updateRating(e)} required></input>
    </div>
  )
}
export default StarRate