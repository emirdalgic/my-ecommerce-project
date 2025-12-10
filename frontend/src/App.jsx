import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import AdminPage from './pages/AdminPage'
import AdminProductForm from './pages/AdminProductForm'

function App() {

  const location = useLocation()

  const isAdminPages = location.pathname.startsWith("/admin")

  return (
    <div className="flex flex-col min-h-screen">

      {!isAdminPages && <Navbar />}

      <div className="flex-grow">
        <Routes>
          {/*public routes*/}
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/products' element={<ProductListPage />} />
          <Route path='/products/category/:categoryId' element={<ProductListPage />} />
          <Route path='/products/:productId' element={<ProductDetailsPage />} />
          <Route path='/cart' element={<CartPage />} />
          {/*private routes*/}
          <Route path='/profiles/:profileId' element={<ProfilePage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/orders/history' element={<  OrdersPage />}></Route>
          <Route path='/profile/my-addresses' element={<AddressPage />}></Route>
          {/* --- Admin Routes --- */}
          <Route path='/admin' element={<AdminPage />}></Route>
          <Route path='/admin/product/new' element={<AdminProductForm />}></Route>
          <Route path='/admin/product/edit/:productId' element={<AdminProductForm />}></Route>

          {/*not found*/}
          <Route path='*' element={<NotFoundPage />} />

        </Routes>
      </div>
      {!isAdminPages && <Footer />}
    </div>
  )
}

export default App