import React from 'react';

export function AboutUs() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
        
        {/* Hero Section */}
        <section className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1723595919200-c4643d84a1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBkaXNjdXNzaW5nJTIwY2FyJTIwZG9jdW1lbnRzfGVufDF8fHx8MTc2ODE1OTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080')`}}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-white text-xs md:text-sm uppercase tracking-[2px] mb-3 opacity-90">
              BUY METRO PRE-OWNED
            </p>
            <h1 className="text-white text-3xl md:text-5xl lg:text-[56px] font-semibold leading-tight">
              Your local<br />vehicle experts
            </h1>
          </div>
        </section>

        {/* What we provide Section */}
        <section className="py-16 bg-white">
          <div className="w-full px-4 md:px-8 lg:px-20">
            <div className="max-w-6xl mx-auto">
              <p className="text-[rgb(139,_130,_246)] text-xs uppercase tracking-[1.5px] mb-3">
                OUR SERVICES
              </p>
              <h2 className="font-semibold text-[rgb(5,_15,_35)] text-3xl md:text-4xl mb-12">
                What we provide
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Trade In */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-[rgba(139,_130,_246,_0.1)] rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[rgb(139,_130,_246)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[rgb(5,_15,_35)] text-xl mb-3">Trade In</h3>
                  <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm mb-4 leading-relaxed">
                    Selling your car just got much easier
                  </p>
                  <a href="#" className="text-[rgb(139,_130,_246)] text-sm font-medium hover:opacity-80 transition-opacity">
                    Get Started &gt;
                  </a>
                </div>

                {/* Financing Services */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-[rgba(139,_130,_246,_0.1)] rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[rgb(139,_130,_246)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[rgb(5,_15,_35)] text-xl mb-3">Financing Services</h3>
                  <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm mb-4 leading-relaxed">
                    We provide financing services for the purchase of car loans
                  </p>
                  <a href="#" className="text-[rgb(139,_130,_246)] text-sm font-medium hover:opacity-80 transition-opacity">
                    Learn More &gt;
                  </a>
                </div>

                {/* Technical Service */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-[rgba(139,_130,_246,_0.1)] rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[rgb(139,_130,_246)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[rgb(5,_15,_35)] text-xl mb-3">Technical Service</h3>
                  <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm mb-4 leading-relaxed">
                    You get your 100% service of technical experts at reasonable price
                  </p>
                  <a href="#" className="text-[rgb(139,_130,_246)] text-sm font-medium hover:opacity-80 transition-opacity">
                    Get in Touch &gt;
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Buy Metro Pre-Owned Section */}
        <section className="py-16 bg-[rgb(250,_250,_253)]">
          <div className="w-full px-4 md:px-8 lg:px-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Image */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1766524791677-6c6c495e0218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBsb3QlMjBkZWFsZXJzaGlwJTIwdmVoaWNsZXN8ZW58MXx8fHwxNzY4MTU5OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Car dealership lot" 
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Content */}
                <div>
                  <h2 className="font-semibold text-[rgb(5,_15,_35)] text-3xl md:text-4xl mb-6">
                    Buy Metro Pre-Owned
                  </h2>
                  <p className="text-[rgb(5,_15,_35)] opacity-[0.7] text-base leading-relaxed">
                    We offer open and honest discussions about pricing and financing in an effort to assure revenue upon the sale of the automotive experiences we provide. Our Finance team is transparent account speeds to the respect and dignity we seek to touch with every customer and vehicles.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Features with Image Section */}
        <section className="py-16 bg-white">
          <div className="w-full px-4 md:px-8 lg:px-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Features List */}
                <div className="space-y-8">
                  
                  {/* Car Experts */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[rgb(5,_15,_35)] text-lg mb-2">Car Experts</h3>
                      <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm leading-relaxed">
                        Our breadth and depth of products ensure that every customer gets into the right vehicle for their needs
                      </p>
                    </div>
                  </div>

                  {/* Service Quality */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[rgb(5,_15,_35)] text-lg mb-2">Service Quality</h3>
                      <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm leading-relaxed">
                        Our Track and transparent approach speaks for the respect and loyalty
                      </p>
                    </div>
                  </div>

                  {/* Finance Loyalty */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[rgb(5,_15,_35)] text-lg mb-2">Finance Loyalty</h3>
                      <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm leading-relaxed">
                        We offer open and honest discussions about pricing and financing
                      </p>
                    </div>
                  </div>

                </div>

                {/* Image */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1723595919200-c4643d84a1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBkaXNjdXNzaW5nJTIwY2FyJTIwZG9jdW1lbnRzfGVufDF8fHx8MTc2ODE1OTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Customer consulting" 
                    className="w-full h-auto object-cover"
                  />
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-[rgb(250,_250,_253)]">
          <div className="w-full px-4 md:px-8 lg:px-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* Stat 1 */}
                <div className="text-center">
                  <h3 className="font-semibold text-[rgb(5,_15,_35)] text-4xl md:text-5xl mb-3">2007</h3>
                  <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm leading-relaxed">
                    the year we started our company and made thousands of customers happy
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="text-center">
                  <h3 className="font-semibold text-[rgb(5,_15,_35)] text-4xl md:text-5xl mb-3">3000+</h3>
                  <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm leading-relaxed">
                    vehicles was successfully series since 2007 year
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="text-center">
                  <h3 className="font-semibold text-[rgb(5,_15,_35)] text-4xl md:text-5xl mb-3">8/10</h3>
                  <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm leading-relaxed">
                    customers come back to us for buying a new car
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="w-full px-4 md:px-8 lg:px-20">
            <div className="relative w-full rounded-2xl bg-cover bg-center overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1591527292000-95f01a0d1496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMGNhciUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MTU5OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080')`}}>
              <div className="py-16 md:py-20 px-4 text-center">
                <h2 className="text-white text-3xl md:text-4xl lg:text-[48px] font-semibold mb-8 leading-tight">
                  Buy or sell cars in one<br />place
                </h2>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="bg-[rgb(139,_130,_246)] text-white font-semibold px-8 py-3 rounded-full hover:bg-[rgb(120,_110,_230)] transition-colors text-base min-w-[160px]">
                    Get Started
                  </button>
                  <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[rgb(5,_15,_35)] transition-colors text-base min-w-[160px]">
                    Get a Vehicle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
