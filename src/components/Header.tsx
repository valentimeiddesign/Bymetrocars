import React, { useState } from 'react';
import { LocationDropdown } from './LocationDropdown';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  companyMenuOpen: boolean;
  setCompanyMenuOpen: (open: boolean) => void;
  locations: string[];
  selectedLocation: string | null;
  locationMenuOpen: boolean;
  setLocationMenuOpen: (open: boolean) => void;
  setSelectedLocation: (location: string | null) => void;
  allCars: any[];
}

export function Header({
  currentPage,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen,
  companyMenuOpen,
  setCompanyMenuOpen,
  locations,
  selectedLocation,
  locationMenuOpen,
  setLocationMenuOpen,
  setSelectedLocation,
  allCars
}: HeaderProps) {
  const getLinkStyle = (page: string) => {
    return currentPage === page
      ? "text-[rgb(139,_130,_246)] text-[16px] font-semibold"
      : "text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]";
  };
  
  const getCompanyLinkStyle = (page: string) => {
    return currentPage === page
      ? "block w-full text-left px-4 py-2 text-[rgb(139,_130,_246)] text-[16px] hover:bg-gray-50 font-semibold"
      : "block w-full text-left px-4 py-2 text-[rgb(5,_15,_35)] text-[16px] hover:bg-gray-50";
  };

  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  return (
    <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
      <div className="max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 lg:px-20 2xl:px-32">
        
        {/* Logo */}
        <button onClick={() => onNavigate('home')} className="flex items-center group">
          <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px] group-hover:text-[rgb(139,130,246)] transition-colors">Buy Metro Pre-Owned</div>
        </button>

        {/* Desktop Navigation */}
        <nav role="navigation" className="hidden lg:flex items-center gap-8">
          <button onClick={() => onNavigate('shop')} className={getLinkStyle('shop')}>Shop Cars</button>
          <button onClick={() => onNavigate('sell')} className={getLinkStyle('sell')}>Trade In</button>
          <button onClick={() => onNavigate('financing')} className={getLinkStyle('financing')}>Financing</button>
          <button onClick={() => onNavigate('quiz')} className={`hidden ${getLinkStyle('quiz')}`}>Quiz</button>
          <div className="relative">
            <button 
              className={`flex items-center gap-1 text-[16px] hover:text-[rgb(139,_130,_246)] ${
                ['about', 'contacts', 'locations', 'vacancies'].includes(currentPage) 
                  ? 'text-[rgb(139,_130,_246)]' 
                  : 'text-[rgb(5,_15,_35)]'
              }`}
              onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
            >
              Company
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`}>
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {companyMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[999]">
                <button onClick={() => onNavigate('about')} className={getCompanyLinkStyle('about')}>About us</button>
                <button onClick={() => onNavigate('contacts')} className={getCompanyLinkStyle('contacts')}>Contacts</button>
                <button onClick={() => onNavigate('locations')} className={getCompanyLinkStyle('locations')}>Locations</button>
                <button onClick={() => onNavigate('vacancies')} className={getCompanyLinkStyle('vacancies')}>Vacancies</button>
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
            allCars={allCars}
            onNavigate={onNavigate}
          />
        </div>

        {/* Mobile Icons (Location + Menu) */}
        <div className="lg:hidden flex items-center gap-2">
          <LocationDropdown
            locations={locations}
            selectedLocation={selectedLocation}
            locationMenuOpen={locationMenuOpen}
            setLocationMenuOpen={setLocationMenuOpen}
            setSelectedLocation={setSelectedLocation}
            allCars={allCars}
            mode="icon"
            onNavigate={onNavigate}
          />
          <button 
            className="p-2 text-[rgb(5,_15,_35)]"
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[1000] bg-white flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-4 md:px-8 h-[70px] border-b border-[rgba(30,30,30,0.08)]">
            <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[rgb(5,_15,_35)]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col h-full">
            <div className="flex flex-col flex-1 justify-center gap-10">
              <button 
                onClick={() => { onNavigate('shop'); setMobileMenuOpen(false); }} 
                className="text-left text-[24px] text-[rgb(5,_15,_35)] font-bold hover:text-[rgb(139,_130,_246)] transition-colors"
              >
                Shop Cars
              </button>
              <button 
                onClick={() => { onNavigate('sell'); setMobileMenuOpen(false); }} 
                className="text-left text-[24px] text-[rgb(5,_15,_35)] font-bold hover:text-[rgb(139,_130,_246)] transition-colors"
              >
                Sell or Trade Ins
              </button>
              <button 
                onClick={() => { onNavigate('financing'); setMobileMenuOpen(false); }} 
                className="text-left text-[24px] text-[rgb(5,_15,_35)] font-bold hover:text-[rgb(139,_130,_246)] transition-colors"
              >
                Financing
              </button>
              <button 
                onClick={() => { onNavigate('quiz'); setMobileMenuOpen(false); }} 
                className="text-left text-[24px] text-[rgb(5,_15,_35)] font-bold hover:text-[rgb(139,_130,_246)] transition-colors"
              >
                Quiz
              </button>

              <div className="flex flex-col">
                <button 
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  className="flex items-center justify-between text-[24px] text-[rgb(5,_15,_35)] font-bold mb-4"
                >
                  <span>Company</span>
                  {mobileCompanyOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </button>
                
                {mobileCompanyOpen && (
                  <div className="flex flex-col gap-6 pl-4 animate-in slide-in-from-top-2 duration-200">
                    <button 
                      onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} 
                      className="text-left text-[18px] text-[rgb(5,_15,_35)] hover:text-[rgb(139,_130,_246)] transition-colors"
                    >
                      About us
                    </button>
                    <button 
                      onClick={() => { onNavigate('contacts'); setMobileMenuOpen(false); }} 
                      className="text-left text-[18px] text-[rgb(5,_15,_35)] hover:text-[rgb(139,_130,_246)] transition-colors"
                    >
                      Contacts
                    </button>
                    <button 
                      onClick={() => { onNavigate('locations'); setMobileMenuOpen(false); }} 
                      className="text-left text-[18px] text-[rgb(5,_15,_35)] hover:text-[rgb(139,_130,_246)] transition-colors"
                    >
                      Locations
                    </button>
                    <button 
                      onClick={() => { onNavigate('vacancies'); setMobileMenuOpen(false); }} 
                      className="text-left text-[18px] text-[rgb(5,_15,_35)] hover:text-[rgb(139,_130,_246)] transition-colors"
                    >
                      Vacancies
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}