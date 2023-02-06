import React from 'react'
import '../styles/StarRate.css'

const StarRate = ({product, isCustomizable}) => {
    const attributes = {
      type: isCustomizable ? 'radio' : 'checkbox',
      class: isCustomizable ? 'customizable' : '',
    }
  return (
    <div className='rate-container'>
        <input type= {attributes.type} name={product} className={attributes.class}  disabled = {!isCustomizable}></input>
        <input type= {attributes.type} name={product} className={attributes.class}  disabled = {!isCustomizable} defaultChecked></input>
        <input type= {attributes.type} name={product} className={attributes.class}  disabled = {!isCustomizable}></input>
        <input type= {attributes.type} name={product} className={attributes.class}  disabled = {!isCustomizable}></input>
        <input type= {attributes.type} name={product} className={attributes.class}  disabled = {!isCustomizable}></input>
    </div>
  )
}

export default StarRate