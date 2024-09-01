import { FormEvent, PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => {},
    errorMessage: string | string[]
}

export const AuthLayout = ({ children, handleSubmit, errorMessage }: Props) => {

    return (
        <div className='flex flex-row justify-center items-center 
    pt-[var(--header-height)] min-h-screen bg-[var(--blue-color)] w-full p-5'>
            <form className='flex flex-col bg-white rounded-md w-full max-w-lg text-lg p-6 items-center justify-center mt-5 sm:text-xl'
                onSubmit={(e) => handleSubmit(e)}>
                {children}
                {errorMessage &&
                    <ul className='list-disc list-inside text-base text-justify sm:text-xl'>
                        <li className='list-disc list-inside w-full'>{errorMessage}</li>
                    </ul>
                }
            </form>
        </div>
    )
}