import React from 'react';
import { Icons } from './Icons';

export function LocationButton() {
  return (
    <button className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]">
      <Icons.Location />
      <span>Location</span>
    </button>
  );
}
