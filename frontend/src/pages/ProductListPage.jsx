import React, { useEffect, useState } from 'react'
import ProductGrid from '../components/ProductGrid'
import FilterSidebar from '../components/FilterSidebar'
import { data, Link, useParams, useSearchParams } from 'react-router-dom'
import { getProductsByCategory, searchProducts } from '../api/productService'

function ProductListPage() {
  const { categoryId } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('query')

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const isCategoryPage = Boolean(categoryId) 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      try {
        let response

        if (isCategoryPage) {
          response = await getProductsByCategory(categoryId, 0, 12)
        } else if (searchQuery) {
          response = await searchProducts(searchQuery, 0, 12)
        } else {
          response = await searchProducts("", 0, 12)
        }

        setProducts(response.content)
        console.log(response);
        
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryId, searchQuery])
  

  return (
    <div className='container mx-auto py-8 px-4'>
      
      <div className='flex justify-between items-center mb-6 border-b pb-4'>
        <h1 className='text-2xl font-bold text-gray-800'>
          {isCategoryPage ? "Category Spesific:" : "All Products & Filter"}
        </h1>
      </div>

      <div className='flex flex-col md:flex-row gap-8'>
          {!isCategoryPage && (
            <aside className='hidden md:block md:w-1/4'>
               <FilterSidebar />
            </aside>
          )}
          <div className={isCategoryPage ? 'w-full' : 'flex-1'}>
             {loading ? (
               <div className="text-center py-20">Loading...</div>
             ) : (
              products.map((product, productIndex)=>(
                <Link to={`/products/${product.id}`}><ProductGrid products={products} key={productIndex} /></Link>
              ))
              
             )}
          </div>
      </div>
    </div>
  )
}

export default ProductListPage