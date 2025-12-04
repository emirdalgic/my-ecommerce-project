import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/features/authSlice' 

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoggedIn, error, status } = useSelector((state) => state.auth)

  const [formState, setFormState] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true })
    }
  }, [isLoggedIn, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (status === "loading") return

    if (!formState.email || !formState.password) {
      alert("Please fill all areas.")
      return
    }
    dispatch(loginUser(formState)) 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Log in</h2>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 text-sm rounded border border-red-200 text-center">
            {typeof error === 'object' ? error.message : error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input 
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.email} 
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input 
              type="password" 
              name="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.password} 
              onChange={handleChange}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className={`w-full py-2 text-white font-semibold rounded transition 
              ${status === 'loading' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {status === 'loading' ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        
        <div className="text-sm text-center">
          No Account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage