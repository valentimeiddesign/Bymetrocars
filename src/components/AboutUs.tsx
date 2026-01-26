import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { Car, Zap, Settings, ArrowUpRight, Check } from 'lucide-react';

interface AboutUsProps {
  onNavigate?: (page: string) => void;
}

export function AboutUs({ onNavigate }: AboutUsProps = {}) {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
        
        <Breadcrumbs 
          items={[{ label: 'About Us' }]} 
          onNavigate={onNavigate || (() => {})} 
        />

        {/* Hero Section */}
        <section className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1739857004855-188b5a07a8d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBkcml2aW5nJTIwY2FyJTIwaW50ZXJpb3IlMjB2aWV3JTIwaGFwcHl8ZW58MXx8fHwxNzY5MzgxMTU0fDA&ixlib=rb-4.1.0&q=80&w=1080')`}}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-white text-xs md:text-sm uppercase tracking-[2px] mb-4 opacity-90 font-medium">
              BUY METRO PRE-OWNED
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-[64px] font-bold leading-[1.1]">
              Your local<br />vehicle experts
            </h1>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            <div className="max-w-[1440px] mx-auto">
              <p className="text-[rgb(156,163,175)] text-xs uppercase tracking-[1.5px] mb-4 font-medium">
                SERVICES
              </p>
              <h2 className="font-bold text-[rgb(5,_15,_35)] text-4xl md:text-[40px] mb-12 tracking-[-0.5px]">
                What we provide
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Trade In */}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-[rgba(139,130,246,0.1)] rounded-xl flex items-center justify-center mb-6">
                    <Car className="w-6 h-6 text-[rgb(139,130,246)]" />
                  </div>
                  <h3 className="font-bold text-[rgb(5,_15,_35)] text-xl mb-3">Trade In</h3>
                  <p className="text-[rgb(107,114,128)] text-sm mb-6 leading-relaxed">
                    Selling your car just got easier
                  </p>
                  <button 
                    onClick={() => onNavigate?.('sell')}
                    className="flex items-center gap-1 text-[rgb(156,163,175)] text-sm font-medium hover:text-[rgb(139,130,246)] transition-colors group"
                  >
                    Get Started
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Financing Services */}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-[rgba(139,130,246,0.1)] rounded-xl flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6 text-[rgb(139,130,246)]" />
                  </div>
                  <h3 className="font-bold text-[rgb(5,_15,_35)] text-xl mb-3">Financing Services</h3>
                  <p className="text-[rgb(107,114,128)] text-sm mb-6 leading-relaxed">
                    We provide financing services for the purchase of your car
                  </p>
                  <button 
                    onClick={() => onNavigate?.('financing')}
                    className="flex items-center gap-1 text-[rgb(156,163,175)] text-sm font-medium hover:text-[rgb(139,130,246)] transition-colors group"
                  >
                    Learn More
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Technical Service */}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-[rgba(139,130,246,0.1)] rounded-xl flex items-center justify-center mb-6">
                    <Settings className="w-6 h-6 text-[rgb(139,130,246)]" />
                  </div>
                  <h3 className="font-bold text-[rgb(5,_15,_35)] text-xl mb-3">Technical Service</h3>
                  <p className="text-[rgb(107,114,128)] text-sm mb-6 leading-relaxed">
                    You can get the services of technical experts at four of our service locations
                  </p>
                  <button 
                    onClick={() => onNavigate?.('contacts')}
                    className="flex items-center gap-1 text-[rgb(156,163,175)] text-sm font-medium hover:text-[rgb(139,130,246)] transition-colors group"
                  >
                    Get in Touch
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-white">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            <div className="max-w-[1440px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Image */}
                <div className="rounded-[32px] overflow-hidden h-[400px]">
                  <img 
                    src="https://images.unsplash.com/photo-1766524791677-6c6c495e0218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBsb3QlMjBkZWFsZXJzaGlwJTIwdmVoaWNsZXN8ZW58MXx8fHwxNzY4MTU5OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Car dealership lot" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div>
                  <p className="text-[rgb(156,163,175)] text-xs uppercase tracking-[1.5px] mb-4 font-medium">
                    ABOUT US
                  </p>
                  <h2 className="font-bold text-[rgb(5,_15,_35)] text-3xl md:text-[40px] mb-6 tracking-[-0.5px]">
                    Buy Metro Pre-Owned
                  </h2>
                  <p className="text-[rgb(107,114,128)] text-sm leading-[1.8] max-w-lg">
                    We offer open and honest discussions about pricing and financing in an effort to always improve upon the customer-centric experiences we provide. Our frank and transparent approach speaks to the respect and loyalty we seek to build with every customer relationship.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            <div className="max-w-[1440px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Features List */}
                <div className="space-y-10">
                  
                  {/* Car Experts */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[rgb(220,252,231)] flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 text-[rgb(22,163,74)]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[rgb(5,_15,_35)] text-lg mb-2">Car Experts</h3>
                      <p className="text-[rgb(107,114,128)] text-sm leading-relaxed max-w-md">
                        Our breadth and depth of products ensure that every customer gets into the right vehicle
                      </p>
                    </div>
                  </div>

                  {/* Service Quality */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[rgb(220,252,231)] flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 text-[rgb(22,163,74)]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[rgb(5,_15,_35)] text-lg mb-2">Service Quality</h3>
                      <p className="text-[rgb(107,114,128)] text-sm leading-relaxed max-w-md">
                        Our frank and transparent approach speaks to the respect and loyalty
                      </p>
                    </div>
                  </div>

                  {/* Finance Loyalty */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[rgb(220,252,231)] flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 text-[rgb(22,163,74)]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[rgb(5,_15,_35)] text-lg mb-2">Finance Loyalty</h3>
                      <p className="text-[rgb(107,114,128)] text-sm leading-relaxed max-w-md">
                        We offer open and honest discussions about pricing and financing
                      </p>
                    </div>
                  </div>

                </div>

                {/* Image */}
                <div className="rounded-[32px] overflow-hidden h-[400px]">
                  <img 
                    src="https://images.unsplash.com/photo-1723595919200-c4643d84a1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBkaXNjdXNzaW5nJTIwY2FyJTIwZG9jdW1lbnRzfGVufDF8fHx8MTc2ODE1OTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Customer consulting" 
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-white">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            <div className="max-w-[1440px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Stat 1 */}
                <div className="p-8 border border-gray-100 rounded-2xl">
                  <h3 className="font-bold text-[rgb(5,_15,_35)] text-4xl mb-4">2007</h3>
                  <p className="text-[rgb(107,114,128)] text-sm leading-relaxed">
                    the year we opened our company and made hundreds of customers happy
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="p-8 border border-gray-100 rounded-2xl">
                  <h3 className="font-bold text-[rgb(5,_15,_35)] text-4xl mb-4">3000&gt;</h3>
                  <p className="text-[rgb(107,114,128)] text-sm leading-relaxed">
                    vehicles was successfully selled since 2007 year
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="p-8 border border-gray-100 rounded-2xl">
                  <h3 className="font-bold text-[rgb(5,_15,_35)] text-4xl mb-4">8 / 10</h3>
                  <p className="text-[rgb(107,114,128)] text-sm leading-relaxed">
                    customers come back to us for buying a new car
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            <div className="max-w-[1440px] mx-auto">
              <div className="relative w-full h-[400px] rounded-[32px] bg-cover bg-center overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1591527292000-95f01a0d1496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMGNhciUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MTU5OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080')`}}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <h2 className="text-white text-3xl md:text-5xl font-bold mb-8 leading-tight">
                    Buy or sell cars in one<br />place
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                      onClick={() => onNavigate?.('shop')}
                      className="bg-[rgb(139,130,246)] text-white font-semibold px-8 py-3 rounded-full hover:bg-[rgb(120,110,230)] transition-colors text-sm min-w-[160px]"
                    >
                      Buy a Vehicle
                    </button>
                    <button 
                      onClick={() => onNavigate?.('sell')}
                      className="bg-[rgb(34,34,34)] text-white font-semibold px-8 py-3 rounded-full hover:bg-[rgb(0,0,0)] transition-colors text-sm min-w-[160px]"
                    >
                      Sell a Vehicle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
