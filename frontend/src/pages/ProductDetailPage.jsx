import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../api/productService'
import { useDispatch, useSelector } from 'react-redux'
import NotFoundPage from './NotFoundPage'
import { addToCart } from '../api/cartService'
import { addItemToCart, fetchCart } from '../redux/features/cartSlice'

const ProductDetailPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { productId } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  const [allImages, setAllImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleAddToCart = () => {
    dispatch(addItemToCart({ product: product, quantity: quantity })).unwrap()
      .then(() => {
        dispatch(fetchCart());
        console.log("added")
      })
      .catch((error) => {
        console.error(error)
      });
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate("/checkout")
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductById(productId)
        setProduct(data)
        setLoading(false)
        console.log(data)
        let imageList = []

        if (data.imageUrl) {
          imageList.push(data.imageUrl)
        }
        if (data.productImages && data.productImages.length > 0) {
          const extraImages = data.productImages.map(img => img.imageUrl)
          imageList = [...imageList, ...extraImages]
        }
        setAllImages(imageList)
        console.log(imageList);

        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [productId])
  if (loading) return <div className='text-center py-20'>Loading...</div>
  if (!product) return <NotFoundPage />


  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden group">

            {allImages.length > 0 ? (
              <img
                src={allImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
            )}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </>
            )}
            {allImages.length > 1 && (
              <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto w-full py-2 justify-center">
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-16 h-16 border-2 rounded-md cursor-pointer overflow-hidden flex-shrink-0 transition-all ${currentImageIndex === idx ? 'border-blue-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col space-y-6">
          <div>
            <span className="text-sm text-blue-600 font-semibold tracking-wide uppercase">
              {product.category?.name}
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
              <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-4 py-2 hover:bg-gray-100">-</button>
              <span className="px-4 font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(prev => Math.min(product.stockAmount, prev + 1))} className="px-4 py-2 hover:bg-gray-100">+</button>
            </div>

            <button
              className="flex-1 bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition shadow-md flex justify-center items-center gap-2"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>

            <button
              className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md"
              onClick={handleBuyNow}
            >
              Buy now
            </button>
          </div>

          <div className="text-xs text-gray-400 flex gap-4 mt-2">
            {
              product.stockAmount > 0 ? <span>✓ In Stock {product.stockAmount} </span> : <span className="text-red-500">x Out of Stock</span>
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