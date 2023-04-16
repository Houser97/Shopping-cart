import '../styles/Navbar.css';
import {Link} from 'react-router-dom';
import AuthButtons from './AuthButtons';
import LogoutBtn from './LogoutBtn';
import { useSelector } from 'react-redux';
import { userSelector } from '../slices/user';

const Navbar = ({toggle, setToggleNavbar}) => {

    const { user } = useSelector(userSelector);

    return(
        <nav className={`flex flex-col justify-center items-center absolute left-0 top-full bg-[var(--header-color)] 
        z-20 px-10 py-12 transition-transform duration-300 h-max w-[14rem] rounded-br-2xl gap-12
        ${toggle ? 'translate-x-0':'-translate-x-full'} `}>

                <Link className='flex flex-col justify-evenly 
                items-start text-white h-full font-bold text-2xl' to = "/" onClick={() => setToggleNavbar(false)}>
                    <div className='flex flex-row justify-center items-center gap-1 cursor-pointer'>
                        <svg className='w-7 h-7' viewBox="0 0 24 24">
                            <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                        </svg>
                        <div className='home-text text'>Home</div>
                    </div>
                </Link>

                <Link  className='flex flex-col justify-evenly 
                items-start text-white h-full font-bold text-2xl' to = "/shop" onClick={() => setToggleNavbar(false)}>
                    <div className='flex flex-row justify-center items-center gap-1 cursor-pointer'>
                        <svg className='w-7 h-7' viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9,20A2,2 0 0,1 7,22A2,2 0 0,1 5,20A2,2 0 0,1 7,18A2,2 0 0,1 9,20M17,18A2,2 0 0,0 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20A2,2 0 0,0 17,18M7.2,14.63C7.19,14.67 7.19,14.71 7.2,14.75A0.25,0.25 0 0,0 7.45,15H19V17H7A2,2 0 0,1 5,15C5,14.65 5.07,14.31 5.24,14L6.6,11.59L3,4H1V2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,12C16.94,12.62 16.27,13 15.55,13H8.1L7.2,14.63M9,9.5H13V11.5L16,8.5L13,5.5V7.5H9V9.5Z" />
                        </svg>
                        <div className='shop-text text'>Shop</div>
                    </div>
                </Link>
                {user ?  
                    <LogoutBtn /> 
                        :
                    <div className='flex flex-col w-full items-center md:hidden'>
                        <AuthButtons setToggleNavbar = {setToggleNavbar} />
                    </div>
                }
        </nav>
    )
}

export default Navbar;