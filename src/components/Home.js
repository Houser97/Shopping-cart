import '../styles/Home.css';
import CardItemPromotion from './CardItemPromotion';
import { itemsPromotion } from '../assets/constants'
import Banner from '../assets/Home/banner.jpg'
import CardIncentive from './CardIncentive';
import BannerVertical from '../assets/Home/bannerVertical2.jpg'

const Home = () => {
    return(
        <div className="home-page">
            <section className='presentation'>
                <picture className='home-main-img'>
                    <source 
                        srcSet={Banner}
                        media="(min-width: 600px)"
                    />
                    <img 
                        src={BannerVertical}
                        alt="Banner"
                    ></img>
                </picture>
                <div className='promotions-grid'>
                    {
                        itemsPromotion.map((item, index) => {
                            return(
                                <CardItemPromotion 
                                key={`promotion-${index}`} 
                                {...item} />
                            )
                        })
                    }
                </div>
            </section>
            <CardIncentive />
        </div>
    )
}

export default Home;