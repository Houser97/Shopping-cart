import { Testimonials, Presentation, Incentives } from '../../components/home';

export const HomeScreen = () => {
    return (
        <div className='flex flex-col w-full'>
            <Presentation />
            <Incentives />
            <Testimonials />
        </div>
    )
}
