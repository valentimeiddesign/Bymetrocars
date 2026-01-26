import React, { useState } from 'react';
import { Search, Grid3x3, Car as CarIcon, Clock, DollarSign, Gauge, Menu, ChevronDown, ChevronUp, X, SlidersHorizontal, Check, ChevronLeft, ChevronRight, CarFront } from 'lucide-react';
import { ShopCarCard } from './ShopCarCard';
import { Breadcrumbs } from './Breadcrumbs';

interface ShopCarsProps {
  onNavigate?: (page: string, carId?: number) => void;
  allCars?: any[]; // Cars from Supabase
  loading?: boolean;
  selectedLocation?: string | null;
  setSelectedLocation?: (location: string | null) => void;
}

export function ShopCars({ onNavigate, allCars = [], loading = false, selectedLocation, setSelectedLocation }: ShopCarsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sort state
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>('Newer Year');

  const sortOptions = [
    'A-Z ↑',
    'Z-A ↓',
    'Older Year',
    'Newer Year',
    'Low Price',
    'High Price'
  ];
  
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

  // Filter logic
  const filteredCars = allCars.filter(car => {
    // Search Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const carName = `${car.year || ''} ${car.make || ''} ${car.model || ''}`.toLowerCase();
      if (!carName.includes(term) && !car.vin?.toLowerCase().includes(term)) {
        return false;
      }
    }

    // Price Filter
    if ((car.price || 0) < priceRange[0] || (car.price || 0) > priceRange[1]) return false;

    // Year Filter
    if ((car.year || 0) < yearRange[0] || (car.year || 0) > yearRange[1]) return false;

    // Mileage Filter
    if ((car.mileage || 0) < mileageRange[0] || (car.mileage || 0) > mileageRange[1]) return false;

    // Brand Filter
    if (selectedBrand.length > 0 && !selectedBrand.some(brand => (car.make || '').toLowerCase() === brand.toLowerCase())) return false;

    // Type Filter (assuming car.body_type or car.type)
    if (selectedType.length > 0) {
       const carType = (car.body_type || car.type || '').toLowerCase();
       if (!selectedType.some(type => carType.includes(type.toLowerCase()))) return false;
    }

    // Transmission Filter
    if (selectedTransmission.length > 0 && !selectedTransmission.some(t => (car.transmission || '').toLowerCase().includes(t.toLowerCase()))) return false;

    // Fuel Type Filter
    if (selectedFuelType.length > 0 && !selectedFuelType.some(f => (car.fuel_type || '').toLowerCase().includes(f.toLowerCase()))) return false;

    // Drive Train Filter
    if (selectedDriveTrain.length > 0 && !selectedDriveTrain.some(d => (car.drivetrain || car.drive_train || '').toLowerCase().includes(d.toLowerCase()))) return false;

    // Seats Filter
    if (selectedSeats.length > 0) {
       // Extract number from "8 seats" string or car.seats number
       const carSeats = car.seats?.toString() || '';
       if (!selectedSeats.some(s => s.startsWith(carSeats))) return false;
    }

    // Status Filter
    if (selectedStatus.length > 0 && !selectedStatus.includes(car.status || 'Available')) return false;

    return true;
  });

  // Sort logic
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortOption) {
      case 'A-Z ↑':
        return `${a.make || ''} ${a.model || ''}`.localeCompare(`${b.make || ''} ${b.model || ''}`);
      case 'Z-A ↓':
        return `${b.make || ''} ${b.model || ''}`.localeCompare(`${a.make || ''} ${a.model || ''}`);
      case 'Older Year':
        return (a.year || 0) - (b.year || 0);
      case 'Newer Year':
        return (b.year || 0) - (a.year || 0);
      case 'Low Price':
        return (a.price || 0) - (b.price || 0);
      case 'High Price':
        return (b.price || 0) - (a.price || 0);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedCars.length / itemsPerPage);
  const carsToShow = sortedCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const element = document.getElementById('car-grid-top');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
        <Breadcrumbs 
          items={[{ label: 'Inventory' }]} 
          onNavigate={onNavigate || (() => {})} 
        />
        


        {/* Search and Filters Section */}
        <section className="p-[0px] bg-[rgb(250,_250,_253)] bg-[rgba(250,250,253,0)]">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32 py-0">
            
            {/* Title */}
            <h1 className="text-[rgb(5,_15,_35)] md:text-[56px] font-bold md:mb-10 tracking-[-1px] leading-[1.1] text-[42px] mx-[0px] mt-[40px] mb-[12px] md:my-[40px]">
              New Car in a Few Clicks
            </h1>

            {/* Search and Filters Container */}
            <div className="md:bg-white md:p-[24px] md:rounded-[20px] md:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] mb-[40px] flex flex-col md:flex-row items-center gap-4 mt-[0px] mr-[0px] ml-[0px] mx-[0px] my-[40px] p-[0px]">
              
              {/* Search Bar */}
              <div className="flex items-center w-full md:flex-1 bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] md:shadow-none md:bg-transparent md:rounded-none md:pl-4 md:py-0 p-[24px]">
                <Search className="w-5 h-5 text-[rgb(139,_130,_246)] mr-3" />
                <input 
                  type="text" 
                  placeholder="Search a vehicle" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-auto bg-transparent text-[rgb(5,_15,_35)] text-[16px] outline-none placeholder:text-[rgb(156,163,175)]"
                />

                {/* Desktop Active Badges */}
                {(selectedBrand.length > 0 || selectedType.length > 0) && (
                  <div className="hidden md:flex items-center gap-2 ml-4">
                    {selectedBrand.map(brand => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(prev => prev.filter(b => b !== brand))}
                        className="bg-[rgb(139,_130,_246)] text-white px-3 py-1 rounded-[10px] flex items-center gap-2 text-sm font-medium hover:bg-[rgb(120,110,230)] transition-colors"
                      >
                        {brand}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                    {selectedType.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(prev => prev.filter(t => t !== type))}
                        className="bg-[rgb(139,_130,_246)] text-white px-3 py-1 rounded-[10px] flex items-center gap-2 text-sm font-medium hover:bg-[rgb(120,110,230)] transition-colors"
                      >
                        {type}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                    <button 
                      onClick={() => {
                        setSelectedBrand([]);
                        setSelectedType([]);
                        if (setSelectedLocation) setSelectedLocation(null);
                      }}
                      className="text-[rgb(139,_130,_246)] px-2 text-sm font-medium hover:underline whitespace-nowrap"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Buttons */}
              <div className="flex md:hidden w-full gap-4 relative">
                <button 
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="flex-1 bg-white h-[56px] rounded-[20px] flex items-center justify-center gap-2 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
                >
                  <SlidersHorizontal className="w-5 h-5 text-[rgb(5,_15,_35)]" />
                  <span className="text-[16px] font-medium text-[rgb(5,_15,_35)]">Filters</span>
                </button>
                <div className="flex-1 relative">
                  <button 
                    onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                    className="w-full bg-white h-[56px] rounded-[20px] flex items-center justify-center gap-2 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]"
                  >
                    <span className="text-[16px] font-medium text-[rgb(5,_15,_35)]">Sort</span>
                    <ChevronDown className="w-5 h-5 text-[rgb(5,_15,_35)]" />
                  </button>
                  {isSortMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortOption(option);
                            setIsSortMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            sortOption === option ? 'text-[rgb(139,_130,_246)] font-semibold' : 'text-[rgb(5,_15,_35)]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Active Filter Badges */}
              {(selectedBrand.length > 0 || selectedType.length > 0 || selectedLocation) && (
                <div className="flex md:hidden flex-wrap gap-2 mb-6 px-[10px]">
                  {selectedLocation && (
                    <button
                      onClick={() => setSelectedLocation && setSelectedLocation(null)}
                      className="bg-[rgb(139,_130,_246)] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-[rgb(120,110,230)] transition-colors"
                    >
                      {selectedLocation}
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {selectedBrand.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(prev => prev.filter(b => b !== brand))}
                      className="bg-[rgb(139,_130,_246)] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-[rgb(120,110,230)] transition-colors"
                    >
                      {brand}
                      <X className="w-4 h-4" />
                    </button>
                  ))}
                  {selectedType.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(prev => prev.filter(t => t !== type))}
                      className="bg-[rgb(139,_130,_246)] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-[rgb(120,110,230)] transition-colors"
                    >
                      {type}
                      <X className="w-4 h-4" />
                    </button>
                  ))}
                  <button 
                    onClick={() => {
                      setSelectedBrand([]);
                      setSelectedType([]);
                      if (setSelectedLocation) setSelectedLocation(null);
                    }}
                    className="text-[rgb(139,_130,_246)] px-4 py-2 text-sm font-medium hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Filter Buttons */}
              <div className="hidden md:flex md:flex-wrap md:items-center gap-2 w-full md:w-auto pb-2 md:pb-0">
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
                        const newState = !showAdvancedFilters;
                        setShowAdvancedFilters(newState);
                        if (newState) setActiveFilter(null);
                      } else {
                        const newActive = activeFilter === filter.label ? null : filter.label;
                        setActiveFilter(newActive);
                        if (newActive) setShowAdvancedFilters(false);
                      }
                    }}
                    className={`flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto gap-[6px] py-[10px] px-[16px] rounded-full transition-all border ${
                      (filter.label === 'More' && showAdvancedFilters) || activeFilter === filter.label
                        ? 'border-[rgb(139,_130,_246)] bg-[rgba(139,130,246,0.05)] text-[rgb(139,_130,_246)]'
                        : 'border-[rgba(5,15,35,0.06)] bg-white text-[rgb(5,_15,_35)] hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                    }`}
                  >
                    <img src={filter.icon} className={`w-[16px] h-[16px] object-contain ${activeFilter === filter.label ? '' : 'opacity-[0.4]'}`} alt="" />
                    <span className="text-[18px] font-medium">{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showAdvancedFilters && (
              <div className="hidden md:block bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
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
              <div className="hidden md:block bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
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
              </div>
            )}

            {/* Year Filter - показується при натисканні на кнопку Year */}
            {activeFilter === 'Year' && (
              <div className="hidden md:block bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
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
              </div>
            )}

            {/* Mileage Filter - показується при натисканні на кнопку Mileage */}
            {activeFilter === 'Mileage' && (
              <div className="hidden md:block bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
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
              </div>
            )}

            {/* Brand Filter - показується при натисканні на кнопку Brand */}
            {activeFilter === 'Brand' && (
              <div className="hidden md:block bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
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
                        setActiveFilter(null);
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
              <div className="hidden md:block bg-white border border-[rgba(5,_15,_35,_0.08)] rounded-lg p-6 mb-6 shadow-sm">
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
                        setActiveFilter(null);
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
            <div className="hidden md:flex justify-between items-center gap-4 mb-6 relative">
              <div className="flex items-center gap-4 text-[14px]">
                <div className="flex gap-1">
                  <span className="text-[rgb(5,_15,_35)] opacity-[0.6] text-[18px]">We found</span>
                  <span className="text-[rgb(139,_130,_246)] font-semibold text-[18px]">{filteredCars.length}</span>
                  <span className="text-[rgb(5,_15,_35)] opacity-[0.6] text-[18px]">cars</span>
                </div>
                
                {selectedLocation && (
                  <button
                    onClick={() => setSelectedLocation && setSelectedLocation(null)}
                    className="bg-[rgb(139,_130,_246)] text-white px-3 py-1 rounded-[10px] flex items-center gap-2 text-sm font-medium hover:bg-[rgb(120,110,230)] transition-colors"
                  >
                    {selectedLocation}
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              
              <div className="relative">
                <button 
                  type="button" 
                  className="flex items-center gap-2 text-[rgb(5,_15,_35)] opacity-[0.6] hover:opacity-100"
                  onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                >
                  <span className="text-[18px]">Sort</span>
                  {isSortMenuOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {isSortMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortOption(option);
                          setIsSortMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          sortOption === option ? 'text-[rgb(139,_130,_246)] font-semibold' : 'text-[rgb(5,_15,_35)]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

            {/* Mobile Filter Modal */}
            {isMobileFiltersOpen && (
              <div className="fixed inset-0 z-[100] bg-white flex flex-col md:hidden">
                <div className="flex items-center justify-between px-6 py-8 border-b border-gray-100">
                  <h2 className="text-[24px] font-bold text-[rgb(5,_15,_35)]">Select params</h2>
                  <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2">
                    <X className="w-6 h-6 text-[rgb(5,_15,_35)]" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-hide">
                  <div className="flex flex-col gap-6">
                    {/* Brand */}
                    <div className="border-b border-gray-100 pb-6">
                      <button 
                        onClick={() => setActiveFilter(activeFilter === 'Brand' ? null : 'Brand')}
                        className="flex items-center justify-between w-full mb-4"
                      >
                        <div className="flex items-center gap-3">
                          <Grid3x3 className="w-5 h-5 text-gray-400" />
                          <span className="text-lg font-semibold text-[rgb(5,_15,_35)]">Brand</span>
                        </div>
                        {activeFilter === 'Brand' ? <ChevronUp className="w-5 h-5 text-[rgb(5,_15,_35)]" /> : <ChevronDown className="w-5 h-5 text-[rgb(5,_15,_35)]" />}
                      </button>
                      
                      {activeFilter === 'Brand' && (
                        <div className="pt-4 pb-2">
                           {/* Search Input inside Brand filter if needed, but for now just the grid */}
                           <div className="mb-4">
                             <div className="flex items-center bg-gray-50 border border-gray-200 p-3 rounded-xl">
                               <Search className="w-4 h-4 text-gray-400 mr-2" />
                               <input 
                                 type="text" 
                                 placeholder="Search a vehicle" 
                                 className="w-full bg-transparent text-[rgb(5,_15,_35)] text-sm outline-none placeholder:text-gray-400"
                               />
                             </div>
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {['Acura', 'Apollo', 'Audi', 'BMW', 'Bentley', 'Bugatti', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Coleman', 'Dodge', 'FIAT', 'Ford', 'GMC', 'Genesis', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Isuzu', 'Jaguar', 'Jeep', 'KIA', 'Land Rover', 'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mercury', 'Mitsubishi', 'Nissan', 'Porsche', 'RAM', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'].map((brand) => (
                                <button
                                  key={brand}
                                  onClick={() => setSelectedBrand(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])}
                                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
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
                    </div>

                    {/* Type */}
                    <div className="border-b border-gray-100 pb-6">
                      <button 
                        onClick={() => setActiveFilter(activeFilter === 'Type' ? null : 'Type')}
                        className="flex items-center justify-between w-full mb-4"
                      >
                        <div className="flex items-center gap-3">
                          <CarIcon className="w-5 h-5 text-gray-400" />
                          <span className="text-lg font-semibold text-[rgb(5,_15,_35)]">Type</span>
                        </div>
                        {activeFilter === 'Type' ? <ChevronUp className="w-5 h-5 text-[rgb(5,_15,_35)]" /> : <ChevronDown className="w-5 h-5 text-[rgb(5,_15,_35)]" />}
                      </button>
                      
                      {activeFilter === 'Type' && (
                        <div className="pt-4 pb-2">
                           <div className="grid grid-cols-2 gap-3">
                              {['Trailer', 'Commercial', 'Convertible', 'VAN', 'Wagon', 'Minivan', 'SUV', 'Truck', 'Hatchback', 'Coupe', 'Sedan'].map((type) => (
                                <button
                                  key={type}
                                  onClick={() => setSelectedType(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])}
                                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
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
                    </div>

                    {/* Year */}
                    <div className="border-b border-gray-100 pb-6">
                      <button 
                        onClick={() => setActiveFilter(activeFilter === 'Year' ? null : 'Year')}
                        className="flex items-center justify-between w-full mb-4"
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span className="text-lg font-semibold text-[rgb(5,_15,_35)]">Year</span>
                        </div>
                        {activeFilter === 'Year' ? <ChevronUp className="w-5 h-5 text-[rgb(5,_15,_35)]" /> : <ChevronDown className="w-5 h-5 text-[rgb(5,_15,_35)]" />}
                      </button>
                      
                      {activeFilter === 'Year' && (
                        <div className="pt-4">
                           <div className="relative h-6 mb-8 px-1">
                             <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 rounded-full -translate-y-1/2" />
                             <div 
                               className="absolute top-1/2 h-1 bg-[rgb(139,130,246)] rounded-full -translate-y-1/2"
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
                               onChange={(e) => {
                                 const val = Math.min(parseInt(e.target.value), yearRange[1] - 1);
                                 setYearRange([val, yearRange[1]]);
                               }}
                               className="absolute inset-0 w-full h-full appearance-none bg-transparent opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6"
                               style={{ zIndex: yearRange[0] > 2012 ? 5 : 3 }}
                             />
                             <input 
                               type="range" 
                               min="2000" 
                               max="2025" 
                               value={yearRange[1]} 
                               onChange={(e) => {
                                 const val = Math.max(parseInt(e.target.value), yearRange[0] + 1);
                                 setYearRange([yearRange[0], val]);
                               }}
                               className="absolute inset-0 w-full h-full appearance-none bg-transparent opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6"
                               style={{ zIndex: 4 }}
                             />
                             <div 
                               className="absolute top-1/2 w-6 h-6 bg-[rgb(139,130,246)] rounded-full border-4 border-white shadow-[0px_4px_10px_rgba(139,130,246,0.5)] -translate-y-1/2 pointer-events-none transition-all"
                               style={{ left: `calc(${((yearRange[0] - 2000) / 25) * 100}% - 12px)` }}
                             />
                             <div 
                               className="absolute top-1/2 w-6 h-6 bg-[rgb(139,130,246)] rounded-full border-4 border-white shadow-[0px_4px_10px_rgba(139,130,246,0.5)] -translate-y-1/2 pointer-events-none transition-all"
                               style={{ left: `calc(${((yearRange[1] - 2000) / 25) * 100}% - 12px)` }}
                             />
                           </div>
                           <div className="flex gap-4">
                             <div className="flex-1">
                               <input type="number" value={yearRange[0]} onChange={(e) => setYearRange([parseInt(e.target.value)||2000, yearRange[1]])} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg text-[rgb(5,15,35)] outline-none focus:border-[rgb(139,130,246)] text-center" />
                               <div className="flex justify-between mt-2 text-xs text-gray-400 px-1">
                                 <span>2,000</span>
                               </div>
                             </div>
                             <div className="flex-1">
                               <input type="number" value={yearRange[1]} onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)||2025])} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg text-[rgb(5,15,35)] outline-none focus:border-[rgb(139,130,246)] text-center" />
                               <div className="flex justify-end mt-2 text-xs text-gray-400 px-1">
                                 <span>2,025</span>
                               </div>
                             </div>
                           </div>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="border-b border-gray-100 pb-6">
                      <button 
                        onClick={() => setActiveFilter(activeFilter === 'Price' ? null : 'Price')}
                        className="flex items-center justify-between w-full mb-4"
                      >
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-gray-400" />
                          <span className="text-lg font-semibold text-[rgb(5,_15,_35)]">Price</span>
                        </div>
                        {activeFilter === 'Price' ? <ChevronUp className="w-5 h-5 text-[rgb(5,_15,_35)]" /> : <ChevronDown className="w-5 h-5 text-[rgb(5,_15,_35)]" />}
                      </button>
                      
                      {activeFilter === 'Price' && (
                        <div className="pt-4">
                           <div className="relative h-6 mb-8 px-1">
                             <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 rounded-full -translate-y-1/2" />
                             <div 
                               className="absolute top-1/2 h-1 bg-[rgb(139,130,246)] rounded-full -translate-y-1/2"
                               style={{
                                 left: `${(priceRange[0] / 200000) * 100}%`,
                                 right: `${100 - (priceRange[1] / 200000) * 100}%`
                               }}
                             />
                             <input 
                               type="range" 
                               min="0" 
                               max="200000" 
                               value={priceRange[0]} 
                               onChange={(e) => {
                                 const val = Math.min(parseInt(e.target.value), priceRange[1] - 1000);
                                 setPriceRange([val, priceRange[1]]);
                               }}
                               className="absolute inset-0 w-full h-full appearance-none bg-transparent opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6"
                               style={{ zIndex: priceRange[0] > 100000 ? 5 : 3 }}
                             />
                             <input 
                               type="range" 
                               min="0" 
                               max="200000" 
                               value={priceRange[1]} 
                               onChange={(e) => {
                                 const val = Math.max(parseInt(e.target.value), priceRange[0] + 1000);
                                 setPriceRange([priceRange[0], val]);
                               }}
                               className="absolute inset-0 w-full h-full appearance-none bg-transparent opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6"
                               style={{ zIndex: 4 }}
                             />
                             <div 
                               className="absolute top-1/2 w-6 h-6 bg-[rgb(139,130,246)] rounded-full border-4 border-white shadow-[0px_4px_10px_rgba(139,130,246,0.5)] -translate-y-1/2 pointer-events-none transition-all"
                               style={{ left: `calc(${(priceRange[0] / 200000) * 100}% - 12px)` }}
                             />
                             <div 
                               className="absolute top-1/2 w-6 h-6 bg-[rgb(139,130,246)] rounded-full border-4 border-white shadow-[0px_4px_10px_rgba(139,130,246,0.5)] -translate-y-1/2 pointer-events-none transition-all"
                               style={{ left: `calc(${(priceRange[1] / 200000) * 100}% - 12px)` }}
                             />
                           </div>
                           <div className="flex gap-4">
                             <div className="flex-1">
                               <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value)||0, priceRange[1]])} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg text-[rgb(5,15,35)] outline-none focus:border-[rgb(139,130,246)] text-center" />
                               <div className="flex justify-between mt-2 text-xs text-gray-400 px-1">
                                 <span>$0</span>
                               </div>
                             </div>
                             <div className="flex-1">
                               <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)||200000])} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg text-[rgb(5,15,35)] outline-none focus:border-[rgb(139,130,246)] text-center" />
                               <div className="flex justify-end mt-2 text-xs text-gray-400 px-1">
                                 <span>$200,000</span>
                               </div>
                             </div>
                           </div>
                        </div>
                      )}
                    </div>

                    {/* Mileage */}
                    <div className="border-b border-gray-100 pb-6">
                      <button 
                        onClick={() => setActiveFilter(activeFilter === 'Mileage' ? null : 'Mileage')}
                        className="flex items-center justify-between w-full mb-4"
                      >
                        <div className="flex items-center gap-3">
                          <Gauge className="w-5 h-5 text-gray-400" />
                          <span className="text-lg font-semibold text-[rgb(5,_15,_35)]">Mileage</span>
                        </div>
                        {activeFilter === 'Mileage' ? <ChevronUp className="w-5 h-5 text-[rgb(5,_15,_35)]" /> : <ChevronDown className="w-5 h-5 text-[rgb(5,_15,_35)]" />}
                      </button>
                      
                      {activeFilter === 'Mileage' && (
                        <div className="pt-4">
                           <div className="relative h-6 mb-8 px-1">
                             <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 rounded-full -translate-y-1/2" />
                             <div 
                               className="absolute top-1/2 h-1 bg-[rgb(139,130,246)] rounded-full -translate-y-1/2"
                               style={{
                                 left: `${(mileageRange[0] / 200000) * 100}%`,
                                 right: `${100 - (mileageRange[1] / 200000) * 100}%`
                               }}
                             />
                             <input 
                               type="range" 
                               min="0" 
                               max="200000" 
                               value={mileageRange[0]} 
                               onChange={(e) => {
                                 const val = Math.min(parseInt(e.target.value), mileageRange[1] - 1000);
                                 setMileageRange([val, mileageRange[1]]);
                               }}
                               className="absolute inset-0 w-full h-full appearance-none bg-transparent opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6"
                               style={{ zIndex: mileageRange[0] > 100000 ? 5 : 3 }}
                             />
                             <input 
                               type="range" 
                               min="0" 
                               max="200000" 
                               value={mileageRange[1]} 
                               onChange={(e) => {
                                 const val = Math.max(parseInt(e.target.value), mileageRange[0] + 1000);
                                 setMileageRange([mileageRange[0], val]);
                               }}
                               className="absolute inset-0 w-full h-full appearance-none bg-transparent opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6"
                               style={{ zIndex: 4 }}
                             />
                             <div 
                               className="absolute top-1/2 w-6 h-6 bg-[rgb(139,130,246)] rounded-full border-4 border-white shadow-[0px_4px_10px_rgba(139,130,246,0.5)] -translate-y-1/2 pointer-events-none transition-all"
                               style={{ left: `calc(${(mileageRange[0] / 200000) * 100}% - 12px)` }}
                             />
                             <div 
                               className="absolute top-1/2 w-6 h-6 bg-[rgb(139,130,246)] rounded-full border-4 border-white shadow-[0px_4px_10px_rgba(139,130,246,0.5)] -translate-y-1/2 pointer-events-none transition-all"
                               style={{ left: `calc(${(mileageRange[1] / 200000) * 100}% - 12px)` }}
                             />
                           </div>
                           <div className="flex gap-4">
                             <div className="flex-1">
                               <input type="number" value={mileageRange[0]} onChange={(e) => setMileageRange([parseInt(e.target.value)||0, mileageRange[1]])} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg text-[rgb(5,15,35)] outline-none focus:border-[rgb(139,130,246)] text-center" />
                               <div className="flex justify-between mt-2 text-xs text-gray-400 px-1">
                                 <span>0</span>
                               </div>
                             </div>
                             <div className="flex-1">
                               <input type="number" value={mileageRange[1]} onChange={(e) => setMileageRange([mileageRange[0], parseInt(e.target.value)||200000])} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg text-[rgb(5,15,35)] outline-none focus:border-[rgb(139,130,246)] text-center" />
                               <div className="flex justify-end mt-2 text-xs text-gray-400 px-1">
                                 <span>200,000</span>
                               </div>
                             </div>
                           </div>
                        </div>
                      )}
                    </div>

                    {/* More Filters */}
                    <div className="border-b border-gray-100 pb-6">
                      <button 
                        onClick={() => setActiveFilter(activeFilter === 'More' ? null : 'More')}
                        className="flex items-center justify-between w-full mb-4"
                      >
                        <div className="flex items-center gap-3">
                          <Menu className="w-5 h-5 text-gray-400" />
                          <span className="text-lg font-semibold text-[rgb(5,_15,_35)]">More Filters</span>
                        </div>
                        {activeFilter === 'More' ? <ChevronUp className="w-5 h-5 text-[rgb(5,_15,_35)]" /> : <ChevronDown className="w-5 h-5 text-[rgb(5,_15,_35)]" />}
                      </button>
                      
                      {activeFilter === 'More' && (
                        <div className="flex flex-col gap-6 pl-2">
                           {/* Transmission */}
                           <div>
                             <h4 className="font-medium mb-3 text-[rgb(5,15,35)]">Transmission</h4>
                             <div className="flex flex-col gap-3">
                               {['Robot', 'Manual', 'Automatic'].map(item => (
                                 <button key={item} onClick={() => setSelectedTransmission(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])} className="flex items-center gap-3 w-full text-left group">
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${selectedTransmission.includes(item) ? 'border-[rgb(139,130,246)]' : 'border-gray-200 group-hover:border-gray-300'}`}>
                                      {selectedTransmission.includes(item) && <div className="w-3 h-3 rounded-full bg-[rgb(139,130,246)]" />}
                                    </div>
                                    <span className={`text-base ${selectedTransmission.includes(item) ? 'text-[rgb(5,15,35)] font-medium' : 'text-[rgb(100,100,100)]'}`}>{item}</span>
                                 </button>
                               ))}
                             </div>
                           </div>
                           {/* Fuel */}
                           <div>
                             <h4 className="font-medium mb-3 text-[rgb(5,15,35)]">Fuel Type</h4>
                             <div className="flex flex-col gap-3">
                               {['Electric', 'Flex Fuel', 'Diesel', 'Hybrid', 'Gas'].map(item => (
                                 <button key={item} onClick={() => setSelectedFuelType(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])} className="flex items-center gap-3 w-full text-left group">
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${selectedFuelType.includes(item) ? 'border-[rgb(139,130,246)]' : 'border-gray-200 group-hover:border-gray-300'}`}>
                                      {selectedFuelType.includes(item) && <div className="w-3 h-3 rounded-full bg-[rgb(139,130,246)]" />}
                                    </div>
                                    <span className={`text-base ${selectedFuelType.includes(item) ? 'text-[rgb(5,15,35)] font-medium' : 'text-[rgb(100,100,100)]'}`}>{item}</span>
                                 </button>
                               ))}
                             </div>
                           </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                <div className="px-6 py-8 border-t border-gray-100 bg-white shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-medium text-[rgb(5,_15,_35)] text-lg">Available</span>
                    <button 
                      onClick={() => setSelectedStatus(prev => prev.includes('Available') ? [] : ['Available'])}
                      className="bg-[#F1F2F4] text-[rgb(17,24,39)] px-4 py-3 rounded-full flex items-center gap-3"
                    >
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${selectedStatus.includes('Available') ? 'bg-[rgb(5,15,35)] border-[rgb(5,15,35)]' : 'border-gray-400 bg-white'}`}>
                        {selectedStatus.includes('Available') && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="font-medium text-sm">Show available</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="w-full bg-[rgb(5,_15,_35)] text-white font-bold py-4 rounded-[16px] text-lg"
                  >
                    Show Results
                  </button>
                </div>
              </div>
            )}
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

            {/* No Filter Results */}
            {!loading && allCars.length > 0 && filteredCars.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="mb-6 text-gray-200">
                  <CarFront className="w-24 h-24" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-[rgb(5,15,35)] mb-2">We didn't find any cars</h3>
                <p className="text-gray-500 text-lg">Please try another params</p>
              </div>
            )}

            {/* Cars Grid */}
            {!loading && filteredCars.length > 0 && (
            <div id="car-grid-top" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
              {carsToShow.map((car, idx) => (
                <ShopCarCard
                  key={`shop-car-${car.id}-${idx}`}
                  car={car}
                  onClick={() => onNavigate && onNavigate(`car-${car.id}`, car.id)}
                />
              ))}
            </div>
            )}
            
            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                    currentPage === 1
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : 'border-gray-300 text-[rgb(5,_15,_35)] hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5) {
                      if (currentPage <= 3) {
                         pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                         pageNum = totalPages - 4 + i;
                      } else {
                         pageNum = currentPage - 2 + i;
                      }
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                          currentPage === pageNum
                            ? 'bg-[rgb(139,_130,_246)] text-white'
                            : 'text-[rgb(5,_15,_35)] hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                    currentPage === totalPages
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : 'border-gray-300 text-[rgb(5,_15,_35)] hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}