import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import { getProductsShowcase } from "../api/productService"

const HomePage = () => {
  const [categoryNodes, setCategoryNodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const data = await getProductsShowcase()
        setCategoryNodes(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchShowcase()
  }, [])

  if (loading) return <div className="text-center py-10">Loading...</div>

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-end mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Showcase</h1>
        <Link 
          to="/products" 
          className="text-blue-600 font-semibold hover:text-blue-800 transition"
        >
          See All →
        </Link>
      </div>
      {categoryNodes.map((node, nodeIndex) => (
        <div key={node.categoryId} className="mb-12">
          <h3 className="text-xl font-bold mb-4 text-gray-700 pl-2 border-l-4 border-blue-500">
            <Link to={`/products/category/${node.categoryId}`}>
            {node.categoryName}
            </Link>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {node.products.map((product, productIndex) => (
              <Link 
                key={`${product.id}-${node.categoryId}-${productIndex}`}
                to={`/products/${product.id}`} 
              >
                <ProductCard product={product} /> 
              </Link>
            ))}
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default HomePage