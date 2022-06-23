import '../styles/home.css';
import Imagen from './ShoppingCart.png'
import Items from './ShoppingItems.png'

const Home = () => {
    return(
        <div className="home-page">
        {/*
            <div className='news'>
                <div className='news-title'>--Upcoming new items--</div>
                <div className='image-slider'></div>
            </div>
            */}
            <div className='about-section'>
                <div className='news-title'>HOME</div>
                <div className='text-image'>
                    <div className='text'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in ipsum non nisi vehicula tristique lacinia et libero. Sed vitae lorem eu orci ornare fermentum sed sit amet magna. Mauris sagittis augue vel pretium ullamcorper. In eget quam at ex condimentum tincidunt. Integer eget dictum leo.</p>
                    <p>Morbi et quam eget velit elementum cursus. In ornare nulla sem, id porttitor neque interdum eu. Donec vulputate, nulla at porta lobortis, ipsum quam facilisis odio, nec fringilla mi nisi ac mauris. Quisque et odio sit amet ligula fringilla imperdiet.</p>
                    </div>
                    <div className='image-home'>
                        <img src={Items} alt='H'></img>
                    </div>
                </div>

                <div className='text-image'>
                <div className='image-home'>
                        <img src={Imagen} alt='H'></img>
                    </div>
                    <div className='text'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in ipsum non nisi vehicula tristique lacinia et libero. Sed vitae lorem eu orci ornare fermentum sed sit amet magna. Mauris sagittis augue vel pretium ullamcorper. In eget quam at ex condimentum tincidunt. Integer eget dictum leo.</p>
                    <p>Morbi et quam eget velit elementum cursus. In ornare nulla sem, id porttitor neque interdum eu. Donec vulputate, nulla at porta lobortis, ipsum quam facilisis odio, nec fringilla mi nisi ac mauris. Quisque et odio sit amet ligula fringilla imperdiet.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;