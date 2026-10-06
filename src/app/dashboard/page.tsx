'use client';
import { useStore } from '@/store';
import Link from 'next/link';
import { TrendingUp, AlertTriangle, RefreshCcw, Package, Truck, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { isPeakDay, expectedOrders, inventory, deliverySlots, simulatePeakDay, resetDemo, orders } = useStore();

  const inventoryIssues = inventory.filter(i => i.status !== 'Healthy').length;
  const avgDeliveryUsage = (deliverySlots.reduce((acc, s) => acc + s.booked, 0) / deliverySlots.reduce((acc, s) => acc + s.capacity, 0)) * 100;
  
  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-forest mb-2">BloomNow Operations</h1>
          <p className="text-xl text-gray-600">Prepare for demand. Manage fulfilment. Deliver on time.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={resetDemo}
            className="flex items-center gap-2 bg-gray-200 text-forest px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> Reset Demo
          </button>
          {!isPeakDay ? (
            <button 
              onClick={simulatePeakDay}
              className="flex items-center gap-2 bg-soft-pink text-forest px-6 py-3 rounded-lg font-bold shadow-sm hover:shadow-md transition-all animate-pulse"
            >
              <TrendingUp className="w-5 h-5" /> SIMULATE PEAK DAY
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-red-100 text-red-700 px-6 py-3 rounded-lg font-bold border border-red-200 shadow-sm">
              <AlertTriangle className="w-5 h-5" /> PEAK DAY ACTIVE
            </div>
          )}
        </div>
      </div>

      {isPeakDay && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-red-800 mb-2">Demand has increased significantly.</h2>
          <p className="text-red-700 mb-4 text-lg">BloomNow needs to prepare additional flowers, packaging and delivery capacity.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg flex items-center gap-3 border border-red-100 text-red-800 font-semibold"><AlertTriangle className="w-5 h-5"/> Increase flower procurement</div>
            <div className="bg-white p-3 rounded-lg flex items-center gap-3 border border-red-100 text-red-800 font-semibold"><AlertTriangle className="w-5 h-5"/> Prepare more packaging</div>
            <div className="bg-white p-3 rounded-lg flex items-center gap-3 border border-red-100 text-red-800 font-semibold"><AlertTriangle className="w-5 h-5"/> Review delivery slots</div>
            <div className="bg-white p-3 rounded-lg flex items-center gap-3 border border-red-100 text-red-800 font-semibold"><AlertTriangle className="w-5 h-5"/> Allocate additional staff</div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 font-semibold mb-1">Expected Orders</h3>
          <div className="text-4xl font-bold text-forest">{expectedOrders}</div>
          <div className="text-sm mt-2 text-gray-500">Currently {orders.length} confirmed</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 font-semibold mb-1">Inventory Health</h3>
          <div className={`text-3xl font-bold ${inventoryIssues > 0 ? 'text-orange-500' : 'text-green-500'}`}>
            {inventoryIssues > 0 ? `${inventoryIssues} Items Low` : 'Healthy'}
          </div>
          <Link href="/dashboard/inventory" className="text-sm text-forest underline mt-2 block">View Inventory</Link>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 font-semibold mb-1">Delivery Capacity</h3>
          <div className={`text-4xl font-bold ${avgDeliveryUsage > 90 ? 'text-red-500' : avgDeliveryUsage > 75 ? 'text-orange-500' : 'text-green-500'}`}>
            {Math.round(avgDeliveryUsage)}%
          </div>
          <div className="text-sm mt-2 text-gray-500">Used today</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 font-semibold mb-1">Demand Level</h3>
          <div className={`text-4xl font-bold ${isPeakDay ? 'text-red-500' : 'text-green-500'}`}>
            {isPeakDay ? 'HIGH' : 'NORMAL'}
          </div>
          <div className="text-sm mt-2 text-gray-500">{isPeakDay ? 'Festival event active' : 'Standard daily volume'}</div>
        </div>
      </div>

      {/* Business Flow Visual */}
      <h2 className="text-2xl font-bold text-forest mb-6">BloomNow Process Flow</h2>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-12">
        <Link href="/dashboard/planning" className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer w-32">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white mb-3 ${isPeakDay ? 'bg-red-500' : 'bg-forest'}`}>
            <TrendingUp className="w-8 h-8" />
          </div>
          <span className="font-bold text-center text-forest">DEMAND</span>
        </Link>
        <ArrowRight className="text-gray-300 hidden md:block" />
        <Link href="/dashboard/inventory" className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer w-32">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white mb-3 ${inventoryIssues > 0 ? 'bg-orange-500' : 'bg-forest'}`}>
            <Package className="w-8 h-8" />
          </div>
          <span className="font-bold text-center text-forest">INVENTORY</span>
        </Link>
        <ArrowRight className="text-gray-300 hidden md:block" />
        <Link href="/dashboard/inventory" className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer w-32">
          <div className="w-16 h-16 rounded-full bg-forest flex items-center justify-center text-white mb-3">
            <RefreshCcw className="w-8 h-8" />
          </div>
          <span className="font-bold text-center text-forest">PROCURE</span>
        </Link>
        <ArrowRight className="text-gray-300 hidden md:block" />
        <Link href="/dashboard/delivery" className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer w-32">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white mb-3 ${avgDeliveryUsage > 90 ? 'bg-red-500' : 'bg-forest'}`}>
            <Truck className="w-8 h-8" />
          </div>
          <span className="font-bold text-center text-forest">DELIVERY</span>
        </Link>
        <ArrowRight className="text-gray-300 hidden md:block" />
        <Link href="/dashboard/orders" className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer w-32">
          <div className="w-16 h-16 rounded-full bg-forest flex items-center justify-center text-white mb-3">
            <CheckCircleIcon className="w-8 h-8" />
          </div>
          <span className="font-bold text-center text-forest">FULFIL</span>
        </Link>
      </div>

      {/* Story Section */}
      <div className="bg-forest text-off-white p-10 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Why BloomNow?</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-dark-green p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-soft-pink">1. KNOW THE DEMAND</h3>
            <p className="text-gray-300">Understand expected orders before the peak day arrives using smart forecasting.</p>
          </div>
          <div className="bg-dark-green p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-soft-pink">2. PREPARE THE STOCK</h3>
            <p className="text-gray-300">Plan flowers and packaging procurement before inventory runs out.</p>
          </div>
          <div className="bg-dark-green p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-soft-pink">3. DELIVER ON TIME</h3>
            <p className="text-gray-300">Manage delivery slots strictly before they become overloaded and fail.</p>
          </div>
        </div>
        <div className="text-center text-xl font-semibold border-t border-dark-green pt-8 text-gray-300">
          "BloomNow is not only an online flower shop.<br/>It is a simple demand-planning system for handling peak-day orders."
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}
