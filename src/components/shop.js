import '../styles/shop.css';
import Card from './card';
import { productsData } from '../assets/constants';

const Shop = () => {
    return(
    <div className='shop-page'>
        <div className='shop-title'>Shop</div>
        <div className="shop-page">
            {           
                productsData.map(
                    function iterateImages(product, iterator){
                        return(
                            <Card key = {iterator} {...product} />
                        )
                    }) 
            } 
        </div>  
    </div>     
    )
        
}

export default Shop;