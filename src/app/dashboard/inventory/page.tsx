'use client';
import { useStore } from '@/store';
import { Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Inventory() {
  const { isPeakDay, inventory, createPurchaseOrder } = useStore();
  const [purchased, setPurchased] = useState<Record<string, boolean>>({});

  const handlePurchase = (id: string, amount: number) => {
    createPurchaseOrder(id, amount);
    setPurchased(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setPurchased(prev => ({ ...prev, [id]: false }));
    }, 3000);
  };

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-forest mb-2">Inventory & Procurement</h1>
      <p className="text-gray-600 mb-8">Manage stock levels and create purchase orders.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Current Inventory */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-forest mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" /> Current Stock
          </h2>
          <div className="space-y-4">
            {inventory.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-semibold text-forest">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.type}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{item.currentStock}</div>
                  <div className={`text-xs font-bold px-2 py-1 rounded-full inline-block mt-1 ${
                    item.status === 'Healthy' ? 'bg-green-100 text-green-800' :
                    item.status === 'Low' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Procurement Recommendations */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-forest mb-4">Procurement Recommendations</h2>
          {isPeakDay ? (
             <div className="bg-orange-100 text-orange-800 p-3 rounded-lg text-sm font-semibold mb-4 flex items-center gap-2">
               <AlertTriangle className="w-5 h-5" /> Peak Day Expected Demand Applied
             </div>
          ) : (
            <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm font-semibold mb-4">
              Normal Daily Expected Demand Applied
            </div>
          )}

          <div className="space-y-4">
            {inventory.map(item => {
              const expected = isPeakDay ? item.expectedRequirementPeak : item.expectedRequirementNormal;
              const recommended = Math.max(0, expected - item.currentStock);
              
              if (recommended === 0 && item.status === 'Healthy') return null;

              return (
                <div key={`proc-${item.id}`} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-bold text-forest text-lg">{item.name}</div>
                    {purchased[item.id] && <div className="text-green-600 flex items-center gap-1 text-sm font-bold"><CheckCircle className="w-4 h-4" /> Ordered</div>}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-gray-500 text-xs">Current</div>
                      <div className="font-semibold">{item.currentStock}</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-gray-500 text-xs">Expected</div>
                      <div className="font-semibold">{expected}</div>
                    </div>
                    <div className="bg-soft-pink/20 p-2 rounded text-forest">
                      <div className="text-xs font-bold">Recommended</div>
                      <div className="font-bold text-lg">{Math.max(10, recommended)}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handlePurchase(item.id, Math.max(10, recommended))}
                    disabled={purchased[item.id]}
                    className="w-full bg-forest text-off-white py-2 rounded-lg font-bold hover:bg-dark-green transition-colors disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    Create Purchase Order
                  </button>
                </div>
              );
            })}
            
            {inventory.every(item => {
              const expected = isPeakDay ? item.expectedRequirementPeak : item.expectedRequirementNormal;
              return item.currentStock >= expected && item.status === 'Healthy';
            }) && (
              <div className="text-center py-8 text-gray-500 flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-green-400 mb-2" />
                No procurement recommended at this time.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
