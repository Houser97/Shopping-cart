import React from 'react'
import '../styles/StarRate.css'

const StarRate = ({product}) => {
  return (
    <div className='rate-container'>
        <input type="radio" name={product}></input>
        <input type="radio" name={product}></input>
        <input type="radio" name={product}></input>
        <input type="radio" name={product}></input>
        <input type="radio" name={product}></input>
    </div>
  )
}

export default StarRate