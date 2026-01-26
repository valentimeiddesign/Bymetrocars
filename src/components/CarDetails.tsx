import React, { useState, useEffect } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Wind, 
  Camera, 
  Zap, 
  Bluetooth, 
  Gauge, 
  Flame, 
  Circle, 
  Armchair, 
  Lock, 
  AppWindow, 
  Disc, 
  Key, 
  Music, 
  Navigation, 
  Shield, 
  Wifi,
  Fan,
  Thermometer,
  Radio
} from "lucide-react";
import { fetchCarById, fetchAllCars, getCarImageUrl } from "../utils/carApi";
import type { Car } from "../types/car";
import { ShopCarCard } from "./ShopCarCard";
import { BookTestDriveModal } from "./BookTestDriveModal";

interface CarDetailsProps {
  carId: string | number;
  onNavigate: (page: string, carId?: string | number) => void;
}

export function CarDetails({
  carId,
  onNavigate,
}: CarDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommendedCars, setRecommendedCars] = useState<Car[]>(
    [],
  );
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false);

  useEffect(() => {
    loadCarDetails();
  }, [carId]);

  const loadCarDetails = async () => {
    setLoading(true);
    try {
      const id = String(carId);
      const carData = await fetchCarById(id);
      setCar(carData);

      // Load recommended cars
      const allCars = await fetchAllCars();
      const otherCars = allCars
        .filter((c) => c.id !== id)
        .slice(0, 4);
      setRecommendedCars(otherCars);
    } catch (error) {
      console.error("Failed to load car details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(139,130,246)]"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Car not found
        </h2>
        <button
          onClick={() => onNavigate("shop")}
          className="text-[rgb(139,130,246)] hover:underline"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  // Helper to safely get image URL
  const getImageUrl = (index: number) => {
    if (car.images && car.images.length > index) {
      return getCarImageUrl(car.images[index]);
    }
    return "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80";
  };

  const getPrice = () => Number(car.price) || 0;
  const getFees = () => 799; // Standard fee
  const getTax = () => 0; // Calculated elsewhere usually

  const getFeatures = () => {
    if (Array.isArray(car.features) && car.features.length > 0) return car.features;
    if (typeof car.features === 'string') return (car.features as string).split(',').map(s => s.trim()).filter(Boolean);
    return [
      "Sunroof",
      "Dual A/C",
      "Back-up Camera",
      "Lane Assist",
      "Bluetooth",
      "Adaptive Cruise Control",
      "Heated Seats",
      "Heated Steering Wheel",
      "Power Seats",
      "Power Locks",
      "Power Windows",
      "Alloy Rims",
      "New MVI"
    ];
  };

  const featuresList = getFeatures();

  const getFeatureIcon = (feature: string) => {
    const f = feature.toLowerCase();
    if (f.includes("sunroof") || f.includes("moonroof")) return <Sun className="w-5 h-5" />;
    if (f.includes("a/c") || f.includes("air cond")) return <Wind className="w-5 h-5" />;
    if (f.includes("camera") || f.includes("cam")) return <Camera className="w-5 h-5" />;
    if (f.includes("lane") || f.includes("assist")) return <Zap className="w-5 h-5" />;
    if (f.includes("bluetooth")) return <Bluetooth className="w-5 h-5" />;
    if (f.includes("cruise")) return <Gauge className="w-5 h-5" />;
    if (f.includes("heated") || f.includes("seat")) return <Flame className="w-5 h-5" />; // Heated or just seats sometimes
    if (f.includes("wheel") || f.includes("steering")) return <Circle className="w-5 h-5" />;
    if (f.includes("power seat")) return <Armchair className="w-5 h-5" />;
    if (f.includes("lock")) return <Lock className="w-5 h-5" />;
    if (f.includes("window")) return <AppWindow className="w-5 h-5" />;
    if (f.includes("rim") || f.includes("alloy") || f.includes("wheel")) return <Disc className="w-5 h-5" />;
    if (f.includes("key")) return <Key className="w-5 h-5" />;
    if (f.includes("audio") || f.includes("radio") || f.includes("sound")) return <Music className="w-5 h-5" />;
    if (f.includes("nav") || f.includes("gps")) return <Navigation className="w-5 h-5" />;
    if (f.includes("safe") || f.includes("security")) return <Shield className="w-5 h-5" />;
    if (f.includes("wifi")) return <Wifi className="w-5 h-5" />;
    if (f.includes("fan")) return <Fan className="w-5 h-5" />;
    if (f.includes("thermometer")) return <Thermometer className="w-5 h-5" />;
    
    // Default
    return <Zap className="w-5 h-5" />;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Back Navigation */}
      <div className="bg-[rgb(250,250,253)]">
        <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <button 
              onClick={() => onNavigate("home")} 
              className="hover:text-[rgb(139,130,246)] transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-4 h-4" />
            <button 
              onClick={() => onNavigate("shop")} 
              className="hover:text-[rgb(139,130,246)] transition-colors"
            >
              Inventory
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[rgb(5,15,35)] font-medium truncate">
              {car.year} {car.make} {car.model}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative bg-[rgb(250,250,253)] rounded-2xl overflow-hidden mb-4 group">
                <div className="relative h-[400px] md:h-[500px]">
                  <img
                    src={getImageUrl(currentImageIndex)}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Navigation Arrows */}
                  {car.images && car.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => 
                            prev === 0 ? (car.images?.length || 1) - 1 : prev - 1
                          );
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => 
                            prev === (car.images?.length || 1) - 1 ? 0 : prev + 1
                          );
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-800" />
                      </button>
                    </>
                  )}
                </div>

                {/* Heart Icon */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 z-10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Thumbnails Gallery */}
              {car.images && car.images.length > 1 && (
                <div className="grid grid-cols-6 gap-3">
                  {(() => {
                    const images = car.images || [];
                    const maxVisible = 6;
                    const totalImages = images.length;
                    
                    let start = currentImageIndex - 2;
                    if (start < 0) start = 0;
                    if (start > totalImages - maxVisible) start = Math.max(0, totalImages - maxVisible);
                    
                    return images.slice(start, start + maxVisible).map((img, i) => {
                      const realIndex = start + i;
                      return (
                        <button
                          key={realIndex}
                          onClick={() => setCurrentImageIndex(realIndex)}
                          className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                            currentImageIndex === realIndex
                              ? "border-[rgb(139,130,246)] ring-2 ring-[rgb(139,130,246)]/20"
                              : "border-transparent hover:border-gray-200"
                          }`}
                        >
                          <img
                            src={getCarImageUrl(img)}
                            alt={`View ${realIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    });
                  })()}
                </div>
              )}
            </div>

            {/* Overview Section */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-[rgb(5,15,35)] mb-6">
                Overview
              </h3>
              
              <div className="border-t border-gray-100">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex justify-between py-4 border-b border-gray-100 md:pr-8">
                    <span className="text-gray-500 text-sm">VIN</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-bold">{car.vin || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-100 md:pl-8">
                    <span className="text-gray-500 text-sm">Mileage</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-bold">{car.mileage?.toLocaleString() || "0"} km</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex justify-between py-4 border-b border-gray-100 md:pr-8">
                    <span className="text-gray-500 text-sm">Drive</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-bold">{car.drivetrain || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-100 md:pl-8">
                    <span className="text-gray-500 text-sm">Color</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-bold">{car.color || "N/A"}</span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex justify-between py-4 border-b border-gray-100 md:pr-8">
                    <span className="text-gray-500 text-sm">Seats</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-bold">{car.seats || 5} seats</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-100 md:pl-8">
                    <span className="text-gray-500 text-sm">Transmission</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-bold">{car.transmission || "Automatic"}</span>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex justify-between py-4 border-b border-gray-100 md:pr-8">
                    <span className="text-gray-500 text-sm">Fuel</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-bold">{car.fuel_type || "Gasoline"}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-100 md:pl-8">
                    <span className="text-gray-500 text-sm">Engine</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-bold">{car.engine || "N/A"}</span>
                  </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex justify-between py-4 border-b border-gray-100 md:pr-8">
                    <span className="text-gray-500 text-sm">Stock Number</span>
                    <span className="text-[rgb(5,15,35)] text-sm font-bold">{car.id ? `C25-${car.id.toString().slice(-4)}` : "N/A"}</span>
                  </div>
                  <div className="hidden md:block border-b border-gray-100 md:pl-8">
                    {/* Empty cell for grid balance */}
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-[rgb(5,15,35)] mb-6">
                Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {featuresList.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 p-4 bg-[rgb(250,250,253)] rounded-xl"
                  >
                    <div className="text-gray-400">
                      {getFeatureIcon(feature)}
                    </div>
                    <span className="text-[rgb(5,15,35)] text-sm font-medium">
                      {typeof feature === "string" ? feature : "Feature"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section (Optional if not in design but usually needed) */}
            {car.description && (
               <div className="mb-12">
                 <h3 className="text-xl font-bold text-[rgb(5,15,35)] mb-6">
                   Description
                 </h3>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   {car.description}
                 </p>
               </div>
            )}
          </div>

          {/* Right Column - Pricing and Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              {/* Status Badge */}
              <div className="inline-block bg-[rgb(255,241,224)] text-[rgb(209,102,5)] text-xs font-medium px-3 py-1 rounded-[6px] mb-4">
                {car.status === 'Available' ? 'Available' : car.status}
              </div>

              {/* Car Name */}
              <h1 className="text-2xl font-semibold text-[rgb(5,15,35)] mb-2">
                {car.year} {car.make} {car.model}
              </h1>

              {/* Price */}
              <p className="text-3xl font-bold text-[rgb(5,15,35)] mb-4">
                ${getPrice().toLocaleString()}
              </p>

              {/* Location */}
              <div className="flex flex-col gap-4 mb-6">
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(car.location || "400 Sackville Drive")}`, '_blank')}
                  className="flex items-center gap-3 w-full group"
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#F5F5FF] flex items-center justify-center group-hover:bg-[rgb(139,130,246)] transition-colors">
                    <svg
                      className="w-5 h-5 text-[rgb(139,130,246)] group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Location</p>
                    <p className="text-sm font-bold text-[rgb(5,15,35)] group-hover:text-[rgb(139,130,246)] transition-colors">
                      {car.location || "400 Sackville Drive"}
                    </p>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    const carfaxUrl = (car as any).carfax;
                    if (carfaxUrl) {
                      window.open(carfaxUrl, '_blank');
                    } else {
                      alert("CarFax report is not available for this vehicle.");
                    }
                  }}
                  className="flex items-center gap-3 w-full group"
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#F5F5FF] flex items-center justify-center group-hover:bg-[rgb(139,130,246)] transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgb(139,130,246)] group-hover:text-white transition-colors">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <path d="M16 13H8"/>
                      <path d="M16 17H8"/>
                      <path d="M10 9H8"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Vehicle History</p>
                    <p className="text-sm font-bold text-[rgb(5,15,35)] group-hover:text-[rgb(139,130,246)] transition-colors">
                      View CarFax Report
                    </p>
                  </div>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6 mt-6">
                <button
                  onClick={() => onNavigate('quiz')}
                  className="w-full bg-[rgb(139,130,246)] text-white font-medium py-3 px-4 rounded-[30px] hover:bg-[rgb(120,110,230)] transition-colors text-sm"
                >
                  Get Approval
                </button>
                <button 
                  onClick={() => onNavigate('sell')}
                  className="w-full bg-[rgb(250,250,253)] text-[rgb(139,130,246)] font-medium py-3 px-4 rounded-[30px] hover:bg-gray-100 transition-colors text-sm"
                >
                  Trade-In
                </button>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-transparent rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Price
                  </span>
                  <span className="text-sm font-bold text-[rgb(5,15,35)]">
                    ${getPrice().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Dealer Fee
                  </span>
                  <span className="text-sm font-bold text-[rgb(5,15,35)]">
                    ${getFees()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Tax Fee
                  </span>
                  <span className="text-sm font-bold text-[rgb(5,15,35)]">
                    {getTax()}%
                  </span>
                </div>
              </div>
              
              <div className="h-px bg-gray-100 my-4"></div>

              {/* Total with Fees */}
              <div className="bg-transparent rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[rgb(139,130,246)]">
                    Total cash price
                  </span>
                  <span className="text-lg font-bold text-[rgb(139,130,246)]">
                    ${(getPrice() + getFees()).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Book Test Drive */}
              <button 
                onClick={() => setIsTestDriveModalOpen(true)}
                className="w-full bg-[rgb(139,130,246)] text-white font-medium py-3 px-6 rounded-[30px] hover:bg-[rgb(120,110,230)] transition-colors mb-6 shadow-[0px_10px_20px_0px_rgba(139,130,246,0.3)]"
              >
                Book a Test Drive
              </button>

              {/* Equifax Banner */}
              <div className="relative rounded-[10px] overflow-hidden">
                 <img 
                   src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                   className="w-full h-24 object-cover opacity-20 bg-[rgb(139,130,246)]"
                   alt="Equifax"
                 />
                 <div className="absolute inset-0 bg-[rgb(139,130,246)]/90 flex flex-col justify-center px-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white text-xs font-medium">We make car loans easy.</p>
                        <p className="text-white text-xs font-bold">The first step, know your score!</p>
                      </div>
                      <button className="bg-white text-[rgb(5,15,35)] text-[10px] font-bold py-1 px-3 rounded shadow">
                        GET YOUR FREE SCORE
                      </button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="mt-16 text-center py-16 bg-[rgb(250,250,253)] rounded-[32px]">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            GET A FEEDBACK
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[rgb(5,15,35)] mb-8 max-w-xl mx-auto leading-tight">
            Have a questions about this vehicle?
          </h2>
          <button 
            onClick={() => onNavigate('contacts')}
            className="bg-[rgb(139,130,246)] text-white font-medium py-3 px-8 rounded-[30px] hover:bg-[rgb(120,110,230)] transition-colors inline-flex items-center gap-2 shadow-[0px_10px_20px_0px_rgba(139,130,246,0.3)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Get in Touch
          </button>
        </div>

        {/* Explore Other Cars */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[rgb(5,15,35)] text-center mb-8">
            Explore other cars
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedCars.map((recCar) => (
              <ShopCarCard
                key={recCar.id}
                car={recCar}
                onClick={() => onNavigate(`car-${recCar.id}`, recCar.id)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Test Drive Modal */}
      {car && (
        <BookTestDriveModal 
          car={car} 
          isOpen={isTestDriveModalOpen} 
          onClose={() => setIsTestDriveModalOpen(false)} 
        />
      )}
    </div>
  );
}
