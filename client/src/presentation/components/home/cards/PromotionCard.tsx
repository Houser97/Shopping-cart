
export const PromotionCard = ({ section, image, price }) => {
  return (
    <div className='flex flex-row h-full w-full justify-between items-center p-0 bg-[#fcc902] pb-[30px] text-center xs480:flex-col xs:p-[20px_20px]'>
      <div className='promotion_data'>
        <div className='text-[20px] font-extrabold md750:text-[24px]'>{section}</div>
        <div className='text-[16px] md750:text-[20px] xs480:text-[18px]'>Offer available only this week</div>
        <div className='font-bold'>Only {price}</div>
      </div>
      <img className='w-[140px] h-auto transition-transform duration-[250ms] ease-in-out hover:scale-110 xs:w-[200px]' alt='item_promotion' src={image}></img>
    </div>
  )
}
