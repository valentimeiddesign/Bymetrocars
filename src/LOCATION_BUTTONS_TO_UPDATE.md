# Location Buttons to Update

Замінити на всіх сторінках (окрім Home - вже оновлено):

**Pattern to find:**
```tsx
<button className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]">
  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6b77703cfdffe9b344c4b64a93c5913b0635893f.svg?generation=1768065159967914&alt=media" className="w-[15px]" alt="" />
  <span>Location</span>
</button>
```

**Replace with:**
```tsx
<LocationDropdown
  locations={locations}
  selectedLocation={selectedLocation}
  locationMenuOpen={locationMenuOpen}
  setLocationMenuOpen={setLocationMenuOpen}
  setSelectedLocation={setSelectedLocation}
  allCars={allHomeCars}
/>
```

Locations found at lines:
- 189 (Shop Cars page)
- 289 (Sell/Trade page)
- 384 (Financing page)
- 479 (About Us page)
- 574 (Contacts page)
- 672 (Locations page)
- 770 (Vacancies page)
- 868 (Quiz page)
- 966 (CarDetails page)
