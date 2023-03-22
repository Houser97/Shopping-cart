import '../styles/Home.css';
import Testimonials from './Testimonials';
import Incentives from './Incentives';
import Presentation from './Presentation';
import { useContext } from 'react';
import { CartContext } from '../App';
import Loading from './Loading';

const Home = () => {
    const isLoading = useContext(CartContext).isLoading
    return(
        <div className='flex flex-row w-full'>
            {
                isLoading ? 
                <Loading />
                :
                <div className="home-page">
                    <Presentation />
                    <Incentives />
                    <Testimonials />
                </div>
            }
        </div>
    )
}

export default Home;