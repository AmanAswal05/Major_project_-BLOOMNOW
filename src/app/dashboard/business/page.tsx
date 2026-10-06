export default function BusinessModel() {
  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-forest mb-2">Business Model Summary</h1>
      <p className="text-gray-600 mb-8">How BloomNow creates, delivers, and captures value.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Customers */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-forest text-off-white rounded-lg flex items-center justify-center mb-4 text-xl">👥</div>
          <h2 className="text-xl font-bold text-forest mb-3">Customers</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Individual gift buyers</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Events & Weddings</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Corporate clients (regular supply)</li>
          </ul>
        </div>

        {/* Value Proposition */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-forest text-off-white rounded-lg flex items-center justify-center mb-4 text-xl">💎</div>
          <h2 className="text-xl font-bold text-forest mb-3">Value Proposition</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Easy, beautiful ordering experience</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Reliable delivery via capacity management</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Fresh flowers guaranteed by peak-day preparation</li>
          </ul>
        </div>

        {/* Revenue Streams */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-forest text-off-white rounded-lg flex items-center justify-center mb-4 text-xl">💰</div>
          <h2 className="text-xl font-bold text-forest mb-3">Revenue Streams</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Direct flower sales (margins)</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Delivery slot fees</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Premium peak-day delivery pricing</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Corporate bulk orders</li>
          </ul>
        </div>

        {/* Key Partners */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-forest text-off-white rounded-lg flex items-center justify-center mb-4 text-xl">🤝</div>
          <h2 className="text-xl font-bold text-forest mb-3">Key Partners</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Local & regional flower farms</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Packaging & materials suppliers</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Last-mile delivery contractors</li>
          </ul>
        </div>

        {/* Cost Structure */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-forest text-off-white rounded-lg flex items-center justify-center mb-4 text-xl">📉</div>
          <h2 className="text-xl font-bold text-forest mb-3">Cost Structure</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Perishable inventory (flowers)</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Packaging materials</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Operations & floristry labour</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Delivery & logistics costs</li>
            <li className="flex items-start gap-2"><span className="text-soft-pink">•</span> Technology & marketing</li>
          </ul>
        </div>
        
        {/* The Core Insight */}
        <div className="bg-forest text-off-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow lg:col-span-3 flex flex-col items-center justify-center text-center mt-4">
          <h2 className="text-2xl font-bold text-soft-pink mb-2">The Business Secret</h2>
          <p className="text-lg max-w-3xl">
            While customers see a simple flower shop, BloomNow's true advantage is its <strong className="text-white">internal demand planning engine</strong>. By anticipating festival spikes, securing inventory early, and strictly managing delivery slots, we maintain quality and reliability when competitors fail.
          </p>
        </div>
      </div>
    </div>
  );
}
