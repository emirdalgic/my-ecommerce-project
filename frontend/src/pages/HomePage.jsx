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
        const response = await getProductsShowcase()
        setCategoryNodes(response)
        console.log(response);

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
          See All Products →
        </Link>
      </div>
      {categoryNodes.map((node) => (
        <div key={node.categoryId} className="mb-12">
          <div className="flex justify-between items-center mb-4 pl-2 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-700">
              <Link to={`/products/category/${node.categoryId}`} className="hover:text-blue-600 transition">
                {node.categoryName}
              </Link>
            </h3>
            <Link
              to={`/products/category/${node.categoryId}`}
              className="text-sm font-medium text-blue-500 hover:text-blue-700 hover:underline transition flex items-center gap-1"
            >
              See More <span className="text-xs">❯</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {node.products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group"
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