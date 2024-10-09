export const CreateProductScreen = () => {
    return (
        <div className="flex flex-col w-full min-h-svh bg-[#091F44]">
            <div className='flex justify-center items-center bg-[var(--blue-color)] w-full min-h-screen py-28 px-2 sm:px-8 md:px-14'>
                <div className='flex flex-col bg-white rounded-lg w-full p-2 sm:p-6'>
                    <div className='grid auto-rows-auto grid-cols-1 2sm:grid-cols-[minmax(200px,max-content),minmax(250px,1fr)] gap-3 mb-14'>
                        <img className='max-w-[300px] w-full justify-self-center self-center' src={'https://m.media-amazon.com/images/I/61CnOKdmBeL._AC_UF1000,1000_QL80_.jpg'}></img>
                        <div className='flex flex-col w-full h-full justify-evenly items-center p-1 md:p-10'>
                            <h1 className='w-full text-center text-4xl md:text-5xl'>{'Xbox'}</h1>
                            <div className='flex w-full px-1 justify-evenly text-3xl sm:px-4 sm:text-4xl my-5'>
                                Rate
                            </div>
                            ProductBtns
                        </div>
                    </div>
                    <div className='w-full font-bold text-4xl text-center'>Reviews</div>
                    <div className='flex flex-col justify-evenly w-full bg-slate-200 rounded-lg p-2 sm:p-5'>

                        <div className='text-2xl text-black w-full text-center font-bold py-12 2sm:text-4xl'>This product has no reviews.</div>

                    </div>
                </div>
            </div>
        </div>
    )
}