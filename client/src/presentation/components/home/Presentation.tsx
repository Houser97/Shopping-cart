import { images, itemsPromotion } from '../../../assets/constants'
import { PromotionCard } from './cards';
import { Credits } from './ui/Credits';

export const Presentation = () => {
    return (
        <section className='bg-[#091F44] p-[30px_20px] mt-[var(--header-height)] md900:p-[30px_60px]'>
            <div className='flex flex-col bg-white p-[10px]'>
                <picture className='w-full h-auto self-center relative'>
                    <source
                        srcSet={images.hero}
                        media="(min-width: 600px)"
                    />
                    <img
                        src={images.heroSm}
                        alt="Banner"
                        className='w-full h-auto'
                    ></img>
                    <Credits />
                </picture>
                <div className='grid w-full 
                grid-cols-[repeat(auto-fit,minmax(200px,1fr))] 
                grid-rows-[repeat(auto-fit,minmax(180px,1fr))] 
                auto-rows-[minmax(180px,1fr)] 
                gap-2.5 justify-between mt-2.5'>
                    {
                        itemsPromotion.map((item, index) => {
                            return (
                                <PromotionCard
                                    key={`promotion-${index}`}
                                    {...item} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
