import React, { useState } from 'react';
import { Search, Grid3x3, Car as CarIcon, Clock, DollarSign, Gauge, Menu, ChevronDown, ChevronUp } from 'lucide-react';

interface ShopCarsProps {
  onNavigate?: (page: string, carId?: number) => void;
  allCars?: any[]; // Cars from Supabase
  loading?: boolean;
}

export function ShopCars({ onNavigate, allCars = [], loading = false }: ShopCarsProps) {
  const [visibleCars, setVisibleCars] = useState(16);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [yearRange, setYearRange] = useState([2000, 2025]);
  const [mileageRange, setMileageRange] = useState([0, 200000]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string[]>([]);
  const [selectedMileage, setSelectedMileage] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([]);
  const [selectedFuelType, setSelectedFuelType] = useState<string[]>([]);
  const [selectedDriveTrain, setSelectedDriveTrain] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const carsToShow = allCars.slice(0, visibleCars);
  const hasMore = visibleCars < allCars.length;

  const loadMore = () => {
    setVisibleCars(prev => Math.min(prev + 8, allCars.length));
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
        
        {/* Canadian Black Book Banner */}
        <section className="bg-[rgb(5,_14,_35)] py-6">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <img alt="cbb-logo" src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fefed42f33e169c093b471be984d4440ceafa20dc.svg?generation=1768065160121232&alt=media" className="w-[90px] h-auto" />
              <div className="text-center md:text-left">
                <div className="font-bold text-white text-base md:text-[18px] tracking-[2px]" style={{"fontFamily":"\"AVA Poppins\""}}>
                  INSTANT VEHICLE APPRAISAL
                </div>
                <p className="font-thin text-white text-[11px] tracking-[0.5px]" style={{"fontFamily":"\"AVA Poppins\""}}>
                  POWERED BY CANADIAN BLACK BOOK
                </p>
              </div>
              <div className="w-full max-w-[200px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fe41c28d6429598c78addb27afa10dd5719129235.svg?generation=1768065160130577&alt=media" className="w-full" alt="" />
              </div>
            </div>
          </div>
        </section>

        {/* Equifax Banner */}
        <section className="bg-[rgb(139,_130,_246)] py-4">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <img alt="Equifax" src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fb59c186f2cad3e26ce3aa602f80cd1e80973b93d.png?generation=1768065160065915&alt=media" className="w-[100px] md:w-[120px] h-auto" />
              <div className="text-white font-bold text-base md:text-[18px] text-center md:text-left" style={{"fontFamily":"\"AVA Proxima Nova\""}}>
                Great loan options are waiting for you.<br className="hidden md:block" />
                Know if you qualify before you buy.
              </div>
              <button className="bg-white text-[rgb(139,_130,_246)] font-semibold px-6 py-2 rounded-md hover:bg-gray-100 text-sm md:text-base">
                GET YOUR FREE SCORE
              </button>
            </div>
          </div>
        </section>

        {/* Search and Filters Section */}
        <section className="py-8 bg-[rgb(250,_250,_253)]">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            
            {/* Search Bar */}
            <div className="flex items-center bg-white shadow-sm p-3 rounded-lg mb-4">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search a vehicle" 
                className="w-full bg-white text-[rgb(5,_15,_35)] text-[16px] outline-none"
              />
            </div>

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

            {/* Price Filter - показується при натисканні на кнопку Price */}
            {activeFilter === 'Price' && (
              <div className="bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
                <h3 className="text-[rgb(5,_15,_35)] font-semibold text-base mb-4">Price Range</h3>
                
                {/* Price Range Slider */}
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
                  
                  {/* Price Inputs */}
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

                  {/* Price Display */}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-[rgb(5,_15,_35)]">${priceRange[0].toLocaleString()}</span>
                    <span className="text-2xl font-bold text-[rgb(5,_15,_35)]">${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Credit Impact Notice */}
                <div className="mt-6 bg-[rgb(139,_130,_246)] text-white text-center py-3 px-4 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">This will NOT impact your Credit</span>
                  </p>
                </div>
              </div>
            )}

            {/* Year Filter - показується при натисканні на кнопку Year */}
            {activeFilter === 'Year' && (
              <div className="bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
                <h3 className="text-[rgb(5,_15,_35)] font-semibold text-base mb-4">Year Range</h3>
                
                {/* Year Range Slider */}
                <div className="px-2 relative">
                  {/* Double Range Slider */}
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
                      style={{
                        background: 'transparent',
                        zIndex: yearRange[0] > 2010 ? 5 : 3
                      }}
                    />
                    <input
                      type="range"
                      min="2000"
                      max="2025"
                      value={yearRange[1]}
                      onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                      className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                      style={{
                        background: 'transparent',
                        zIndex: 4
                      }}
                    />
                  </div>
                  
                  {/* Year Inputs */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <input
                        type="number"
                        value={yearRange[0]}
                        onChange={(e) => setYearRange([parseInt(e.target.value) || 2000, yearRange[1]])}
                        min="2000"
                        max="2025"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] text-lg"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={yearRange[1]}
                        onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value) || 2025])}
                        min="2000"
                        max="2025"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] text-lg"
                      />
                    </div>
                  </div>

                  {/* Year Display */}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-3xl font-bold text-[rgb(5,_15,_35)]">{yearRange[0]}</span>
                    <span className="text-3xl font-bold text-[rgb(5,_15,_35)]">{yearRange[1]}</span>
                  </div>
                </div>

                {/* GET YOUR FREE SCORE Banner */}
                <div className="mt-6 bg-[rgb(139,_130,_246)] text-white text-center py-4 px-6 rounded-lg">
                  <button className="font-bold text-lg hover:underline">
                    GET YOUR FREE SCORE
                  </button>
                </div>
              </div>
            )}

            {/* Mileage Filter - показується при натисканні на кнопку Mileage */}
            {activeFilter === 'Mileage' && (
              <div className="bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
                <h3 className="text-[rgb(5,_15,_35)] font-semibold text-base mb-4">Mileage Range (km)</h3>
                
                {/* Mileage Range Slider */}
                <div className="px-2 relative">
                  {/* Double Range Slider */}
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
                      style={{
                        background: 'transparent',
                        zIndex: mileageRange[0] > 100000 ? 5 : 3
                      }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="1000"
                      value={mileageRange[1]}
                      onChange={(e) => setMileageRange([mileageRange[0], parseInt(e.target.value)])}
                      className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                      style={{
                        background: 'transparent',
                        zIndex: 4
                      }}
                    />
                  </div>
                  
                  {/* Mileage Inputs */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <input
                        type="number"
                        value={mileageRange[0]}
                        onChange={(e) => setMileageRange([parseInt(e.target.value) || 0, mileageRange[1]])}
                        min="0"
                        max="200000"
                        step="1000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] text-lg"
                      />
                    </div>
                    <div>
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
                  </div>

                  {/* Mileage Display */}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-3xl font-bold text-[rgb(5,_15,_35)]">{mileageRange[0].toLocaleString()}</span>
                    <span className="text-3xl font-bold text-[rgb(5,_15,_35)]">{mileageRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* GET YOUR FREE SCORE Banner */}
                <div className="mt-6 bg-[rgb(139,_130,_246)] text-white text-center py-4 px-6 rounded-lg">
                  <button className="font-bold text-lg hover:underline">
                    GET YOUR FREE SCORE
                  </button>
                </div>
              </div>
            )}

            {/* Brand Filter - показується при натисканні на кнопку Brand */}
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

            {/* Type Filter - показується при натисканні на кнопку Type */}
            {activeFilter === 'Type' && (
              <div className="bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
                <h3 className="text-[rgb(5,_15,_35)] font-semibold text-base mb-4">Select Type</h3>
                
                {/* Types Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    'Trailer', 'Commercial', 'Convertible',
                    'VAN', 'Wagon', 'Minivan',
                    'SUV', 'Truck', 'Hatchback',
                    'Coupe', 'Sedan', ''
                  ].filter(type => type).map((type) => (
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

            {/* Results Count & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex gap-1 text-[14px]">
                <span className="text-[rgb(5,_15,_35)] opacity-[0.6]">We found</span>
                <span className="text-[rgb(139,_130,_246)] font-semibold">{allCars.length}</span>
                <span className="text-[rgb(5,_15,_35)] opacity-[0.6]">cars</span>
              </div>
              <button type="button" className="flex items-center gap-2 text-[rgb(5,_15,_35)] opacity-[0.6] hover:opacity-100">
                <span className="text-[14px]">Sort</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Car Listings Grid */}
        <section className="py-8 bg-white">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[rgb(139,130,246)] rounded-full mb-4 animate-pulse">
                  <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <p className="text-lg font-semibold text-[rgb(5,15,35)] mb-2">Loading cars...</p>
              </div>
            )}

            {/* No Cars Found */}
            {!loading && allCars.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[rgb(5,15,35)] mb-2">No cars found</h3>
                <p className="text-gray-500">Try adjusting your filters or check back later</p>
              </div>
            )}

            {/* Cars Grid */}
            {!loading && allCars.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {carsToShow.map((car, idx) => (
                <div
                  key={`shop-car-${car.id}-${idx}`} 
                  onClick={() => onNavigate && onNavigate(`car-${car.id}`, car.id)}
                  className="block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  {/* Car Image */}
                  <div className="relative w-full h-[180px] bg-gray-100">
                    <img
                      src={car.image || 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?w=800'}
                      alt={car.name || 'Car'}
                      className="w-full h-full object-cover"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        (car.status || 'Available') === 'Available' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-orange-500 text-white'
                      }`}>
                        {car.status || 'Available'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Car Details */}
                  <div className="p-3">
                    <h3 className="text-[rgb(5,_15,_35)] text-sm font-normal leading-tight mb-2 line-clamp-2">
                      {car.name || 'Unknown Car'}
                    </h3>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-[rgb(5,_15,_35)] font-bold text-lg">
                        ${(car.price || 0).toLocaleString()}
                      </div>
                      <div className="text-[rgb(5,_15,_35)] opacity-[0.5] text-xs">
                        {(car.mileage || 0).toLocaleString()} km
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
            
            {/* Load More Button */}
            {!loading && hasMore && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  className="text-[rgb(139,_130,_246)] font-semibold text-base hover:underline"
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}