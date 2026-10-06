'use client';
import { useStore } from '@/store';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

export default function DemandPlanning() {
  const { isPeakDay, expectedOrders, orders } = useStore();

  const normalExpected = 20;
  const festivalExpected = 70;
  
  const chartData = [
    { name: 'Normal Day', expected: normalExpected },
    { name: 'Festival Eve', expected: 55 },
    { name: 'Festival Day', expected: festivalExpected },
  ];

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold text-forest mb-2">Demand Planning</h1>
      <p className="text-gray-600 mb-8">Analyze expected orders to prepare inventory and capacity.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 font-semibold mb-1">Normal Daily Orders</h3>
          <div className="text-3xl font-bold text-forest">{normalExpected}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 font-semibold mb-1">Expected Festival Orders</h3>
          <div className="text-3xl font-bold text-forest">{festivalExpected}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 font-semibold mb-1">Confirmed Orders</h3>
          <div className="text-3xl font-bold text-forest">{orders.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 font-semibold mb-1">Expected Additional</h3>
          <div className="text-3xl font-bold text-forest">{Math.max(0, expectedOrders - orders.length)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-forest mb-6">Illustrative Demo Forecast</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fill: '#4b5563'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#4b5563'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="expected" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#E8A0A8' : '#12372A'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-6 rounded-xl shadow-sm border ${isPeakDay ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
          <h3 className={`text-xl font-bold mb-4 ${isPeakDay ? 'text-red-800' : 'text-forest'}`}>WHAT SHOULD BLOOMNOW DO?</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className={`mt-1 p-1 rounded-full ${isPeakDay ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <span className={`font-bold ${isPeakDay ? 'text-red-800' : 'text-forest'}`}>Increase flower procurement</span>
                <p className="text-sm text-gray-600 mt-1">Order enough roses and lilies to cover the {festivalExpected} expected orders.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className={`mt-1 p-1 rounded-full ${isPeakDay ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <span className={`font-bold ${isPeakDay ? 'text-red-800' : 'text-forest'}`}>Prepare additional packaging</span>
                <p className="text-sm text-gray-600 mt-1">Ensure enough gift boxes and ribbons are stocked.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className={`mt-1 p-1 rounded-full ${isPeakDay ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <span className={`font-bold ${isPeakDay ? 'text-red-800' : 'text-forest'}`}>Allocate additional staff</span>
                <p className="text-sm text-gray-600 mt-1">Bring in 2 extra florists to prepare bouquets faster.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className={`mt-1 p-1 rounded-full ${isPeakDay ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <span className={`font-bold ${isPeakDay ? 'text-red-800' : 'text-forest'}`}>Review delivery capacity</span>
                <p className="text-sm text-gray-600 mt-1">Monitor slots closely. If they fill up, disable them to avoid late deliveries.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
