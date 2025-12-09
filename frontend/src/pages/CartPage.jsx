import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchCart, removeCartItem } from '../redux/features/cartSlice'


const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems, status } = useSelector((state) => state.cart)

  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => {
      return total + (item.quantity * item.product?.price)
    }, 0).toFixed(2)
  }

  const handleProceedToCheckout = () => {
    const isLoggedIn = localStorage.getItem("token")

    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/cart" } })
      return;
    }

    navigate("/checkout")
  }

  const removeItem = (productId) => {
    dispatch(removeCartItem(productId))
      .then(() => dispatch(fetchCart()))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!cartItems || cartItems.length === 0) {

    return (

      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">

        <div className="bg-gray-100 p-6 rounded-full mb-4">

          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />

          </svg>

        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>

        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>

        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">

          Start Shopping

        </Link>

      </div>

    )

  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                  <h3>{item.product?.name}</h3>
                  <p>{item.quantity} x ${item.product?.price}</p>
                </div>
                <button onClick={() => removeItem(item.product.id)} className="text-red-500">Remove</button>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/4 h-fit">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="border-t pt-4 flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">${calculateTotal()}</span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CartPage