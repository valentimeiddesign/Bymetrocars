import React, { useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs';

interface SellTradeProps {
  onNavigate?: (page: string) => void;
}

import img1 from "figma:asset/82d33e1f4edbaf025323505b00adf1c7c03f00eb.png";

export function SellTrade({ onNavigate }: SellTradeProps) {
  const [vehicleSearch, setVehicleSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicleSearch.trim()) {
      alert(`Searching for trade-in value for: ${vehicleSearch}\n(This feature is a demo)`);
    }
  };

  return (
    <>
      <Breadcrumbs 
        items={[{ label: 'Trade-In' }]} 
        onNavigate={onNavigate || (() => {})} 
      />
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img1})`}}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-white text-sm md:text-base uppercase tracking-[2px] mb-3 opacity-90">
            SELL OR TRADE IN
          </p>
          <h1 className="text-white text-3xl md:text-5xl lg:text-[56px] font-semibold mb-8 leading-tight">
            Sell your car with ease
          </h1>
          <button 
            onClick={() => document.getElementById('trade-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[rgb(139,_130,_246)] text-white font-semibold px-8 py-3 rounded-md hover:bg-[rgb(120,_110,_230)] text-base transition-colors"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-4 bg-[rgb(250,_250,_253)]">
        <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-[rgb(5,_15,_35)] text-2xl mb-3">Fast Approval</h3>
              <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-base leading-relaxed">
                Quick confirmation of you application for financing
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-[rgb(5,_15,_35)] text-2xl mb-3">Completely online</h3>
              <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-base leading-relaxed">
                The entire financing procedure is done fully online
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-[rgb(5,_15,_35)] text-2xl mb-3">No impact to CS</h3>
              <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-base leading-relaxed">
                The application will not affect your Credit Score in any way
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Trade Program Section */}
      <section className="py-4 bg-white" id="trade-form">
        <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            
            {/* Left Column - Trade Program */}
            <div>
              <p className="text-[rgb(139,_130,_246)] text-sm uppercase tracking-[1.5px] mb-3">
                SELL A CAR AT EASE
              </p>
              <h2 className="font-semibold text-[rgb(5,_15,_35)] text-3xl md:text-4xl mb-6">
                Trade program
              </h2>
              <p className="text-[rgb(5,_15,_35)] opacity-[0.7] text-base leading-relaxed">
                We offer open and honest disclosure about pricing and financing in an effort to assure revenue upon the sale of the automotive experiences we provide.
              </p>
            </div>

            {/* Right Column - Get Your Trade-In Value */}
            <div className="bg-[rgb(250,_250,_253)] rounded-lg p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[rgb(5,_14,_35)] text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
                  <span className="font-semibold">BLACK</span>
                  <span className="font-semibold">BOOK</span>
                </div>
              </div>
              
              <h3 className="text-center font-semibold text-[rgb(5,_15,_35)] text-2xl mb-3">
                Get Your Trade-In Value! 💰
              </h3>
              
              <p className="text-center text-[rgb(5,_15,_35)] opacity-[0.6] text-sm mb-6">
                Those who are <span className="text-[rgb(139,_130,_246)]">calculator using the entire Black Book value</span> can easily access miles
              </p>

              <div className="mb-6">
                <p className="text-[rgb(5,_15,_35)] text-sm mb-2">
                  Current Vehicle [Year, Make Model and Trim] or VIN
                </p>
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search Vehicle..."
                    value={vehicleSearch}
                    onChange={(e) => setVehicleSearch(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(139,_130,_246)] focus:border-transparent"
                  />
                </form>
              </div>

              <button 
                onClick={handleSearch}
                className="w-full bg-[rgb(139,_130,_246)] text-white font-semibold px-6 py-3 rounded-md hover:bg-[rgb(120,_110,_230)] transition-colors"
              >
                Continue
              </button>

              <p className="text-center text-xs text-[rgb(5,_15,_35)] opacity-[0.5] mt-4">
                Powered by Autotrader
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-4 bg-[rgb(250,_250,_253)]">
        <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
          <p className="text-center text-[rgb(139,_130,_246)] text-sm uppercase tracking-[1.5px] mb-3">
            TESTIMONIALS
          </p>
          <h2 className="text-center font-semibold text-[rgb(5,_15,_35)] text-3xl md:text-4xl mb-12">
            What people says
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[rgb(5,_15,_35)] text-sm mb-4 leading-relaxed">
                I recently bought a preowned vehicle from Manager Trade. He was very professional, answered all my questions and easy to talk to. Every interaction was pleasant and helpful. And in the end I drove away a great deal!
              </p>
              <p className="text-[rgb(5,_15,_35)] font-medium mb-4">
                Thanks Trade!
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1599566147214-ce487862ea4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGZhY2UlMjBhdmF0YXJ8ZW58MXx8fHwxNzY5Mzc5MTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Cassie"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-[rgb(5,_15,_35)] font-semibold text-sm">Cassie</p>
                  <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-xs">December 2, 2021</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[rgb(5,_15,_35)] text-sm mb-4 leading-relaxed">
                Great car dealership. They chose a good car for me and it's amazing!
              </p>
              <p className="text-[rgb(5,_15,_35)] text-sm mb-4">
                Fair deal.
              </p>
              <p className="text-[rgb(5,_15,_35)] text-sm mb-4">
                Thanks to Manager Alexander for help with the choice.
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1705940372495-ab4ed45d3102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwZmFjZXxlbnwxfHx8fDE3NjkzNDY5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Kristina" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-[rgb(5,_15,_35)] font-semibold text-sm">Kristina</p>
                  <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-xs">February</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[rgb(5,_15,_35)] text-sm mb-4 leading-relaxed">
                Great service and staff. Kylan was able to answer all her questions I had and gotten me into an amazing vehicle
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img 
                  src="https://images.unsplash.com/photo-1619950498711-c2d22c4c3cb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5MzU5MTE4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Kylee"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-[rgb(5,_15,_35)] font-semibold text-sm">Kylee</p>
                  <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-xs">March 2021</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-4 bg-white">
        <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
          <div className="relative w-full h-[350px] md:h-[400px] rounded-2xl bg-cover bg-center overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1591527292000-95f01a0d1496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBoYW5kc2hha2UlMjBidXNpbmVzcyUyMGRlYWx8ZW58MXx8fHwxNzY4MDY4ODY5fDA&ixlib=rb-4.1.0&q=80&w=1080')`}}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-white text-3xl md:text-4xl lg:text-[48px] font-semibold mb-8 leading-tight">
                Buy or sell cars in one<br />place
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate?.('shop')}
                  className="bg-[rgb(139,_130,_246)] text-white font-semibold px-8 py-3 rounded-md hover:bg-[rgb(120,_110,_230)] text-base transition-colors"
                >
                  Buy a Vehicle
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-[rgb(5,_15,_35)] font-semibold px-8 py-3 rounded-md hover:bg-gray-100 text-base transition-colors"
                >
                  Sell a Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}