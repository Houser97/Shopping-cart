import { svgIncentives } from '../../../assets/constants';
import { IncentiveCard } from './cards';

export const Incentives = () => {
  return (
    <section className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] 
    grid-rows-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[minmax(250px,1fr)] justify-center
    w-full gap-12 py-12 px-6 h-full bg-white md:px-24 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] 
    lg:grid-cols-[repeat(auto-fit,minmax(380px,1fr))]
    items-center xl:grid-cols-[repeat(2,minmax(300px,0.5fr))] xl:auto-rows-[minmax(400px,1fr)] xl:gap-16 xl:py-20'>
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