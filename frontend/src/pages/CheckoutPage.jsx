import React, { useEffect, useState } from 'react'
import { getUserAddresses, saveAddress } from '../api/addressService'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart, fetchCart, removeCartItem } from '../redux/features/cartSlice'
import { saveOrder } from '../api/orderService'
import { getCurrentUser } from '../api/authService'

function CheckoutPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems, status } = useSelector((state) => state.cart)


  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(null)

  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newAddressForm, setNewAddressForm] = useState({
    title: "",
    fullAddress: ""
  })


  const [isCheckoutSucces, setIsCheckoutSucces] = useState(false)
  const [loading, setLoading] = useState(false)

  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + (item.quantity * item.product?.price), 0).toFixed(2)
  }


  const handleFinishToCheckOut = async () => {
    if (!selectedAddressId) {
      alert("please select an address")
      return
    }
    setLoading(true)
    try {
      await saveOrder(selectedAddressId)
      setIsCheckoutSucces(true)
      dispatch(clearCart())

      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (error) {
      alert("an error occured while creating order")
      setLoading(false)
    }
  }

  const handleSaveNewAddress = async (e) => {
    e.preventDefault()
    try {
      const savedAddress = await saveAddress(newAddressForm)

      setAddresses(prev => [...prev, savedAddress])
      setSelectedAddressId(savedAddress.id)

      setShowAddressForm(false)
      setNewAddressForm({
        title: "",
        fullAddress: ""
      })
    } catch (error) {
      console.log(error);

    }
  }

  const fetchAddresses = async () => {
    let response
    try {
      response = await getUserAddresses()
      setAddresses(response)
      if (response && response.length > 0) {
        setSelectedAddressId(response[0].id)
      } else {
        setShowAddressForm(true)
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (!getCurrentUser()) {
      navigate("/login")
      return
    }
    dispatch(fetchCart())
    fetchAddresses()
  }, [dispatch, navigate])

  if (isCheckoutSucces) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your order has been received. You are being redirected to the home page....</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">

        <div className="w-full lg:w-2/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Delivery Address</h2>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
              >
                {showAddressForm ? "Cancel" : "+ Add New Address"}
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleSaveNewAddress} className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="grid gap-3">
                  <input
                    type="text"
                    placeholder="Address Title"
                    className="border p-2 rounded w-full"
                    value={newAddressForm.title}
                    onChange={(e) => setNewAddressForm({ ...newAddressForm, title: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Street Address"
                    className="border p-2 rounded w-full"
                    value={newAddressForm.fullAddress}
                    onChange={(e) => setNewAddressForm({ ...newAddressForm, fullAddress: e.target.value })}
                    required
                  />
                  <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-fit">
                    Save Address
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {addresses.length === 0 && !showAddressForm ? (
                <p className="text-gray-500">No registered address found. Please add a new one..</p>
              ) : (
                addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${selectedAddressId === addr.id
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      className="mt-1"
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                    />
                    <div>
                      <span className="font-bold text-gray-800 block">{addr.title}</span>
                      <span className="text-gray-600 text-sm">{addr.fullAddress}</span>
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span>{item.product?.name} (x{item.quantity})</span>
                  <span>${(item.quantity * item.product?.price).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-blue-600">${calculateTotal()}</span>
            </div>

            <button
              onClick={handleFinishToCheckOut}
              disabled={loading || addresses.length === 0}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition shadow-lg 
                ${loading || addresses.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 shadow-green-500/30"
                }`}
            >
              {loading ? "Processing..." : "Confirm and Finish Order"}
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              By confirming you accept the sales contract..
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CheckoutPage