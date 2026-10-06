'use client';
import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const { cart, deliverySlots, placeOrder } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [cart.length, router]);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
    slot: '',
    payment: 'Demo Payment'
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const total = subtotal + 50; // Delivery fee

  if (!mounted || cart.length === 0) {
    return <div className="p-8 text-center text-forest">Loading checkout...</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slot) {
      alert("Please select a delivery slot");
      return;
    }

    const orderId = placeOrder({
      customerName: formData.name,
      customerMobile: formData.mobile,
      customerEmail: formData.email,
      customerAddress: formData.address,
      items: cart,
      totalAmount: total,
      deliveryDate: formData.date,
      deliverySlot: formData.slot
    });

    router.push(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-forest">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Customer Info */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-forest">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Name</label>
              <input required type="text" className="w-full border p-2 rounded-md" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Mobile</label>
              <input required type="tel" className="w-full border p-2 rounded-md" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
              <input required type="email" className="w-full border p-2 rounded-md" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Delivery Address</label>
              <textarea required className="w-full border p-2 rounded-md h-24" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
            </div>
          </div>
        </section>

        {/* Delivery Time */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-forest">Delivery Time</h2>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Date</label>
            <input type="date" required className="border p-2 rounded-md" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Select Slot</label>
            {deliverySlots.map(slot => {
              const isFull = slot.booked >= slot.capacity;
              const almostFull = slot.booked >= slot.capacity - 2 && !isFull;
              return (
                <div 
                  key={slot.id} 
                  className={`border p-4 rounded-lg flex justify-between items-center ${isFull ? 'bg-gray-100 opacity-60' : 'cursor-pointer hover:border-forest'} ${formData.slot === slot.timeRange ? 'border-forest ring-2 ring-forest bg-forest/5' : ''}`}
                  onClick={() => !isFull && setFormData({...formData, slot: slot.timeRange})}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={formData.slot === slot.timeRange} readOnly disabled={isFull} className="w-4 h-4 text-forest focus:ring-forest" />
                    <span className="font-semibold text-forest">{slot.timeRange}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {isFull ? <span className="text-red-500">Full</span> : 
                     almostFull ? <span className="text-orange-500">Almost Full</span> : 
                     <span className="text-green-600">Available</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-forest">Payment</h2>
          <select className="w-full border p-2 rounded-md font-semibold" value={formData.payment} onChange={e => setFormData({...formData, payment: e.target.value})}>
            <option value="Demo Payment">Demo Payment (No real charge)</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>
        </section>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl">
            <span className="font-semibold">Total Amount:</span> <span className="font-bold text-forest">₹{total}</span>
          </div>
          <button type="submit" className="w-full md:w-auto bg-forest text-off-white px-10 py-3 rounded-full font-bold text-lg hover:bg-dark-green transition-colors">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
