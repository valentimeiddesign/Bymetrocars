import React from 'react';

export const Icons = {
  ArrowRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  Location: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 10C11.1046 10 12 9.10457 12 8C12 6.89543 11.1046 6 10 6C8.89543 6 8 6.89543 8 8C8 9.10457 8.89543 10 10 10Z" fill="currentColor"/>
      <path d="M10 2C6.68629 2 4 4.68629 4 8C4 12 10 18 10 18C10 18 16 12 16 8C16 4.68629 13.3137 2 10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  Search: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  Filter: ({ className = "w-[15px]" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4H18M5 10H15M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  Facebook: ({ className = "w-[25px]" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  ),
  
  Instagram: ({ className = "w-[25px]" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  
  ChevronDown: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export const CarTypeIcons = {
  Sedan: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 60 L25 50 L30 45 L70 45 L75 50 L80 60 L80 70 L20 70 Z" fill="#8B82F6" opacity="0.2"/>
      <path d="M20 60 L25 50 L30 45 L70 45 L75 50 L80 60" stroke="#8B82F6" strokeWidth="2" fill="none"/>
      <rect x="20" y="60" width="60" height="10" fill="#8B82F6" opacity="0.3"/>
      <circle cx="30" cy="70" r="5" fill="#1A1A1A"/>
      <circle cx="70" cy="70" r="5" fill="#1A1A1A"/>
      <rect x="35" y="47" width="12" height="8" fill="#8B82F6" opacity="0.4"/>
      <rect x="53" y="47" width="12" height="8" fill="#8B82F6" opacity="0.4"/>
    </svg>
  ),
  
  SUV: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 55 L25 45 L30 40 L70 40 L75 45 L80 55 L80 70 L20 70 Z" fill="#8B82F6" opacity="0.2"/>
      <path d="M20 55 L25 45 L30 40 L70 40 L75 45 L80 55" stroke="#8B82F6" strokeWidth="2" fill="none"/>
      <rect x="20" y="55" width="60" height="15" fill="#8B82F6" opacity="0.3"/>
      <circle cx="30" cy="70" r="6" fill="#1A1A1A"/>
      <circle cx="70" cy="70" r="6" fill="#1A1A1A"/>
      <rect x="33" y="42" width="14" height="10" fill="#8B82F6" opacity="0.4"/>
      <rect x="53" y="42" width="14" height="10" fill="#8B82F6" opacity="0.4"/>
    </svg>
  ),
  
  Hatchback: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 58 L30 48 L35 45 L65 45 L65 58 L75 58 L75 68 L25 68 Z" fill="#8B82F6" opacity="0.2"/>
      <path d="M25 58 L30 48 L35 45 L65 45 L65 58" stroke="#8B82F6" strokeWidth="2" fill="none"/>
      <rect x="25" y="58" width="50" height="10" fill="#8B82F6" opacity="0.3"/>
      <circle cx="33" cy="68" r="5" fill="#1A1A1A"/>
      <circle cx="67" cy="68" r="5" fill="#1A1A1A"/>
      <rect x="38" y="47" width="10" height="8" fill="#8B82F6" opacity="0.4"/>
      <rect x="52" y="47" width="10" height="8" fill="#8B82F6" opacity="0.4"/>
    </svg>
  ),
  
  Truck: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="45" width="25" height="20" fill="#8B82F6" opacity="0.3"/>
      <rect x="45" y="50" width="35" height="15" fill="#8B82F6" opacity="0.2"/>
      <path d="M20 55 L25 45 L35 45 L40 50 L45 50" stroke="#8B82F6" strokeWidth="2" fill="none"/>
      <rect x="28" y="47" width="10" height="8" fill="#8B82F6" opacity="0.4"/>
      <circle cx="32" cy="70" r="6" fill="#1A1A1A"/>
      <circle cx="72" cy="70" r="6" fill="#1A1A1A"/>
      <rect x="20" y="65" width="60" height="5" fill="#8B82F6" opacity="0.3"/>
    </svg>
  ),
  
  VAN: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="40" width="60" height="25" rx="2" fill="#8B82F6" opacity="0.2"/>
      <path d="M20 55 L25 40 L75 40 L80 55" stroke="#8B82F6" strokeWidth="2" fill="none"/>
      <rect x="20" y="55" width="60" height="10" fill="#8B82F6" opacity="0.3"/>
      <circle cx="30" cy="68" r="5" fill="#1A1A1A"/>
      <circle cx="70" cy="68" r="5" fill="#1A1A1A"/>
      <rect x="28" y="43" width="10" height="10" fill="#8B82F6" opacity="0.4"/>
      <rect x="42" y="43" width="10" height="10" fill="#8B82F6" opacity="0.4"/>
      <rect x="56" y="43" width="10" height="10" fill="#8B82F6" opacity="0.4"/>
    </svg>
  ),
  
  Coupe: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 62 L28 52 L35 48 L65 50 L72 54 L78 62 L78 68 L22 68 Z" fill="#8B82F6" opacity="0.2"/>
      <path d="M22 62 L28 52 L35 48 L65 50 L72 54 L78 62" stroke="#8B82F6" strokeWidth="2" fill="none"/>
      <rect x="22" y="62" width="56" height="6" fill="#8B82F6" opacity="0.3"/>
      <circle cx="32" cy="70" r="5" fill="#1A1A1A"/>
      <circle cx="68" cy="70" r="5" fill="#1A1A1A"/>
      <rect x="38" y="50" width="10" height="7" fill="#8B82F6" opacity="0.4"/>
      <rect x="52" y="52" width="10" height="7" fill="#8B82F6" opacity="0.4"/>
    </svg>
  ),
};

export const BrandLogos = {
  Toyota: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="40" rx="16" ry="10" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
      <ellipse cx="40" cy="40" rx="24" ry="14" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
      <ellipse cx="40" cy="40" rx="10" ry="16" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
      <ellipse cx="40" cy="40" rx="14" ry="24" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
    </svg>
  ),
  
  Honda: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 25 V55 M60 25 V55 M20 40 H32 M48 40 H60 M32 25 V55 M48 25 V55" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  Ford: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="40" rx="30" ry="18" fill="#1A1A1A"/>
      <text x="40" y="47" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">FORD</text>
    </svg>
  ),
  
  Nissan: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="25" stroke="#1A1A1A" strokeWidth="3" fill="none"/>
      <rect x="25" y="35" width="30" height="10" fill="#1A1A1A"/>
      <text x="40" y="43" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">NISSAN</text>
    </svg>
  ),
  
  Hyundai: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="40" rx="28" ry="20" stroke="#1A1A1A" strokeWidth="3" fill="none"/>
      <path d="M25 40 Q32 25, 40 40 T55 40" stroke="#1A1A1A" strokeWidth="3" fill="none"/>
    </svg>
  ),
  
  Chevrolet: ({ className = "w-16 md:w-20" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 20 L55 35 L50 45 L40 40 L30 45 L25 35 Z" fill="#1A1A1A"/>
      <path d="M40 45 L55 60 L50 70 L40 65 L30 70 L25 60 Z" fill="#1A1A1A"/>
    </svg>
  ),
};
