'use client';
import { useStore } from '@/store';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function OrderConfirmation() {
  const params = useParams();
  const id = params.id as string;
  const { orders } = useStore();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <Link href="/shop" className="text-forest underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-24 h-24 text-green-500" />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-forest">Your order has been confirmed!</h1>
      <p className="text-xl text-gray-600 mb-8">Thank you for choosing BloomNow.</p>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 text-left">
        <div className="grid grid-cols-2 gap-y-4 text-lg">
          <div className="text-gray-500">Order ID:</div>
          <div className="font-bold text-forest">{order.id}</div>
          
          <div className="text-gray-500">Amount:</div>
          <div className="font-bold text-forest">₹{order.totalAmount}</div>
          
          <div className="text-gray-500">Delivery Date:</div>
          <div className="font-bold text-forest">{order.deliveryDate}</div>
          
          <div className="text-gray-500">Delivery Slot:</div>
          <div className="font-bold text-forest">{order.deliverySlot}</div>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-bold mb-2">Items:</h3>
          <ul className="space-y-2">
            {order.items.map(item => (
              <li key={item.product.id} className="flex justify-between">
                <span>{item.quantity}x {item.product.name}</span>
                <span>₹{item.product.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/orders" className="bg-forest text-off-white px-8 py-3 rounded-full font-bold hover:bg-dark-green transition-colors">
          View My Order
        </Link>
        <Link href="/" className="border border-forest text-forest px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
