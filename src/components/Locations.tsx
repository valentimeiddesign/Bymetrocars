import React from 'react';

export function Locations() {
  const locations = [
    {
      name: 'Bayview Dr',
      address: '332 Sackville Dr, Lower Sackville, NS B4C 2R8',
      hours: '',
      image: 'https://images.unsplash.com/photo-1759200870554-cb66aa23526a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZWFsZXJzaGlwJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzY4MTYwMTU2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Sackville Drive',
      address: '400 Sackville Drive',
      hours: '',
      image: 'https://images.unsplash.com/photo-1762008310442-b99129e2fe00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBsb3QlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjgxNjAxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Big Valley',
      address: '224 Wyse Rd, Dartmouth',
      hours: 'Monday-Friday: 9am - 8:00\nSaturday: 08.30-17.00\nSunday: Closed',
      image: 'https://images.unsplash.com/photo-1678712803606-b42d875057f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvJTIwZGVhbGVyc2hpcCUyMHN0b3JlZnJvbnR8ZW58MXx8fHwxNzY4MTYwMTYyfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Dealership',
      address: '102-108 Colosseal Road',
      hours: 'Monday - Friday: 9am - 7pm\nSaturday: 9am - 7pm',
      image: 'https://images.unsplash.com/photo-1768095553796-eb9b1ba61e2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBzdHJlZXR8ZW58MXx8fHwxNzY4MTYwMTY1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'BayLa Metro',
      address: '19 Lady Mary Way',
      hours: 'Monday - Friday: 8am - 6pm',
      image: 'https://images.unsplash.com/photo-1759200870554-cb66aa23526a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZWFsZXJzaGlwJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzY4MTYwMTU2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Lower Sackville',
      address: '311 Sackville Road',
      hours: 'Monday - Friday: 10am - 7pm\nSaturday: 10am - 6:30am',
      image: 'https://images.unsplash.com/photo-1762008310442-b99129e2fe00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBsb3QlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjgxNjAxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Halifax',
      address: '1400 NS-2, Halifax, NS B0N 1G0',
      hours: 'Monday - Friday: 8am - 5pm',
      image: 'https://images.unsplash.com/photo-1678712803606-b42d875057f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvJTIwZGVhbGVyc2hpcCUyMHN0b3JlZnJvbnR8ZW58MXx8fHwxNzY4MTYwMTYyfDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
        
        {/* Locations Section */}
        <section className="py-16 bg-white">
          <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            <div className="max-w-6xl mx-auto">
              <p className="text-[rgb(139,_130,_246)] text-xs uppercase tracking-[1.5px] mb-3">
                VISIT US
              </p>
              <h2 className="font-semibold text-[rgb(5,_15,_35)] text-3xl md:text-4xl mb-12">
                Locations
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {locations.map((location, index) => (
                  <div 
                    key={index} 
                    className="relative rounded-2xl overflow-hidden h-[280px] bg-cover bg-center group"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${location.image}')`
                    }}
                  >
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      
                      {/* Top - Location Name with Pin Icon */}
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <h3 className="text-white font-semibold text-lg">
                          {location.name}
                        </h3>
                      </div>

                      {/* Bottom - Address, Hours and Button */}
                      <div>
                        <p className="text-white text-sm mb-2">
                          {location.address}
                        </p>
                        {location.hours && (
                          <p className="text-white text-xs mb-4 opacity-90 whitespace-pre-line">
                            {location.hours}
                          </p>
                        )}
                        <button className="bg-[rgb(139,_130,_246)] text-white font-semibold px-6 py-2 rounded-full hover:bg-[rgb(120,_110,_230)] transition-colors text-sm">
                          Show Address
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}