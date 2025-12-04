import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({products}) => {
  const dummyProducts = Array.from({ length: 12 });

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {dummyProducts.map((_, index) => (
        <ProductCard key={index} product={products} />
      ))}
    </div>
  );
};

export default ProductGrid;