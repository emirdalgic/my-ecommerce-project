import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from "./SearchBar"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/features/authSlice'
import { fetchCart } from '../redux/features/cartSlice'
import { getAllCategories } from '../api/categoryService'
import { searchProducts } from '../api/productService'
import SearchOutput from './SearchOutput'
import { getCurrentUser } from '../api/authService'
import MiniCart from './MiniCart'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoggedIn } = useSelector(((state) => state.auth))
  const { cartItems } = useSelector((state) => state.cart)

  const [categories, setCategories] = useState([])
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isOutputVisible, setIsOutputVisible] = useState(false)
  const [userId, setUserId] = useState(null)

  const [isCartOpen, setIsCartOpen] = useState(false)

  const cartRef = useRef(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories()
        setCategories(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart())
    }
  }, [dispatch, isLoggedIn])

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (query.length > 2) {
        try {
          const response = await searchProducts(query, 0, 5)
          setResults(response.content)
          setIsOutputVisible(true)
        } catch (error) {
          console.log("Search error", error)
        }
      } else {
        setResults([])
        setIsOutputVisible(false)
      }
    }, 500)
    return () => clearTimeout(timerId)
  }, [query])

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUser = async () => {
        try {
          const response = await getCurrentUser()
          setUserId(response.id)
        } catch (error) {
          console.log(error);
        }
      }
      fetchUser()
    }
  }, [isLoggedIn])

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartRef]);


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

          <div className='flex-1 max-w-xl hidden md:block relative'>
            <SearchBar value={query} onChange={setQuery} />
            <SearchOutput
              results={results}
              isVisible={isOutputVisible && query.length > 2}
            />
          </div>

          <nav className='flex items-center gap-6 font-medium text-gray-600'>

            {isLoggedIn && (
              <Link to={`profiles/${userId}`} className='hover:text-blue-600 transition'>
                My Profile
              </Link>
            )}

            <div className='relative' ref={cartRef}>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className='hover:text-blue-600 transition flex items-center gap-1 cursor-pointer relative p-2'
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>

                {cartItems && cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {isCartOpen && (
                <MiniCart onClose={() => setIsCartOpen(false)} />
              )}
            </div>

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
        <div className='md:hidden px-4 pb-4 relative'>
          <SearchBar value={query} onChange={setQuery} />
          <SearchOutput
            results={results}
            isVisible={isOutputVisible && query.length > 2}
          />
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