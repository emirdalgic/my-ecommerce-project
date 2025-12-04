import React from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  // --- DIRECTIVES ---
  // 1. STATE: 'products' dizisi için useState([]).
  // 2. STATE: 'loading' durumu için useState(true).
  // 3. EFFECT: useEffect içinde 'productService.getProducts(page=0, size=10)' çağır.
  //    - Veri gelince setProducts(data.content) yap.
  //    - setLoading(false) yap.

  // if (loading) return <div className="text-center mt-10">Yükleniyor...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Vitrin Ürünleri</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* DIRECTIVE: products.map ile dön ve ProductCard componentini bas */}
        {/* <ProductCard key={product.id} product={product} /> */}
        
        {/* Şimdilik boş görünmesin diye statik kart */}
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      
      {/* Pagination Butonları (V2'de buraya eklenecek) */}
    </div>
  );
};

export default HomePage;