import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/userSlice'
import axios from 'axios'
import { Button } from './ui/button'
import { toast } from 'sonner'

const Navbar = () => {
  // const user = true
  const {user} = useSelector(store => store.user)
  const {cart} = useSelector(store => store.product)
  const accessToken = localStorage.getItem('accessToken')
  const admin = user?.role === "admin" ? true : false
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async() => {
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/logout`, {}, {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        dispatch(setUser(null))
        toast.success(res.data.message)
      }
    } catch (err) {
      console.log(err) 
    }
  }
  // console.log(cart)

  return (
   <header className='bg-pink-50 fixed w-full z-20 border-b border-pink-200'>
  <div className='max-w-7xl mx-auto flex items-center justify-between px-5 py-3'>

    {/* ✅ Logo */}
    <div className='flex items-center'>
      <img src="/Ekart.png" alt="logo" className='w-[100px] object-contain' />
    </div>

    {/* ✅ Right Section */}
    <div className='flex items-center gap-8'>

      {/* Menu */}
      <ul className='flex items-center gap-6 text-lg font-semibold'>
        <Link to={'/'}><li className='cursor-pointer'>Home</li></Link>
        <Link to={'/products'}><li className='cursor-pointer'>Products</li></Link>

        {
          user && (
            <Link to={`/profile/${user._id}`}>
              <li className='cursor-pointer'>Hello, {user.name}</li>
            </Link>
          )
        }
        {
          admin && <Link to={`/dashboard/sales`}><li>Dashboard</li></Link>
        }
      </ul>

      {/* Cart */}
      <Link to={'/cart'} className='relative flex items-center'>
        <ShoppingCart className='text-2xl' />
        <span className='bg-pink-500 rounded-full absolute text-white -top-2 -right-3 px-2 text-xs'>
          {cart.items.length}
        </span>
      </Link>

      {/* Button */}
      {
        user ? (
          <Button
            onClick={logoutHandler}
            className='bg-pink-600 text-white cursor-pointer px-4 py-1'
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/login')}
            className='bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer px-4 py-1'
          >
            Login
          </Button>
        )
      }

    </div>
  </div>
</header>
  )
}

export default Navbar