import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getProductById } from '../api/productService'
import { useSelector } from 'react-redux'
import NotFoundPage from './NotFoundPage'

const ProductDetailPage = () => {
  const { productId } = useParams()

  const { isLoggedIn, status} = useSelector(((state) => state.auth)) //auth durumunu cartservisi yazınca dönücem

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity ,setQuantity] = useState(1)
  
  useEffect(()=>{
    const fetchProducts = async()=>{
      try{
        const data = await getProductById(productId)
        setProduct(data)
        setLoading(false)
        console.log(data)
        
      }catch(error){
        console.log(error)
        
      }
    }
    fetchProducts()
  },[productId])
  if (loading) return <div className='text-center py-20'>Loading...</div>
  if (!product) return <NotFoundPage/>


  return(
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 rounded-lg p-4">
          <img 
            alt="Product Name" 
            className="max-h-[500px] w-auto object-contain hover:scale-105 transition duration-500"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col space-y-6">
          <div>
            <span className="text-sm text-blue-600 font-semibold tracking-wide uppercase">
              {product.category.name}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              {product.name}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Vendor: <span className="font-semibold text-gray-700">{product.vendor?.firstName}</span>
            </p>
          </div>
          <div className="text-4xl font-bold text-gray-900 border-b pb-4">
            {`${product.price} $`}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description:</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6">
            
            <div className="flex items-center border rounded-lg">
                <button onClick={()=> setQuantity(prev => Math.max(1, prev - 1))} className="px-4 py-2 hover:bg-gray-100">-</button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button onClick={()=> setQuantity(prev => Math.min(product.stockAmount, prev + 1))} className="px-4 py-2 hover:bg-gray-100">+</button>
            </div>

            <button 
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition shadow-md flex justify-center items-center gap-2"
              // onClick={handleAddToCart}
            >
              🛒 Add to Card
            </button>

            <button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md"
              // onClick={handleBuyNow}
            >
              Buy now
            </button>
          </div>

          <div className="text-xs text-gray-400 flex gap-4 mt-2">
            {
              product.stockAmount > 0? <span>✓ In Stock {product.stockAmount} </span> : <span>x Out of Stock</span> 
            }
            
            <span>✓ Free Delivery</span>
          </div>

        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Comments and Reviews</h2>
        <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500">
          No comments yet..
        </div>
      </div>

    </div>
  )
}

export default ProductDetailPage