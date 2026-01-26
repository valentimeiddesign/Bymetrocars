import React from 'react';
import { Icons } from './Icons';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[rgb(5,_15,_35)] py-12 md:py-16">
      <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
        
        {/* Footer Content Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          
          {/* Company Info */}
          <div className="flex flex-col gap-5">
            <div className="font-semibold text-white text-xl md:text-[20px]">Buy Metro Pre-Owned</div>
            <p className="text-white text-sm md:text-[16px] opacity-[0.55] leading-relaxed">
              Your trusted pre-owned vehicle dealership offering quality cars at great prices.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/marketplace/profile/100011494479003/" target="_blank" rel="noopener noreferrer" className="opacity-[0.55] hover:opacity-100 transition-opacity text-white">
                <Icons.Facebook />
              </a>
              <a href="https://www.instagram.com/capitalautodealer" target="_blank" rel="noopener noreferrer" className="opacity-[0.55] hover:opacity-100 transition-opacity text-white">
                <Icons.Instagram />
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
              <button onClick={() => onNavigate('policy')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                Return Policy
              </button>
              <button onClick={() => onNavigate('sell')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
                Trade-Ins
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
              <button onClick={() => onNavigate('locations')} className="text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity text-left">
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
              <a href="tel:9022524422" className="flex items-center gap-2 text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                (902) 252 4422
              </a>
              <a href="tel:9024660086" className="flex items-center gap-2 text-white text-sm md:text-[16px] opacity-[0.55] hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
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
          
          {/* Hidden Admin Access */}
          <button 
            onClick={() => onNavigate('admin')} 
            className="mt-4 text-white/20 hover:text-white/40 transition-opacity text-xs"
            title="Admin Panel Access"
          >
            •
          </button>
        </div>
      </div>
    </footer>
  );
}