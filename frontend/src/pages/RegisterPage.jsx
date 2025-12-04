import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, replace, useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/features/authSlice'

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isLoggedIn, status, error} = useSelector((state)=> state.auth)

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  useEffect(()=>{
    if(isLoggedIn){
      navigate("/"), {replace:true}
      return
    }
  },[isLoggedIn, navigate])


  const handleChange=((e)=>{
    const {name, value} = e.target

    setFormState((prev)=>({
      ...prev,
      [name]: value
    }))
  })


  const handleRegister=((e)=>{
    e.preventDefault()

    if(status === "loading") return
    if(!formState.firstName || !formState.lastName || !formState.email || !formState.password){
      alert("please fill the all areas")
      return
    }

    dispatch(registerUser(formState))

  })


    return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      
      <h2 className="text-2xl font-bold text-center text-gray-800">Kayıt Ol</h2>
      {error &&(
        <div className="p-3 bg-red-100 text-red-700 text-sm rounded border border-red-200 text-center">
          {typeof error === "object" ? error.message : error}
      </div>
      )}
      

      <form className="space-y-4" onSubmit={handleRegister}>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your name"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Last name</label>
            <input 
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your last name"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="exampe@email.com"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="******"
          />
        </div>

        <button 
          type="submit" 
          className={`w-full py-2 text-white font-semibold rounded transition 
              ${status === 'loading' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {status === 'loading' ? 'Logging in...' : 'Register'}
        </button>
      </form>
      
      <div className="text-sm text-center text-gray-600">
        Already have account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
      </div>

    </div>
  </div>
)
}

export default RegisterPage