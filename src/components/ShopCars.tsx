import React, { useState } from 'react';
import { Search, Grid3x3, Car as CarIcon, Clock, DollarSign, Gauge, Menu, ChevronDown, ChevronUp } from 'lucide-react';

interface ShopCarsProps {
  onNavigate?: (page: string, carId?: number) => void;
}

export function ShopCars({ onNavigate }: ShopCarsProps) {
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

  // Mock car data
  const allCars = [
    {
      id: 1,
      name: '2019 VOLKSWAGEN JETTA HIGHLINE 4WD',
      price: 19900,
      mileage: 89500,
      image: 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xrc3dhZ2VuJTIwY2FyJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 2,
      name: '2014 Ram 1500 ST 4WD Crew Cab 5.7 ft',
      price: 26880,
      mileage: 145000,
      image: 'https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjB0cnVjayUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Pending'
    },
    {
      id: 3,
      name: '2016 RAM 1500 Outdoorsman 4WD Quad Cab',
      price: 31895,
      mileage: 78000,
      image: 'https://images.unsplash.com/photo-1760810699887-0f37d54da23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2JTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Pending'
    },
    {
      id: 4,
      name: '2020 FORD F-350 SUPER DUTY LARIAT 4.7L V8 TURBO DIESEL 4WD Crew Cab',
      price: 84990,
      mileage: 165000,
      image: 'https://images.unsplash.com/photo-1669109777226-73e0ce597658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBzdXYlMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc2ODA2Nzk1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Pending'
    },
    {
      id: 5,
      name: '2016 RAM 2500 LARAMIE 5.7L CUMMINS TURBO DIESEL 4WD Crew Cab 14\'',
      price: 52950,
      mileage: 125000,
      image: 'https://images.unsplash.com/photo-1662981535849-b65888e3ec45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 6,
      name: '2016 Ford F-150 Lariat Leather 5.0L V8',
      price: 34500,
      mileage: 98000,
      image: 'https://images.unsplash.com/photo-1687730594701-88cdea1ef5ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaXNzYW4lMjBzZWRhbiUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 7,
      name: '2012 VOLVO C70 T5 Convertible',
      price: 15990,
      mileage: 132000,
      image: 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xrc3dhZ2VuJTIwY2FyJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 8,
      name: '2013 Volkswagen Golf S6l H8 Auto',
      price: 18800,
      mileage: 95000,
      image: 'https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjB0cnVjayUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 9,
      name: '2016 Toyota 4Runner SR5 4WD 7 SEATS',
      price: 35990,
      mileage: 87000,
      image: 'https://images.unsplash.com/photo-1760810699887-0f37d54da23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2JTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 10,
      name: '2021 FORD F-250 SUPER DUTY 6.7L TURBO DIESEL V8 TURBO DIESEL',
      price: 65990,
      mileage: 89000,
      image: 'https://images.unsplash.com/photo-1669109777226-73e0ce597658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBzdXYlMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc2ODA2Nzk1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 11,
      name: '2011 MITSUBISHI OUTLANDER XLS 4WD 3.0L V6 7 SEATS',
      price: 15990,
      mileage: 175000,
      image: 'https://images.unsplash.com/photo-1662981535849-b65888e3ec45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 12,
      name: '2017 HONDA CIVIC SI',
      price: 19990,
      mileage: 87000,
      image: 'https://images.unsplash.com/photo-1687730594701-88cdea1ef5ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaXNzYW4lMjBzZWRhbiUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 13,
      name: '2018 Nissan Qashqai SL AWD CVT',
      price: 19850,
      mileage: 108000,
      image: 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xrc3dhZ2VuJTIwY2FyJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 14,
      name: '2016 Volkswagen Touareg LUX V6',
      price: 19990,
      mileage: 106000,
      image: 'https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjB0cnVjayUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 15,
      name: '2021 GMC SIERRA 1500 SLE DURAMAX 3.0L TURBO DIESEL 4WD Crew Cab 14"',
      price: 53990,
      mileage: 86000,
      image: 'https://images.unsplash.com/photo-1760810699887-0f37d54da23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2JTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 16,
      name: '2017 Honda Odyssey 4dr Wgn SE',
      price: 25500,
      mileage: 118000,
      image: 'https://images.unsplash.com/photo-1669109777226-73e0ce597658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBzdXYlMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc2ODA2Nzk1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 17,
      name: '2019 Chevrolet Silverado 1500 LTZ',
      price: 42990,
      mileage: 65000,
      image: 'https://images.unsplash.com/photo-1662981535849-b65888e3ec45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 18,
      name: '2015 Jeep Wrangler Unlimited Sahara',
      price: 29990,
      mileage: 95000,
      image: 'https://images.unsplash.com/photo-1687730594701-88cdea1ef5ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaXNzYW4lMjBzZWRhbiUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 19,
      name: '2018 Mazda CX-5 GT AWD',
      price: 24990,
      mileage: 78000,
      image: 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xrc3dhZ2VuJTIwY2FyJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    },
    {
      id: 20,
      name: '2017 Subaru Outback 2.5i Limited',
      price: 22990,
      mileage: 112000,
      image: 'https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjB0cnVjayUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Available'
    }
  ];

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
          <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
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
          <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
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
          <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            
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
                <span className="text-[rgb(139,_130,_246)] font-semibold">358</span>
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
          <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {carsToShow.map(car => (
                <div
                  key={car.id} 
                  onClick={() => onNavigate && onNavigate(`car-${car.id}`, car.id)}
                  className="block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  {/* Car Image */}
                  <div className="relative w-full h-[180px] bg-gray-100">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        car.status === 'Available' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-orange-500 text-white'
                      }`}>
                        {car.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Car Details */}
                  <div className="p-3">
                    <h3 className="text-[rgb(5,_15,_35)] text-sm font-normal leading-tight mb-2 line-clamp-2">
                      {car.name}
                    </h3>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-[rgb(5,_15,_35)] font-bold text-lg">
                        ${car.price.toLocaleString()}
                      </div>
                      <div className="text-[rgb(5,_15,_35)] opacity-[0.5] text-xs">
                        {car.mileage.toLocaleString()} km
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMore && (
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