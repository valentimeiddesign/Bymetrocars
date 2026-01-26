import React from 'react';
import imgNissanLogo from "figma:asset/2ea45d7e04c9c673edc6dca4e39cb88fd82bef8f.png";
import imgDodgeLogo from "figma:asset/72765622bb165dfdbac3b1184674281e3ad57a98.png";
import imgJeepLogo from "figma:asset/93599331c27c183974e07c7b8711dc786092acc1.png";
import imgChryslerLogo from "figma:asset/615185059266e399b9e8b101050e467826d5e9b7.png";
import imgFordLogo from "figma:asset/90198f2ec314dfc464a44c45b103bcceb339008d.png";
import imgToyotaLogo from "figma:asset/e97faa84609add6cb2cb6f6024ba108cd41ff545.png";

export function PopularBrands() {
  const brands = [
    { name: 'Nissan', logo: imgNissanLogo },
    { name: 'Dodge', logo: imgDodgeLogo },
    { name: 'Jeep', logo: imgJeepLogo },
    { name: 'Chrysler', logo: imgChryslerLogo },
    { name: 'Ford', logo: imgFordLogo },
    { name: 'Toyota', logo: imgToyotaLogo },
  ];

  return (
    <section className="py-16 bg-[rgb(250,_250,_253)]">
      <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32">
        <h2 className="text-2xl font-bold mb-8 text-[rgb(5,_15,_35)]">Popular Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <div key={brand.name} className="bg-white rounded-xl p-6 flex items-center justify-center h-[120px] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}