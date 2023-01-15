import { useRef, useState } from 'react';
import '../styles/header.css';
import Navbar from './Navbar';
import ToggleBtn from './ToggleBtn';

const Header = (props) => {
    const {numberItemsInCar} = props;

    const [toggleNavbar, setToggleNavbar] = useState(false);

    const toggleCart = () => {
        const cartSection = document.querySelector(".cart");
        const widthCart = cartSection.style.width;
        const cartContent = document.querySelector(".cart-content");
        const SVG = document.querySelector(".cart-svg");
        console.log(widthCart);
        if(widthCart !== "0px") {
            cartSection.style.width = "0px";
            cartContent.style.display = "none";
            cartSection.style.padding = "0px";
            SVG.style.color = "white";
        } else if (widthCart === "0px"){
            cartSection.style.width = "300px";
            cartContent.style.display = "flex";
            cartSection.style.padding = "30px 10px";
            SVG.style.color = "rgb(255,255,0)";
        };
    }

    return(
        <header>
            <ToggleBtn toggle={toggleNavbar} setToggle = {setToggleNavbar}/>
            <Navbar toggle = {toggleNavbar} />
            <div className="title-project">Shopping Cart</div>
            <div className='cart-icon-header-number' onClick={toggleCart}>
                    <div className='number-cart-header'>{numberItemsInCar}</div>
                    <div className="cart-icon-header">
                        <svg className='cart-svg' viewBox="0 0 24 24">
                            <path fill="currentColor" d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                        </svg>
                    </div>
            </div>
        </header>
    )
}

export default Header;