import React from 'react'
import { Link } from 'react-router-dom'

function SearchOutput({ results, isVisible }) {
  if (!isVisible || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
      {results.map((product) => (
        <Link 
          key={product.id} 
          to={`/products/${product.id}`}
          className="block px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 transition-colors items-center gap-3"
        >
           <div>
             <div className="font-medium text-gray-800">{product.name}</div>
             <div className="text-sm text-gray-500">${product.price}</div>
           </div>
        </Link>
      ))}
    </div>
  )
}

export default SearchOutput