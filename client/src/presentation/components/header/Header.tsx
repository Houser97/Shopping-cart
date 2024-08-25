import { useState } from 'react';
import AuthButtons from './buttons/AuthButtons';
import Cart from './Cart';
import CartIcon from './ui/CartIcon';
import Navbar from './Navbar';
import { ToggleButton } from './buttons/ToggleButton';
import { useAuthStore } from '../../hooks/useAuthStore';

const Header = () => {

    const { status } = useAuthStore();

    const [toggleNavbar, setToggleNavbar] = useState(false);
    const [toggleCart, setToggleCart] = useState(false);

    return (
        <header className='flex flex-row justify-between items-center
        text-5xl fixed w-full z-10 h-[80px] font-bold bg-[var(--header-color)] px-8 text-white sm:px-10'>
            <ToggleButton toggle={toggleNavbar} setToggle={setToggleNavbar} />
            <Navbar toggle={toggleNavbar} setToggleNavbar={setToggleNavbar} />
            <h1 className="text-2xl mx-2 xs:text-4xl sm:text-5xl">Shopping Cart</h1>
            {status === 'authenticated' ?
                <CartIcon setToggleCart={setToggleCart} toggle={toggleCart} />
                :
                <div className='hidden w-[24px] y-[24px] 2sm:flex md:w-max md:h-max'>
                    <div className='hidden md:flex'>
                        <AuthButtons setToggleNavbar={setToggleNavbar} />
                    </div>
                </div>
            }
            <Cart toggleCart={toggleCart} />
        </header>
    )
}

export default Header;