import React, { useState, useEffect } from "react";
import { ShopCars } from "./components/ShopCars";
import { SellTrade } from "./components/SellTrade";
import { Financing } from "./components/Financing";
import { AboutUs } from "./components/AboutUs";
import { Contacts } from "./components/Contacts";
import { Locations } from "./components/Locations";
import { Vacancies } from "./components/Vacancies";
import { TopBanner } from "./components/TopBanner";
import { Quiz } from "./components/Quiz";
import { ReturnPolicy } from "./components/ReturnPolicy";
import { AdminLogin } from "./components/AdminLogin";
import { AdminPanel } from "./components/AdminPanel";
import { CarDetails } from "./components/CarDetails";
import { ApiDataDemo } from "./components/ApiDataDemo";
import {
  Icons,
  CarImages,
  BrandLogos,
} from "./components/Icons";
import { Footer } from "./components/Footer";
import { LocationDropdown } from "./components/LocationDropdown";
import { Header } from "./components/Header";
import { BrowseByType } from "./components/BrowseByType";
import { PopularBrands } from "./components/PopularBrands";
import {
  HomeAbout,
  HomeLending,
  HomeCTA,
} from "./components/HomeInfoSections";
import { fetchAllCars } from "./utils/carApi";
import type { Car } from "./types/car";
import { AnalyticsScripts } from "./components/AnalyticsScripts";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] =
    useState(false);
  const [currentCarId, setCurrentCarId] = useState<
    string | null
  >(null);

  // Supabase data state
  const [allHomeCars, setAllHomeCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<
    string | null
  >(null);
  const [locationMenuOpen, setLocationMenuOpen] =
    useState(false);

  // Available locations
  const locations = [
    "332 Sackville Drive",
    "400 Sackville Drive",
    "Buy Metro",
    "Phillips Auto",
    "Mount Uniacke",
    "Lower Sackville",
    "Truro",
  ];

  // Handle URL path and query parameters on initial load
  useEffect(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    // Simple path based routing
    // Remove trailing slash if present for consistent matching
    const cleanPath =
      path === "/" ? "/" : path.replace(/\/$/, "");

    if (cleanPath === "/admin") {
      setCurrentPage("admin");
    } else if (cleanPath === "/shop") {
      setCurrentPage("shop");
    } else if (cleanPath === "/sell") {
      setCurrentPage("sell");
    } else if (cleanPath === "/financing") {
      setCurrentPage("financing");
    } else if (cleanPath === "/about") {
      setCurrentPage("about");
    } else if (cleanPath === "/contacts") {
      setCurrentPage("contacts");
    } else if (cleanPath === "/locations") {
      setCurrentPage("locations");
    } else if (cleanPath === "/vacancies") {
      setCurrentPage("vacancies");
    } else if (cleanPath === "/quiz") {
      setCurrentPage("quiz");
    } else if (cleanPath === "/policy") {
      setCurrentPage("policy");
    } else if (cleanPath === "/api/cars") {
      setCurrentPage("api/cars");
    } else {
      // Fallback to query params
      const page = params.get("page");
      if (page) {
        setCurrentPage(page);
      }
    }

    const carId = params.get("carId");
    if (carId) {
      setCurrentCarId(carId);
    }
  }, []);

  // Load cars from Supabase on mount
  useEffect(() => {
    loadCarsFromDatabase();
  }, []);

  const loadCarsFromDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("🔄 Loading cars from Supabase...");
      const cars = await fetchAllCars();
      console.log("✅ Cars loaded:", cars.length);

      // Convert Car type to old format for compatibility
      const convertedCars = cars.map(
        (car: Car, index: number) => ({
          id: car.id || `car-${index}-${Date.now()}`,
          name: `${car.year || ""} ${car.make || ""} ${car.model || ""}`.trim(),
          price: Number(car.price) || 0,
          mileage: Number(car.mileage) || 0,
          image: car.image
            ? car.image
            : car.images?.[0] ||
              "https://images.unsplash.com/photo-1605152277138-359efd4a6862?w=800",
          status: car.status || "Available",
          location: car.location || "332 Sackville Drive",
          // Preserve other fields if needed by ShopCars filters
          year: car.year,
          make: car.make,
          model: car.model,
          type: car.body_type, // Assuming body_type maps to type
          transmission: car.transmission,
          fuel_type: car.fuel_type,
          drivetrain: car.drivetrain,
          images: car.images,
        }),
      );

      setAllHomeCars(convertedCars);
    } catch (err) {
      console.error("❌ Error loading cars:", err);
      setError("Failed to load cars from database");
      // Keep mock data as fallback
      setAllHomeCars([
        {
          id: 1,
          name: "2019 VOLKSWAGEN JETTA HIGHLINE 4WD",
          price: 19900,
          mileage: 89500,
          image:
            "https://images.unsplash.com/photo-1605152277138-359efd4a6862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xrc3dhZ2VuJTIwY2FyJTIwZGVhbGVyc2hpcHxlbnwxfHx8fDE3NjgwNjc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
          status: "Available",
          location: "332 Sackville Drive",
        },
        {
          id: 2,
          name: "2014 Ram 1500 ST 4WD Crew Cab 5.7 ft",
          price: 26880,
          mileage: 145000,
          image:
            "https://images.unsplash.com/photo-1761604771236-ee674782fe28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjB0cnVjayUyMGRlYWxlcnNoaXB8ZW58MXx8fHwxNzY4MDY3OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
          status: "Pending",
          location: "400 Sackville Drive",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filter cars by location if selected
  const filteredHomeCars = selectedLocation
    ? allHomeCars.filter(
        (car) => car.location === selectedLocation,
      )
    : allHomeCars;

  const navigateTo = (
    page: string,
    carId?: string | number,
  ) => {
    setCurrentPage(page);
    if (carId !== undefined) {
      setCurrentCarId(String(carId));
    }
    setMobileMenuOpen(false);
    setCompanyMenuOpen(false);
    window.scrollTo(0, 0);

    // Update URL to clean path without reloading
    const url = new URL(window.location.href);

    // Set pathname based on page
    if (page === "home") {
      url.pathname = "/";
    } else {
      url.pathname = `/${page}`;
    }

    // Handle carId param
    if (carId !== undefined) {
      url.searchParams.set("carId", String(carId));
    } else {
      url.searchParams.delete("carId");
    }

    // Clear legacy page param
    url.searchParams.delete("page");

    window.history.pushState({}, "", url.toString());
  };

  // Render Admin Login if accessing admin route and not authenticated
  if (currentPage === "admin" && !isAdminAuthenticated) {
    return (
      <AdminLogin
        onLogin={() => setIsAdminAuthenticated(true)}
      />
    );
  }

  // Render Admin Panel if authenticated
  if (currentPage === "admin" && isAdminAuthenticated) {
    return (
      <AdminPanel
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setCurrentPage("home");
        }}
      />
    );
  }

  // Render Car Details page if that's the current page
  if (currentPage.startsWith("car-") && currentCarId !== null) {
    return (
      <div className="min-h-screen w-full bg-white">
        <AnalyticsScripts />
        <div
          className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          <TopBanner />
          <Header
            currentPage={currentPage}
            onNavigate={navigateTo}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            companyMenuOpen={companyMenuOpen}
            setCompanyMenuOpen={setCompanyMenuOpen}
            locations={locations}
            selectedLocation={selectedLocation}
            locationMenuOpen={locationMenuOpen}
            setLocationMenuOpen={setLocationMenuOpen}
            setSelectedLocation={setSelectedLocation}
            allCars={allHomeCars}
          />
          <CarDetails
            carId={currentCarId}
            onNavigate={navigateTo}
          />
          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Shop Cars page if that's the current page
  if (currentPage === "shop") {
    return (
      <div className="min-h-screen w-full bg-white">
        <AnalyticsScripts />
        <div
          className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          <TopBanner />
          <Header
            currentPage="shop"
            onNavigate={navigateTo}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            companyMenuOpen={companyMenuOpen}
            setCompanyMenuOpen={setCompanyMenuOpen}
            locations={locations}
            selectedLocation={selectedLocation}
            locationMenuOpen={locationMenuOpen}
            setLocationMenuOpen={setLocationMenuOpen}
            setSelectedLocation={setSelectedLocation}
            allCars={allHomeCars}
          />
          <ShopCars
            onNavigate={navigateTo}
            allCars={filteredHomeCars}
            loading={loading}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Sell Trade page if that's the current page
  if (currentPage === "sell") {
    return (
      <div className="min-h-screen w-full bg-white">
        <AnalyticsScripts />
        <div
          className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          <TopBanner />
          <Header
            currentPage="sell"
            onNavigate={navigateTo}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            companyMenuOpen={companyMenuOpen}
            setCompanyMenuOpen={setCompanyMenuOpen}
            locations={locations}
            selectedLocation={selectedLocation}
            locationMenuOpen={locationMenuOpen}
            setLocationMenuOpen={setLocationMenuOpen}
            setSelectedLocation={setSelectedLocation}
            allCars={allHomeCars}
          />
          <SellTrade onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Financing page if that's the current page
  if (currentPage === "financing") {
    return (
      <div className="min-h-screen w-full bg-white">
        <AnalyticsScripts />
        <div
          className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          <TopBanner />
          <Header
            currentPage="financing"
            onNavigate={navigateTo}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            companyMenuOpen={companyMenuOpen}
            setCompanyMenuOpen={setCompanyMenuOpen}
            locations={locations}
            selectedLocation={selectedLocation}
            locationMenuOpen={locationMenuOpen}
            setLocationMenuOpen={setLocationMenuOpen}
            setSelectedLocation={setSelectedLocation}
            allCars={allHomeCars}
          />
          <Financing onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render About Us page
  if (currentPage === "about") {
    return (
      <div className="min-h-screen w-full bg-white">
        <AnalyticsScripts />
        <div
          className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          <TopBanner />
          <Header
            currentPage="about"
            onNavigate={navigateTo}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            companyMenuOpen={companyMenuOpen}
            setCompanyMenuOpen={setCompanyMenuOpen}
            locations={locations}
            selectedLocation={selectedLocation}
            locationMenuOpen={locationMenuOpen}
            setLocationMenuOpen={setLocationMenuOpen}
            setSelectedLocation={setSelectedLocation}
            allCars={allHomeCars}
          />
          <AboutUs onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Contacts page
  if (currentPage === "contacts") {
    return (
      <div className="min-h-screen w-full bg-white">
        <AnalyticsScripts />
        <div
          className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          <TopBanner />
          <Header
            currentPage="contacts"
            onNavigate={navigateTo}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            companyMenuOpen={companyMenuOpen}
            setCompanyMenuOpen={setCompanyMenuOpen}
            locations={locations}
            selectedLocation={selectedLocation}
            locationMenuOpen={locationMenuOpen}
            setLocationMenuOpen={setLocationMenuOpen}
            setSelectedLocation={setSelectedLocation}
            allCars={allHomeCars}
          />
          <Contacts onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Locations page
  if (currentPage === "locations") {
    return (
      <div className="min-h-screen w-full bg-white">
        <AnalyticsScripts />
        <div
          className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          <TopBanner />
          <Header
            currentPage="locations"
            onNavigate={navigateTo}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            companyMenuOpen={companyMenuOpen}
            setCompanyMenuOpen={setCompanyMenuOpen}
            locations={locations}
            selectedLocation={selectedLocation}
            locationMenuOpen={locationMenuOpen}
            setLocationMenuOpen={setLocationMenuOpen}
            setSelectedLocation={setSelectedLocation}
            allCars={allHomeCars}
          />
          <Locations
            onNavigate={navigateTo}
            setSelectedLocation={setSelectedLocation}
          />
          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Vacancies page
  if (currentPage === "vacancies") {
    return (
      <div className="min-h-screen w-full bg-white">
        <AnalyticsScripts />
        <div
          className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          <TopBanner />
          <Header
            currentPage="vacancies"
            onNavigate={navigateTo}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            companyMenuOpen={companyMenuOpen}
            setCompanyMenuOpen={setCompanyMenuOpen}
            locations={locations}
            selectedLocation={selectedLocation}
            locationMenuOpen={locationMenuOpen}
            setLocationMenuOpen={setLocationMenuOpen}
            setSelectedLocation={setSelectedLocation}
            allCars={allHomeCars}
          />
          <Vacancies onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Quiz page
  if (currentPage === "quiz") {
    return (
      <div className="min-h-screen w-full bg-white">
        <AnalyticsScripts />
        <div
          className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          <TopBanner />
          <Header
            currentPage="quiz"
            onNavigate={navigateTo}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            companyMenuOpen={companyMenuOpen}
            setCompanyMenuOpen={setCompanyMenuOpen}
            locations={locations}
            selectedLocation={selectedLocation}
            locationMenuOpen={locationMenuOpen}
            setLocationMenuOpen={setLocationMenuOpen}
            setSelectedLocation={setSelectedLocation}
            allCars={allHomeCars}
          />
          <Quiz onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render Return Policy page
  if (currentPage === "policy") {
    return (
      <div className="min-h-screen w-full bg-white">
        <AnalyticsScripts />
        <div
          className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          <TopBanner />
          <Header
            currentPage="policy"
            onNavigate={navigateTo}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            companyMenuOpen={companyMenuOpen}
            setCompanyMenuOpen={setCompanyMenuOpen}
            locations={locations}
            selectedLocation={selectedLocation}
            locationMenuOpen={locationMenuOpen}
            setLocationMenuOpen={setLocationMenuOpen}
            setSelectedLocation={setSelectedLocation}
            allCars={allHomeCars}
          />
          <ReturnPolicy onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    );
  }

  // Render API Data Demo page
  if (currentPage === "api/cars") {
    return (
      <div className="min-h-screen w-full bg-white">
        <AnalyticsScripts />
        <ApiDataDemo />
      </div>
    );
  }

  // Home page (default)
  return (
    <div className="min-h-screen w-full bg-white">
      <AnalyticsScripts />
      <div
        className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]"
        style={{ fontFamily: "Figtree, sans-serif" }}
      >
        <TopBanner />

        <Header
          currentPage="home"
          onNavigate={navigateTo}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          companyMenuOpen={companyMenuOpen}
          setCompanyMenuOpen={setCompanyMenuOpen}
          locations={locations}
          selectedLocation={selectedLocation}
          locationMenuOpen={locationMenuOpen}
          setLocationMenuOpen={setLocationMenuOpen}
          setSelectedLocation={setSelectedLocation}
          allCars={allHomeCars}
        />

        {/* Hero Section */}
        <section
          className="py-4"
          style={{
            backgroundImage:
              "linear-gradient(rgb(250, 250, 253), rgba(250, 250, 253, 0))",
          }}
        >
          <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32 pt-[24px] bg-[rgba(248,248,252,0)]">
            {/* Financing & Trade-in Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-4">
              {/* Financing Card */}
              <div
                onClick={() => navigateTo("financing")}
                className="bg-[rgb(139,_130,_246)] rounded-[0.9375rem] p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <h3 className="text-[32px] font-bold text-white mb-4">
                    Financing
                  </h3>
                  <p className="text-white text-lg leading-normal max-w-md">
                    Great loan options are waiting for you. Know
                    if you qualify before you buy.
                  </p>
                </div>

                <div className="flex items-end justify-between mt-8">
                  <div className="flex flex-col items-start">
                    <div className="text-sm text-white/80 italic mb-4">
                      This will NOT impact your Credit
                    </div>
                    <div className="bg-white text-[rgb(139,_130,_246)] px-6 py-3 rounded-full font-bold text-[16px] hover:bg-gray-50 transition-colors">
                      Get Your Free Score
                    </div>
                  </div>
                  <div className="bg-white px-4 py-2 rounded border border-gray-200 mb-1">
                    <span
                      className="text-[#D82C2C] font-bold tracking-wider text-xl"
                      style={{ fontFamily: "serif" }}
                    >
                      EQUIFAX
                    </span>
                  </div>
                </div>
              </div>

              {/* Trade-in Card */}
              <div
                onClick={() => navigateTo("sell")}
                className="rounded-[0.9375rem] p-8 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between min-h-[280px] border border-[rgba(139,_130,_246,_0.06)]"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, rgba(139, 130, 246, 0.05), rgba(139, 130, 246, 0.1))",
                }}
              >
                <div>
                  <h3 className="text-[32px] font-bold text-[rgb(5,_15,_35)] mb-4">
                    Trade-in
                  </h3>
                  <p className="text-[rgb(5,_15,_35)] text-lg">
                    Just in a few clicks.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo("sell");
                    }}
                    className="bg-[rgb(139,_130,_246)] text-white px-6 py-3 rounded-full font-bold text-[16px] hover:bg-[rgb(124,_116,_220)] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    Get Started
                    <Icons.ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop Cars Section (replaces duplicate hero and search) */}
        <ShopCars
          onNavigate={navigateTo}
          allCars={filteredHomeCars}
          loading={loading}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        <BrowseByType />
        <PopularBrands />
        <HomeAbout />
        <HomeLending />
        <HomeCTA onNavigate={navigateTo} />

        <Footer onNavigate={navigateTo} />
      </div>
    </div>
  );
}