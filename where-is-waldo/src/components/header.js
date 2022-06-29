import '../styles/header.css';
import logo from '../images/Adventure-time-logo.png';

const Navbar = () => {
    return(
        <header>Where is...? 
            <img src={logo} alt = "logo" className='logo'></img>
        </header>
    )
}

export default Navbar;