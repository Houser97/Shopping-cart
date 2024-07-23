import { svgIncentives } from '../../../assets/constants';
import { IncentiveCard } from './cards';

export const Incentives = () => {
  return (
    <section className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] 
    grid-rows-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[minmax(250px,1fr)] 
    w-full gap-10 py-10 px-6 bg-white md:px-24 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] 
    lg:grid-cols-[repeat(auto-fit,minmax(380px,1fr))]
    items-center'>
      {svgIncentives.map((incentive, index) => {
        return (
          <IncentiveCard
            key={`card-incentive-${index}`}
            {...incentive}
          />
        )
      })}
    </section>
  )
}