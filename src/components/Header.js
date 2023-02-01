import { useState } from 'react';
import Cart from './Cart';
import CartIcon from './CartIcon';
import Navbar from './Navbar';
import ToggleBtn from './ToggleBtn';

const Header = () => {

    const [toggleNavbar, setToggleNavbar] = useState(false);
    const [toggleCart, setToggleCart] = useState(false);

    return(
        <header className='flex flex-row justify-between items-center 
        text-5xl fixed w-full z-10 h-[80px] font-bold bg-header px-8 text-white
        sm:px-10'>
            <ToggleBtn toggle={toggleNavbar} setToggle = {setToggleNavbar}/>
            <Navbar toggle = {toggleNavbar} />
            <h1 className="text-3xl mx-3 sm:text-5xl">Shopping Cart</h1>
            <CartIcon setToggleCart = {setToggleCart} toggle = {toggleCart}/>
            <Cart toggleCart={toggleCart} />
        </header>
    )
}

export default Header;