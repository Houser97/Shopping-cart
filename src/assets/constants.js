import Apple from './images/Apple.jpg';
import Laptop from './images/Laptop.jpg';
import iPad from './images/iPad.jpg';
import PingPong from './images/PingPong.jpg';
import Shoes from './images/Shoes.jpg';
import Book from './images/Book.jpg';
import Watch from './images/Smartwatch.jpg';
import WaterMelon from './images/Watermelon.jpg';
import Donut from './images/Donut.jpg';
import Bread from './images/Bread.jpg';
import Guitar from './images/Guitar.jpg';
import Phone from './images/Phone.jpg';

import Controller from './Home/ControllerPlay.png';
import Cell from './Home/cell.png';
import Headphones from './Home/Headphones.png';
import LaptopPromotion from './Home/laptop.png'

export const productsData = [
    {image:Apple,   name: "Apple",   price: 10,  id: 0},
    {image:Laptop,  name: "Laptop",  price: 500, id: 1},
    {image:iPad,    name: "iPad",    price: 430, id: 2},
    {image:PingPong,   name: "Ping Pong equipment",    price: 220, id: 3},
    {image:Shoes,   name: "Shoes",   price: 100, id: 4},
    {image:Watch,   name: "Smart watch",    price: 240, id: 5},
    {image:Donut,   name: "Donut",   price: 3,   id: 6},
    {image:Guitar,  name: "Guitar",  price: 150, id: 7},
    {image:Bread,   name: "Bread",   price: 2,   id: 8},
    {image:WaterMelon,   name: "Watermelon",    price: 10, id: 9},
    {image:Book,    name: "Book",    price: 15,  id:10},
    {image:Phone,    name: "Phone",    price: 280,  id:11}
]

export const itemsPromotion = [
    {
        image: Controller,
        price: '$50',
        section: 'VR Video Games'
    },
    {
        image: Cell,
        price: '$250',
        section: 'Cellphones'
    },
    {
        image: Headphones,
        price: '$100',
        section: 'Headphones'
    },
    {
        image: LaptopPromotion,
        price: '$400',
        section: 'Laptops'
    },
]

export const svgIncentives = [
    {
        svg: <svg className='incentive-svg' viewBox="0 0 24 24">
                <path fill="currentColor" d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
             </svg>,
        card: 'cell',
        text1: 'Buy online from our app',
        text2: 'Get our app and discover'
    },
    {
        svg: <svg className='incentive-svg' viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.72,14.76C19.07,13.91 19.26,13 19.26,12C19.26,11.28 19.15,10.59 18.96,9.95C18.31,10.1 17.63,10.18 16.92,10.18C13.86,10.18 11.15,8.67 9.5,6.34C8.61,8.5 6.91,10.26 4.77,11.22C4.73,11.47 4.73,11.74 4.73,12A7.27,7.27 0 0,0 12,19.27C13.05,19.27 14.06,19.04 14.97,18.63C15.54,19.72 15.8,20.26 15.78,20.26C14.14,20.81 12.87,21.08 12,21.08C9.58,21.08 7.27,20.13 5.57,18.42C4.53,17.38 3.76,16.11 3.33,14.73H2V10.18H3.09C3.93,6.04 7.6,2.92 12,2.92C14.4,2.92 16.71,3.87 18.42,5.58C19.69,6.84 20.54,8.45 20.89,10.18H22V14.67H22V14.69L22,14.73H21.94L18.38,18L13.08,17.4V15.73H17.91L18.72,14.76M9.27,11.77C9.57,11.77 9.86,11.89 10.07,12.11C10.28,12.32 10.4,12.61 10.4,12.91C10.4,13.21 10.28,13.5 10.07,13.71C9.86,13.92 9.57,14.04 9.27,14.04C8.64,14.04 8.13,13.54 8.13,12.91C8.13,12.28 8.64,11.77 9.27,11.77M14.72,11.77C15.35,11.77 15.85,12.28 15.85,12.91C15.85,13.54 15.35,14.04 14.72,14.04C14.09,14.04 13.58,13.54 13.58,12.91A1.14,1.14 0 0,1 14.72,11.77Z" />
             </svg>,
        card: 'support',
        text1: 'Customer service 24 hours a day.',
        text2: 'Contact us to clarify your doubts'
    },
    {
        svg: <svg className='incentive-svg' viewBox="0 0 24 24">
                <path fill="currentColor" d="M.75 7.5H10.5L11.25 9H1.5L.75 7.5M1.75 10.5H11.5L12.25 12H2.5L1.75 10.5M18 18.5C18.83 18.5 19.5 17.83 19.5 17C19.5 16.17 18.83 15.5 18 15.5C17.17 15.5 16.5 16.17 16.5 17C16.5 17.83 17.17 18.5 18 18.5M19.5 9.5H17V12H21.46L19.5 9.5M8 18.5C8.83 18.5 9.5 17.83 9.5 17C9.5 16.17 8.83 15.5 8 15.5C7.17 15.5 6.5 16.17 6.5 17C6.5 17.83 7.17 18.5 8 18.5M20 8L23 12V17H21C21 18.66 19.66 20 18 20C16.34 20 15 18.66 15 17H11C11 18.66 9.65 20 8 20C6.34 20 5 18.66 5 17H3V13.5 13.5H5V15H5.76C6.31 14.39 7.11 14 8 14C8.89 14 9.69 14.39 10.24 15H15V6H3V6C3 4.89 3.89 4 5 4H17V8H20Z" />
            </svg>,
        card: 'truck',
        text1: 'Fast deliveries to all the country',
        text2: 'Delivery times less than 2 days'
    },
    {
        svg: <svg className='incentive-svg' viewBox="0 0 24 24">
                <path fill="currentColor" d="M13 19C13 18.66 13.04 18.33 13.09 18H3V12H19V13C19.7 13 20.37 13.13 21 13.35V6C21 4.89 20.11 4 19 4H3C1.89 4 1 4.89 1 6V18C1 19.1 1.89 20 3 20H13.09C13.04 19.67 13 19.34 13 19M3 6H19V8H3V6M17.75 22L15 19L16.16 17.84L17.75 19.43L21.34 15.84L22.5 17.25L17.75 22" />
        </svg>,
        text1: '100% secure purchases',
        text2: 'Earn points with your purchases'
    }
]