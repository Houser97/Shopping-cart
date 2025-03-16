'use client'

import { Dispatch, SetStateAction, useMemo } from 'react'
import './StarRate.css'

interface Props {
  product: string;
  isCustomizable: boolean,
  rating: number,
  setRating: Dispatch<SetStateAction<number>> | undefined
}

export const StarRate = ({ product, isCustomizable, rating, setRating }: Props) => {

  const formattedRating = useMemo(() => Math.floor(rating), [rating]);

  const attributes = {
    type: 'radio',
    class: isCustomizable ? 'customizable' : '',
    name: isCustomizable ? 'rating' : product,
  }

  const updateRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCustomizable && setRating) {
      setRating(parseInt(e.target.value))
    }
  }

  return (
    <div className='rate-container'>
      <input type={attributes.type} className={attributes.class} name={attributes.name} disabled={!isCustomizable} value={5} checked={formattedRating === 5} onChange={(e) => updateRating(e)}></input>
      <input type={attributes.type} className={attributes.class} name={attributes.name} disabled={!isCustomizable} value={4} checked={formattedRating === 4} onChange={(e) => updateRating(e)}></input>
      <input type={attributes.type} className={attributes.class} name={attributes.name} disabled={!isCustomizable} value={3} checked={formattedRating === 3} onChange={(e) => updateRating(e)}></input>
      <input type={attributes.type} className={attributes.class} name={attributes.name} disabled={!isCustomizable} value={2} checked={formattedRating === 2} onChange={(e) => updateRating(e)}></input>
      <input type={attributes.type} className={attributes.class} name={attributes.name} disabled={!isCustomizable} value={1} checked={formattedRating === 1} onChange={(e) => updateRating(e)} required></input>
    </div>
  )
}
