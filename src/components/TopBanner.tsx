import React from 'react';

export function TopBanner() {
  return (
    <section className="bg-[rgb(139,_130,_246)] py-2">
      <div className="w-full max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]">
        <div className="items-center flex justify-center gap-[10px] text-center">
          <div className="text-white text-sm md:text-[14.4px]">New vehicles every week!</div>
          <a href="#" className="flex items-center gap-[6px]">
            <div className="font-semibold text-white text-sm md:text-[14.4px]">Browse</div>
            <img alt="Arrow" src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fc57b1155479db3653749654cf951ecb5cc28a2bb.svg?generation=1768065159966652&alt=media" className="w-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
