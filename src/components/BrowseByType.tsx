import React from 'react';
import imgFordSedan from "figma:asset/62436b94333b992271b2bd63a2d69bb6c9ee5f70.png";
import imgSUV from "figma:asset/71af0fa3a4b700260f35013dcb6a6592ecc75611.png";
import imgHatchback from "figma:asset/e94f7dcc213925d5d4aebb0e17925a4a70e66139.png";
import imgTruck from "figma:asset/cd2eb872b42b5e9801120c8e75a8370637bdc5b0.png";
import imgCoupe from "figma:asset/42cab77d70c9ce4384e58dbdbc3596e2fd093453.png";
import imgVAN from "figma:asset/4b62f68fb822a2364522d1cdabaf969ad53d4d90.png";

export function BrowseByType() {
  const types = [
    { name: 'Sedan', image: imgFordSedan },
    { name: 'SUV', image: imgSUV },
    { name: 'Hatchback', image: imgHatchback },
    { name: 'Truck', image: imgTruck },
    { name: 'Coupe', image: imgCoupe },
    { name: 'VAN', image: imgVAN },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
        <h2 className="text-2xl font-bold mb-8 text-[rgb(5,_15,_35)]">Browse by Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {types.map((type) => (
            <div key={type.name} className="flex flex-col items-center group cursor-pointer">
              <div className="w-full aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-4 transition-transform group-hover:scale-105">
                <img src={type.image} alt={type.name} className="w-full h-full object-contain" />
              </div>
              <span className="font-semibold text-[rgb(5,_15,_35)] group-hover:text-[rgb(139,_130,_246)] transition-colors">
                {type.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}