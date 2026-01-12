import React from 'react';

export const Icons = {
  ArrowRight: ({ className = "w-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  ArrowRightWhite: ({ className = "w-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  Location: ({ className = "w-[15px]" }: { className?: string }) => (
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
  
  Brand: ({ className = "w-[15px] opacity-[0.3]" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="16" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 6V4C6 2.89543 6.89543 2 8 2H12C13.1046 2 14 2.89543 14 4V6" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
    </svg>
  ),
  
  Type: ({ className = "w-[15px] opacity-[0.3]" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12L6 8L8 6L16 6L18 10L18 14L4 14Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="14" r="1.5" fill="currentColor"/>
    </svg>
  ),
  
  Calendar: ({ className = "w-[15px] opacity-[0.3]" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 8H17M7 2V6M13 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  
  Dollar: ({ className = "w-[15px] opacity-[0.3]" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 1V19M6 5H12C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11H6M6 11H12C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  
  Gauge: ({ className = "w-[15px] opacity-[0.3]" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  
  More: ({ className = "w-[15px] opacity-[0.3]" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="4" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
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

// Реальні фото автомобілів з Unsplash
export const CarImages = {
  shop: 'https://images.unsplash.com/photo-1669606070146-84c7f32ebc34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY4MjAyNjg0fDA&ixlib=rb-4.1.0&q=80&w=400',
  sell: 'https://images.unsplash.com/photo-1620444862038-768dbcfdaec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtb25leSUyMHNlbGwlMjB0cmFkZXxlbnwxfHx8fDE3NjgyMzMzOTF8MA&ixlib=rb-4.1.0&q=80&w=400',
  sedan: 'https://images.unsplash.com/photo-1677522375397-b7a40324dfb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhciUyMHNpZGUlMjB2aWV3fGVufDF8fHx8MTc2ODIwMTAwNXww&ixlib=rb-4.1.0&q=80&w=300',
  suv: 'https://images.unsplash.com/photo-1653325189816-5d8dc746cc16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTVVYlMjBjYXIlMjBzaWRlJTIwdmlld3xlbnwxfHx8fDE3NjgyMDEwMTB8MA&ixlib=rb-4.1.0&q=80&w=300',
  hatchback: 'https://images.unsplash.com/photo-1627280052756-cc5e080c8458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXRjaGJhY2slMjBjYXJ8ZW58MXx8fHwxNzY4MTMyMTc0fDA&ixlib=rb-4.1.0&q=80&w=300',
  truck: 'https://images.unsplash.com/photo-1767310621192-177f9713144f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWNrdXAlMjB0cnVjayUyMHNpZGV8ZW58MXx8fHwxNzY4MjMzMzkzfDA&ixlib=rb-4.1.0&q=80&w=300',
  van: 'https://images.unsplash.com/photo-1755805872526-1372a9d54a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pdmFuJTIwY2FyfGVufDF8fHx8MTc2ODIzMzM5Nnww&ixlib=rb-4.1.0&q=80&w=300',
  coupe: 'https://images.unsplash.com/photo-1696581084151-8a038c7dfc83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwZSUyMHNwb3J0cyUyMGNhcnxlbnwxfHx8fDE3NjgxNDgwMjB8MA&ixlib=rb-4.1.0&q=80&w=300',
};

// Логотипи брендів (SVG)
export const BrandLogos = {
  Toyota: ({ className = "w-16 md:w-20 h-auto" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="40" rx="16" ry="10" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
      <ellipse cx="40" cy="40" rx="24" ry="14" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
      <ellipse cx="40" cy="40" rx="10" ry="16" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
      <ellipse cx="40" cy="40" rx="14" ry="24" stroke="#1A1A1A" strokeWidth="2" fill="none"/>
    </svg>
  ),
  
  Honda: ({ className = "w-16 md:w-20 h-auto" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 25 V55 M60 25 V55 M20 40 H32 M48 40 H60 M32 25 V55 M48 25 V55" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  Ford: ({ className = "w-16 md:w-20 h-auto" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="40" rx="30" ry="18" fill="#003478"/>
      <text x="40" y="47" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">FORD</text>
    </svg>
  ),
  
  Nissan: ({ className = "w-16 md:w-20 h-auto" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="25" stroke="#C3002F" strokeWidth="3" fill="none"/>
      <rect x="22" y="35" width="36" height="10" rx="2" fill="#C3002F"/>
    </svg>
  ),
  
  Hyundai: ({ className = "w-16 md:w-20 h-auto" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="40" rx="28" ry="20" stroke="#002C5F" strokeWidth="3" fill="none"/>
      <path d="M25 40 Q32 28, 40 40 T55 40" stroke="#002C5F" strokeWidth="3" fill="none"/>
    </svg>
  ),
  
  Chevrolet: ({ className = "w-16 md:w-20 h-auto" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 20 L55 32 L50 42 L40 38 L30 42 L25 32 Z" fill="#C8A96E"/>
      <path d="M40 45 L55 57 L50 67 L40 63 L30 67 L25 57 Z" fill="#C8A96E"/>
    </svg>
  ),
};
