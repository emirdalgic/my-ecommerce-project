import React from 'react';

function ProductCard({ product }) {
  if(!product) return <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>;

  return (
    <div className='border rounded-lg shadow-sm hover:shadow-xl transition duration-300 p-4 bg-white flex flex-col h-full'>
      <div className='w-full h-48 bg-gray-100 rounded mb-4 overflow-hidden relative group'>
        <img  
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      
      <div className='flex flex-col flex-1 justify-between'>
        <div>
            <h3 className='font-bold text-lg mb-1 truncate'>{product.name}</h3>
            <p className='text-gray-500 text-sm mb-3 line-clamp-2'>
              {product.description}
            </p>
        </div>
        
        <div className='flex justify-between items-center mt-2 border-t pt-3'>
            <span className='text-blue-600 font-bold text-lg'>{product.price} $</span>
            <button className='bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-orange-600 transition text-sm font-medium shadow-sm'>
                Add to Card +
            </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;