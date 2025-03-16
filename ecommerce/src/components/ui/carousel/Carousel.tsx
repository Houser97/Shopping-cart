'use client'

import { useEffect, useRef, useState } from 'react';
import { CarouselItem } from './CarouselItem';
import './Carousel.css';
import { images } from '@/assets/constants';

const animationDuration = 1100;


const { RayBan, dualsense, airpods, tennis, iPhone } = images;

const CarouselData = [
    { image: tennis, product: 'Tennis' },
    { image: iPhone, product: 'iPhone' },
    { image: dualsense, product: 'PS5 Dualsense' },
    { image: RayBan, product: 'Ray-Ban' },
    { image: airpods, product: 'AirPods' }
]

export const Carousel = () => {
    const [images, setImages] = useState(CarouselData);
    const [showDetail, setShowDetail] = useState(false);
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
    const [initialRender, setinitialRender] = useState(true);

    useEffect(() => {
        setinitialRender(false)
    }, [])

    const [direction, setDirection] = useState<string | null>(null);
    const listRef = useRef(null);

    const showSlider = (newDirection: 'next' | 'prev') => {
        setDirection(newDirection);
        setIsButtonsDisabled(true);

        setImages((prevImages) => {
            if (newDirection === 'next') {
                return [...prevImages.slice(1), prevImages[0]];
            } else {
                return [prevImages[prevImages.length - 1], ...prevImages.slice(0, -1)];
            }
        });


        setTimeout(() => {
            setDirection(null);
            setIsButtonsDisabled(false);
        }, animationDuration);
    };

    const handleNext = () => showSlider('next');
    const handlePrev = () => showSlider('prev');
    const handleSeeMore = () => setShowDetail(true);
    const handleBack = () => setShowDetail(false);

    return (
        <div className={`carousel ${showDetail ? 'showDetail' : ''} ${direction}`}>
            <div className="list" ref={listRef}>
                {images.map(({ image, product }) => (
                    <CarouselItem image={image} product={product} key={product} onSeeMore={handleSeeMore} isInitialRender={initialRender} />
                ))}
            </div>
            <div className="arrows">
                <button id="prev" onClick={handlePrev} disabled={isButtonsDisabled}>-</button>
                <button id="next" onClick={handleNext} disabled={isButtonsDisabled}>+</button>
                <button id="back" className={`${showDetail ? 'opacity-1' : 'opacity-0'}`} onClick={handleBack}>SEE All</button>
            </div>
        </div>
    );
};
