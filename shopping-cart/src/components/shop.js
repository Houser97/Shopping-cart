import '../styles/shop.css';
import { useState } from 'react';
import Card from './card';
import Apple from '../images/Apple.jpg';
import Laptop from '../images/Laptop.jpg';
import iPad from '../images/iPad.jpg';
import PingPong from '../images/PingPong.jpg';
import Shoes from '../images/Shoes.jpg';
import Book from '../images/Book.jpg';
import Watch from '../images/Smartwatch.jpg';
import WaterMelon from '../images/Watermelon.jpg';
import Donut from '../images/Donut.jpg';
import Bread from '../images/Bread.jpg';
import Guitar from '../images/Guitar.jpg';
import Phone from '../images/Phone.jpg';

const Shop = () => {

    const [imagesArray, setImagesArray] = useState([{image:Apple,   name: "Apple",   price: 10,  id: 0},
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
                                                    {image:Phone,    name: "Phone",    price: 280,  id:11}])
    return(
        <div className="shop-page">
            {           
                imagesArray.map(
                    function iterateImages(image, iterator){
                        return(
                            <Card key = {iterator} image = {image.image} imageName = {image.name} price = {image.price} />
                        )
                    }) 
            } 
        </div>       
    )
        
}

export default Shop;