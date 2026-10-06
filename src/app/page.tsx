import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-forest text-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-soft-pink">
            Flowers for Every Special Moment.
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-off-white/90">
            Fresh flowers, simple ordering, reliable delivery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/shop" className="bg-soft-pink text-forest px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors">
              Shop Flowers
            </Link>
            <Link href="/orders" className="border-2 border-off-white text-off-white px-8 py-4 rounded-full font-bold text-lg hover:bg-off-white hover:text-forest transition-colors">
              View My Orders
            </Link>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-16 px-4 bg-off-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-forest">Choose by Occasion</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Birthday', 'Anniversary', 'Celebration', 'Festival'].map((occ) => (
              <div key={occ} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 text-center cursor-pointer border border-gray-100 flex flex-col items-center justify-center h-40">
                <h3 className="text-xl font-semibold text-forest">{occ}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-forest">How BloomNow Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-forest text-soft-pink w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Choose your flowers</h3>
              <p className="text-gray-600">Select from our premium fresh collection.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-forest text-soft-pink w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Select delivery time</h3>
              <p className="text-gray-600">Pick a convenient slot for delivery.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-forest text-soft-pink w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. We prepare and deliver</h3>
              <p className="text-gray-600">Fresh flowers arrive at your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Message */}
      <section className="bg-forest text-off-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Behind every order, BloomNow uses demand planning to prepare for busy days.
          </h2>
          <Link href="/dashboard" className="inline-flex items-center gap-2 bg-muted-gold text-forest px-6 py-3 rounded-full font-bold hover:bg-white transition-colors">
            See How We Manage Peak Days
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
