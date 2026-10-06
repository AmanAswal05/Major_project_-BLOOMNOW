'use client';
import { useStore, OrderStatus } from '@/store';
import { useState } from 'react';

const statusOptions: OrderStatus[] = ['Confirmed', 'Preparing', 'Packed', 'Out for Delivery', 'Delivered'];

export default function DashboardOrders() {
  const { orders, updateOrderStatus } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders
    .filter(o => o.id.toLowerCase().includes(searchTerm.toLowerCase()) || o.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="max-w-7xl">
      <h1 className="text-3xl font-bold text-forest mb-2">Order Management</h1>
      <p className="text-gray-600 mb-8">View and update customer order statuses.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <input 
            type="text" 
            placeholder="Search Order ID or Customer..." 
            className="border p-2 rounded-md w-64 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="text-sm text-gray-500 font-semibold">Total Orders: {orders.length}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm border-b">
              <tr>
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold text-right">Amount</th>
                <th className="p-4 font-semibold">Delivery Slot</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-forest">{order.id}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4 text-sm text-gray-600 max-w-xs truncate">
                    {order.items.map(i => i.product.name).join(', ')}
                  </td>
                  <td className="p-4 text-right font-semibold">₹{order.totalAmount}</td>
                  <td className="p-4 text-sm whitespace-nowrap">{order.deliverySlot}</td>
                  <td className="p-4">
                    <select 
                      className={`text-sm font-semibold rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-forest ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    >
                      {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
