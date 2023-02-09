import React from 'react'
import '../styles/StarRate.css'

const StarRate = ({product, isCustomizable, rating = 0}) => {
    const attributes = {
      type: isCustomizable ? 'radio' : 'checkbox',
      class: isCustomizable ? 'customizable' : '',
      name: isCustomizable ? 'rating' : product,
    }
  return (
    <div className='rate-container'>
        <input type= {attributes.type} name={attributes.name} className={attributes.class}  disabled = {!isCustomizable} value={5} defaultChecked = {rating === 5}></input>
        <input type= {attributes.type} name={attributes.name} className={attributes.class}  disabled = {!isCustomizable} value={4} defaultChecked = {rating === 4}></input>
        <input type= {attributes.type} name={attributes.name} className={attributes.class}  disabled = {!isCustomizable} value={3} defaultChecked = {rating === 3}></input>
        <input type= {attributes.type} name={attributes.name} className={attributes.class}  disabled = {!isCustomizable} value={2} defaultChecked = {rating === 2}></input>
        <input type= {attributes.type} name={attributes.name} className={attributes.class}  disabled = {!isCustomizable} value={1} defaultChecked = {rating === 1}></input>
    </div>
  )
}

export default StarRate