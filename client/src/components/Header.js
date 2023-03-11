import { useContext, useState } from 'react';
import { CartContext } from '../App';
import AuthButtons from './AuthButtons';
import Cart from './Cart';
import CartIcon from './CartIcon';
import Navbar from './Navbar';
import ToggleBtn from './ToggleBtn';

const Header = () => {
    
    const user = useContext(CartContext).user;

    const [toggleNavbar, setToggleNavbar] = useState(false);
    const [toggleCart, setToggleCart] = useState(false);

    return(
        <header className='flex flex-row justify-between items-center 
        text-5xl fixed w-full z-10 h-[80px] font-bold bg-[var(--header-color)] px-8 text-white sm:px-10'>
            <ToggleBtn toggle={toggleNavbar} setToggle = {setToggleNavbar}/>
            <Navbar toggle = {toggleNavbar} setToggleNavbar = {setToggleNavbar} />
            <h1 className="text-2xl mx-2 xs:text-4xl sm:text-5xl">Shopping Cart</h1>
            {user ? 
                <CartIcon setToggleCart = {setToggleCart} toggle = {toggleCart}/>
                :
                <div className='hidden w-[24px] y-[24px] 2sm:flex md:w-max md:h-max'>
                    <div className='hidden md:flex'>
                        <AuthButtons />
                    </div>
                </div>
            }
            <Cart toggleCart={toggleCart} />
        </header>
    )
}

export default Header;