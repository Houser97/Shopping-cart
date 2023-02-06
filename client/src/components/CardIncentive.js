import React from 'react'

const CardIncentive = ({svg, text1, text2}) => {
  return (
    <div className='flex flex-col justify-center items-center group/card w-full h-full
    font-bold text-xl p-2 bg-[var(--blue-color)] text-white text-center'>
        <div className='text-2xl mb-2 md:text-3xl'>{text1}</div>
        <div className='text-[17px] font-light md:text-[22px]'>{text2}</div>
        <div className='group-hover/card:animate-[svgAnimation_700ms_ease-in-out_1]'>{svg}</div>
    </div>
  )
}

export default CardIncentive