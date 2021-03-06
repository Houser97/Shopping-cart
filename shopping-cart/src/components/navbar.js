import '../styles/navbar.css';
import {Link} from 'react-router-dom';

const Navbar = () => {

    return(
        <div className='navbar'>
            <div className='navbar-options'>
                <Link className='link' to = "/">
                    <div className='home option'>
                        <div className='svg-home'>
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                            </svg>
                        </div>
                    <div className='home-text text'> Home</div>
                    </div>
                </Link>
                <Link  className='link' to = "/shop">
                    <div data-testid="test-shop-link" className='shop option'>
                        <div className='svg-shop'>
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M9,20A2,2 0 0,1 7,22A2,2 0 0,1 5,20A2,2 0 0,1 7,18A2,2 0 0,1 9,20M17,18A2,2 0 0,0 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20A2,2 0 0,0 17,18M7.2,14.63C7.19,14.67 7.19,14.71 7.2,14.75A0.25,0.25 0 0,0 7.45,15H19V17H7A2,2 0 0,1 5,15C5,14.65 5.07,14.31 5.24,14L6.6,11.59L3,4H1V2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,12C16.94,12.62 16.27,13 15.55,13H8.1L7.2,14.63M9,9.5H13V11.5L16,8.5L13,5.5V7.5H9V9.5Z" />
                            </svg>
                        </div>
                        <div className='shop-text text'>Shop</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;