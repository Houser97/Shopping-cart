import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useTotalReviewMessage from '../hooks/useTotalReviewMessage'
import { productsSelector } from '../slices/products'
import '../styles/ProductData.css'
import Loading from './Loading'
import ProductBtns from './ProductBtns'
import ReviewCard from './ReviewCard'
import StarRate from './StarRate'

const ProductData = () => {

    const { products } = useSelector(productsSelector);

    const [product, setProduct] = useState(null);
    const [isLoadingProductData, setIsLoadingProductData] = useState(true);
    const [localReviews, setLocalReviews] = useState([])
    const {id} = useParams();

    const totalReviewsMessage = useTotalReviewMessage(product ? product.reviewsCount : undefined)

    useEffect(() => {
      if(!products.length) return undefined
      const currentProduct = products.filter(product => product.id === parseInt(id))[0]
      setProduct(currentProduct)  
      setLocalReviews(currentProduct.reviews)  
    }, [products])

    useEffect(() => {
      if(product){
        setTimeout(() => {
          setIsLoadingProductData(false)
        }, 600);
      }
    }, [product])

  return (
    <div className='flex w-full'>
      {
        isLoadingProductData ? 
        <Loading /> 
        :
            <div className='flex justify-center items-center bg-[var(--blue-color)] w-full py-28 px-2 sm:px-8 md:px-14'>
              <div className='flex flex-col bg-white rounded-lg w-full p-2 sm:p-6'>
                <div className='grid auto-rows-auto grid-cols-1 2sm:grid-cols-[minmax(200px,max-content),minmax(250px,1fr)] gap-3 mb-14'>
                  <img className='max-w-[300px] w-full justify-self-center self-center' src={product ? product.image : ''}></img>
                  <div className='flex flex-col w-full h-full justify-evenly items-center p-1 md:p-10'>
                    <h1 className='w-full text-center text-4xl md:text-5xl'>{product ? product.name : ''}</h1>
                    <div className='flex w-full px-1 justify-evenly text-3xl sm:px-4 sm:text-4xl my-5'>
                      <StarRate product={product ? product.name : ''} rating = {product ? product.rating : 0} />
                    </div>
                    <ProductBtns productId={parseInt(id)} />
                  </div>
                </div>
                <div className='w-full font-bold text-4xl text-center'>Reviews</div>
                <div className='flex flex-col justify-evenly w-full bg-slate-200 rounded-lg p-2 sm:p-5'>
                  <div className={`font-bold text-2xl ${localReviews.length > 0 ? 'flex':'hidden'}`}>{totalReviewsMessage}</div>
                  { localReviews.length > 0 ?
                  localReviews.map((review,index) => {
                    return(
                      <ReviewCard 
                      key={`review-card-${index}`} 
                      {...review} 
                      productId = {id}
                      />
                    )
                  })
                  :
                  <div className='text-2xl text-black w-full text-center font-bold py-12 2sm:text-4xl'>This product has no reviews.</div>
                }
                </div>
              </div>
            </div>
      }
    </div>
  )
}

export default ProductData