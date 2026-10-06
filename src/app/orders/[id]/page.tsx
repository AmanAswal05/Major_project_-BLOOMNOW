'use client';
import { useStore } from '@/store';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Check } from 'lucide-react';

const statuses = ['Confirmed', 'Preparing', 'Packed', 'Out for Delivery', 'Delivered'];

export default function OrderTracking() {
  const params = useParams();
  const id = params.id as string;
  const { orders } = useStore();
  const order = orders.find(o => o.id === id);

  if (!order) return <div className="p-8 text-center">Order not found</div>;

  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-forest">Track Order {order.id}</h1>
        <Link href="/orders" className="text-forest underline font-semibold">Back to Orders</Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="absolute left-[15px] top-0 bottom-0 w-1 bg-gray-200 md:left-0 md:top-[15px] md:bottom-auto md:w-full md:h-1 z-0"></div>
          
          {/* Progress Bar Fill */}
          <div 
            className="absolute left-[15px] top-0 w-1 bg-forest md:left-0 md:top-[15px] md:bottom-auto md:h-1 z-0 transition-all duration-500"
            style={{ 
              height: typeof window !== 'undefined' && window.innerWidth < 768 ? `${(currentStatusIndex / (statuses.length - 1)) * 100}%` : '4px',
              width: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${(currentStatusIndex / (statuses.length - 1)) * 100}%` : '4px'
            }}
          ></div>

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 relative z-10">
            {statuses.map((status, index) => {
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              return (
                <div key={status} className="flex md:flex-col items-center gap-4 md:gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    isCompleted ? 'bg-forest text-white' : 'bg-gray-200 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-soft-pink' : ''}`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <div className={`font-semibold ${isCompleted ? 'text-forest' : 'text-gray-400'}`}>
                    {status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-bold mb-4 text-forest">Order Details</h3>
          <div className="grid grid-cols-2 gap-y-4">
            <div className="text-gray-500">Items:</div>
            <div className="font-semibold">{order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}</div>
            <div className="text-gray-500">Total:</div>
            <div className="font-semibold">₹{order.totalAmount}</div>
            <div className="text-gray-500">Delivery:</div>
            <div className="font-semibold">{order.deliveryDate} ({order.deliverySlot})</div>
          </div>
        </div>
      </div>
    </div>
  );
}
