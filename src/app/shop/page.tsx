'use client';
import { useState } from 'react';
import { useStore, Product } from '@/store';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Shop() {
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const router = useRouter();

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || p.category === category;
    return matchesSearch && matchesCat;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Optional: show a small toast or just let the cart counter update
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-forest">Shop Flowers</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search flowers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-forest bg-white w-full sm:w-64"
            />
          </div>
          
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-forest bg-white"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
            <div className="h-48 w-full relative overflow-hidden bg-soft-pink/20">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-forest leading-tight">{product.name}</h3>
                <span className="font-bold text-forest whitespace-nowrap ml-2">₹{product.price}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              
              <div className="mt-auto">
                <div className="text-sm mb-3">
                  <span className={`px-2 py-1 rounded-full ${
                    product.availability === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.availability}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-forest text-off-white py-2 rounded-full font-bold hover:bg-dark-green transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
