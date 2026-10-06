import Link from 'next/link';
import { Home, LayoutDashboard, ListOrdered, BarChart3, Package, Truck, Store } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 text-forest">
      <aside className="w-64 bg-forest text-off-white flex flex-col fixed inset-y-0 z-10">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-wider text-soft-pink mb-1">BLOOMNOW</h2>
          <p className="text-xs text-gray-300">Operations Dashboard</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-green transition-colors font-semibold">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/dashboard/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-green transition-colors font-semibold">
            <ListOrdered className="w-5 h-5" /> Orders
          </Link>
          <Link href="/dashboard/planning" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-green transition-colors font-semibold">
            <BarChart3 className="w-5 h-5" /> Demand Planning
          </Link>
          <Link href="/dashboard/inventory" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-green transition-colors font-semibold">
            <Package className="w-5 h-5" /> Inventory
          </Link>
          <Link href="/dashboard/delivery" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-green transition-colors font-semibold">
            <Truck className="w-5 h-5" /> Delivery
          </Link>
          <Link href="/dashboard/business" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-green transition-colors font-semibold">
            <Store className="w-5 h-5" /> Business Model
          </Link>
        </nav>
        <div className="p-4 border-t border-dark-green">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-green transition-colors font-semibold text-soft-pink">
            <Home className="w-5 h-5" /> Back to Store
          </Link>
        </div>
      </aside>
      
      <main className="flex-1 ml-64 p-8">
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-lg font-bold flex items-center justify-between mb-8 shadow-sm">
          <span>⚠️ DEMO MODE: Data is illustrative for presentation.</span>
        </div>
        {children}
      </main>
    </div>
  );
}
