import '../styles/Home.css';
import About from './About';
import Incentives from './Incentives';
import Presentation from './Presentation';

const Home = () => {
    return(
        <div className="home-page">
            <Presentation />
            <Incentives />
            <About />
        </div>
    )
}

export default Home;