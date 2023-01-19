import '../styles/Home.css';
import CardItemPromotion from './CardItemPromotion';

const Home = () => {
    return(
        <div className="home-page">
            <section className='presentation'>
                <img className='home-main-img' ></img>
                <CardItemPromotion />
            </section>
        </div>
    )
}

export default Home;