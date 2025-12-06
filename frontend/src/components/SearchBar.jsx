import React from 'react'
import SearchOutput from './SearchOutput'

function SearchBar({ value, onChange, placeholder = "Search Item" }) {
  return (
    <div className='w-full max-w-md relative'>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full px-4 py-2 rounded-full border border-gray-300 
          bg-gray-50 text-gray-700 outline-none 
          transition-all duration-300
          focus:bg-white focus:border-gray-500 focus:shadow-inner
        "
      />
    </div>
  )
}

export default SearchBar