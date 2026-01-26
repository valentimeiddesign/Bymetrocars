import React from 'react';
import { RefreshCw } from 'lucide-react';

export function TradeInBanner() {
  return (
    <div className="h-full min-h-[380px] w-full bg-[#F5F6FF] rounded-[24px] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-[#EBEBFF] rounded-full flex items-center justify-center mb-6">
        <RefreshCw className="w-8 h-8 text-[#8B82F6]" />
      </div>
      
      <h3 className="text-[rgb(5,_15,_35)] text-[22px] font-bold mb-2">
        Trade your car
      </h3>
      
      <p className="text-[rgb(5,_15,_35)] text-[16px] opacity-60 mb-8">
        Save your time and money
      </p>
      
      <button className="w-full max-w-[200px] bg-[#8B82F6] text-white font-bold py-3 px-6 rounded-full hover:bg-[#7a71e8] transition-colors">
        Trade In
      </button>
    </div>
  );
}
