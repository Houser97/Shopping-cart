import { useEffect, useState } from 'react'

const useRatingAverage = (API, productId) => {
    const [rating, setRating] = useState(0)
    useEffect(() => {
        fetch(`${API}/${productId}/get_reviews`)
        .then(data => data.json())
        .then(data => {
            if(data.length > 0){
                setRating(Math.round(data.reduce((acc,current) => acc + current.rating, 0)/data.length))
            }
        })
    }, []) 
    return rating
}

export default useRatingAverage