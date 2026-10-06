'use client';
import Link from 'next/link';
import { useStore } from '@/store';
import { ShoppingCart, Leaf } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const cart = useStore((state) => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();

  // Hide customer nav on dashboard
  if (pathname.startsWith('/dashboard')) return null;

  return (
    <nav className="bg-forest text-off-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-soft-pink" />
            <Link href="/" className="text-xl font-bold tracking-wider">BLOOMNOW</Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="hover:text-soft-pink transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-soft-pink transition-colors">Shop</Link>
            <Link href="/orders" className="hover:text-soft-pink transition-colors">My Orders</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 hover:text-soft-pink transition-colors flex items-center">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-forest transform translate-x-1/4 -translate-y-1/4 bg-soft-pink rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/dashboard" className="bg-off-white text-forest px-4 py-2 rounded-md font-semibold text-sm hover:bg-soft-pink hover:text-forest transition-colors">
              Business Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
