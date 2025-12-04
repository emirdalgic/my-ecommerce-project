import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from "./SearchBar"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/features/authSlice'
import { getAllCategories } from '../api/categoryService'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoggedIn } = useSelector(((state) => state.auth))

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories()
        setCategories(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
  

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='border-b border-gray-100'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between gap-6'>
          
          <Link to={"/"} className='text-2xl font-bold text-blue-600 tracking-tight hover:opacity-80 transition'>
            MYSHOP
          </Link>

          <div className='flex-1 max-w-xl hidden md:block'>
             <SearchBar />
          </div>

          <nav className='flex items-center gap-6 font-medium text-gray-600'>
            
            <Link to={"/cart"} className='hover:text-blue-600 transition flex items-center gap-1'>
              <span>My Cart</span>
            </Link>
            
            <Link to={"/contact"} className='hover:text-blue-600 transition hidden sm:block'>
              Contact Us
            </Link>

            {!isLoggedIn ? (
              <Link 
                to={"/login"} 
                className='bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-md text-sm'
              >
                Log in
              </Link>
            ) : (
              <button 
                onClick={handleLogout} 
                className='text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-full transition text-sm font-semibold'
              >
                Logout
              </button>
            )}
          </nav>
        </div>
        <div className='md:hidden px-4 pb-4'>
           <SearchBar />
        </div>
      </div>
      <div className='bg-gray-50 border-b border-gray-200'>
        <nav className='container mx-auto px-4'>
          <div className='flex items-center gap-8 overflow-x-auto no-scrollbar py-3 text-sm font-medium text-gray-500'>
            <Link to="/products" className='whitespace-nowrap hover:text-blue-600 transition'>
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products/category/${cat.id}`}
                className='whitespace-nowrap hover:text-blue-600 transition border-b-2 border-transparent hover:border-blue-600 pb-0.5'
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

    </header>
  )
}

export default Navbar