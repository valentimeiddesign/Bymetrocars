import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  page?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (page: string) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  if (typeof window !== 'undefined' && window.location.pathname === '/') {
    return null;
  }

  return (
    <div className="bg-[rgb(250,250,253)]">
      <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button 
            onClick={() => onNavigate("home")} 
            className="hover:text-[rgb(139,130,246)] transition-colors"
          >
            Home
          </button>
          
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="w-4 h-4" />
              {index === items.length - 1 ? (
                <span className="text-[rgb(5,15,35)] font-medium truncate">
                  {item.label}
                </span>
              ) : (
                <button 
                  onClick={() => item.onClick ? item.onClick() : item.page && onNavigate(item.page)} 
                  className="hover:text-[rgb(139,130,246)] transition-colors"
                >
                  {item.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}
