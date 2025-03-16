'use client'

import { useEffect, useState } from 'react';
import AuthButtons from './buttons/AuthButtons';
//import Cart from './Cart';
import CartIcon from './ui/CartIcon';
//import Navbar from './Navbar';
import { ToggleButton } from './buttons/ToggleButton';
import Navbar from './Navbar';
//import { useAuthStore } from '../../hooks/useAuthStore';

const Header = () => {

    //const { status } = useAuthStore();
    let status = "unauthenticated";
    const [atTop, setAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (document.documentElement.scrollTop === 0) {
                setAtTop(true);
            } else {
                setAtTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [toggleNavbar, setToggleNavbar] = useState(false);
    const [toggleCart, setToggleCart] = useState(false);

    return (
        <header className={`flex flex-row justify-between items-center
        text-5xl fixed w-full z-20 h-[80px] font-bold px-8 transition-all 
        text-black ${atTop ? 'bg-transparent' : 'bg-[white]/20 backdrop-blur-sm'} sm:px-10`}>
            <div className='flex flex-row items-center gap-5'>
                <ToggleButton toggle={toggleNavbar} setToggle={setToggleNavbar} />
                <h1 className="text-2xl font-light">Shopping Cart</h1>
            </div>
            {status === 'authenticated' ?
                <CartIcon setToggleCart={setToggleCart} toggle={toggleCart} />
                :
                <div className='hidden w-[24px] y-[24px] 2sm:flex md:w-max md:h-max'>
                    <div className='hidden md:flex'>
                        <AuthButtons setToggleNavbar={setToggleNavbar} />
                    </div>
                </div>
            }
            <Navbar toggle={toggleNavbar} setToggleNavbar={setToggleNavbar} />
            {/* <Cart toggleCart={toggleCart} /> */}
        </header>
    )
}

export default Header;