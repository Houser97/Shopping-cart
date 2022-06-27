import '../styles/header.css';

const Header = (props) => {
    const {numberItemsInCar} = props;

    const hideNavbar = () => {
        const navbar = document.querySelector(".navbar");
        navbar.style.width = "14rem";
        const menuSVG = document.querySelector(".display-navbar")
        menuSVG.style.display = "none";
        const xSVG = document.querySelector(".hide-navbar");
        xSVG.style.display = "flex";
        const navbarOptions = document.querySelector(".navbar-options");
        navbarOptions.style.display = "flex";
    }

    const showNavbar = () => {
        const navbar = document.querySelector(".navbar");
        navbar.style.width = "0px";
        const menuSVG = document.querySelector(".display-navbar")
        menuSVG.style.display = "flex";
        const xSVG = document.querySelector(".hide-navbar");
        xSVG.style.display = "none";
        const navbarOptions = document.querySelector(".navbar-options");
        navbarOptions.style.display = "none";
    }

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
            <div className="display-navbar button-navbar" onClick={hideNavbar}>
                <svg className='menu-svg' viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                </svg>
            </div>
            <div className="hide-navbar button-navbar" onClick={showNavbar}>
                <svg className='close-svg' viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </div>
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