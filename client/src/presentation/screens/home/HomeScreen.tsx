import { Testimonials, Presentation, Carousel } from '../../components/home';

export const HomeScreen = () => {
    return (
        <div className='flex flex-col w-full'>
            <Carousel />
            <Presentation />
            <Testimonials />
        </div>
    )
}
