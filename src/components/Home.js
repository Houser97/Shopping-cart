import '../styles/Home.css';
import main from '../assets/Home/main.jpg'

const Home = () => {
    return(
        <div className="home-page">
            <img className='home-main-img' src={main}></img>
        </div>
    )
}

export default Home;