import React, { useEffect, useState } from 'react'
import useWindowSize from '../hooks/windowSizeHook'
import '../styles/Credits.css'

const Credits = () => {

    const windowSize = useWindowSize()

    const credits = {
        horizontalBanner: {
            link: 'https://www.freepik.com/free-psd/furniture-facebook-cover-web-banner-template_16080190.htm#query=shop%20banner&position=3&from_view=search&track=sph',
            name: ' oxurra',
        },
        verticalBanner: {
            link: 'https://www.freepik.com/free-psd/black-friday-special-offer-facebook-cover-banner-template_10865820.htm#query=shop%20banner&position=6&from_view=search&track=sph',
            name: ' graphicforest',
        },
    }

    const [isMobile, setIsMobile] = useState(windowSize.width <= 600);
    const [creditsImg, setCreditsImg] = useState(isMobile ? credits.verticalBanner : credits.horizontalBanner);

    useEffect(() => {
        setIsMobile(windowSize.width <= 600)
    }, [windowSize])

    useEffect(() => {
        setCreditsImg(() => isMobile ? credits.verticalBanner : credits.horizontalBanner)
    }, [isMobile])

  return (
    <div className='img-credits'>
        Image by:
        <a href={creditsImg.link}>{creditsImg.name}</a>
    </div>
  )
}

export default Credits