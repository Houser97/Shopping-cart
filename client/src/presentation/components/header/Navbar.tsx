import { Link } from 'react-router-dom';
import AuthButtons from './buttons/AuthButtons';
import { LogoutButton } from './buttons/LogoutButton';
import { useTypedSelector } from '../../store/config/typed-selector';

const Navbar = ({ toggle, setToggleNavbar }) => {

    const { status } = useTypedSelector(state => state.auth);

    return (
        <div className={`flex cart-container absolute opacity-10 top-0 right-0 h-screen w-full z-0 bg-black/80 ${toggle && 'show-cart-container'}`}>
            <nav className={`flex flex-col justify-start items-start absolute left-0 top-0 bg-[var(--white-color)] text-black
            z-20 px-10 py-24 transition-transform duration-300 h-full w-60 gap-5
            ${toggle ? 'translate-x-0' : '-translate-x-full'} `}>

                <Link className='flex flex-col justify-evenly 
                    items-start font-light text-2xl' to="/" onClick={() => setToggleNavbar(false)}>
                    <div className='flex flex-row justify-center items-center gap-1 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                        <div className='home-text text'>Home</div>
                    </div>
                </Link>

                <Link className='flex flex-col justify-evenly 
                    items-start font-light text-2xl' to="/shop" onClick={() => setToggleNavbar(false)}>
                    <div className='flex flex-row justify-center items-center gap-1 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                        <div className='shop-text text'>Shop</div>
                    </div>
                </Link>
                {status === 'authenticated' ?
                    <LogoutButton />
                    :
                    <div className='flex flex-col w-full items-center md:hidden'>
                        <AuthButtons setToggleNavbar={setToggleNavbar} />
                    </div>
                }
            </nav>
        </div>
    )
}

export default Navbar;