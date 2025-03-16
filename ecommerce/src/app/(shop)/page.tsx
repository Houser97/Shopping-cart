import { Presentation } from "@/components/home/Presentantion";
import { Carousel } from "@/components/ui/carousel/Carousel";

export default function Home() {
  return (
    <div className='flex flex-col w-full'>
      <Carousel />
      <Presentation />
    </div>
  );
}
