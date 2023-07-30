import '../styles/Home.css';
import Testimonials from './Testimonials';
import Incentives from './Incentives';
import Presentation from './Presentation';

const Home = () => {
    return(
        <div className='flex flex-row w-full'>
            <div className="home-page">
                <Presentation />
                <Incentives />
                <Testimonials />
            </div>
        </div>
    )
}

export default Home;