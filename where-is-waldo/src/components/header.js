import '../styles/header.css';
import logo from '../images/Adventure-time-logo.png';
import Timer from './timer';

const Navbar = () => {
    return(
        <header>Where is...? 
            <img src={logo} alt = "logo" className='logo'></img>
            
        </header>
    )
}

export default Navbar;