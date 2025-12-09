import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, updateUserEmail } from '../api/authService'
import { FaBoxOpen, FaShoppingCart, FaMapMarkerAlt, FaHistory, FaUserCircle } from 'react-icons/fa'
import { logout } from '../redux/features/authSlice'
import { useDispatch } from 'react-redux'

const ProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
        setEmail(userData.email || "")
      } catch (error) {
        console.error("User data cannot fetch:", error)
        dispatch(logout())
        navigate("/login")
        logout
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()

  }, [])

  const handleUpdate = async () => {
    setMessage({ type: "", text: "" })
    try {
      await updateUserEmail(email)
      setMessage({ type: "success", text: "Email updated! Redirecting to login..." })
      setTimeout(() => {
        dispatch(logout())
        navigate("/login")
      }, 2000)
    } catch (error) {
      console.error(error)
      setMessage({ type: "error", text: "Failed to update email. Please try again." })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-lg font-semibold text-gray-600">Loading profile details...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <FaUserCircle className="text-4xl text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
          <p className="text-gray-500">Welcome back, {user?.firstName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Profile Details</h2>

          {message.text && (
            <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1.5">First Name</label>
              <input
                type="text"
                value={user?.firstName || ""}
                disabled
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Last Name</label>
              <input
                type="text"
                value={user?.lastName || ""}
                disabled
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 active:transform active:scale-95 transition-all duration-200 mt-2 shadow-sm hover:shadow"
            >
              Update Email
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">

          <Link to="/orders/history" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-400 transition-all group flex items-start gap-4">
            <div className="bg-gray-100 p-3 rounded-lg text-gray-600 group-hover:bg-gray-600 group-hover:text-white transition-colors">
              <FaHistory size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-600 transition-colors">Past Orders</h3>
              <p className="text-gray-500 text-sm mt-1">View your purchase history and invoices.</p>
            </div>
          </Link>

          <Link to="/profile/my-addresses" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all group flex items-start gap-4">
            <div className="bg-green-50 p-3 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <FaMapMarkerAlt size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors">My Addresses</h3>
              <p className="text-gray-500 text-sm mt-1">Manage shipping and billing addresses.</p>
            </div>
          </Link>

          <Link to="/cart" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group flex items-start gap-4">
            <div className="bg-purple-50 p-3 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <FaShoppingCart size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors">My Cart</h3>
              <p className="text-gray-500 text-sm mt-1">Check out items currently in your cart.</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage