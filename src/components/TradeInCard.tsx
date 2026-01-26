import React from 'react';
import { RefreshCw } from 'lucide-react';

export function TradeInCard() {
  return (
    <div className="flex flex-col justify-center items-center text-center p-6 h-full min-h-[300px] rounded-[24px] bg-[#F5F5FA] isolate">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-[#EBEBF9] flex items-center justify-center mb-6 text-[#8B82F6]">
        <RefreshCw className="w-6 h-6" />
      </div>

      {/* Content */}
      <h3 className="text-[rgb(5,_15,_35)] text-[20px] font-bold mb-2">
        Trade your car
      </h3>
      <p className="text-[rgb(5,_15,_35)] opacity-60 text-sm mb-8">
        Save your time and money
      </p>

      {/* Button */}
      <button className="w-full py-3 bg-[#8B82F6] hover:bg-[#7a71e6] text-white rounded-full font-semibold transition-colors">
        Trade In
      </button>
    </div>
  );
}