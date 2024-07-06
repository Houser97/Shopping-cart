import Incentives from '../../components/home/Incentives';
import Presentation from '../../components/home/Presentation';

export const HomeScreen = () => {
    return (
        <div className='flex flex-col w-full'>
            <Presentation />
            <Incentives />
            {/*   <Testimonials /> */}
        </div>
    )
}
