import React, { useEffect, useState } from 'react'
import FilterSidebar from '../components/FilterSidebar'
import { data, Link, useParams, useSearchParams } from 'react-router-dom'
import { getFilteredProducts, getProductsByCategory, listAllProducts, searchProducts } from '../api/productService'
import ProductCard from "../components/ProductCard"
import { getAllCategories, getCategoryById } from "../api/categoryService"
import SearchBar from '../components/SearchBar'

function ProductListPage() {
  const { categoryId } = useParams()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [pageTitle, setPageTitle] = useState("All Products")
  const [loading, setLoading] = useState(true)


  const [filters, setFilters] = useState({
    categoryIds: [],
    minPrice: null,
    maxPrice: null,
    query: ""
  })

  const handleFilterChange = (change) => {
    if (change.type === "CATEGORY") {
      setFilters(prev => ({ ...prev, categoryIds: change.value }))
    } else if (change.type === "PRICE") {
      setFilters(prev => ({
        ...prev,
        minPrice: change.value.min,
        maxPrice: change.value.max
      }))
    }
  }

  const isCategoryPage = Boolean(categoryId)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories()
        setCategories(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCategories()
  }, [])


  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true)
      try {
        let activeCategoryIds = filters.categoryIds
        if (isCategoryPage) {
          activeCategoryIds = [Number(categoryId)]
          const catDetail = await getCategoryById(categoryId)
          setPageTitle(catDetail.name)
        } else {
          setPageTitle("All Products & Filter")
        }
        const response = await getFilteredProducts(
          0, 10,
          filters.query,
          activeCategoryIds,
          filters.minPrice,
          filters.maxPrice
        )
        setProducts(response.content)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProductsData()

  }, [categoryId, filters])


  const handleSearch = (val) => {
    setFilters(prev => ({ ...prev, query: val }))
  }


  return (
    <div className='container mx-auto py-8 px-4'>

      <div className='flex justify-between items-center mb-6 border-b pb-4'>
        <h1 className='text-2xl font-bold text-gray-800'>
          {pageTitle}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8 overflow-hidden w-full">
        {!isCategoryPage && (
          <aside className="hidden md:block w-64 space-y-6 shrink-0">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Search</h3>
              <SearchBar
                value={filters.query}
                onChange={handleSearch}
                placeholder="Filter by name..."
              />
            </div>
            <FilterSidebar
              categories={categories}
              onFilterChange={handleFilterChange}
            />
          </aside>
        )}

        <div className={`${isCategoryPage ? 'w-full' : 'flex-1 min-w-0'}`}>
          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="block hover:shadow-lg transition-shadow duration-300 rounded-lg"
                  >
                    <ProductCard product={product} />
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                  Cannot find any products.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default ProductListPage