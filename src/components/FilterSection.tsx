import React, { useState } from 'react';
import { Search } from 'lucide-react';

export function FilterSection() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [yearRange, setYearRange] = useState([2000, 2025]);
  const [mileageRange, setMileageRange] = useState([0, 200000]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([]);
  const [selectedFuelType, setSelectedFuelType] = useState<string[]>([]);
  const [selectedDriveTrain, setSelectedDriveTrain] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  return (
    <div className="w-full px-4 md:px-8 lg:px-20 py-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {[
          { label: 'Brand', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F16af6440cc77d4fa1f150841821b348c62e0a2e8.svg?generation=1768065159919974&alt=media' },
          { label: 'Type', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fb5375f123dde1abf12d8577d7f4df253c6b0f3a2.svg?generation=1768065159967383&alt=media' },
          { label: 'Year', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F99f2cb9bfce982aff53619abd01f8488b0239aac.svg?generation=1768065160014167&alt=media' },
          { label: 'Price', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fea845e5e4a39de74c9d2f1e829f9145726cafeca.svg?generation=1768065159940576&alt=media' },
          { label: 'Mileage', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F89731a77a6c77859f2598401972f44ce6d686aa1.svg?generation=1768065159941285&alt=media' },
          { label: 'More', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6eb6fcb223a2b114c647f41808db4d092a6737ca.svg?generation=1768065159921392&alt=media' }
        ].map((filter) => (
          <button 
            key={filter.label}
            type="button" 
            onClick={() => {
              if (filter.label === 'More') {
                setShowAdvancedFilters(!showAdvancedFilters);
              } else {
                setActiveFilter(activeFilter === filter.label ? null : filter.label);
              }
            }}
            className={`flex items-center bg-white border gap-[6px] py-2 px-3 rounded-md transition-colors ${
              (filter.label === 'More' && showAdvancedFilters) || activeFilter === filter.label
                ? 'border-[rgb(139,_130,_246)] text-[rgb(139,_130,_246)]'
                : 'border-[rgba(5,_15,_35,_0.08)] text-[rgb(5,_15,_35)] hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
            }`}
          >
            <img src={filter.icon} className="w-[15px] opacity-[0.3]" alt="" />
            <span className="text-sm">{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Transmission */}
            <div>
              <h3 className="text-[rgb(5,_15,_35)] font-semibold text-sm mb-3">Transmission</h3>
              <div className="flex flex-wrap gap-2">
                {['Robot', 'Manual', 'Automatic'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectedTransmission(prev =>
                        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
                      );
                    }}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      selectedTransmission.includes(item)
                        ? 'bg-[rgb(139,_130,_246)] text-white'
                        : 'bg-gray-100 text-[rgb(5,_15,_35)] hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel Type */}
            <div>
              <h3 className="text-[rgb(5,_15,_35)] font-semibold text-sm mb-3">Fuel Type</h3>
              <div className="flex flex-wrap gap-2">
                {['Electric', 'Flex Fuel', 'Diesel', 'Hybrid', 'Gas'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectedFuelType(prev =>
                        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
                      );
                    }}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      selectedFuelType.includes(item)
                        ? 'bg-[rgb(139,_130,_246)] text-white'
                        : 'bg-gray-100 text-[rgb(5,_15,_35)] hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Drive Train */}
            <div>
              <h3 className="text-[rgb(5,_15,_35)] font-semibold text-sm mb-3">Drive Train</h3>
              <div className="flex flex-wrap gap-2">
                {['Four Wheel Drive', 'Rear Wheel Drive', 'Front Wheel Drive', 'All Wheel Drive', '4x4'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectedDriveTrain(prev =>
                        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
                      );
                    }}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      selectedDriveTrain.includes(item)
                        ? 'bg-[rgb(139,_130,_246)] text-white'
                        : 'bg-gray-100 text-[rgb(5,_15,_35)] hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Seats */}
            <div>
              <h3 className="text-[rgb(5,_15,_35)] font-semibold text-sm mb-3">Seats</h3>
              <div className="flex flex-wrap gap-2">
                {['8 seats', '3 seats', '6 seats', '5 seats', '7 seats', '4 seats', '2 seats'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectedSeats(prev =>
                        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
                      );
                    }}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      selectedSeats.includes(item)
                        ? 'bg-[rgb(139,_130,_246)] text-white'
                        : 'bg-gray-100 text-[rgb(5,_15,_35)] hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
            {['Available', 'Pending'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setSelectedStatus(prev =>
                    prev.includes(status) ? prev.filter(i => i !== status) : [...prev, status]
                  );
                }}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                  status === 'Available'
                    ? selectedStatus.includes(status)
                      ? 'bg-green-500 text-white'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                    : selectedStatus.includes(status)
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brand Filter */}
      {activeFilter === 'Brand' && (
        <div className="bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-[rgb(5,_15,_35)] font-semibold text-base mb-4">Select Brand</h3>
          
          {/* Search Input */}
          <div className="mb-4">
            <div className="flex items-center bg-white border border-gray-300 p-3 rounded-lg">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search a vehicle" 
                className="w-full bg-white text-[rgb(5,_15,_35)] text-sm outline-none"
              />
            </div>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              'Acura', 'Apollo', 'Audi', 'BMW', 'Bentley', 'Bugatti',
              'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Coleman', 'Dodge',
              'FIAT', 'Ford', 'GMC', 'Genesis', 'Honda', 'Hummer',
              'Hyundai', 'Infiniti', 'Isuzu', 'Jaguar', 'Jeep', 'KIA',
              'Land Rover', 'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mercury',
              'Mitsubishi', 'Nissan', 'Porsche', 'RAM', 'Subaru', 'Tesla',
              'Toyota', 'Volkswagen', 'Volvo'
            ].map((brand) => (
              <button
                key={brand}
                onClick={() => {
                  setSelectedBrand(prev =>
                    prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                  );
                }}
                className={`px-3 py-2 rounded-md text-sm transition-colors text-left ${
                  selectedBrand.includes(brand)
                    ? 'bg-[rgb(139,_130,_246)] text-white'
                    : 'bg-gray-50 text-[rgb(5,_15,_35)] hover:bg-gray-100'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Type Filter */}
      {activeFilter === 'Type' && (
        <div className="bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-[rgb(5,_15,_35)] font-semibold text-base mb-4">Select Type</h3>
          
          {/* Types Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Trailer', 'Commercial', 'Convertible',
              'VAN', 'Wagon', 'Minivan',
              'SUV', 'Truck', 'Hatchback',
              'Coupe', 'Sedan'
            ].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(prev =>
                    prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
                  );
                }}
                className={`px-4 py-3 rounded-md text-sm transition-colors text-left ${
                  selectedType.includes(type)
                    ? 'bg-[rgb(139,_130,_246)] text-white'
                    : 'bg-gray-50 text-[rgb(5,_15,_35)] hover:bg-gray-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Year Filter */}
      {activeFilter === 'Year' && (
        <div className="bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-[rgb(5,_15,_35)] font-semibold text-base mb-4">Year Range</h3>
          
          <div className="px-2 relative">
            <div className="relative h-2 bg-gray-200 rounded-lg mb-8">
              <div 
                className="absolute h-2 bg-[rgb(139,_130,_246)] rounded-lg"
                style={{
                  left: `${((yearRange[0] - 2000) / 25) * 100}%`,
                  right: `${100 - ((yearRange[1] - 2000) / 25) * 100}%`
                }}
              />
              <input
                type="range"
                min="2000"
                max="2025"
                value={yearRange[0]}
                onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                style={{ background: 'transparent', zIndex: yearRange[0] > 2010 ? 5 : 3 }}
              />
              <input
                type="range"
                min="2000"
                max="2025"
                value={yearRange[1]}
                onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                style={{ background: 'transparent', zIndex: 4 }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="number"
                value={yearRange[0]}
                onChange={(e) => setYearRange([parseInt(e.target.value) || 2000, yearRange[1]])}
                min="2000"
                max="2025"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] text-lg"
              />
              <input
                type="number"
                value={yearRange[1]}
                onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value) || 2025])}
                min="2000"
                max="2025"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] text-lg"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-3xl font-bold text-[rgb(5,_15,_35)]">{yearRange[0]}</span>
              <span className="text-3xl font-bold text-[rgb(5,_15,_35)]">{yearRange[1]}</span>
            </div>
          </div>

          <div className="mt-6 bg-[rgb(139,_130,_246)] text-white text-center py-4 px-6 rounded-lg">
            <button className="font-bold text-lg hover:underline">
              GET YOUR FREE SCORE
            </button>
          </div>
        </div>
      )}

      {/* Price Filter */}
      {activeFilter === 'Price' && (
        <div className="bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-[rgb(5,_15,_35)] font-semibold text-base mb-4">Price Range</h3>
          
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="200000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-[rgb(139,_130,_246)] rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(139, 130, 246) 0%, rgb(139, 130, 246) ${(priceRange[1] / 200000) * 100}%, #e5e7eb ${(priceRange[1] / 200000) * 100}%, #e5e7eb 100%)`
              }}
            />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200000])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold text-[rgb(5,_15,_35)]">${priceRange[0].toLocaleString()}</span>
              <span className="text-2xl font-bold text-[rgb(5,_15,_35)]">${priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 bg-[rgb(139,_130,_246)] text-white text-center py-3 px-4 rounded-lg">
            <p className="text-sm">
              <span className="font-semibold">This will NOT impact your Credit</span>
            </p>
          </div>
        </div>
      )}

      {/* Mileage Filter */}
      {activeFilter === 'Mileage' && (
        <div className="bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-[rgb(5,_15,_35)] font-semibold text-base mb-4">Mileage Range (km)</h3>
          
          <div className="px-2 relative">
            <div className="relative h-2 bg-gray-200 rounded-lg mb-8">
              <div 
                className="absolute h-2 bg-[rgb(139,_130,_246)] rounded-lg"
                style={{
                  left: `${(mileageRange[0] / 200000) * 100}%`,
                  right: `${100 - (mileageRange[1] / 200000) * 100}%`
                }}
              />
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={mileageRange[0]}
                onChange={(e) => setMileageRange([parseInt(e.target.value), mileageRange[1]])}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                style={{ background: 'transparent', zIndex: mileageRange[0] > 100000 ? 5 : 3 }}
              />
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={mileageRange[1]}
                onChange={(e) => setMileageRange([mileageRange[0], parseInt(e.target.value)])}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                style={{ background: 'transparent', zIndex: 4 }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="number"
                value={mileageRange[0]}
                onChange={(e) => setMileageRange([parseInt(e.target.value) || 0, mileageRange[1]])}
                min="0"
                max="200000"
                step="1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] text-lg"
              />
              <input
                type="number"
                value={mileageRange[1]}
                onChange={(e) => setMileageRange([mileageRange[0], parseInt(e.target.value) || 200000])}
                min="0"
                max="200000"
                step="1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] text-lg"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-3xl font-bold text-[rgb(5,_15,_35)]">{mileageRange[0].toLocaleString()}</span>
              <span className="text-3xl font-bold text-[rgb(5,_15,_35)]">{mileageRange[1].toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 bg-[rgb(139,_130,_246)] text-white text-center py-4 px-6 rounded-lg">
            <button className="font-bold text-lg hover:underline">
              GET YOUR FREE SCORE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
