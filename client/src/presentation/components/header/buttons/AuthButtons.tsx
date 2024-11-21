import { Link } from 'react-router-dom'

const AuthButtons = ({ setToggleNavbar }) => {
  const toggleNavbar = () => {
    if (setToggleNavbar) {
      setToggleNavbar(false)
    }
  }
  return (
    <div className='flex text-lg gap-5 items-center justify-center font-normal'>
      <Link to='/register' className=' text-black px-3 py-1 rounded-lg border-solid border-2 border-blue-950' onClick={() => toggleNavbar()}>Register</Link>
      <Link to='/login' className=' text-black px-3 py-1 rounded-lg' onClick={() => toggleNavbar()}>Login</Link>
    </div>
  )
}

export default AuthButtons