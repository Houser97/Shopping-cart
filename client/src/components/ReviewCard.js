import React from 'react'
import StarRate from './StarRate'

const ReviewCard = () => {
  return (
    <div className='flex flex-col w-full justify-evenly bg-white mb-3 rounded-lg p-3 sm:px-9'>
        <div className='flex flex-row flex-wrap w-full justify-between'>
            <h3 className='font-bold text-2xl mr-4'>Username</h3>
            <div>
                <StarRate />
            </div>
        </div>
        <div className='w-full my-4 text-base text-justify sm:text-xl'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</div>
        <div className='flex flex-row w-full my-3'>
            <div className='flex flex-row items-center mr-3'>
                <svg className='w-5 h-5 cursor-pointer mr-2 fill-blue-600' viewBox="0 0 24 24"><path d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" /></svg>
                <div className='text-lg'>08</div>
            </div>
            <div className='flex flex-row items-center'>
                <svg className='w-5 h-5 cursor-pointer mr-2 fill-orange-600' viewBox="0 0 24 24"><path d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z" /></svg>
                <div className='text-lg'>01</div>
            </div>
        </div>
        <div className='w-full text-end text-xl font-bold'>Date</div>
    </div>
  )
}

export default ReviewCard