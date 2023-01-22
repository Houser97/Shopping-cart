import '../styles/Home.css';
import Testimonials from './Testimonials';
import Incentives from './Incentives';
import Presentation from './Presentation';

const Home = () => {
    return(
        <div className="home-page">
            <Presentation />
            <Incentives />
            <Testimonials />
        </div>
    )
}

export default Home;