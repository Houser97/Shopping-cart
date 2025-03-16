import Link from "next/link"

const AuthButtons = ({ setToggleNavbar }: {setToggleNavbar: any}) => {
  const toggleNavbar = () => {
    if (setToggleNavbar) {
      setToggleNavbar(false)
    }
  }
  return (
    <div className='flex text-lg gap-5 items-center justify-center font-normal'>
      <Link href='/register' className=' text-black px-3 py-1 rounded-lg border-solid border-2 border-blue-950' onClick={() => toggleNavbar()}>Register</Link>
      <Link href='/login' className=' text-black px-3 py-1 rounded-lg' onClick={() => toggleNavbar()}>Login</Link>
    </div>
  )
}

export default AuthButtons