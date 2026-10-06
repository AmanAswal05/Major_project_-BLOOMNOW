'use client';
import { useStore } from '@/store';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-8 text-gray-600">Looks like you haven't added any flowers yet.</p>
        <Link href="/shop" className="bg-forest text-off-white px-8 py-3 rounded-full font-bold hover:bg-dark-green transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-forest">Your Cart</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-soft-pink/20 rounded-lg overflow-hidden shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-forest">{item.product.name}</h3>
                <p className="text-forest font-semibold">₹{item.product.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-forest"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-forest"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors ml-4"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full md:w-80 h-fit bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-forest">Order Summary</h2>
          <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-forest">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-semibold text-forest">₹{deliveryFee}</span>
            </div>
          </div>
          <div className="flex justify-between mb-6 text-lg">
            <span className="font-bold text-forest">Total</span>
            <span className="font-bold text-forest">₹{total}</span>
          </div>
          
          <Link href="/checkout" className="block w-full bg-forest text-off-white text-center py-3 rounded-full font-bold hover:bg-dark-green transition-colors mb-3">
            Proceed to Checkout
          </Link>
          <Link href="/shop" className="block w-full border border-forest text-forest text-center py-3 rounded-full font-bold hover:bg-gray-50 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
