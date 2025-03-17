import { images } from '@/assets/constants'
import './Rotate.css'
import Image from 'next/image'

export const Rotate = () => {
    return (
        <div className="banner">
            <div className="product">
                <div
                    className="soda"
                    style={{ "--url": `url(${images.sodaLabel})` } as React.CSSProperties}
                ></div>
            </div>
            <div className="rock">
                <Image 
                    src={images.rock} 
                    alt=""
                    width={500}
                    height={500}
                >
                </Image>
            </div>
        </div>

    )
}
