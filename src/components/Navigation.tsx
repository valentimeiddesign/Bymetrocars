import React from 'react';
import { TopBanner } from './TopBanner';
import { LocationButton } from './LocationButton';

interface NavigationProps {
  currentPage: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  companyMenuOpen: boolean;
  setCompanyMenuOpen: (open: boolean) => void;
  navigateTo: (page: string) => void;
}

export function Navigation({
  currentPage,
  mobileMenuOpen,
  setMobileMenuOpen,
  companyMenuOpen,
  setCompanyMenuOpen,
  navigateTo
}: NavigationProps) {
  return (
    <>
      <TopBanner />
      
      <header role="banner" className="sticky top-0 w-full h-[70px] bg-white border-b border-[rgba(30,30,30,0.08)] shadow-[rgba(5,15,35,0.05)_0px_6px_25px_0px] z-[998]">
        <div className="max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 lg:px-20 2xl:px-32">
          
          {/* Logo */}
          <button onClick={() => navigateTo('home')} className="flex items-center">
            <div className="font-semibold text-[rgb(5,_15,_35)] text-lg md:text-[20px]">Buy Metro Pre-Owned</div>
          </button>

          {/* Desktop Navigation */}
          <nav role="navigation" className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => navigateTo('shop')} 
              className={currentPage === 'shop' ? "text-[rgb(139,_130,_246)] text-[16px] font-semibold" : "text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]"}
            >
              Shop Cars
            </button>
            <button 
              onClick={() => navigateTo('sell')} 
              className={currentPage === 'sell' ? "text-[rgb(139,_130,_246)] text-[16px] font-semibold" : "text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]"}
            >
              Sell or Trade Ins
            </button>
            <button 
              onClick={() => navigateTo('financing')} 
              className={currentPage === 'financing' ? "text-[rgb(139,_130,_246)] text-[16px] font-semibold" : "text-[rgb(5,_15,_35)] text-[16px] hover:text-[rgb(139,_130,_246)]"}
            >
              Financing
            </button>
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
            <LocationButton />
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
              <button onClick(() => navigateTo('sell')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Sell or Trade Ins</button>
              <button onClick={() => navigateTo('financing')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Financing</button>
              <button onClick={() => navigateTo('about')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">About us</button>
              <button onClick={() => navigateTo('contacts')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Contacts</button>
              <button onClick={() => navigateTo('locations')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Locations</button>
              <button onClick={() => navigateTo('vacancies')} className="text-[rgb(5,_15,_35)] text-[16px] py-2 text-left">Vacancies</button>
              <LocationButton />
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
