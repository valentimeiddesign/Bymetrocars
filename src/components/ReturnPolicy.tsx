import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { TopBanner } from './TopBanner';
import { Header } from './Header';
import { Footer } from './Footer';

interface ReturnPolicyProps {
  onNavigate: (page: string) => void;
}

export function ReturnPolicy({ onNavigate }: ReturnPolicyProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[rgb(250,250,253)]">
      <Breadcrumbs 
        items={[{ label: 'Return Policy' }]} 
        onNavigate={onNavigate} 
      />
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 lg:px-20 2xl:px-32 py-20 text-center">
        <h1 className="text-[32px] md:text-[42px] font-bold text-[rgb(5,15,35)] mb-6">
          Purchasing and Return Policy
        </h1>
        
        <p className="max-w-[800px] text-[16px] md:text-[18px] text-[rgb(5,15,35)] leading-relaxed opacity-[0.8] mb-10">
          Buy Metro Pre-Owned exclusively sells pre-owned vehicles, and all sales are final. We do not accept returns or offer refunds on vehicle purchases. Deposits made to hold a vehicle are non-refundable unless we are unable to secure financing approval for your loan. To help ensure customer confidence, we offer extended warranty options on all our vehicles. If you have questions about warranty coverage or concerns regarding your vehicle, please don’t hesitate to contact us.
        </p>
        
        <button 
          onClick={() => onNavigate('home')}
          className="bg-[rgb(139,130,246)] text-white font-medium py-3 px-8 rounded-[30px] hover:bg-[rgb(120,110,230)] transition-colors text-[16px]"
        >
          Go to Main Page
        </button>
      </div>
    </div>
  );
}