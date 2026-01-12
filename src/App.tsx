import React, { useState } from 'react';
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

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

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

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setCompanyMenuOpen(false);
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
            <div className="flex items-center justify-between h-full px-4 md:px-8 lg:px-20">
              
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

          <ShopCars />

          {/* Footer */}
          <footer className="bg-[rgb(5,_15,_35)] py-12 md:py-16">
            <div className="w-full px-4 md:px-8 lg:px-20">
              
              {/* Footer Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
                
                {/* Company Info */}
                <div className="flex flex-col gap-5">
                  <div className="font-semibold text-white text-xl md:text-[20px]">Buy Metro Pre-Owned</div>
                  <p className="text-white text-sm md:text-[16px] opacity-[0.55] leading-relaxed">
                    Your trusted pre-owned vehicle dealership offering quality cars at great prices.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F8d2d90ddfc0fdadbbd5a15b3a29b23d6bb2dc02a.svg?generation=1768065160410529&alt=media" className="w-[25px]" alt="Facebook" />
                    </a>
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F91aa0949f2598fc3974861dcd68765494604ff46.svg?generation=1768065160436982&alt=media" className="w-[25px]" alt="Instagram" />
                    </a>
                  </div>
                </div>

                {/* Browse Links */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Browse</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('shop')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Buy a vehicle
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Return Policy
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Trade-Ins
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Loan Calculator
                    </a>
                  </div>
                </div>

                {/* Company Links */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Company</p>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Locations
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      About us
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Service
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Vacancies
                    </a>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Contacts</p>
                  <div className="flex flex-col gap-4">
                    <a href="tel:9022524422" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 252 4422
                    </a>
                    <a href="tel:9024660086" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 466 0086
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="border-t border-white/10 pt-8 text-center">
                <p className="text-white text-sm opacity-[0.55]">
                  © 2025 Buy Metro Pre-Owned. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
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
            <div className="flex items-center justify-between h-full px-4 md:px-8 lg:px-20">
              
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

          {/* Footer */}
          <footer className="bg-[rgb(5,_15,_35)] py-12 md:py-16">
            <div className="w-full px-4 md:px-8 lg:px-20">
              
              {/* Footer Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
                
                {/* Company Info */}
                <div className="flex flex-col gap-5">
                  <div className="font-semibold text-white text-xl md:text-[20px]">Buy Metro Pre-Owned</div>
                  <p className="text-white text-sm md:text-[16px] opacity-[0.55] leading-relaxed">
                    Your trusted pre-owned vehicle dealership offering quality cars at great prices.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F8d2d90ddfc0fdadbbd5a15b3a29b23d6bb2dc02a.svg?generation=1768065160410529&alt=media" className="w-[25px]" alt="Facebook" />
                    </a>
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F91aa0949f2598fc3974861dcd68765494604ff46.svg?generation=1768065160436982&alt=media" className="w-[25px]" alt="Instagram" />
                    </a>
                  </div>
                </div>

                {/* Browse Links */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Browse</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('shop')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Buy a vehicle
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Return Policy
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Trade-Ins
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Loan Calculator
                    </a>
                  </div>
                </div>

                {/* Company Links */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Company</p>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Locations
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      About us
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Service
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Vacancies
                    </a>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Contacts</p>
                  <div className="flex flex-col gap-4">
                    <a href="tel:9022524422" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 252 4422
                    </a>
                    <a href="tel:9024660086" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 466 0086
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="border-t border-white/10 pt-8 text-center">
                <p className="text-white text-sm opacity-[0.55]">
                  © 2025 Buy Metro Pre-Owned. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
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
            <div className="flex items-center justify-between h-full px-4 md:px-8 lg:px-20">
              
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

          {/* Footer */}
          <footer className="bg-[rgb(5,_15,_35)] py-12 md:py-16">
            <div className="w-full px-4 md:px-8 lg:px-20">
              
              {/* Footer Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
                
                {/* Company Info */}
                <div className="flex flex-col gap-5">
                  <div className="font-semibold text-white text-xl md:text-[20px]">Buy Metro Pre-Owned</div>
                  <p className="text-white text-sm md:text-[16px] opacity-[0.55] leading-relaxed">
                    Your trusted pre-owned vehicle dealership offering quality cars at great prices.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F8d2d90ddfc0fdadbbd5a15b3a29b23d6bb2dc02a.svg?generation=1768065160410529&alt=media" className="w-[25px]" alt="Facebook" />
                    </a>
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F91aa0949f2598fc3974861dcd68765494604ff46.svg?generation=1768065160436982&alt=media" className="w-[25px]" alt="Instagram" />
                    </a>
                  </div>
                </div>

                {/* Browse Links */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Browse</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('shop')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Buy a vehicle
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Return Policy
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Trade-Ins
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Loan Calculator
                    </a>
                  </div>
                </div>

                {/* Company Links */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Company</p>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Locations
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      About us
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Service
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Vacancies
                    </a>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Contacts</p>
                  <div className="flex flex-col gap-4">
                    <a href="tel:9022524422" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 252 4422
                    </a>
                    <a href="tel:9024660086" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 466 0086
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="border-t border-white/10 pt-8 text-center">
                <p className="text-white text-sm opacity-[0.55]">
                  © 2025 Buy Metro Pre-Owned. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
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

          {/* Footer */}
          <footer className="bg-[rgb(5,_15,_35)] py-12 md:py-16">
            <div className="w-full px-4 md:px-8 lg:px-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
                <div className="flex flex-col gap-5">
                  <div className="font-semibold text-white text-xl md:text-[20px]">Buy Metro Pre-Owned</div>
                  <p className="text-white text-sm md:text-[16px] opacity-[0.55] leading-relaxed">
                    Your trusted pre-owned vehicle dealership offering quality cars at great prices.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F8d2d90ddfc0fdadbbd5a15b3a29b23d6bb2dc02a.svg?generation=1768065160410529&alt=media" className="w-[25px]" alt="Facebook" />
                    </a>
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F91aa0949f2598fc3974861dcd68765494604ff46.svg?generation=1768065160436982&alt=media" className="w-[25px]" alt="Instagram" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Browse</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('shop')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Buy a vehicle
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Return Policy
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Trade-Ins
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Loan Calculator
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Company</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('locations')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Locations
                    </button>
                    <button onClick={() => navigateTo('about')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      About us
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Service
                    </a>
                    <button onClick={() => navigateTo('vacancies')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Vacancies
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Contacts</p>
                  <div className="flex flex-col gap-4">
                    <a href="tel:9022524422" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 252 4422
                    </a>
                    <a href="tel:9024660086" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 466 0086
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 text-center">
                <p className="text-white text-sm opacity-[0.55]">
                  © 2025 Buy Metro Pre-Owned. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
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

          {/* Footer */}
          <footer className="bg-[rgb(5,_15,_35)] py-12 md:py-16">
            <div className="w-full px-4 md:px-8 lg:px-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
                <div className="flex flex-col gap-5">
                  <div className="font-semibold text-white text-xl md:text-[20px]">Buy Metro Pre-Owned</div>
                  <p className="text-white text-sm md:text-[16px] opacity-[0.55] leading-relaxed">
                    Your trusted pre-owned vehicle dealership offering quality cars at great prices.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F8d2d90ddfc0fdadbbd5a15b3a29b23d6bb2dc02a.svg?generation=1768065160410529&alt=media" className="w-[25px]" alt="Facebook" />
                    </a>
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F91aa0949f2598fc3974861dcd68765494604ff46.svg?generation=1768065160436982&alt=media" className="w-[25px]" alt="Instagram" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Browse</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('shop')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Buy a vehicle
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Return Policy
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Trade-Ins
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Loan Calculator
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Company</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('locations')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Locations
                    </button>
                    <button onClick={() => navigateTo('about')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      About us
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Service
                    </a>
                    <button onClick={() => navigateTo('vacancies')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Vacancies
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Contacts</p>
                  <div className="flex flex-col gap-4">
                    <a href="tel:9022524422" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 252 4422
                    </a>
                    <a href="tel:9024660086" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 466 0086
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 text-center">
                <p className="text-white text-sm opacity-[0.55]">
                  © 2025 Buy Metro Pre-Owned. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
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

          {/* Footer */}
          <footer className="bg-[rgb(5,_15,_35)] py-12 md:py-16">
            <div className="w-full px-4 md:px-8 lg:px-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
                <div className="flex flex-col gap-5">
                  <div className="font-semibold text-white text-xl md:text-[20px]">Buy Metro Pre-Owned</div>
                  <p className="text-white text-sm md:text-[16px] opacity-[0.55] leading-relaxed">
                    Your trusted pre-owned vehicle dealership offering quality cars at great prices.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F8d2d90ddfc0fdadbbd5a15b3a29b23d6bb2dc02a.svg?generation=1768065160410529&alt=media" className="w-[25px]" alt="Facebook" />
                    </a>
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F91aa0949f2598fc3974861dcd68765494604ff46.svg?generation=1768065160436982&alt=media" className="w-[25px]" alt="Instagram" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Browse</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('shop')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Buy a vehicle
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Return Policy
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Trade-Ins
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Loan Calculator
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Company</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('locations')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Locations
                    </button>
                    <button onClick={() => navigateTo('about')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      About us
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Service
                    </a>
                    <button onClick={() => navigateTo('vacancies')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Vacancies
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Contacts</p>
                  <div className="flex flex-col gap-4">
                    <a href="tel:9022524422" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 252 4422
                    </a>
                    <a href="tel:9024660086" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 466 0086
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 text-center">
                <p className="text-white text-sm opacity-[0.55]">
                  © 2025 Buy Metro Pre-Owned. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
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

          {/* Footer */}
          <footer className="bg-[rgb(5,_15,_35)] py-12 md:py-16">
            <div className="w-full px-4 md:px-8 lg:px-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
                <div className="flex flex-col gap-5">
                  <div className="font-semibold text-white text-xl md:text-[20px]">Buy Metro Pre-Owned</div>
                  <p className="text-white text-sm md:text-[16px] opacity-[0.55] leading-relaxed">
                    Your trusted pre-owned vehicle dealership offering quality cars at great prices.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F8d2d90ddfc0fdadbbd5a15b3a29b23d6bb2dc02a.svg?generation=1768065160410529&alt=media" className="w-[25px]" alt="Facebook" />
                    </a>
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F91aa0949f2598fc3974861dcd68765494604ff46.svg?generation=1768065160436982&alt=media" className="w-[25px]" alt="Instagram" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Browse</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('shop')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Buy a vehicle
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Return Policy
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Trade-Ins
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Loan Calculator
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Company</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('locations')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Locations
                    </button>
                    <button onClick={() => navigateTo('about')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      About us
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Service
                    </a>
                    <button onClick={() => navigateTo('vacancies')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Vacancies
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Contacts</p>
                  <div className="flex flex-col gap-4">
                    <a href="tel:9022524422" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 252 4422
                    </a>
                    <a href="tel:9024660086" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 466 0086
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 text-center">
                <p className="text-white text-sm opacity-[0.55]">
                  © 2025 Buy Metro Pre-Owned. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
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

          {/* Footer */}
          <footer className="bg-[rgb(5,_15,_35)] py-12 md:py-16">
            <div className="w-full px-4 md:px-8 lg:px-20">
              
              {/* Footer Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
                
                {/* Company Info */}
                <div className="flex flex-col gap-5">
                  <div className="font-semibold text-white text-xl md:text-[20px]">Buy Metro Pre-Owned</div>
                  <p className="text-white text-sm md:text-[16px] opacity-[0.55] leading-relaxed">
                    Your trusted pre-owned vehicle dealership offering quality cars at great prices.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F8d2d90ddfc0fdadbbd5a15b3a29b23d6bb2dc02a.svg?generation=1768065160410529&alt=media" className="w-[25px]" alt="Facebook" />
                    </a>
                    <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F91aa0949f2598fc3974861dcd68765494604ff46.svg?generation=1768065160436982&alt=media" className="w-[25px]" alt="Instagram" />
                    </a>
                  </div>
                </div>

                {/* Browse Links */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Browse</p>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('shop')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                      Buy a vehicle
                    </button>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Return Policy
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Trade-Ins
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Loan Calculator
                    </a>
                  </div>
                </div>

                {/* Company Links */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Company</p>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Locations
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      About us
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Service
                    </a>
                    <a href="#" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      Vacancies
                    </a>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-5">
                  <p className="font-medium text-white text-lg md:text-[18px]">Contacts</p>
                  <div className="flex flex-col gap-4">
                    <a href="tel:9022524422" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 252 4422
                    </a>
                    <a href="tel:9024660086" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                      (902) 466 0086
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="border-t border-white/10 pt-8 text-center">
                <p className="text-white text-sm opacity-[0.55]">
                  © 2025 Buy Metro Pre-Owned. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
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
          <div className="flex items-center justify-between h-full px-4 md:px-8 lg:px-20">
            
            {/* Logo */}
            <a href="https://www.buymetropreowned.ca/" aria-label="home" className="flex items-center">
              <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
            </a>

            {/* Desktop Navigation */}
            <nav role="navigation" className="hidden lg:flex items-center gap-8">
              <button onClick={() => navigateTo('shop')} className="text-[rgb(139,_130,_246)] text-[16px] font-semibold">Shop Cars</button>
              <button onClick={() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Sell or Trade Ins</button>
              <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Financing</button>
              <button onClick={() => navigateTo('quiz')} className="text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]">Quiz</button>
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
          <div className="w-full px-4 md:px-8 lg:px-20">
            
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
                        <img src={filter.icon} className="w-[15px] opacity-[0.3]" alt="" />
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

            {/* Equifax Banner */}
            <div className="mt-10 rounded-[0.9375rem] overflow-hidden">
              <div className="relative w-full bg-[rgb(250,_250,_251)] min-h-[110px]">
                <div className="absolute inset-0 bg-[rgb(139,_130,_246)]">
                  <div className="absolute inset-0 bg-bottom bg-no-repeat" style={{"backgroundImage":"url(\"https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F1b2f9ee07d49b4d540bf7b3eb55abc1bdfd7090b?generation=1768065160088759&alt=media\")","backgroundSize":"100% 75%"}}></div>
                </div>
                <div className="relative w-full p-4 md:p-5">
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

            {/* Car Listings Section - показується після вибору фільтра */}
            {showResults && (selectedBrand || selectedType || selectedYear) && (
              <div className="w-full py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  
                  {/* Cars Grid */}
                  <div className="flex-1">

                  {/* Results Count & Sort */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex gap-1 text-[14px]">
                      <span className="text-[rgb(5,_15,_35)] opacity-[0.6]">We found</span>
                      <span className="text-[rgb(139,_130,_246)] font-semibold">6</span>
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
                          <button onClick={() => setSelectedBrand(null)} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedType && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Type: {selectedType}
                          <button onClick={() => setSelectedType(null)} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedYear && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Year: {selectedYear}
                          <button onClick={() => setSelectedYear(null)} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedTransmission && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Transmission: {selectedTransmission}
                          <button onClick={() => setSelectedTransmission(null)} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedFuelType && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Fuel: {selectedFuelType}
                          <button onClick={() => setSelectedFuelType(null)} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedDriveTrain && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Drive: {selectedDriveTrain}
                          <button onClick={() => setSelectedDriveTrain(null)} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedSeats && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Seats: {selectedSeats}
                          <button onClick={() => setSelectedSeats(null)} className="hover:text-[rgb(129,_120,_236)]">×</button>
                        </span>
                      )}
                      {selectedStatus && (
                        <span className="inline-flex items-center gap-2 bg-[rgba(139,_130,_246,_0.1)] text-[rgb(139,_130,_246)] px-3 py-1 rounded-full text-sm">
                          Status: {selectedStatus}
                          <button onClick={() => setSelectedStatus(null)} className="hover:text-[rgb(129,_120,_236)]">×</button>
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
                    {[
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
                        name: '2014 Acura ILX Tech Pkg Automatic with',
                        price: 34500,
                        mileage: 98000,
                        image: 'https://images.unsplash.com/photo-1687730594701-88cdea1ef5ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaXNzYW4lMjBzZWRhbiUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                        status: 'Available'
                      }
                    ].map(car => (
                      <a 
                        key={car.id} 
                        href="#" 
                        className="block bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                      >
                        {/* Car Image */}
                        <div className="relative w-full h-[200px] bg-gray-100">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Status Badge */}
                          <div className="absolute top-3 left-3">
                            <span className={`text-xs font-semibold px-3 py-1 rounded ${
                              car.status === 'Available' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-orange-500 text-white'
                            }`}>
                              {car.status}
                            </span>
                          </div>
                        </div>
                        
                        {/* Car Details */}
                        <div className="p-4">
                          <h3 className="text-[rgb(5,_15,_35)] text-base font-medium leading-tight mb-3 line-clamp-2 min-h-[48px]">
                            {car.name}
                          </h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-[rgb(5,_15,_35)] font-bold text-xl">
                              ${car.price.toLocaleString()}
                            </div>
                            <div className="text-[rgb(5,_15,_35)] opacity-[0.5] text-sm">
                              {car.mileage.toLocaleString()} km
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
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
            )}

            {/* Shop & Sell Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5">
              
              {/* Shop Card */}
              <a href="https://www.buymetropreowned.ca/shop" className="block rounded-[0.9375rem] hover:scale-[1.02] transition-transform">
                <div className="flex justify-between bg-[rgb(139,_130,_246)] min-h-[200px] p-6 md:p-[30px] rounded-[0.9375rem]">
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-[15px]">
                      <div className="font-medium text-white text-2xl md:text-[25px]">Shop</div>
                      <div className="text-white text-[16px]">200+ cars available</div>
                    </div>
                    <div className="flex items-center gap-[6px] mt-4">
                      <div className="font-semibold text-white text-lg md:text-[18px]">Browse Vehicles</div>
                      <img alt="Arrow" src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fc57b1155479db3653749654cf951ecb5cc28a2bb.svg?generation=1768065159966652&alt=media" className="w-4" />
                    </div>
                  </div>
                  <div className="bg-right bg-no-repeat bg-contain w-[40%] md:w-[50%]" style={{"backgroundImage":"url(\"https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F7c95e2a09225f1ef8ec1f736e3da23de74aa4269.png?generation=1768065160092373&alt=media\")"}}></div>
                </div>
              </a>

              {/* Sell Card */}
              <a href="https://www.buymetropreowned.ca/sell" className="block rounded-[0.9375rem] hover:scale-[1.02] transition-transform">
                <div 
                  onClick={() => navigateTo('quiz')}
                  className="flex justify-between border border-[rgba(139,_130,_246,_0.06)] min-h-[200px] p-6 md:p-[30px] rounded-[0.9375rem] cursor-pointer hover:shadow-lg transition-shadow" 
                  style={{"backgroundImage":"linear-gradient(45deg, rgba(139, 130, 246, 0.05), rgba(139, 130, 246, 0.1))"}}
                >
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-[15px]">
                      <div className="font-medium text-[rgb(5,_15,_35)] text-2xl md:text-[23px]">Sell</div>
                      <div className="text-[rgb(5,_15,_35)] text-[16px]">Just in a few clicks</div>
                    </div>
                    <div className="flex items-center gap-[6px] mt-4">
                      <div className="font-semibold text-[rgb(139,_130,_246)] text-lg md:text-[18px]">Get started</div>
                      <img alt="Arrow" src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F4c0c461d9029afe7890260e0f195ba7456d3d443.svg?generation=1768065160114159&alt=media" className="w-4" />
                    </div>
                  </div>
                  <div className="bg-right bg-no-repeat bg-contain w-[40%] md:w-[50%]" style={{"backgroundImage":"url(\"https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fbc0d090c673c56be6b590b21e8b50278b5c8e770.png?generation=1768065160162107&alt=media\")"}}></div>
                </div>
              </a>
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
          <div className="w-full px-4 md:px-8 lg:px-20">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-4">
              <h2 className="font-semibold text-[rgb(5,_15,_35)] text-2xl md:text-3xl lg:text-[40px] tracking-[-1px]">
                Browse by Type
              </h2>
              <a href="https://www.buymetropreowned.ca/shop" className="flex items-center text-[rgb(139,_130,_246)] gap-[6px] hover:gap-[10px] transition-all">
                <span className="font-semibold text-lg md:text-[18px]">Explore all types</span>
                <img alt="Arrow" src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F4c0c461d9029afe7890260e0f195ba7456d3d443.svg?generation=1768065160114159&alt=media" className="w-[10px]" />
              </a>
            </div>

            {/* Vehicle Types Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
              {[
                { name: 'Sedan', image: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F2e0dd852af827aae3046492c5a6ec80a4baf3431.png?generation=1768065160148088&alt=media' },
                { name: 'SUV', image: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F3409c215f601866f9c0de540d809fbfd75ef7c14.png?generation=1768065160176871&alt=media' },
                { name: 'Hatchback', image: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fd7da3ed1003ba48e43d7e3026a20b93517837b41.png?generation=1768065160204295&alt=media' },
                { name: 'Truck', image: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F4911d6ee1620f69e8a2f5c17e64a4906a41f6518.png?generation=1768065160257735&alt=media' },
                { name: 'VAN', image: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F895be9079cf146938f1bb84b08393f2011891622.png?generation=1768065160232148&alt=media' },
                { name: 'Coupe', image: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F5dfda566e9f44a8dc35dfdadc4ceec47b8258047.png?generation=1768065160260108&alt=media' }
              ].map((type) => (
                <a 
                  key={type.name}
                  href="https://www.buymetropreowned.ca/shop" 
                  className="block hover:scale-105 transition-transform"
                >
                  <div className="flex flex-col items-center bg-white gap-2 p-4 rounded-[0.9375rem] shadow-sm hover:shadow-md">
                    <img alt={type.name} src={type.image} className="w-16 md:w-20" />
                    <p className="text-[rgb(5,_15,_35)] text-sm md:text-base">{type.name}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Brands Section */}
        <section className="bg-[rgb(248,_248,_252)] py-12 md:py-20">
          <div className="w-full px-4 md:px-8 lg:px-20">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-4">
              <h2 className="font-semibold text-[rgb(5,_15,_35)] text-2xl md:text-3xl lg:text-[40px] tracking-[-1px]">
                Popular Brands
              </h2>
              <a href="https://www.buymetropreowned.ca/shop" className="flex items-center text-[rgb(139,_130,_246)] gap-[6px] hover:gap-[10px] transition-all">
                <span className="font-semibold text-lg md:text-[18px]">Explore all brands</span>
                <img alt="Arrow" src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F4c0c461d9029afe7890260e0f195ba7456d3d443.svg?generation=1768065160114159&alt=media" className="w-[10px]" />
              </a>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
              {[
                { name: 'Toyota', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F3a4bda44c1d4c9e4cd1a76c3c5e7da77a4c82eba.svg?generation=1768065160299612&alt=media' },
                { name: 'Honda', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Ff6e76a3a3c8d7e30f1bd8f5ff1c0b9ead7eef7d7.svg?generation=1768065160328931&alt=media' },
                { name: 'Ford', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fa59e1a39f734797c0b8c2dd9f50e52cd9f7e1d1d.svg?generation=1768065160302634&alt=media' },
                { name: 'Nissan', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F0f4a98b7fbe3c7b7e8755d8f24c9c4e5f5c6e3d3.svg?generation=1768065160323913&alt=media' },
                { name: 'Hyundai', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fb3c5ec8adce4f6a9c0aef71e4cae48f4cf3f5a5a.svg?generation=1768065160355932&alt=media' },
                { name: 'Chevrolet', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fdde1c69a65f48e79c3e5a8f7e4f1b5c4f7a8d8d8.svg?generation=1768065160373829&alt=media' }
              ].map((brand) => (
                <a 
                  key={brand.name}
                  href="https://www.buymetropreowned.ca/shop" 
                  className="block hover:scale-105 transition-transform"
                >
                  <div className="flex flex-col items-center justify-center bg-white gap-2 p-6 rounded-[0.9375rem] shadow-sm hover:shadow-md min-h-[100px]">
                    <img alt={brand.name} src={brand.logo} className="w-16 md:w-20 h-auto" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[rgb(5,_15,_35)] py-12 md:py-16">
          <div className="w-full px-4 md:px-8 lg:px-20">
            
            {/* Footer Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
              
              {/* Company Info */}
              <div className="flex flex-col gap-5">
                <div className="font-semibold text-white text-xl md:text-[20px]">Buy Metro Pre-Owned</div>
                <p className="text-white text-sm md:text-[16px] opacity-[0.55] leading-relaxed">
                  Your trusted pre-owned vehicle dealership offering quality cars at great prices.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F8d2d90ddfc0fdadbbd5a15b3a29b23d6bb2dc02a.svg?generation=1768065160410529&alt=media" className="w-[25px]" alt="Facebook" />
                  </a>
                  <a href="#" className="opacity-[0.55] hover:opacity-100 transition-opacity">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F91aa0949f2598fc3974861dcd68765494604ff46.svg?generation=1768065160436982&alt=media" className="w-[25px]" alt="Instagram" />
                  </a>
                </div>
              </div>

              {/* Browse Links */}
              <div className="flex flex-col gap-5">
                <p className="font-medium text-white text-lg md:text-[18px]">Browse</p>
                <div className="flex flex-col gap-4">
                  <button onClick={() => navigateTo('shop')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                    Buy a vehicle
                  </button>
                  <a href="https://www.buymetropreowned.ca/return-policy" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                    Return Policy
                  </a>
                  <a href="https://www.buymetropreowned.ca/sell" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                    Trade-Ins
                  </a>
                  <a href="https://www.buymetropreowned.ca/car-loan-calculator" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                    Loan Calculator
                  </a>
                </div>
              </div>

              {/* Company Links */}
              <div className="flex flex-col gap-5">
                <p className="font-medium text-white text-lg md:text-[18px]">Company</p>
                <div className="flex flex-col gap-4">
                  <a href="https://www.buymetropreowned.ca/locations" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                    Locations
                  </a>
                  <a href="https://www.buymetropreowned.ca/about" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                    About us
                  </a>
                  <a href="https://www.buymetropreowned.ca/service" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                    Service
                  </a>
                  <a href="https://www.buymetropreowned.ca/contacts" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                    Vacancies
                  </a>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-5">
                <p className="font-medium text-white text-lg md:text-[18px]">Contacts</p>
                <div className="flex flex-col gap-4">
                  <a href="tel:9022524422" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                    (902) 252 4422
                  </a>
                  <a href="tel:9024660086" className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                    (902) 466 0086
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-white text-sm opacity-[0.55]">
                © 2025 Buy Metro Pre-Owned. All rights reserved.
              </p>
              <button 
                onClick={() => navigateTo('admin')}
                className="text-white text-xs opacity-30 hover:opacity-60 transition-opacity mt-2"
              >
                Admin
              </button>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}