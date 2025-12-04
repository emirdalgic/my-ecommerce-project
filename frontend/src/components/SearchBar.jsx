import React from 'react'

function SearchBar() {
  return (
    <div className='w-full max-w-md'>
      <input 
        type="text" 
        placeholder='Search Item' 
        className="
          w-full 
          px-4 py-2 
          rounded-full 
          border border-gray-300 
          bg-gray-50 
          text-gray-700 
          placeholder-gray-400 
          
          transition-all duration-300 ease-in-out
          
          outline-none 
        
          hover:border-gray-400 
          hover:bg-white
          

          focus:bg-white 
          focus:border-gray-500
          focus:ring-4 focus:ring-gray-100
          focus:shadow-inner 
        "
      />
    </div>
  )
}

export default SearchBar