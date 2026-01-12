import React, { useState } from 'react';

interface FinancingProps {
  onNavigate?: (page: string) => void;
}

export function Financing({ onNavigate }: FinancingProps = {}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We will check your credit eligibility.');
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
        
        {/* Hero Section */}
        <section className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1591527292000-95f01a0d1496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBmaW5hbmNpbmclMjBoYW5kc2hha2V8ZW58MXx8fHwxNzY4MDc1MzMxfDA&ixlib=rb-4.1.0&q=80&w=1080')`}}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-white text-sm md:text-base uppercase tracking-[2px] mb-3 opacity-90">
              FINANCING
            </p>
            <h1 className="text-white text-3xl md:text-5xl lg:text-[56px] font-semibold mb-8 leading-tight">
              Buy a car with our<br />financing
            </h1>
            <button 
              onClick={() => onNavigate?.('quiz')}
              className="bg-[rgb(139,_130,_246)] text-white font-semibold px-8 py-3 rounded-md hover:bg-[rgb(120,_110,_230)] text-base transition-colors"
            >
              Check Eligibility
            </button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-[rgb(250,_250,_253)]">
          <div className="w-full px-4 md:px-8 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              
              {/* Benefit 1 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-[rgb(5,_15,_35)] text-lg mb-2">Fast Approval</h3>
                <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm">
                  Quick confirmation of your application for financing
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-[rgb(5,_15,_35)] text-lg mb-2">Completely online</h3>
                <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm">
                  The entire financing procedure is done fully online
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-[rgb(5,_15,_35)] text-lg mb-2">No impact to CS</h3>
                <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-sm">
                  The application will not affect your Credit Score in any way
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Financing Info & Form Section */}
        <section className="py-16 bg-white">
          <div className="w-full px-4 md:px-8 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
              
              {/* Left Column - Financing Info */}
              <div>
                <p className="text-[rgb(139,_130,_246)] text-sm uppercase tracking-[1.5px] mb-3">
                  FINANCING
                </p>
                <h2 className="font-semibold text-[rgb(5,_15,_35)] text-3xl md:text-4xl mb-6">
                  Financing
                </h2>
                <p className="text-[rgb(5,_15,_35)] opacity-[0.7] text-base leading-relaxed mb-6">
                  We offer honest and transparent about pricing and financing in an effort to assure revenue upon the sale of the automotive experiences we provide. Our Finance team is transparent account speeds to the respect and dignity we seek to touch with every customer and vehicles.
                </p>
                
                {/* Image */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1595298828904-6e42179e16ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMG5ldyUyMGNhcnxlbnwxfHx8fDE3NjgwNzUzMzF8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Happy customers" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Right Column - Equifax Form */}
              <div className="bg-[rgb(250,_250,_253)] rounded-lg p-8">
                <div className="text-center mb-6">
                  <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-xs uppercase tracking-[1px] mb-4">
                    LET'S
                  </p>
                  <h3 className="font-semibold text-[rgb(5,_15,_35)] text-2xl mb-6">
                    Get your Free Equifax Credit Snapshot
                  </h3>
                  
                  {/* Benefits */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-[rgb(5,_15,_35)] text-xs">
                        No impact on your credit
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-[rgb(5,_15,_35)] text-xs">
                        Identify inaccurate information
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-[rgb(5,_15,_35)] text-xs">
                        Help dig into credit history and score
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* First Name */}
                  <div className="mb-4">
                    <label htmlFor="firstName" className="block text-[rgb(5,_15,_35)] text-xs mb-2 uppercase tracking-[0.5px]">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(139,_130,_246)] focus:border-transparent"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="mb-6">
                    <label htmlFor="lastName" className="block text-[rgb(5,_15,_35)] text-xs mb-2 uppercase tracking-[0.5px]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(139,_130,_246)] focus:border-transparent"
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full bg-[rgb(139,_130,_246)] text-white font-semibold px-6 py-3 rounded-md hover:bg-[rgb(120,_110,_230)] transition-colors"
                  >
                    LET'S GO →
                  </button>

                  <p className="text-center text-xs text-[rgb(5,_15,_35)] opacity-[0.5] mt-4">
                    *This will NOT impact your credit score
                  </p>
                </form>

                {/* Equifax Logo */}
                <div className="mt-8 text-center">
                  <p className="text-xs text-[rgb(5,_15,_35)] opacity-[0.6] mb-2">Powered by</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-red-600 font-bold text-xl">EQUIFAX</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-[rgb(250,_250,_253)]">
          <div className="w-full px-4 md:px-8 lg:px-20">
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
                <p className="text-[rgb(5,_15,_35)] text-sm mb-6 leading-relaxed">
                  I recently bought a preowned vehicle from Manager Mack. He was very patient and attentive to all our needs and made sure we got exactly what we wanted. Every interaction was pleasant and helpful. And in the end I drove away a great deal! I highly on a great new car a great deal!
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-[rgb(5,_15,_35)] font-semibold text-sm">Carsten</p>
                    <p className="text-[rgb(5,_15,_35)] opacity-[0.6] text-xs">December 30, 2020</p>
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
                <p className="text-[rgb(5,_15,_35)] text-sm mb-6 leading-relaxed">
                  Great car dealership. They chose a good car for me and it's amazing!
                </p>
                <p className="text-[rgb(5,_15,_35)] text-sm mb-4">
                  Thanks to Manager Alexander for help with the choice.
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-[rgb(5,_15,_35)] font-semibold text-sm">Antony</p>
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
                <p className="text-[rgb(5,_15,_35)] text-sm mb-6 leading-relaxed">
                  Great service and staff. Kylan was able to answer all her questions I had and gotten me into an amazing vehicle
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-[rgb(5,_15,_35)] font-semibold text-sm">Kylee</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="w-full px-4 md:px-8 lg:px-20">
            <div className="relative w-full rounded-2xl bg-cover bg-center overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1591527292000-95f01a0d1496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBmaW5hbmNpbmclMjBoYW5kc2hha2V8ZW58MXx8fHwxNzY4MDc1MzMxfDA&ixlib=rb-4.1.0&q=80&w=1080')`}}>
              <div className="py-16 px-4 text-center">
                <h2 className="text-white text-3xl md:text-4xl lg:text-[48px] font-semibold mb-8 leading-tight">
                  Check your eligibility now
                </h2>
                
                {/* Benefits Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white text-sm">Fast Approval</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white text-sm">Completely online</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white text-sm">No impact to CS</p>
                  </div>
                </div>

                <button className="bg-[rgb(139,_130,_246)] text-white font-semibold px-8 py-3 rounded-md hover:bg-[rgb(120,_110,_230)] text-base transition-colors">
                  Check Eligibility
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}