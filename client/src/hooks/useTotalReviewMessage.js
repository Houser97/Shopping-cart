import { useEffect, useState } from "react"

const useTotalReviewMessage = (reviewsCount) => {
    const [reviewTotalMessage, setReviewTotalMessage] = useState(0 + ' Reviews')
    useEffect(() => {
        if(!reviewsCount) return undefined
        const message = reviewsCount === 1 ? `${reviewsCount} Review` : `${reviewsCount} Reviews`
        setReviewTotalMessage(message)
    }, [reviewsCount])

    return reviewTotalMessage
}

export default useTotalReviewMessage