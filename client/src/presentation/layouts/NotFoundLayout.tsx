import { PropsWithChildren } from "react"
import { Link } from "react-router-dom"

export const NotFoundLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex flex-col w-full h-screen items-center justify-center text-white font-bold text-5xl flex-1 bg-[#091F44]">
            {children}
            <Link className='flex flex-row p-1 px-2 text-lg items-center text-white 
            bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg sm:text-3xl' to='/'>Home</Link>
        </div>
    )
}
