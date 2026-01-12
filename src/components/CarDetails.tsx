import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CarDetailsProps {
  carId: number;
  onNavigate: (page: string, carId?: number) => void;
}

export function CarDetails({ carId, onNavigate }: CarDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'description'>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock car data - in real app this would come from API/database
  const car = {
    id: carId,
    name: '2023 Jeep Grand Cherokee Laredo 4x4',
    price: 33990,
    status: 'Available',
    location: '352 Sackville Drive',
    images: [
      'https://images.unsplash.com/photo-1605152277138-359efd4a6862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xrc3dhZ2VuJTIwY2FyJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjB0cnVjayUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760810699887-0f37d54da23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2JTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    overview: {
      vin: '1C4RJFAG0PC370181',
      drive: '4x4',
      seats: '5 seats',
      fuel: 'Gas',
      stockNumber: 'C25-1045 (P52-687)',
      mileage: '94000km',
      color: 'White',
      transmission: 'Automatic',
      engine: '3.6L 6-Cyl'
    },
    features: [
      { name: 'Sunroof', available: true },
      { name: 'AC', available: true },
      { name: 'Bluetooth', available: true },
      { name: 'Cruise Control', available: true },
      { name: 'Back-up Camera', available: true },
      { name: 'Lane Assist', available: true },
      { name: 'Parking Assistant', available: true },
      { name: 'Heated Seats', available: true },
      { name: 'Heated Steering Wheel', available: true },
      { name: 'Satellite Radio Sirius', available: true },
      { name: 'Power Seats', available: true },
      { name: 'Power Locks', available: true },
      { name: 'Power Windows', available: true },
      { name: 'Alloy Rims', available: true },
      { name: 'Near NXI', available: true }
    ],
    description: 'Want both? Exceeds well thruways.',
    totalFees: 799,
    taxFee: 0,
    biweeklyPayment: 0
  };

  const recommendedCars = [
    {
      id: 101,
      name: '2016 Toyota Highlander LE AWD 8 Passenger',
      price: 19990,
      mileage: 200000,
      image: 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xrc3dhZ2VuJTIwY2FyJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 102,
      name: '2016 JEEP RENEGADE SPORT',
      price: 14990,
      mileage: 320000,
      image: 'https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjB0cnVjayUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 103,
      name: '2021 GMC SIERRA 1500 SLE DURAMAX 3.0L TURBO-DIESEL 4WD Crew Cab',
      price: 33990,
      mileage: 302000,
      image: 'https://images.unsplash.com/photo-1760810699887-0f37d54da23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2JTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 104,
      name: '2019 FORD F-150 LARIAT 4WD SuperCrew 5.5\' Box',
      price: 28950,
      mileage: 178534,
      image: 'https://images.unsplash.com/photo-1669109777226-73e0ce597658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBzdXYlMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc2ODA2Nzk1MHww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Back Navigation */}
      <div className="bg-[rgb(250,250,253)] py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <button 
            onClick={() => onNavigate('shop')}
            className="text-[rgb(139,130,246)] text-sm hover:underline flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to All Vehicles
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px] py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative bg-[rgb(250,250,253)] rounded-2xl overflow-hidden mb-6">
              <img 
                src={car.images[currentImageIndex]} 
                alt={car.name}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              
              {/* Image Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {car.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImageIndex === index 
                        ? 'bg-white w-6' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>

              {/* Heart Icon */}
              <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-3 text-sm font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'text-[rgb(5,15,35)] border-b-2 border-[rgb(5,15,35)]'
                      : 'text-gray-500 hover:text-[rgb(5,15,35)]'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`pb-3 text-sm font-medium transition-colors ${
                    activeTab === 'features'
                      ? 'text-[rgb(5,15,35)] border-b-2 border-[rgb(5,15,35)]'
                      : 'text-gray-500 hover:text-[rgb(5,15,35)]'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-3 text-sm font-medium transition-colors ${
                    activeTab === 'description'
                      ? 'text-[rgb(5,15,35)] border-b-2 border-[rgb(5,15,35)]'
                      : 'text-gray-500 hover:text-[rgb(5,15,35)]'
                  }`}
                >
                  Description
                </button>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-semibold text-[rgb(5,15,35)] mb-6">Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">VIN</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-medium">{car.overview.vin}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Mileage</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-medium">{car.overview.mileage}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Drive</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-medium">{car.overview.drive}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Color</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-medium">{car.overview.color}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Seats</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-medium">{car.overview.seats}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Transmission</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-medium">{car.overview.transmission}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Fuel</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-medium">{car.overview.fuel}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Engine</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-medium">{car.overview.engine}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100 md:col-span-2">
                    <span className="text-gray-600 text-sm">Stock Number</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-medium">{car.overview.stockNumber}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div>
                <h3 className="text-xl font-semibold text-[rgb(5,15,35)] mb-6">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 py-2">
                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                        feature.available ? 'bg-[rgb(139,130,246)]' : 'bg-gray-300'
                      }`}>
                        {feature.available && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[rgb(5,15,35)] text-sm">{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description Tab */}
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-semibold text-[rgb(5,15,35)] mb-6">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{car.description}</p>
              </div>
            )}
          </div>

          {/* Right Column - Pricing and Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              {/* Status Badge */}
              <div className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                {car.status}
              </div>

              {/* Car Name */}
              <h1 className="text-2xl font-semibold text-[rgb(5,15,35)] mb-2">{car.name}</h1>
              
              {/* Price */}
              <p className="text-3xl font-bold text-[rgb(5,15,35)] mb-4">${car.price.toLocaleString()}</p>

              {/* Location */}
              <div className="flex items-start gap-2 mb-2">
                <svg className="w-5 h-5 text-[rgb(139,130,246)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-600">Located at: <span className="text-[rgb(139,130,246)]">{car.location}</span></p>
                  <button className="text-sm text-[rgb(139,130,246)] hover:underline">View Car Fax</button>
                </div>
              </div>

              <div className="h-px bg-gray-200 my-6"></div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button 
                  onClick={() => onNavigate('quiz')}
                  className="w-full bg-[rgb(139,130,246)] text-white font-medium py-3 px-6 rounded-lg hover:bg-[rgb(120,110,230)] transition-colors"
                >
                  Get Approved
                </button>
                <button className="w-full border-2 border-[rgb(139,130,246)] text-[rgb(139,130,246)] font-medium py-3 px-6 rounded-lg hover:bg-[rgb(139,130,246)] hover:text-white transition-colors">
                  Trade-In
                </button>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Price</span>
                  <span className="text-sm font-medium text-[rgb(5,15,35)]">${car.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Fees</span>
                  <span className="text-sm font-medium text-[rgb(5,15,35)]">${car.totalFees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax Fee</span>
                  <span className="text-sm font-medium text-[rgb(5,15,35)]">${car.taxFee}</span>
                </div>
              </div>

              {/* Total with Fees */}
              <div className="bg-[rgb(250,250,253)] rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Total with fees</span>
                  <span className="text-lg font-bold text-[rgb(5,15,35)]">${(car.price + car.totalFees + car.taxFee).toLocaleString()}</span>
                </div>
              </div>

              {/* Book Test Drive */}
              <button className="w-full bg-white border-2 border-[rgb(139,130,246)] text-[rgb(139,130,246)] font-medium py-3 px-6 rounded-lg hover:bg-[rgb(139,130,246)] hover:text-white transition-colors mb-4">
                Book a Test Drive
              </button>

              {/* Schedule Banner */}
              <div className="bg-[rgb(139,130,246)] rounded-lg p-4 text-white text-center">
                <p className="text-sm font-medium mb-1">Schedule An Appt today</p>
                <p className="text-xs">We best offer keeps your present!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="mt-16 text-center py-12 bg-[rgb(250,250,253)] rounded-2xl">
          <p className="text-sm text-[rgb(139,130,246)] uppercase tracking-wider mb-3">GET IN TOUCH</p>
          <h2 className="text-3xl font-semibold text-[rgb(5,15,35)] mb-6">
            Have a questions about this<br />vehicle?
          </h2>
          <button className="bg-[rgb(139,130,246)] text-white font-medium py-3 px-8 rounded-lg hover:bg-[rgb(120,110,230)] transition-colors">
            Get in touch
          </button>
        </div>

        {/* Explore Other Cars */}
        <div className="mt-16">
          <p className="text-sm text-[rgb(139,130,246)] uppercase tracking-wider text-center mb-3">EXPLORE OTHER CARS</p>
          <h2 className="text-3xl font-semibold text-[rgb(5,15,35)] text-center mb-8">Explore other cars</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedCars.map((recCar) => (
              <div 
                key={recCar.id}
                onClick={() => onNavigate(`car-${recCar.id}`, recCar.id)}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img src={recCar.image} alt={recCar.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    UP TO $2.5 Deal
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-[rgb(5,15,35)] mb-3 line-clamp-2 min-h-[40px]">
                    {recCar.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-[rgb(5,15,35)]">${recCar.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">{recCar.mileage.toLocaleString()}km</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}