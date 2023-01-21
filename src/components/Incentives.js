import React from 'react'
import { svgIncentives } from '../assets/constants'
import CardIncentive from './CardIncentive'
import '../styles/Incentives.css'

const Incentives = () => {
  return (
    <section className='incentives'>
        {svgIncentives.map((incentive, index) => {
            return(
                <CardIncentive 
                    key={`card-incentive-${index}`}
                    {...incentive}
                />
            )
        })}
    </section>
  )
}

export default Incentives