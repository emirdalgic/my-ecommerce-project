import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProductListPage from "./pages/ProductListPage"
import ProductDetailsPage from './pages/ProductDetailPage'
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import OrdersPage from './pages/OrdersPage'
import AddressPage from './pages/AddressPage'

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/*public routes*/}
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/products' element={<ProductListPage />} />
        <Route path='/products/category/:categoryId' element={<ProductListPage />} />
        <Route path='/products/:productId' element={<ProductDetailsPage />} />
        {/*private routes*/}
        <Route path='/cart' element={<CartPage />} />
        <Route path='/profiles/:profileId' element={<ProfilePage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/orders/history' element={<  OrdersPage />}></Route>
        <Route path='/profile/my-addresses' element={<AddressPage />}></Route>

        {/*not found*/}
        <Route path='*' element={<NotFoundPage />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App