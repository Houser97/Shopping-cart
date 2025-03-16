import { images } from '@/assets/constants'
import './Rotate.css'

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
                <img src={images.rock} alt=""></img>
            </div>
        </div>

    )
}
