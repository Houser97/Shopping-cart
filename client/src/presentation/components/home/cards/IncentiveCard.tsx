
export const IncentiveCard = ({ svg, text1, text2 }) => {
  return (
    <div className='flex flex-col justify-center items-center group/card w-full h-full rounded-2xl relative overflow-hidden
    font-bold text-xl p-2 bg-[var(--blue-color)] text-white text-center'>
      <div className='text-2xl mb-2 md:text-3xl z-10'>{text1}</div>
      <div className='text-[17px] font-light md:text-[22px] z-10'>{text2}</div>
      <div className='group-hover/card:animate-[svgAnimation_700ms_ease-in-out_1] z-10'>{svg}</div>
    </div>
  )
}
