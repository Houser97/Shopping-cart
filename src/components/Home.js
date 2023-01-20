import '../styles/Home.css';
import CardItemPromotion from './CardItemPromotion';
import { itemsPromotion } from '../assets/constants'
import Banner from '../assets/Home/banner.jpg'

const Home = () => {
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
        </div>
    )
}

export default Home;