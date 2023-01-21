import '../styles/Home.css';
import CardItemPromotion from './CardItemPromotion';
import { itemsPromotion } from '../assets/constants'
import Banner from '../assets/Home/banner.jpg'
import CardIncentive from './CardIncentive';
import useWindowSize from '../hooks/windowSizeHook';
import { useEffect, useState } from 'react';

const Home = () => {
    const windowSize = useWindowSize();
    const [isMobile, setIsMobile] = useState(windowSize.width < 500);

    useEffect(() => {
        setIsMobile(windowSize.width < 500)
    }, [windowSize])

    return(
        <div className="home-page">
            <section className='presentation'>
                <img className='home-main-img' src={Banner} alt='Banner'></img>
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