import React from 'react'
import '../styles/StarRate.css'

const StarRate = ({product, isCustomizable, rating = 0, setRating}) => {
    const attributes = {
      type: isCustomizable ? 'radio' : 'checkbox',
      class: isCustomizable ? 'customizable' : '',
      name: isCustomizable ? 'rating' : product,
    }
  return (
    <div className='rate-container'>
        <input type= {attributes.type} name={attributes.name} className={attributes.class}  disabled = {!isCustomizable} value={5} defaultChecked = {rating === 5} onClick={isCustomizable ? (e) => setRating(e.target.value) : undefined}></input>
        <input type= {attributes.type} name={attributes.name} className={attributes.class}  disabled = {!isCustomizable} value={4} defaultChecked = {rating === 4} onClick={isCustomizable ? (e) => setRating(e.target.value) : undefined}></input>
        <input type= {attributes.type} name={attributes.name} className={attributes.class}  disabled = {!isCustomizable} value={3} defaultChecked = {rating === 3} onClick={isCustomizable ? (e) => setRating(e.target.value) : undefined}></input>
        <input type= {attributes.type} name={attributes.name} className={attributes.class}  disabled = {!isCustomizable} value={2} defaultChecked = {rating === 2} onClick={isCustomizable ? (e) => setRating(e.target.value) : undefined}></input>
        <input type= {attributes.type} name={attributes.name} className={attributes.class}  disabled = {!isCustomizable} value={1} defaultChecked = {rating === 1} onClick={isCustomizable ? (e) => setRating(e.target.value) : undefined} required></input>
    </div>
  )
}

export default StarRate