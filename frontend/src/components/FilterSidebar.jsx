import React, { useState } from 'react';

const FilterSidebar = ({ categories, onFilterChange }) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const handleCategoryChange = (categoryId) => {
    let updatedIds;
    if (selectedCategoryIds.includes(categoryId)) {
      updatedIds = selectedCategoryIds.filter(id => id !== categoryId);
    } else {
      updatedIds = [...selectedCategoryIds, categoryId];
    }

    setSelectedCategoryIds(updatedIds);
    onFilterChange({ type: 'CATEGORY', value: updatedIds });
  };

  const handlePriceSubmit = () => {
    onFilterChange({ type: 'PRICE', value: priceRange });
  };

  return (
    <div className='w-full md:w-64 p-4 border-r bg-white'>
      <div className='mb-6'>
        <h3 className='font-bold text-lg mb-3'>Categories</h3>
        <div className='flex flex-col space-y-2'>
          {categories.map((cat) => (
            <label key={cat.id} className='flex items-center space-x-2 cursor-pointer'>
              <input
                type='checkbox'
                className='form-checkbox h-4 w-4 text-blue-600'
                checked={selectedCategoryIds.includes(cat.id)}
                onChange={() => handleCategoryChange(cat.id)}
              />
              <span className='text-gray-700'>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='font-bold text-lg mb-3'>Price Range</h3>
        <div className='flex items-center space-x-2'>
          <input
            type='number' placeholder='Min'
            className='w-20 border p-1 text-sm rounded'
            value={priceRange.min}
            onChange={(e) => {
              const value = e.target.value
              setPriceRange(prev => ({
                ...prev,
                min: value === "" ? "" : Math.max(0, Number(value))
              }))
            }}
          />
          <span>-</span>
          <input
            type='number' placeholder='Max'
            className='w-20 border p-1 text-sm rounded'
            value={priceRange.max}
            onChange={(e) => {
              const value = e.target.value
              setPriceRange(prev => ({
                ...prev,
                max: value === "" ? "" : Math.max(0, Number(value))
              }))
            }}
          />
          <button
            onClick={handlePriceSubmit}
            className='bg-blue-600 text-white p-1 rounded text-sm'
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;