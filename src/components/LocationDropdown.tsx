import React from 'react';
import { Icons } from './Icons';

interface LocationDropdownProps {
  locations: string[];
  selectedLocation: string | null;
  locationMenuOpen: boolean;
  setLocationMenuOpen: (open: boolean) => void;
  setSelectedLocation: (location: string | null) => void;
  allCars: any[];
}

export function LocationDropdown({
  locations,
  selectedLocation,
  locationMenuOpen,
  setLocationMenuOpen,
  setSelectedLocation,
  allCars
}: LocationDropdownProps) {
  return (
    <div className="relative">
      <button 
        onClick={() => setLocationMenuOpen(!locationMenuOpen)}
        className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]"
      >
        <Icons.Location />
        <span>{selectedLocation || 'Location'}</span>
        <Icons.ChevronDown className={`w-4 h-4 transition-transform ${locationMenuOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {locationMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-[998]" 
            onClick={() => setLocationMenuOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-[999]">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-semibold text-[rgb(5,_15,_35)]">Select Location</p>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {locations.map((location) => {
                const carsInLocation = allCars.filter((car: any) => car.location === location).length;
                return (
                  <button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setLocationMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                      selectedLocation === location ? 'bg-[rgba(139,_130,_246,_0.1)]' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[16px] ${
                        selectedLocation === location 
                          ? 'text-[rgb(139,_130,_246)] font-semibold' 
                          : 'text-[rgb(5,_15,_35)]'
                      }`}>
                        {location}
                      </span>
                      {carsInLocation > 0 && (
                        <span className="text-sm text-gray-500">{carsInLocation} cars</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {selectedLocation && (
              <div className="px-4 py-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    setSelectedLocation(null);
                    setLocationMenuOpen(false);
                  }}
                  className="text-sm text-[rgb(139,_130,_246)] hover:text-[rgb(129,_120,_236)] font-semibold"
                >
                  Clear Location
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
