import React from 'react';
import SearchBar from "./SearchBar"

const FilterSidebar = () => {
  return (
    <div className='w-full md:w-64 p-4 border-r bg-white'>
      
      <div className='mb-6'>
        <h3 className='font-bold text-lg mb-3'>Categories</h3>
        <div className='flex flex-col space-y-2'>
          {['cat1', 'cat2', 'cat3', 'cat3'].map((cat) => (
            <label key={cat} className='flex items-center space-x-2 cursor-pointer'>
              <input type='checkbox' className='form-checkbox h-4 w-4 text-blue-600' />
              <span className='text-gray-700'>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='font-bold text-lg mb-3'>Price Range</h3>
        <div className='flex items-center space-x-2'>
          <input type='number' placeholder='Min' className='w-20 border p-1 text-sm rounded' />
          <span>-</span>
          <input type='number' placeholder='Max' className='w-20 border p-1 text-sm rounded' />
          <button className='bg-blue-600 text-white p-1 rounded text-sm'>OK</button>
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='font-bold text-lg mb-3'>Search with Bar</h3>
        <div className='flex items-center space-x-2'>
          <SearchBar/>
        </div>
      </div>

    </div>
  );
};

export default FilterSidebar;