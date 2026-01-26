import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

interface ShopCarCardProps {
  car: any;
  onClick: () => void;
}

export function ShopCarCard({ car, onClick }: ShopCarCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  // Helper to parse images from various formats (array, CSV string, single string)
  const getImages = (carData: any): string[] => {
    let result: string[] = [];
    
    if (Array.isArray(carData.images) && carData.images.length > 0) {
      result = carData.images;
    } else if (typeof carData.images === 'string' && carData.images.length > 0) {
      // Handle "img1.png; img2.png" format
      if (carData.images.includes(';')) {
        result = carData.images.split(';').map((s: string) => s.trim()).filter(Boolean);
      } else {
        result = [carData.images];
      }
    } 
    
    // Fallback to single image field if result is empty
    if (result.length === 0 && carData.image) {
      result = [carData.image];
    }
    
    // Final fallback if absolutely nothing
    if (result.length === 0) {
      result = ['https://images.unsplash.com/photo-1605152277138-359efd4a6862?w=800'];
    }
    
    return result;
  };

  const images = getImages(car);
  const targetImage = images[currentImageIndex];

  // Reset error when image index changes
  useEffect(() => {
    setImgError(false);
    setCurrentSrc(targetImage);
  }, [targetImage]);

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setCurrentSrc('https://images.unsplash.com/photo-1605152277138-359efd4a6862?w=800&auto=format&fit=crop');
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // CLEANING LOGIC: Remove redundant year/make from model string
  const getCleanTitle = () => {
    const year = car.year?.toString() || '';
    const make = car.make || '';
    let model = car.model || '';

    // If model starts with Year, strip it
    if (year && model.startsWith(year)) {
      model = model.substring(year.length).trim();
    }
    
    // If model starts with Make (case insensitive), strip it
    if (make && model.toLowerCase().startsWith(make.toLowerCase())) {
      model = model.substring(make.length).trim();
    }
    
    return `${year} ${make} ${model}`.trim();
  };

  const cleanTitle = getCleanTitle();

  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-3 cursor-pointer group"
    >
      {/* Car Image with Slider */}
      <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[285px] rounded-[24px] overflow-hidden bg-gray-100 isolate">
        {!currentSrc ? (
           <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
             <ImageOff className="w-12 h-12" />
           </div>
        ) : (
          <img
            src={currentSrc}
            onError={handleImageError}
            alt={cleanTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        
        {/* Slider Controls - Show on group hover */}
        {images.length > 1 && !imgError && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-20 hover:scale-110 active:scale-95 lg:opacity-0 lg:group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 text-[rgb(5,_15,_35)]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-20 hover:scale-110 active:scale-95 lg:opacity-0 lg:group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 text-[rgb(5,_15,_35)]" />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="max-w-[64px] overflow-hidden pointer-events-auto">
                <div 
                  className="flex gap-2 transition-transform duration-300 ease-out"
                  style={{ 
                    transform: `translateX(-${Math.max(0, Math.min(currentImageIndex - 1, images.length - 4)) * 18}px)`
                  }}
                >
                  {images.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-shrink-0 w-2.5 h-2.5 rounded-full transition-all shadow-sm cursor-pointer ${
                        idx === currentImageIndex 
                          ? 'bg-[rgb(139,_130,_246)] scale-110' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Dark gradient overlay at bottom for better dots visibility */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />
          </>
        )}
      </div>
      
      {/* Status Badge */}
      <div>
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          (car.status || 'Available') === 'Available' 
            ? 'bg-[#E6F4EA] text-[#1E8E3E]' 
            : 'bg-[#FFF4E5] text-[#FF9500]'
        }`}>
          {car.status || 'Available'}
        </span>
      </div>

      {/* Car Title - Using Cleaned Title */}
      <h3 className="text-[rgb(5,_15,_35)] text-[18px] font-bold leading-tight">
        {cleanTitle}
      </h3>
      
      {/* Price & Mileage */}
      <div className="flex items-center justify-between mt-1">
        <div className="bg-[#F5F6F7] px-4 py-2 rounded-[14px] text-[rgb(5,_15,_35)] font-bold text-[18px]">
          ${(car.price || 0).toLocaleString()}
        </div>
        <div className="text-[rgb(156,163,175)] text-[16px]">
          {(car.mileage || 0).toLocaleString()} km
        </div>
      </div>
    </div>
  );
}