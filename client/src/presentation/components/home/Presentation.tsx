import { Rotate } from "./ui/Rotate"

export const Presentation = () => {
    return (
        <section className='presentation flex flex-col justify-between items-center self-center p-[30px_20px] md900:p-[30px_60px] 
        min-h-screen max-w-7xl w-full gap-20 relative font-light overflow-hidden 2lg:flex-row'>
            <div className="flex flex-col max-w-xl">
                <h2 className="font-light mb-7">ABOUT</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed lectus augue. Morbi euismod sodales dolor,
                    eget ultrices massa porta sit amet. Duis varius faucibus pharetra. Donec sed nisi libero. Suspendisse potenti. Phasellus in
                    ipsum commodo, <span>elementum nibh et, placerat magna.</span> </p>

                <p className="pt-4">Donec eleifend tellus nisi, rutrum viverra lorem venenatis nec. Nunc ac eros non dolor mattis malesuada sit amet ac augue. Donec lobortis ex at neque ultricies interdum.
                    Aenean quis fringilla nulla, eget lacinia libero. <span>Morbi porttitor gravida metus, vitae mattis enim viverra a.</span> Vivamus commodo
                    gravida massa et tincidunt. Nulla sit amet lacinia augue.</p>
            </div>
            <div className="flex  w-full relative">
                <Rotate />
            </div>
        </section>
    )
}
