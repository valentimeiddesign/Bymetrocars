import React, { useState, useEffect } from 'react';
import { ShopCars } from './components/ShopCars';
import { SellTrade } from './components/SellTrade';
import { Financing } from './components/Financing';
import { AboutUs } from './components/AboutUs';
import { Contacts } from './components/Contacts';
import { Locations } from './components/Locations';
import { Vacancies } from './components/Vacancies';
import { TopBanner } from './components/TopBanner';
import { Quiz } from './components/Quiz';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { CarDetails } from './components/CarDetails';
import { Icons, CarImages, BrandLogos } from './components/Icons';
import { Footer } from './components/Footer';
import { LocationDropdown } from './components/LocationDropdown';
import { fetchAllCars } from './utils/carApi';
import type { Car } from './types/car';

// Import Figma images for Browse by Type and Popular Brands
import imgFordSedan from "figma:asset/62436b94333b992271b2bd63a2d69bb6c9ee5f70.png";
import imgSUV from "figma:asset/71af0fa3a4b700260f35013dcb6a6592ecc75611.png";
import imgHatchback from "figma:asset/e94f7dcc213925d5d4aebb0e17925a4a70e66139.png";
import imgTruck from "figma:asset/cd2eb872b42b5e9801120c8e75a8370637bdc5b0.png";
import imgCoupe from "figma:asset/42cab77d70c9ce4384e58dbdbc3596e2fd093453.png";
import imgVAN from "figma:asset/4b62f68fb822a2364522d1cdabaf969ad53d4d90.png";
import imgNissanLogo from "figma:asset/2ea45d7e04c9c673edc6dca4e39cb88fd82bef8f.png";
import imgDodgeLogo from "figma:asset/72765622bb165dfdbac3b1184674281e3ad57a98.png";
import imgJeepLogo from "figma:asset/93599331c27c183974e07c7b8711dc786092acc1.png";
import imgChryslerLogo from "figma:asset/615185059266e399b9e8b101050e467826d5e9b7.png";
import imgFordLogo from "figma:asset/90198f2ec314dfc464a44c45b103bcceb339008d.png";
import imgToyotaLogo from "figma:asset/e97faa84609add6cb2cb6f6024ba108cd41ff545.png";
import imgShopCard from "figma:asset/c35b4985a04d0c772f8fe5914c7570e0e7ac90f1.png";
import imgSellCard from "figma:asset/f0b3eb2b4458846bec56be8635bb677de4cdf411.png";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentCarId, setCurrentCarId] = useState<number | null>(null);

  // Supabase data state
  const [allHomeCars, setAllHomeCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Home page filters state
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [yearRange, setYearRange] = useState<{ min: number; max: number }>({ min: 2000, max: 2024 });
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 5000, max: 50000 });
  const [mileageRange, setMileageRange] = useState<{ min: number; max: number }>({ min: 0, max: 200000 });
  const [selectedTransmission, setSelectedTransmission] = useState<string | null>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<string | null>(null);
  const [selectedDriveTrain, setSelectedDriveTrain] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [currentHomePage, setCurrentHomePage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [locationMenuOpen, setLocationMenuOpen] = useState(false);
  const itemsPerPage = 12;
  const homeItemsPerPage = 16;

  // Available locations
  const locations = [
    '332 Sackville Drive',
    '400 Sackville Drive',
    'Buy Metro',
    'Phillips Auto',
    'Mount Uniacke',
    'Lower Sackville',
    'Truro'
  ];

  // Load cars from Supabase on mount
  useEffect(() => {
    loadCarsFromDatabase();
  }, []);

  const loadCarsFromDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Loading cars from Supabase...');
      const cars = await fetchAllCars();
      console.log('✅ Cars loaded:', cars.length);
      if (cars.length > 0) {
        console.log('📊 Sample car data:', cars[0]);
      }
      
      // Convert Car type to old format for compatibility
      const convertedCars = cars.map((car: Car, index: number) => ({
        id: car.id || `car-${index}-${Date.now()}`,
        name: `${car.year || ''} ${car.make || ''} ${car.model || ''}`.trim(),
        price: Number(car.price) || 0,
        mileage: Number(car.mileage) || 0,
        image: car.images?.[0]?.url || 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?w=800',
        status: car.status || 'Available',
        location: car.location || '332 Sackville Drive'
      }));
      
      setAllHomeCars(convertedCars);
    } catch (err) {
      console.error('❌ Error loading cars:', err);
      setError('Failed to load cars from database');
      // Keep mock data as fallback
      setAllHomeCars([
        { id: 1, name: '2019 VOLKSWAGEN JETTA HIGHLINE 4WD', price: 19900, mileage: 89500, image: 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xrc3dhZ2VuJTIwY2FyJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080', status: 'Available', location: '332 Sackville Drive' },
        { id: 2, name: '2014 Ram 1500 ST 4WD Crew Cab 5.7 ft', price: 26880, mileage: 145000, image: 'https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjB0cnVjayUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080', status: 'Pending', location: '400 Sackville Drive' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filter cars by location if selected
  const filteredHomeCars = selectedLocation 
    ? allHomeCars.filter(car => car.location === selectedLocation)
    : allHomeCars;

  // Calculate pagination for homepage
  const totalHomePages = Math.ceil(filteredHomeCars.length / homeItemsPerPage);
  const startHomeIndex = (currentHomePage - 1) * homeItemsPerPage;
  const endHomeIndex = startHomeIndex + homeItemsPerPage;
  const currentHomeCars = filteredHomeCars.slice(startHomeIndex, endHomeIndex);

  const navigateTo = (page: string, carId?: number) => {
    setCurrentPage(page);
    if (carId !== undefined) {
      setCurrentCarId(carId);
    }
    setMobileMenuOpen(false);
    setCompanyMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Render Admin Login if accessing admin route and not authenticated
  if (currentPage === 'admin' && !isAdminAuthenticated) {
    return <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />;
  }

  // Render Admin Panel if authenticated
  if (currentPage === 'admin' && isAdminAuthenticated) {
    return <AdminPanel onLogout={() => {
      setIsAdminAuthenticated(false);
      setCurrentPage('home');
    }} />;
  }

  // Render Car Details page if that's the current page
  if (currentPage.startsWith('car-') && currentCarId !== null) {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
          <TopBanner />
          
          {/* Header / Navigation */}
          <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
            <div className="max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 lg:px-20 2xl:px-32">
              
              {/* Logo */}
              <button onClick={() => navigateTo('home')} className="flex items-center">
                <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
              </button>

              {/* Desktop Navigation */}
              <nav role="navigation" className="hidden lg:flex items-center gap-8">
                <button onClick={() => navigateTo('shop')} className="text-[rgb(139,_130,_246)] text-[16px] font-semibold">Shop Cars</button>
                <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Sell or Trade Ins</button>
                <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Financing</button>
                <div className="relative">
                  <button 
                    className="flex items-center gap-1 text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]" 
                    onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
                  >
                    Company
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`}>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {companyMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[999]">
                      <button onClick={() => navigateTo('about')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">About us</button>
                      <button onClick={() => navigateTo('contacts')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Contacts</button>
                      <button onClick={() => navigateTo('locations')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Locations</button>
                      <button onClick={() => navigateTo('vacancies')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Vacancies</button>
                    </div>
                  )}
                </div>
              </nav>

              {/* Location Button (Desktop) */}
              <div className="hidden lg:flex items-center gap-[10px]">
                <button className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                  <span>Location</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-[rgb(5,_15,_35)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-b border-[rgba(30,30,30,0.08)] shadow-lg z-[997]">
                <nav className="flex flex-col p-4 gap-4">
                  <button onClick={() => navigateTo('shop')} className="text-[rgb(139,_130,_246)] text-[16px] py-2 text-left font-semibold">Shop Cars</button>
                  <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Sell or Trade Ins</button>
                  <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Financing</button>
                  <div className="text-[rgb(5,_15,_35)] text-[16px] py-2">Company</div>
                  <button className="flex items-center justify-center font-medium bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                    <span>Location</span>
                  </button>
                </nav>
              </div>
            )}
          </header>

          <CarDetails carId={currentCarId} onNavigate={navigateTo} />

          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Quiz page if that's the current page
  if (currentPage === 'quiz') {
    return <Quiz onNavigate={navigateTo} />;
  }

  // Render Shop Cars page if that's the current page
  if (currentPage === 'shop') {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
          <TopBanner />
          {/* Header / Navigation */}
          <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
            <div className="max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 lg:px-20 2xl:px-32">
              
              {/* Logo */}
              <button onClick={() => navigateTo('home')} className="flex items-center">
                <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
              </button>

              {/* Desktop Navigation */}
              <nav role="navigation" className="hidden lg:flex items-center gap-8">
                <button onClick={() => navigateTo('shop')} className="text-[rgb(139,_130,_246)] text-[16px] font-semibold">Shop Cars</button>
                <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Sell or Trade Ins</button>
                <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Financing</button>
                <div className="relative">
                  <button 
                    className="flex items-center gap-1 text-[rgb(139,_130,_246)] text-[16px] hover:text-[rgb(139,_130,_246)]" 
                    onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
                  >
                    Company
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`}>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {companyMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[999]">
                      <button onClick={() => navigateTo('about')} className="block w-full text-left px-4 py-2 text-[rgb(139,_130,_246)] text-[16px] hover:bg-gray-50">About us</button>
                      <button onClick={() => navigateTo('contacts')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Contacts</button>
                      <button onClick={() => navigateTo('locations')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Locations</button>
                      <button onClick={() => navigateTo('vacancies')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Vacancies</button>
                    </div>
                  )}
                </div>
              </nav>

              {/* Location Button (Desktop) */}
              <div className="hidden lg:flex items-center gap-[10px]">
                <button className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                  <span>Location</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-[rgb(5,_15,_35)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-b border-[rgba(30,30,30,0.08)] shadow-lg z-[997]">
                <nav className="flex flex-col p-4 gap-4">
                  <button onClick={() => navigateTo('shop')} className="text-[rgb(139,_130,_246)] text-[16px] py-2 text-left font-semibold">Shop Cars</button>
                  <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] py-2">Sell or Trade Ins</button>
                  <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] py-2">Financing</button>
                  <div className="text-[rgb(5,_15,_35)] text-[16px] py-2">Company</div>
                  <button className="flex items-center justify-center font-medium bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                    <span>Location</span>
                  </button>
                </nav>
              </div>
            )}
          </header>

          <ShopCars 
            onNavigate={navigateTo} 
            allCars={allHomeCars}
            loading={loading}
          />

          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Sell Trade page if that's the current page
  if (currentPage === 'sell') {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
          <TopBanner />
          {/* Header / Navigation */}
          <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
            <div className="max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 lg:px-20 2xl:px-32">
              
              {/* Logo */}
              <button onClick={() => navigateTo('home')} className="flex items-center">
                <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
              </button>

              {/* Desktop Navigation */}
              <nav role="navigation" className="hidden lg:flex items-center gap-8">
                <button onClick={() => navigateTo('shop')} className="text-[rgb(139,_130,_246)] text-[16px] font-semibold">Shop Cars</button>
                <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Sell or Trade Ins</button>
                <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Financing</button>
                <div className="relative">
                  <button 
                    className="flex items-center gap-1 text-[rgb(139,_130,_246)] text-[16px] hover:text-[rgb(139,_130,_246)]" 
                    onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
                  >
                    Company
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`}>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {companyMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[999]">
                      <button onClick={() => navigateTo('about')} className="block w-full text-left px-4 py-2 text-[rgb(139,_130,_246)] text-[16px] hover:bg-gray-50">About us</button>
                      <button onClick={() => navigateTo('contacts')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Contacts</button>
                      <button onClick={() => navigateTo('locations')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Locations</button>
                      <button onClick={() => navigateTo('vacancies')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Vacancies</button>
                    </div>
                  )}
                </div>
              </nav>

              {/* Location Button (Desktop) */}
              <div className="hidden lg:flex items-center gap-[10px]">
                <button className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                  <span>Location</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-[rgb(5,_15,_35)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-b border-[rgba(30,30,30,0.08)] shadow-lg z-[997]">
                <nav className="flex flex-col p-4 gap-4">
                  <button onClick={() => navigateTo('shop')} className="text-[rgb(139,_130,_246)] text-[16px] py-2 text-left font-semibold">Shop Cars</button>
                  <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Sell or Trade Ins</button>
                  <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Financing</button>
                  <div className="text-[rgb(5,_15,_35)] text-[16px] py-2">Company</div>
                  <button className="flex items-center justify-center font-medium bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                    <span>Location</span>
                  </button>
                </nav>
              </div>
            )}
          </header>

          <SellTrade />

          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Financing page if that's the current page
  if (currentPage === 'financing') {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
          <TopBanner />
          {/* Header / Navigation */}
          <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
            <div className="max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 lg:px-20 2xl:px-32">
              
              {/* Logo */}
              <button onClick={() => navigateTo('home')} className="flex items-center">
                <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
              </button>

              {/* Desktop Navigation */}
              <nav role="navigation" className="hidden lg:flex items-center gap-8">
                <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Shop Cars</button>
                <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Sell or Trade Ins</button>
                <button onClick={() => navigateTo('financing')} className="text-[rgb(139,_130,_246)] text-[16px] font-semibold">Financing</button>
                <div className="relative">
                  <button 
                    className="flex items-center gap-1 text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]" 
                    onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
                  >
                    Company
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`}>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {companyMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[999]">
                      <button onClick={() => navigateTo('about')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">About us</button>
                      <button onClick={() => navigateTo('contacts')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Contacts</button>
                      <button onClick={() => navigateTo('locations')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Locations</button>
                      <button onClick={() => navigateTo('vacancies')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Vacancies</button>
                    </div>
                  )}
                </div>
              </nav>

              {/* Location Button (Desktop) */}
              <div className="hidden lg:flex items-center gap-[10px]">
                <button className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                  <span>Location</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-[rgb(5,_15,_35)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-b border-[rgba(30,30,30,0.08)] shadow-lg z-[997]">
                <nav className="flex flex-col p-4 gap-4">
                  <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Shop Cars</button>
                  <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Sell or Trade Ins</button>
                  <button onClick={() => navigateTo('financing')} className="text-[rgb(139,_130,_246)] text-[16px] py-2 text-left font-semibold">Financing</button>
                  <div className="text-[rgb(5,_15,_35)] text-[16px] py-2">Company</div>
                  <button className="flex items-center justify-center font-medium bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                    <span>Location</span>
                  </button>
                </nav>
              </div>
            )}
          </header>

          <Financing onNavigate={navigateTo} />

          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render About Us page
  if (currentPage === 'about') {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
          <TopBanner />
          {/* Header / Navigation */}
          <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
            <div className="max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 lg:px-20 2xl:px-32">
              
              {/* Logo */}
              <button onClick={() => navigateTo('home')} className="flex items-center">
                <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
              </button>

              {/* Desktop Navigation */}
              <nav role="navigation" className="hidden lg:flex items-center gap-8">
                <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Shop Cars</button>
                <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Sell or Trade Ins</button>
                <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Financing</button>
                <div className="relative">
                  <button 
                    className="flex items-center gap-1 text-[rgb(139,_130,_246)] text-[16px]" 
                    onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
                  >
                    Company
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`}>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {companyMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[999]">
                      <button onClick={() => navigateTo('about')} className="block w-full text-left px-4 py-2 text-[rgb(139,_130,_246)] text-[16px] hover:bg-gray-50">About us</button>
                      <button onClick={() => navigateTo('contacts')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Contacts</button>
                      <button onClick={() => navigateTo('locations')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Locations</button>
                      <button onClick={() => navigateTo('vacancies')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Vacancies</button>
                    </div>
                  )}
                </div>
              </nav>

              {/* Location Button (Desktop) */}
              <div className="hidden lg:flex items-center gap-[10px]">
                <button className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                  <span>Location</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-[rgb(5,_15,_35)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-b border-[rgba(30,30,30,0.08)] shadow-lg z-[997]">
                <nav className="flex flex-col p-4 gap-4">
                  <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Shop Cars</button>
                  <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Sell or Trade Ins</button>
                  <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Financing</button>
                  <button onClick={() => navigateTo('about')} className="text-[rgb(139,_130,_246)] text-[16px] py-2 text-left font-semibold">About us</button>
                  <button onClick={() => navigateTo('contacts')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Contacts</button>
                  <button onClick={() => navigateTo('locations')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Locations</button>
                  <button onClick={() => navigateTo('vacancies')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Vacancies</button>
                  <button className="flex items-center justify-center font-medium bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                    <span>Location</span>
                  </button>
                </nav>
              </div>
            )}
          </header>

          <AboutUs />

          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Contacts page
  if (currentPage === 'contacts') {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
          <TopBanner />
          {/* Header / Navigation */}
          <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
            <div className="max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 lg:px-20 2xl:px-32">
              
              {/* Logo */}
              <button onClick={() => navigateTo('home')} className="flex items-center">
                <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
              </button>

              {/* Desktop Navigation */}
              <nav role="navigation" className="hidden lg:flex items-center gap-8">
                <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Shop Cars</button>
                <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Sell or Trade Ins</button>
                <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Financing</button>
                <div className="relative">
                  <button 
                    className="flex items-center gap-1 text-[rgb(139,_130,_246)] text-[16px]" 
                    onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
                  >
                    Company
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`}>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {companyMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[999]">
                      <button onClick={() => navigateTo('about')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">About us</button>
                      <button onClick={() => navigateTo('contacts')} className="block w-full text-left px-4 py-2 text-[rgb(139,_130,_246)] text-[16px] hover:bg-gray-50">Contacts</button>
                      <button onClick={() => navigateTo('locations')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Locations</button>
                      <button onClick={() => navigateTo('vacancies')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Vacancies</button>
                    </div>
                  )}
                </div>
              </nav>

              {/* Location Button (Desktop) */}
              <div className="hidden lg:flex items-center gap-[10px]">
                <button className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                  <span>Location</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-[rgb(5,_15,_35)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-b border-[rgba(30,30,30,0.08)] shadow-lg z-[997]">
                <nav className="flex flex-col p-4 gap-4">
                  <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Shop Cars</button>
                  <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Sell or Trade Ins</button>
                  <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Financing</button>
                  <button onClick={() => navigateTo('about')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">About us</button>
                  <button onClick={() => navigateTo('contacts')} className="text-[rgb(139,_130,_246)] text-[16px] py-2 text-left font-semibold">Contacts</button>
                  <button onClick={() => navigateTo('locations')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Locations</button>
                  <button onClick={() => navigateTo('vacancies')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Vacancies</button>
                  <button className="flex items-center justify-center font-medium bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                    <span>Location</span>
                  </button>
                </nav>
              </div>
            )}
          </header>

          <Contacts />

          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Locations page
  if (currentPage === 'locations') {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
          <TopBanner />
          {/* Header / Navigation */}
          <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
            <div className="max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 lg:px-20 2xl:px-32">
              
              {/* Logo */}
              <button onClick={() => navigateTo('home')} className="flex items-center">
                <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
              </button>

              {/* Desktop Navigation */}
              <nav role="navigation" className="hidden lg:flex items-center gap-8">
                <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Shop Cars</button>
                <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Sell or Trade Ins</button>
                <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Financing</button>
                <div className="relative">
                  <button 
                    className="flex items-center gap-1 text-[rgb(139,_130,_246)] text-[16px]" 
                    onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
                  >
                    Company
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`}>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {companyMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[999]">
                      <button onClick={() => navigateTo('about')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">About us</button>
                      <button onClick={() => navigateTo('contacts')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Contacts</button>
                      <button onClick={() => navigateTo('locations')} className="block w-full text-left px-4 py-2 text-[rgb(139,_130,_246)] text-[16px] hover:bg-gray-50">Locations</button>
                      <button onClick={() => navigateTo('vacancies')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Vacancies</button>
                    </div>
                  )}
                </div>
              </nav>

              {/* Location Button (Desktop) */}
              <div className="hidden lg:flex items-center gap-[10px]">
                <button className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                  <span>Location</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-[rgb(5,_15,_35)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-b border-[rgba(30,30,30,0.08)] shadow-lg z-[997]">
                <nav className="flex flex-col p-4 gap-4">
                  <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Shop Cars</button>
                  <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Sell or Trade Ins</button>
                  <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Financing</button>
                  <button onClick={() => navigateTo('about')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">About us</button>
                  <button onClick={() => navigateTo('contacts')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Contacts</button>
                  <button onClick={() => navigateTo('locations')} className="text-[rgb(139,_130,_246)] text-[16px] py-2 text-left font-semibold">Locations</button>
                  <button onClick={() => navigateTo('vacancies')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Vacancies</button>
                  <button className="flex items-center justify-center font-medium bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                    <span>Location</span>
                  </button>
                </nav>
              </div>
            )}
          </header>

          <Locations />

          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Vacancies page
  if (currentPage === 'vacancies') {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
          <TopBanner />
          {/* Header / Navigation */}
          <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
            <div className="max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 lg:px-20 2xl:px-32">
              
              {/* Logo */}
              <button onClick={() => navigateTo('home')} className="flex items-center">
                <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
              </button>

              {/* Desktop Navigation */}
              <nav role="navigation" className="hidden lg:flex items-center gap-8">
                <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Shop Cars</button>
                <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Sell or Trade Ins</button>
                <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Financing</button>
                <div className="relative">
                  <button 
                    className="flex items-center gap-1 text-[rgb(139,_130,_246)] text-[16px]" 
                    onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
                  >
                    Company
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`}>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {companyMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[999]">
                      <button onClick={() => navigateTo('about')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">About us</button>
                      <button onClick={() => navigateTo('contacts')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Contacts</button>
                      <button onClick={() => navigateTo('locations')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Locations</button>
                      <button onClick={() => navigateTo('vacancies')} className="block w-full text-left px-4 py-2 text-[rgb(139,_130,_246)] text-[16px] hover:bg-gray-50">Vacancies</button>
                    </div>
                  )}
                </div>
              </nav>

              {/* Location Button (Desktop) */}
              <div className="hidden lg:flex items-center gap-[10px]">
                <button className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                  <span>Location</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-[rgb(5,_15,_35)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-b border-[rgba(30,30,30,0.08)] shadow-lg z-[997]">
                <nav className="flex flex-col p-4 gap-4">
                  <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Shop Cars</button>
                  <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Sell or Trade Ins</button>
                  <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Financing</button>
                  <button onClick={() => navigateTo('about')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">About us</button>
                  <button onClick={() => navigateTo('contacts')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Contacts</button>
                  <button onClick={() => navigateTo('locations')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Locations</button>
                  <button onClick={() => navigateTo('vacancies')} className="text-[rgb(139,_130,_246)] text-[16px] py-2 text-left font-semibold">Vacancies</button>
                  <button className="flex items-center justify-center font-medium bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                    <span>Location</span>
                  </button>
                </nav>
              </div>
            )}
          </header>

          <Vacancies />

          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Quiz page
  if (currentPage === 'quiz') {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
          <TopBanner />
          {/* Header / Navigation */}
          <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
            <div className="flex items-center justify-between h-full px-4 md:px-8 lg:px-20">
              
              {/* Logo */}
              <button onClick={() => navigateTo('home')} className="flex items-center">
                <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
              </button>

              {/* Desktop Navigation */}
              <nav role="navigation" className="hidden lg:flex items-center gap-8">
                <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Shop Cars</button>
                <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Sell or Trade Ins</button>
                <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Financing</button>
                <div className="relative">
                  <button 
                    className="flex items-center gap-1 text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]" 
                    onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
                  >
                    Company
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`}>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {companyMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[999]">
                      <button onClick={() => navigateTo('about')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">About us</button>
                      <button onClick={() => navigateTo('contacts')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Contacts</button>
                      <button onClick={() => navigateTo('locations')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Locations</button>
                      <button onClick={() => navigateTo('vacancies')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Vacancies</button>
                    </div>
                  )}
                </div>
              </nav>

              {/* Location Button (Desktop) */}
              <div className="hidden lg:flex items-center gap-[10px]">
                <button className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                  <span>Location</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-[rgb(5,_15,_35)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-b border-[rgba(30,30,30,0.08)] shadow-lg z-[997]">
                <nav className="flex flex-col p-4 gap-4">
                  <button onClick={() => navigateTo('shop')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Shop Cars</button>
                  <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Sell or Trade Ins</button>
                  <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Financing</button>
                  <div className="text-[rgb(5,_15,_35)] text-[16px] py-2">Company</div>
                  <button className="flex items-center justify-center font-medium bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                    <span>Location</span>
                  </button>
                </nav>
              </div>
            )}
          </header>

          <Quiz />

          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Home page (default)
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
        
        <TopBanner />

        {/* Header / Navigation */}
        <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
          <div className="max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 lg:px-20 2xl:px-32">
            
            {/* Logo */}
            <a href="https://www.buymetropreowned.ca/" aria-label="home" className="flex items-center">
              <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
            </a>

            {/* Desktop Navigation */}
            <nav role="navigation" className="hidden lg:flex items-center gap-8">
              <button onClick={() => navigateTo('shop')} className="text-[rgb(139,_130,_246)] text-[16px] font-semibold">Shop Cars</button>
              <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Sell or Trade Ins</button>
              <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Financing</button>
              <button onClick={() => navigateTo('quiz')} className="hidden text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Quiz</button>
              <div className="relative">
                <button 
                  className="flex items-center gap-1 text-[rgb(139,_130,_246)] text-[16px] hover:text-[rgb(139,_130,_246)]" 
                  onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
                >
                  Company
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`}>
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {companyMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[999]">
                    <button onClick={() => navigateTo('about')} className="block w-full text-left px-4 py-2 text-[rgb(139,_130,_246)] text-[16px] hover:bg-gray-50">About us</button>
                    <button onClick={() => navigateTo('contacts')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Contacts</button>
                    <button onClick={() => navigateTo('locations')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Locations</button>
                    <button onClick={() => navigateTo('vacancies')} className="block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50">Vacancies</button>
                  </div>
                )}
              </div>
            </nav>

            {/* Location Button (Desktop) */}
            <div className="hidden lg:flex items-center gap-[10px]">
              <LocationDropdown
                locations={locations}
                selectedLocation={selectedLocation}
                locationMenuOpen={locationMenuOpen}
                setLocationMenuOpen={setLocationMenuOpen}
                setSelectedLocation={setSelectedLocation}
                allCars={allHomeCars}
              />
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-[rgb(5,_15,_35)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-b border-[rgba(30,30,30,0.08)] shadow-lg z-[997]">
              <nav className="flex flex-col p-4 gap-4">
                <button onClick={() => navigateTo('shop')} className="text-[rgb(139,_130,_246)] text-[16px] py-2 text-left font-semibold">Shop Cars</button>
                <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Sell or Trade Ins</button>
                <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Financing</button>
                <button onClick={() => navigateTo('quiz')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Quiz</button>
                <div className="text-[rgb(5,_15,_35)] text-[16px] py-2">Company</div>
                <button className="flex items-center justify-center font-medium bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
                  <span>Location</span>
                </button>
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="py-10 md:py-[60px]" style={{"backgroundImage":"linear-gradient(rgb(250, 250, 253), rgba(250, 250, 253, 0))"}}>
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            
            {/* Hero Title */}
            <h1 className="font-semibold text-[rgb(5,_15,_35)] text-3xl md:text-5xl lg:text-[60px] tracking-[-1.3px] leading-tight mb-8 md:mb-10">
              New Car in a Few Clicks
            </h1>

            {/* Search Form */}
            <form aria-label="Vehicle Search" className="flex flex-col gap-4">
              
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row w-full bg-white shadow-[rgba(5,15,35,0.03)_0px_8px_20px_0px] p-4 md:p-[25px] rounded-[0.9375rem] gap-4">
                
                {/* Search Input */}
                <div className="flex items-center w-full md:w-[40%]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6d907943b58722f1daee6a9fc915290c69eb49d0.svg?generation=1768065159964953&alt=media" className="w-[18px] mr-2" alt="" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (searchQuery.trim()) {
                          setShowResults(true);
                        }
                      }
                    }}
                    placeholder="Search a vehicle" 
                    className="w-full h-[38px] bg-white text-[rgb(5,_15,_35)] text-[16px] px-2 outline-none"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center flex-wrap w-full gap-2 md:gap-[5px] justify-end">
                  {[
                    { label: 'Brand', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F16af6440cc77d4fa1f150841821b348c62e0a2e8.svg?generation=1768065159919974&alt=media' },
                    { label: 'Type', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fb5375f123dde1abf12d8577d7f4df253c6b0f3a2.svg?generation=1768065159967383&alt=media' },
                    { label: 'Year', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F99f2cb9bfce982aff53619abd01f8488b0239aac.svg?generation=1768065160014167&alt=media' },
                    { label: 'Price', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fea845e5e4a39de74c9d2f1e829f9145726cafeca.svg?generation=1768065159940576&alt=media' },
                    { label: 'Mileage', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F89731a77a6c77859f2598401972f44ce6d686aa1.svg?generation=1768065159941285&alt=media' },
                    { label: 'More', icon: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6eb6fcb223a2b114c647f41808db4d092a6737ca.svg?generation=1768065159921392&alt=media' }
                  ].map((filter) => {
                    const getFilterLabel = () => {
                      if (filter.label === 'Brand' && selectedBrand) return selectedBrand;
                      if (filter.label === 'Type' && selectedType) return selectedType;
                      if (filter.label === 'Year' && selectedYear) return selectedYear;
                      return filter.label;
                    };
                    
                    const isActive = activeFilter === filter.label || 
                      (filter.label === 'Brand' && selectedBrand) ||
                      (filter.label === 'Type' && selectedType) ||
                      (filter.label === 'Year' && selectedYear) ||
                      (filter.label === 'More' && (selectedTransmission || selectedFuelType || selectedDriveTrain || selectedSeats || selectedStatus));
                    
                    return (
                      <button 
                        key={filter.label}
                        type="button"
                        onClick={() => setActiveFilter(activeFilter === filter.label ? null : filter.label)}
                        className={`flex items-center border gap-[6px] py-2 px-3 rounded-full transition-colors ${
                          isActive
                            ? 'border-[rgb(139,_130,_246)] text-[rgb(139,_130,_246)] bg-[rgba(139,_130,_246,_0.05)]'
                            : 'border-[rgba(5,_15,_35,_0.08)] text-[rgb(5,_15,_35)] hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                        }`}
                      >
                        <img src={filter.icon} className="w-[15px] h-[15px] object-contain opacity-[0.3]" alt="" />
                        <span className="text-sm md:text-[16px]">
                          {getFilterLabel()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand Filter Modal */}
              {activeFilter === 'Brand' && (() => {
                const allBrands = ['Acura', 'Apollo', 'Audi', 'BMW', 'Bentley', 'Bugatti', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Coleman', 'Dodge', 'FIAT', 'Ford', 'GMC', 'Genesis', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Isuzu', 'Jaguar', 'Jeep', 'KIA', 'Land Rover', 'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mercury', 'Mitsubishi', 'Nissan', 'Ram', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'];
                const filteredBrands = allBrands.filter(brand => 
                  brand.toLowerCase().includes(brandSearch.toLowerCase())
                );
                
                return (
                  <>
                    <div 
                      className="fixed inset-0 z-[998]" 
                      onClick={() => {
                        setActiveFilter(null);
                        setBrandSearch('');
                      }}
                    />
                    <div className="relative">
                      <div className="absolute top-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-[999] max-h-[500px] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-[rgb(5,_15,_35)]">Select Brand</h3>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveFilter(null);
                              setBrandSearch('');
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="mb-4">
                          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                              type="text"
                              value={brandSearch}
                              onChange={(e) => setBrandSearch(e.target.value)}
                              placeholder="Search a vehicle"
                              className="w-full outline-none text-sm text-[rgb(5,_15,_35)]"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {filteredBrands.map((brand) => (
                            <button
                              key={brand}
                              type="button"
                              onClick={() => {
                                setSelectedBrand(brand);
                                setActiveFilter(null);
                                setBrandSearch('');
                                setShowResults(true);
                              }}
                              className={`py-2 px-4 rounded-lg border text-sm transition-colors ${
                                selectedBrand === brand
                                  ? 'bg-[rgb(139,_130,_246)] text-white border-[rgb(139,_130,_246)]'
                                  : 'bg-white text-[rgb(5,_15,_35)] border-gray-200 hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                              }`}
                            >
                              {brand}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}

              {/* Type Filter Modal */}
              {activeFilter === 'Type' && (
                <>
                  <div 
                    className="fixed inset-0 z-[998]" 
                    onClick={() => setActiveFilter(null)}
                  />
                  <div className="relative">
                    <div className="absolute top-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-[999] max-h-[400px] overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[rgb(5,_15,_35)]">Select Type</h3>
                        <button
                          type="button"
                          onClick={() => setActiveFilter(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {['Trailer', 'Commercial', 'Convertible', 'VAN', 'Wagon', 'Minivan', 'SUV', 'Truck', 'Hatchback', 'Coupe', 'Sedan'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              setSelectedType(type);
                              setActiveFilter(null);
                              setShowResults(true);
                            }}
                            className={`py-2 px-4 rounded-lg border text-sm transition-colors ${
                              selectedType === type
                                ? 'bg-[rgb(139,_130,_246)] text-white border-[rgb(139,_130,_246)]'
                                : 'bg-white text-[rgb(5,_15,_35)] border-gray-200 hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Year Filter Modal */}
              {activeFilter === 'Year' && (
                <>
                  <div 
                    className="fixed inset-0 z-[998]" 
                    onClick={() => setActiveFilter(null)}
                  />
                  <div className="relative">
                    <div className="absolute top-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-[999]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[rgb(5,_15,_35)]">Year Range</h3>
                        <button
                          type="button"
                          onClick={() => setActiveFilter(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">From</label>
                            <input
                              type="number"
                              value={yearRange.min}
                              onChange={(e) => setYearRange({ ...yearRange, min: Number(e.target.value) })}
                              min={2000}
                              max={2024}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(139,_130,_246)]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">To</label>
                            <input
                              type="number"
                              value={yearRange.max}
                              onChange={(e) => setYearRange({ ...yearRange, max: Number(e.target.value) })}
                              min={2000}
                              max={2024}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(139,_130,_246)]"
                            />
                          </div>
                        </div>
                        
                        {/* Range Slider */}
                        <div className="px-2">
                          <input
                            type="range"
                            min={2000}
                            max={2024}
                            value={yearRange.min}
                            onChange={(e) => setYearRange({ ...yearRange, min: Math.min(Number(e.target.value), yearRange.max) })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[rgb(139,_130,_246)]"
                          />
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => {
                            setActiveFilter(null);
                            setShowResults(true);
                          }}
                          className="w-full bg-[rgb(139,_130,_246)] text-white py-2 px-4 rounded-lg hover:bg-[rgb(129,_120,_236)] transition-colors"
                        >
                          Apply Year Range
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Price Filter Modal */}
              {activeFilter === 'Price' && (
                <>
                  <div 
                    className="fixed inset-0 z-[998]" 
                    onClick={() => setActiveFilter(null)}
                  />
                  <div className="relative">
                    <div className="absolute top-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-[999]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[rgb(5,_15,_35)]">Price Range</h3>
                        <button
                          type="button"
                          onClick={() => setActiveFilter(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">Minimum</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                              <input
                                type="number"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                min={0}
                                max={100000}
                                step={1000}
                                className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(139,_130,_246)]"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">Maximum</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                              <input
                                type="number"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                min={0}
                                max={100000}
                                step={1000}
                                className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(139,_130,_246)]"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Range Slider */}
                        <div className="px-2">
                          <input
                            type="range"
                            min={0}
                            max={100000}
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: Math.min(Number(e.target.value), priceRange.max) })}
                            step={1000}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[rgb(139,_130,_246)]"
                          />
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => {
                            setActiveFilter(null);
                            setShowResults(true);
                          }}
                          className="w-full bg-[rgb(139,_130,_246)] text-white py-2 px-4 rounded-lg hover:bg-[rgb(129,_120,_236)] transition-colors"
                        >
                          Apply Price Range
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Mileage Filter Modal */}
              {activeFilter === 'Mileage' && (
                <>
                  <div 
                    className="fixed inset-0 z-[998]" 
                    onClick={() => setActiveFilter(null)}
                  />
                  <div className="relative">
                    <div className="absolute top-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-[999]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[rgb(5,_15,_35)]">Mileage Range</h3>
                        <button
                          type="button"
                          onClick={() => setActiveFilter(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">Minimum</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={mileageRange.min}
                                onChange={(e) => setMileageRange({ ...mileageRange, min: Number(e.target.value) })}
                                min={0}
                                max={300000}
                                step={1000}
                                className="w-full pr-12 pl-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(139,_130,_246)]"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">km</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">Maximum</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={mileageRange.max}
                                onChange={(e) => setMileageRange({ ...mileageRange, max: Number(e.target.value) })}
                                min={0}
                                max={300000}
                                step={1000}
                                className="w-full pr-12 pl-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(139,_130,_246)]"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">km</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Range Slider */}
                        <div className="px-2">
                          <input
                            type="range"
                            min={0}
                            max={300000}
                            value={mileageRange.min}
                            onChange={(e) => setMileageRange({ ...mileageRange, min: Math.min(Number(e.target.value), mileageRange.max) })}
                            step={1000}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[rgb(139,_130,_246)]"
                          />
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => {
                            setActiveFilter(null);
                            setShowResults(true);
                          }}
                          className="w-full bg-[rgb(139,_130,_246)] text-white py-2 px-4 rounded-lg hover:bg-[rgb(129,_120,_236)] transition-colors"
                        >
                          Apply Mileage Range
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* More Filter Modal */}
              {activeFilter === 'More' && (
                <>
                  <div 
                    className="fixed inset-0 z-[998]" 
                    onClick={() => setActiveFilter(null)}
                  />
                  <div className="relative">
                    <div className="absolute top-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-[999] max-h-[500px] overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[rgb(5,_15,_35)]">More Filters</h3>
                        <button
                          type="button"
                          onClick={() => setActiveFilter(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="space-y-6">
                        {/* Transmission */}
                        <div>
                          <h4 className="text-sm font-semibold text-[rgb(5,_15,_35)] mb-3">Transmission</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {['Automatic', 'Manual', 'CVT'].map((transmission) => (
                              <button
                                key={transmission}
                                type="button"
                                onClick={() => setSelectedTransmission(selectedTransmission === transmission ? null : transmission)}
                                className={`py-2 px-4 rounded-lg border text-sm transition-colors ${
                                  selectedTransmission === transmission
                                    ? 'bg-[rgb(139,_130,_246)] text-white border-[rgb(139,_130,_246)]'
                                    : 'bg-white text-[rgb(5,_15,_35)] border-gray-200 hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                                }`}
                              >
                                {transmission}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Fuel Type */}
                        <div>
                          <h4 className="text-sm font-semibold text-[rgb(5,_15,_35)] mb-3">Fuel Type</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {['Gasoline', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid'].map((fuel) => (
                              <button
                                key={fuel}
                                type="button"
                                onClick={() => setSelectedFuelType(selectedFuelType === fuel ? null : fuel)}
                                className={`py-2 px-4 rounded-lg border text-sm transition-colors ${
                                  selectedFuelType === fuel
                                    ? 'bg-[rgb(139,_130,_246)] text-white border-[rgb(139,_130,_246)]'
                                    : 'bg-white text-[rgb(5,_15,_35)] border-gray-200 hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                                }`}
                              >
                                {fuel}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Drive Train */}
                        <div>
                          <h4 className="text-sm font-semibold text-[rgb(5,_15,_35)] mb-3">Drive Train</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {['FWD', 'RWD', 'AWD', '4WD'].map((drive) => (
                              <button
                                key={drive}
                                type="button"
                                onClick={() => setSelectedDriveTrain(selectedDriveTrain === drive ? null : drive)}
                                className={`py-2 px-4 rounded-lg border text-sm transition-colors ${
                                  selectedDriveTrain === drive
                                    ? 'bg-[rgb(139,_130,_246)] text-white border-[rgb(139,_130,_246)]'
                                    : 'bg-white text-[rgb(5,_15,_35)] border-gray-200 hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                                }`}
                              >
                                {drive}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Seats */}
                        <div>
                          <h4 className="text-sm font-semibold text-[rgb(5,_15,_35)] mb-3">Seats</h4>
                          <div className="grid grid-cols-3 gap-3">
                            {['2', '4', '5', '6', '7', '8+'].map((seats) => (
                              <button
                                key={seats}
                                type="button"
                                onClick={() => setSelectedSeats(selectedSeats === seats ? null : seats)}
                                className={`py-2 px-4 rounded-lg border text-sm transition-colors ${
                                  selectedSeats === seats
                                    ? 'bg-[rgb(139,_130,_246)] text-white border-[rgb(139,_130,_246)]'
                                    : 'bg-white text-[rgb(5,_15,_35)] border-gray-200 hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                                }`}
                              >
                                {seats}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Status */}
                        <div>
                          <h4 className="text-sm font-semibold text-[rgb(5,_15,_35)] mb-3">Status</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {['Available', 'Pending'].map((status) => (
                              <button
                                key={status}
                                type="button"
                                onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                                className={`py-2 px-4 rounded-lg border text-sm transition-colors ${
                                  selectedStatus === status
                                    ? 'bg-[rgb(139,_130,_246)] text-white border-[rgb(139,_130,_246)]'
                                    : 'bg-white text-[rgb(5,_15,_35)] border-gray-200 hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                                }`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveFilter(null);
                            setShowResults(true);
                          }}
                          className="w-full bg-[rgb(139,_130,_246)] text-white py-2 px-4 rounded-lg hover:bg-[rgb(129,_120,_236)] transition-colors"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </form>

            {/* Car Listings Section - показується після вибору фільтра */}
            {showResults && (selectedBrand || selectedType || selectedYear) && (() => {
              // All 16 cars data
              const allCars = [
                {
                  id: 1,
                  name: '2019 Acura RDX TECHNOLOGY AWD 3.5L V6',
                  price: 20990,
                  mileage: 120000,
                  image: 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xrc3dhZ2VuJTIwY2FyJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 2,
                  name: '2015 Acura TLX V6 TECH 3.5L V6',
                  price: 17500,
                  mileage: 120000,
                  image: 'https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjB0cnVjayUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 3,
                  name: '2014 Acura MDX Tech Pkg SH-AWD',
                  price: 11900,
                  mileage: 274200,
                  image: 'https://images.unsplash.com/photo-1760810699887-0f37d54da23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2JTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 4,
                  name: '2015 Acura MDX SH-AWD 4dr Elite Pkg',
                  price: 84990,
                  mileage: 165000,
                  image: 'https://images.unsplash.com/photo-1669109777226-73e0ce597658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBzdXYlMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc2ODA2Nzk1MHww&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 5,
                  name: '2016 Acura MDX Elite Pkg SH-AWD',
                  price: 52950,
                  mileage: 125000,
                  image: 'https://images.unsplash.com/photo-1662981535849-b65888e3ec45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 6,
                  name: '2014 Acura ILX Tech Pkg Automatic',
                  price: 34500,
                  mileage: 98000,
                  image: 'https://images.unsplash.com/photo-1687730594701-88cdea1ef5ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaXNzYW4lMjBzZWRhbiUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 7,
                  name: '2018 Honda Accord Sport 1.5T',
                  price: 19900,
                  mileage: 85000,
                  image: 'https://images.unsplash.com/photo-1662981535849-b65888e3ec45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 8,
                  name: '2020 Toyota RAV4 Limited AWD',
                  price: 28500,
                  mileage: 62000,
                  image: 'https://images.unsplash.com/photo-1669109777226-73e0ce597658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBzdXYlMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc2ODA2Nzk1MHww&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 9,
                  name: '2017 Nissan Altima 2.5 SL',
                  price: 14900,
                  mileage: 105000,
                  image: 'https://images.unsplash.com/photo-1687730594701-88cdea1ef5ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaXNzYW4lMjBzZWRhbiUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Pending'
                },
                {
                  id: 10,
                  name: '2019 Ford F-150 XLT SuperCrew 4WD',
                  price: 35900,
                  mileage: 78000,
                  image: 'https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjB0cnVjayUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 11,
                  name: '2016 Mazda CX-5 Grand Touring AWD',
                  price: 16900,
                  mileage: 92000,
                  image: 'https://images.unsplash.com/photo-1760810699887-0f37d54da23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2JTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 12,
                  name: '2021 Chevrolet Silverado 1500 LT',
                  price: 41900,
                  mileage: 45000,
                  image: 'https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjB0cnVjayUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 13,
                  name: '2018 Subaru Outback 2.5i Premium',
                  price: 22900,
                  mileage: 88000,
                  image: 'https://images.unsplash.com/photo-1669109777226-73e0ce597658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBzdXYlMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc2ODA2Nzk1MHww&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 14,
                  name: '2017 Hyundai Elantra SE',
                  price: 12900,
                  mileage: 115000,
                  image: 'https://images.unsplash.com/photo-1687730594701-88cdea1ef5ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaXNzYW4lMjBzZWRhbiUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Pending'
                },
                {
                  id: 15,
                  name: '2020 Jeep Grand Cherokee Limited 4WD',
                  price: 32900,
                  mileage: 58000,
                  image: 'https://images.unsplash.com/photo-1760810699887-0f37d54da23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2JTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                },
                {
                  id: 16,
                  name: '2019 Volkswagen Jetta SEL Premium',
                  price: 18500,
                  mileage: 72000,
                  image: 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xrc3dhZ2VuJTIwY2FyJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                  status: 'Available'
                }
              ];

              // Pagination logic
              const totalPages = Math.ceil(allCars.length / itemsPerPage);
              const startIndex = (currentSearchPage - 1) * itemsPerPage;
              const endIndex = startIndex + itemsPerPage;
              const currentCars = allCars.slice(startIndex, endIndex);

              return (
              <div className="w-full py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  
                  {/* Cars Grid */}
                  <div className="flex-1">

                  {/* Results Count & Sort */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
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

                  {/* Brand Name */}
                  <div className="mb-6">
                    <h3 className="text-[rgb(5,_15,_35)] text-2xl font-semibold">
                      {selectedBrand || selectedType || selectedYear || 'Results'}
                      {selectedBrand && selectedType && ` ${selectedType}`}
                      {selectedBrand && selectedYear && ` ${selectedYear}`}
                      {selectedType && selectedYear && !selectedBrand && ` ${selectedYear}`}
                    </h3>
                    {/* Active Filters */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {selectedBrand && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Brand: {selectedBrand}
                          <button onClick={() => { setSelectedBrand(null); setCurrentSearchPage(1); }} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedType && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Type: {selectedType}
                          <button onClick={() => { setSelectedType(null); setCurrentSearchPage(1); }} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedYear && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Year: {selectedYear}
                          <button onClick={() => { setSelectedYear(null); setCurrentSearchPage(1); }} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedTransmission && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Transmission: {selectedTransmission}
                          <button onClick={() => { setSelectedTransmission(null); setCurrentSearchPage(1); }} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedFuelType && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Fuel: {selectedFuelType}
                          <button onClick={() => { setSelectedFuelType(null); setCurrentSearchPage(1); }} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedDriveTrain && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Drive: {selectedDriveTrain}
                          <button onClick={() => { setSelectedDriveTrain(null); setCurrentSearchPage(1); }} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedSeats && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Seats: {selectedSeats}
                          <button onClick={() => { setSelectedSeats(null); setCurrentSearchPage(1); }} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedStatus && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Status: {selectedStatus}
                          <button onClick={() => { setSelectedStatus(null); setCurrentSearchPage(1); }} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {(selectedBrand || selectedType || selectedYear || selectedTransmission || selectedFuelType || selectedDriveTrain || selectedSeats || selectedStatus) && (
                        <button
                          onClick={() => {
                            setSelectedBrand(null);
                            setSelectedType(null);
                            setSelectedYear(null);
                            setSelectedTransmission(null);
                            setSelectedFuelType(null);
                            setSelectedDriveTrain(null);
                            setSelectedSeats(null);
                            setSelectedStatus(null);
                            setShowResults(false);
                            setCurrentSearchPage(1);
                          }}
                          className="text-sm text-red-500 hover:text-red-600 font-medium"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Cars Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {currentCars.map((car, idx) => (
                      <a 
                        key={`search-car-${car.id}-${idx}`} 
                        href="#" 
                        className="block bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                      >
                        {/* Car Image */}
                        <div className="relative w-full h-[200px] bg-gray-100">
                          <img
                            src={car.image || 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?w=800'}
                            alt={car.name || 'Car'}
                            className="w-full h-full object-cover"
                          />
                          {/* Status Badge */}
                          <div className="absolute top-3 left-3">
                            <span className={`text-xs font-semibold px-3 py-1 rounded ${
                              (car.status || 'Available') === 'Available' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-orange-500 text-white'
                            }`}>
                              {car.status || 'Available'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Car Details */}
                        <div className="p-4">
                          <h3 className="text-[rgb(5,_15,_35)] text-base font-medium leading-tight mb-3 line-clamp-2 min-h-[48px]">
                            {car.name || 'Unknown Car'}
                          </h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-[rgb(5,_15,_35)] font-bold text-xl">
                              ${(car.price || 0).toLocaleString()}
                            </div>
                            <div className="text-[rgb(5,_15,_35)] opacity-[0.5] text-sm">
                              {(car.mileage || 0).toLocaleString()} km
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      {/* Previous Button */}
                      <button
                        onClick={() => {
                          if (currentSearchPage > 1) {
                            setCurrentSearchPage(currentSearchPage - 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        disabled={currentSearchPage === 1}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                          currentSearchPage === 1
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                            : 'border-[rgb(139,_130,_246)] text-[rgb(139,_130,_246)] hover:bg-[rgb(139,_130,_246)] hover:text-white'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </button>

                      {/* Page Numbers */}
                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => {
                              setCurrentSearchPage(page);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-10 h-10 rounded-full border transition-colors ${
                              currentSearchPage === page
                                ? 'bg-[rgb(139,_130,_246)] text-white border-[rgb(139,_130,_246)]'
                                : 'border-gray-200 text-[rgb(5,_15,_35)] hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => {
                          if (currentSearchPage < totalPages) {
                            setCurrentSearchPage(currentSearchPage + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        disabled={currentSearchPage === totalPages}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                          currentSearchPage === totalPages
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                            : 'border-[rgb(139,_130,_246)] text-[rgb(139,_130,_246)] hover:bg-[rgb(139,_130,_246)] hover:text-white'
                        }`}
                      >
                        Next
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Trade In Sidebar */}
                <div className="lg:w-[320px]">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 sticky top-24">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-[rgb(139,_130,_246)] rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-[rgb(5,_15,_35)] text-2xl font-bold text-center mb-2">
                      Trade your car
                    </h3>
                    <p className="text-[rgb(5,_15,_35)] text-center opacity-70 text-sm mb-6">
                      Save your time and money
                    </p>
                    <button 
                      onClick={() => navigateTo('sell')}
                      className="w-full bg-[rgb(139,_130,_246)] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[rgb(129,_120,_236)] transition-colors"
                    >
                      Trade In
                    </button>
                  </div>
                </div>

              </div>
              </div>
              );
            })()}

            {/* Featured Cars Section */}
            <div className="mt-10">
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
                  <p className="text-sm text-gray-500">Connecting to database</p>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-red-800 mb-1">Database Connection Error</h3>
                      <p className="text-sm text-red-600">{error}</p>
                      <p className="text-sm text-red-500 mt-1">Showing sample data as fallback.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Section Header */}
              {!loading && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">We found <span className="font-semibold text-[rgb(5,_15,_35)]">{filteredHomeCars.length} cars</span> {selectedLocation && <span>in <span className="text-[rgb(139,_130,_246)]">{selectedLocation}</span></span>}</p>
                </div>
                {selectedLocation && (
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-sm text-[rgb(139,_130,_246)] hover:text-[rgb(129,_120,_236)] font-semibold"
                  >
                    Clear Location Filter
                  </button>
                )}
              </div>
              )}

              {/* No Cars Found Message */}
              {!loading && filteredHomeCars.length === 0 && (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[rgb(5,_15,_35)] mb-2">We didn't find any cars</h3>
                  <p className="text-gray-500 mb-6">No vehicles available at {selectedLocation}. Please try another location.</p>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="bg-[rgb(139,_130,_246)] text-white px-6 py-3 rounded-lg hover:bg-[rgb(129,_120,_236)] transition-colors font-semibold"
                  >
                    View All Locations
                  </button>
                </div>
              )}

              {/* Cars Grid with Trade In Card */}
              {!loading && filteredHomeCars.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
                {currentHomeCars.map((car, index) => {
                  const tradeInPosition = 3;
                  const shouldShowTradeIn = index === tradeInPosition && currentHomePage === 1;
                  
                  return (
                    <React.Fragment key={`car-${car.id}-${index}`}>
                      {shouldShowTradeIn && (
                        <div 
                          onClick={() => navigateTo('quiz')}
                          className="block rounded-[0.9375rem] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer h-full"
                        >
                          <div className="bg-gradient-to-br from-[rgb(139,_130,_246)] to-[rgb(109,_100,_226)] p-6 flex flex-col items-center justify-center h-full relative">
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                              <Icons.RefreshCw className="w-24 h-24 text-white" />
                            </div>
                            <div className="text-center z-10">
                              <div className="mb-4">
                                <Icons.RefreshCw className="w-12 h-12 text-white mx-auto" />
                              </div>
                              <h3 className="font-semibold text-white text-xl mb-2">
                                Trade your car
                              </h3>
                              <p className="text-white/90 text-sm mb-6">
                                Save your time and money
                              </p>
                              <div className="bg-white text-[rgb(139,_130,_246)] px-6 py-3 rounded-full font-semibold inline-block hover:bg-gray-50 transition-colors">
                                Trade In
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div 
                        onClick={() => navigateTo('shop')}
                        className="block hover:scale-105 transition-transform cursor-pointer h-full"
                      >
                        <div className="bg-white rounded-[0.9375rem] overflow-hidden shadow-sm hover:shadow-md h-full flex flex-col">
                          <div className="relative h-48 bg-gray-100 flex-shrink-0">
                            <img 
                              src={car.image || 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?w=800'} 
                              alt={car.name || 'Car'}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                (car.status || 'Available') === 'Available' 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-yellow-500 text-white'
                              }`}>
                                {car.status || 'Available'}
                              </span>
                            </div>
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-semibold text-[rgb(5,_15,_35)] text-base mb-3 line-clamp-2 flex-grow">
                              {car.name || 'Unknown Car'}
                            </h3>
                            <div className="flex items-center justify-between mt-auto">
                              <div>
                                <p className="text-[rgb(139,_130,_246)] font-semibold text-xl">
                                  ${(car.price || 0).toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-gray-500 text-sm">
                                  {(car.mileage || 0).toLocaleString()} mi
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              )}

              {/* Pagination */}
              {!loading && filteredHomeCars.length > 0 && totalHomePages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentHomePage(Math.max(1, currentHomePage - 1))}
                    disabled={currentHomePage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-[rgb(5,_15,_35)] hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalHomePages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentHomePage(page)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentHomePage === page
                            ? 'bg-[rgb(139,_130,_246)] text-white'
                            : 'border border-gray-200 text-[rgb(5,_15,_35)] hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)]'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentHomePage(Math.min(totalHomePages, currentHomePage + 1))}
                    disabled={currentHomePage === totalHomePages}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-[rgb(5,_15,_35)] hover:border-[rgb(139,_130,_246)] hover:text-[rgb(139,_130,_246)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            {/* Shop & Sell Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5">
              
              {/* Shop Card */}
              <div 
                onClick={() => navigateTo('shop')}
                className="block rounded-[0.9375rem] hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <div className="flex justify-between bg-[rgb(139,_130,_246)] min-h-[200px] p-6 md:p-[30px] rounded-[0.9375rem]">
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-[15px]">
                      <div className="font-medium text-white text-2xl md:text-[25px]">Shop</div>
                      <div className="text-white text-[16px]">200+ cars available</div>
                    </div>
                    <div className="flex items-center gap-[6px] mt-4">
                      <div className="font-semibold text-white text-lg md:text-[18px]">Browse Vehicles</div>
                      <Icons.ArrowRightWhite />
                    </div>
                  </div>
                  <div className="bg-right bg-no-repeat bg-contain w-[40%] md:w-[50%]" style={{"backgroundImage":`url(${imgShopCard})`}}></div>
                </div>
              </div>

              {/* Sell Card */}
              <div 
                onClick={() => navigateTo('quiz')}
                className="block rounded-[0.9375rem] hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <div 
                  className="flex justify-between border border-[rgba(139,_130,_246,_0.06)] min-h-[200px] p-6 md:p-[30px] rounded-[0.9375rem] hover:shadow-lg transition-shadow" 
                  style={{"backgroundImage":"linear-gradient(45deg, rgba(139, 130, 246, 0.05), rgba(139, 130, 246, 0.1))"}}
                >
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-[15px]">
                      <div className="font-medium text-[rgb(5,_15,_35)] text-2xl md:text-[23px]">Sell</div>
                      <div className="text-[rgb(5,_15,_35)] text-[16px]">Just in a few clicks</div>
                    </div>
                    <div className="flex items-center gap-[6px] mt-4">
                      <div className="font-semibold text-[rgb(139,_130,_246)] text-lg md:text-[18px]">Get started</div>
                      <Icons.ArrowRight className="w-4 text-[rgb(139,_130,_246)]" />
                    </div>
                  </div>
                  <div className="bg-right bg-no-repeat bg-contain w-[40%] md:w-[50%]" style={{"backgroundImage":`url(${imgSellCard})`}}></div>
                </div>
              </div>
            </div>

            {/* Equifax Banner */}
            <div className="mt-10 rounded-[0.9375rem] overflow-hidden">
              <div className="relative w-full bg-[rgb(250,_250,_251)] min-h-[110px]">
                <div className="absolute inset-0 bg-[rgb(139,_130,_246)]">
                  <div className="absolute inset-0 bg-bottom bg-no-repeat" style={{"backgroundImage":"url(\"https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F1b2f9ee07d49b4d540bf7b3eb55abc1bdfd7090b?generation=1768065160088759&alt=media\")","backgroundSize":"100% 75%"}}></div>
                </div>
                <div className="relative w-full h-full p-4 md:p-5 px-[20px] py-[40px]">
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-evenly text-center max-w-[1200px] mx-auto gap-4">
                    <img alt="Equifax" src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fb59c186f2cad3e26ce3aa602f80cd1e80973b93d.png?generation=1768065160065915&alt=media" className="w-[120px] md:w-[157.95px] h-auto" />
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="text-white font-bold text-lg md:text-[20px] leading-[24px]" style={{"fontFamily":"\"AVA Proxima Nova\""}}>
                        Great loan options are waiting for you. Know if you qualify before you buy.
                      </div>
                      <button 
                        onClick={() => navigateTo('quiz')}
                        className="bg-white text-[rgb(139,130,246)] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-base md:text-lg whitespace-nowrap"
                      >
                        Get Pre-Approved
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Canadian Black Book Banner */}
            <div className="mt-10 rounded-[0.9375rem] overflow-hidden">
              <div className="relative w-full">
                <div className="absolute inset-0 bg-[rgb(5,_14,_35)]">
                  <div className="absolute inset-0 bg-bottom bg-no-repeat" style={{"backgroundImage":"url(\"https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F1b2f9ee07d49b4d540bf7b3eb55abc1bdfd7090b?generation=1768065160088759&alt=media\")","backgroundSize":"100% 75%"}}></div>
                </div>
                <div className="relative flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto py-8 px-4">
                  <img alt="cbb-logo" src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fefed42f33e169c093b471be984d4440ceafa20dc.svg?generation=1768065160121232&alt=media" className="w-[110px] h-[52px] mb-4" />
                  <div className="text-center">
                    <div className="font-bold text-white text-lg md:text-[20px] tracking-[2px] md:tracking-[4px]" style={{"fontFamily":"\"AVA Poppins\""}}>
                      INSTANT VEHICLE APPRAISAL
                    </div>
                    <p className="font-thin text-white text-xs md:text-[12px] tracking-[0.5px] mt-2" style={{"fontFamily":"\"AVA Poppins\""}}>
                      POWERED BY CANADIAN BLACK BOOK
                    </p>
                  </div>
                  <div className="w-full max-w-[250px] mt-4">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fe41c28d6429598c78addb27afa10dd5719129235.svg?generation=1768065160130577&alt=media" className="w-full" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Browse by Type Section */}
        <section className="bg-[rgb(248,_248,_252)] py-12 md:py-20">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-4">
              <h2 className="font-semibold text-[rgb(5,_15,_35)] text-2xl md:text-3xl lg:text-[40px] tracking-[-1px]">
                Browse by Type
              </h2>
              <button onClick={() => navigateTo('shop')} className="flex items-center text-[rgb(139,_130,_246)] gap-[6px] hover:gap-[10px] transition-all">
                <span className="font-semibold text-lg md:text-[18px]">Explore all types</span>
                <Icons.ArrowRight className="w-[10px]" />
              </button>
            </div>

            {/* Vehicle Types Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
              {[
                { name: 'Sedan', image: imgFordSedan },
                { name: 'SUV', image: imgSUV },
                { name: 'Hatchback', image: imgHatchback },
                { name: 'Truck', image: imgTruck },
                { name: 'VAN', image: imgVAN },
                { name: 'Coupe', image: imgCoupe }
              ].map((type) => (
                <div 
                  key={type.name}
                  onClick={() => navigateTo('shop')}
                  className="block hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="flex flex-col items-center bg-white gap-2 p-4 rounded-[0.9375rem] shadow-sm hover:shadow-md">
                    <img alt={type.name} src={type.image} className="w-full h-32 md:h-40 object-contain rounded-lg" />
                    <p className="text-[rgb(5,_15,_35)] text-sm md:text-base">{type.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Brands Section */}
        <section className="bg-[rgb(248,_248,_252)] py-12 md:py-20">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-4">
              <h2 className="font-semibold text-[rgb(5,_15,_35)] text-2xl md:text-3xl lg:text-[40px] tracking-[-1px]">
                Popular Brands
              </h2>
              <button onClick={() => navigateTo('shop')} className="flex items-center text-[rgb(139,_130,_246)] gap-[6px] hover:gap-[10px] transition-all">
                <span className="font-semibold text-lg md:text-[18px]">Explore all brands</span>
                <Icons.ArrowRight className="w-[10px]" />
              </button>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
              {[
                { name: 'Jeep', image: imgJeepLogo },
                { name: 'Chrysler', image: imgChryslerLogo },
                { name: 'Ford', image: imgFordLogo },
                { name: 'Toyota', image: imgToyotaLogo },
                { name: 'Dodge', image: imgDodgeLogo },
                { name: 'Nissan', image: imgNissanLogo }
              ].map((brand) => (
                <div 
                  key={brand.name}
                  onClick={() => navigateTo('shop')}
                  className="block hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center bg-white gap-2 p-6 rounded-[0.9375rem] shadow-sm hover:shadow-md min-h-[100px]">
                    <img alt={brand.name} src={brand.image} className="w-20 md:w-24 h-auto object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer onNavigate={navigateTo} />

      </div>
    </div>
  );
}