import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { MapPin } from 'lucide-react';

// Import Figma assets
import imgBuyMetro from "figma:asset/adce7488d6e0f79997ad5a8c5062c725b0d6c7e8.png";
import imgTruro from "figma:asset/70cbca31f578e12e6f54475a05501d00f2fd5597.png";
import imgMountUniacke from "figma:asset/86d32231609f95a8bbde8486468de9984c13225c.png";
import imgLowerSackville from "figma:asset/aeebc612f9c7bfd006a19f336de58d012423bd8c.png";
import img400Sackville from "figma:asset/705b30a10f138fb5290b4a1597d0c8ec7b139614.png";

// Unsplash images for missing locations
const img332Sackville = "https://images.unsplash.com/photo-1768359265958-32102dbf4e91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZWFsZXJzaGlwJTIwZXh0ZXJpb3IlMjBtb2Rlcm4lMjBidWlsZGluZ3xlbnwxfHx8fDE3NjkzODE5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgPhillipsAuto = "https://images.unsplash.com/photo-1585937169521-4428971aaab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VkJTIwY2FyJTIwZGVhbGVyc2hpcCUyMGxvdCUyMHBhY2tlZCUyMHdpdGglMjBjYXJzfGVufDF8fHx8MTc2OTM4MTkzMnww&ixlib=rb-4.1.0&q=80&w=1080";

interface LocationsProps {
  onNavigate?: (page: string) => void;
  setSelectedLocation?: (location: string | null) => void;
}

export function Locations({ onNavigate, setSelectedLocation }: LocationsProps = {}) {
  const locations = [
    {
      name: '332 Sackville Drive',
      locationFilter: '332 Sackville Drive',
      address: '332 Sackville Dr, Lower Sackville, NS B4C 2R6',
      hours: '', // No hours visible in design
      phone: '',
      image: img332Sackville
    },
    {
      name: '400 Sackville Drive',
      locationFilter: '400 Sackville Drive',
      address: '400 Sackville Drive',
      hours: '',
      phone: '(902) 219-3606',
      image: img400Sackville
    },
    {
      name: 'Buy Metro',
      locationFilter: 'Buy Metro',
      address: '224 Wyse Rd, Dartmouth',
      hours: 'Monday – Friday: 08:30 – 18:00\nSaturday: 08:30 – 17:00\nSunday: Closed',
      phone: '902-466-0086',
      image: imgBuyMetro
    },
    {
      name: 'Phillips Auto',
      locationFilter: 'Phillips Auto',
      address: '302-308 Cobequid Road',
      hours: 'Monday – Friday: 9am – 7pm\nSaturday: 9am – 2pm',
      phone: '902-864-6952',
      image: imgPhillipsAuto
    },
    {
      name: 'Mount Uniacke',
      locationFilter: 'Mount Uniacke',
      address: '19 Lady Mary Way',
      hours: 'Monday – Friday: 9am – 5pm',
      phone: '902-252-4422 (press 1)',
      image: imgMountUniacke
    },
    {
      name: 'Lower Sackville',
      locationFilter: 'Lower Sackville',
      address: '111 Cobequid Road',
      hours: 'Monday – Friday: 10am – 7pm\nSaturday: 10am – 4:30pm',
      phone: '902-844-4019 (press 1)',
      image: imgLowerSackville
    },
    {
      name: 'Truro',
      locationFilter: 'Truro',
      address: '1406 NS-2, Hilden, NS B0N 1C0',
      hours: 'Monday – Friday: 9am – 5pm',
      phone: '(902) 817-5452',
      image: imgTruro,
      fullWidth: true
    }
  ];

  const handleShowVehicles = (locationName: string) => {
    if (setSelectedLocation) {
      setSelectedLocation(locationName);
    }
    if (onNavigate) {
      onNavigate('shop');
    }
  };

  const handleOpenMap = (address: string) => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
        
        <Breadcrumbs 
          items={[{ label: 'Locations' }]} 
          onNavigate={onNavigate || (() => {})} 
        />

        <section className="py-10 bg-white">
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
            <div className="max-w-[1440px] mx-auto">
              
              <div className="mb-12">
                <p className="text-[rgb(139,130,246)] text-xs uppercase tracking-[1.5px] mb-4 font-medium">
                  VISIT US
                </p>
                <h1 className="font-bold text-[rgb(5,_15,_35)] text-4xl md:text-[40px] tracking-[-0.5px]">
                  Locations
                </h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {locations.map((location, index) => (
                  <div 
                    key={index} 
                    className={`relative rounded-[24px] overflow-hidden h-[300px] md:h-[360px] bg-cover bg-center group ${location.fullWidth ? 'lg:col-span-2' : ''}`}
                  >
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0 z-0">
                      {location.name === '332 Sackville Drive' ? (
                        <div className="w-full h-full bg-[#333333]"></div>
                      ) : (
                        <>
                          <img 
                            src={location.image}
                            alt={location.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.3)]"></div>
                        </>
                      )}
                    </div>

                    <div className={`absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-between ${location.name === '332 Sackville Drive' ? '' : ''}`}>
                      
                      {/* Top Label */}
                      <div className="flex items-start">
                        <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.2)] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                          <MapPin className="w-3.5 h-3.5 text-white" />
                          <span className="text-white text-xs font-medium tracking-wide">{location.name}</span>
                        </div>
                      </div>

                      {/* Bottom Content */}
                      <div className="text-white">
                        <div className="mb-6">
                           <h2 className="text-xl md:text-2xl font-bold mb-1">{location.address.split(',')[0]}</h2>
                           {location.address.includes(',') && <p className="text-white/80 text-sm mb-2">{location.address.split(',').slice(1).join(',').trim()}</p>}
                           
                           {location.hours && (
                             <p className="text-white/90 text-sm whitespace-pre-line mb-1">{location.hours}</p>
                           )}
                           {location.phone && (
                             <p className="text-white/90 text-sm">{location.phone}</p>
                           )}
                        </div>

                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleShowVehicles(location.locationFilter)}
                            className="bg-[rgb(139,130,246)] hover:bg-[rgb(120,110,230)] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
                          >
                            Show Vehicles
                          </button>
                          
                          <button 
                            onClick={() => handleOpenMap(location.address)}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                            aria-label="Open in Maps"
                          >
                            <MapPin className="w-4 h-4 text-white" />
                          </button>
                        </div>
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
