'use client';
import { useStore } from '@/store';
import { Truck } from 'lucide-react';

export default function Delivery() {
  const { deliverySlots } = useStore();

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-forest mb-2">Delivery Capacity</h1>
      <p className="text-gray-600 mb-8">Monitor delivery slot utilization to prevent fulfillment failures.</p>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Truck className="w-6 h-6 text-forest" />
          <h2 className="text-xl font-bold text-forest">Today's Slots</h2>
        </div>

        <div className="space-y-6">
          {deliverySlots.map(slot => {
            const usage = (slot.booked / slot.capacity) * 100;
            const isFull = usage >= 100;
            const almostFull = usage >= 80 && !isFull;
            
            return (
              <div key={slot.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <div className="font-bold text-lg text-forest">{slot.timeRange}</div>
                    <div className="text-sm text-gray-500">{slot.booked} / {slot.capacity} orders assigned</div>
                  </div>
                  <div>
                    {isFull ? (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">FULL (Disabled)</span>
                    ) : almostFull ? (
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">ALMOST FULL</span>
                    ) : (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">AVAILABLE</span>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden mt-3 relative">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      isFull ? 'bg-red-500' : almostFull ? 'bg-orange-400' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(100, usage)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
