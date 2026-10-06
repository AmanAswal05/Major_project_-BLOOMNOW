'use client';
import { useStore } from '@/store';
import Link from 'next/link';

export default function MyOrders() {
  const { orders } = useStore();

  // Sort by createdAt descending
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (sortedOrders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
        <Link href="/shop" className="bg-forest text-off-white px-8 py-3 rounded-full font-bold hover:bg-dark-green transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-forest">My Orders</h1>
      
      <div className="space-y-6">
        {sortedOrders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-bold text-xl text-forest">{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                  order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600">
                {order.items.map(i => i.product.name).join(', ')}
              </p>
              <div className="text-sm font-semibold">
                Amount: ₹{order.totalAmount} • Delivery: {order.deliveryDate} ({order.deliverySlot})
              </div>
            </div>
            
            <Link 
              href={`/orders/${order.id}`}
              className="bg-forest text-off-white px-6 py-2 rounded-full font-bold hover:bg-dark-green transition-colors whitespace-nowrap"
            >
              Track Order
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
