import { useRef, useState } from 'react';
import '../styles/Header.css';
import Cart from './Cart';
import CartIcon from './CartIcon';
import Navbar from './Navbar';
import ToggleBtn from './ToggleBtn';

const Header = (props) => {
    const {numberItemsInCar} = props;

    const [toggleNavbar, setToggleNavbar] = useState(false);
    const [toggleCart, setToggleCart] = useState(false);

    return(
        <header>
            <ToggleBtn toggle={toggleNavbar} setToggle = {setToggleNavbar}/>
            <Navbar toggle = {toggleNavbar} />
            <h1 className="title-project">Shopping Cart</h1>
            <CartIcon numberItemsInCar={numberItemsInCar} setToggleCart = {setToggleCart}/>
            <Cart toggleCart={toggleCart} />
        </header>
    )
}

export default Header;