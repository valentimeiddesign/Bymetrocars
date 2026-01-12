import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
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
              <button onClick={() => onNavigate('shop')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                Buy a vehicle
              </button>
              <button onClick={() => onNavigate('sell')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                Return Policy
              </button>
              <button onClick={() => onNavigate('sell')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                Trade-Ins
              </button>
              <button onClick={() => onNavigate('financing')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                Loan Calculator
              </button>
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-5">
            <p className="font-medium text-white text-lg md:text-[18px]">Company</p>
            <div className="flex flex-col gap-4">
              <button onClick={() => onNavigate('locations')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                Locations
              </button>
              <button onClick={() => onNavigate('about')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                About us
              </button>
              <button onClick={() => onNavigate('about')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                Service
              </button>
              <button onClick={() => onNavigate('vacancies')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                Vacancies
              </button>
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
  );
}
