import React from 'react';

export function HomeAbout() {
  return (
    <section className="py-4 bg-[rgb(250,_250,_253)]">

    </section>
  );
}

export function HomeLending() {
  return null;
}

interface HomeCTAProps {
  onNavigate?: (page: string) => void;
}

export function HomeCTA({ onNavigate }: HomeCTAProps) {
  return (
    <section className="py-16 bg-white">
      <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
        <div className="relative w-full rounded-2xl bg-cover bg-center overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1591527292000-95f01a0d1496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMGNhciUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MTU5OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080')`}}>
          <div className="py-16 md:py-20 px-4 text-center">
            <h2 className="text-white text-3xl md:text-4xl lg:text-[48px] font-semibold mb-8 leading-tight">
              Buy or sell cars in one<br />place
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => onNavigate?.('shop')}
                className="bg-[rgb(139,_130,_246)] text-white font-semibold px-8 py-3 rounded-full hover:bg-[rgb(120,_110,_230)] transition-colors text-base min-w-[160px]"
              >
                Get Started
              </button>
              <button 
                onClick={() => onNavigate?.('sell')}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[rgb(5,_15,_35)] transition-colors text-base min-w-[160px]"
              >
                Get a Vehicle
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}