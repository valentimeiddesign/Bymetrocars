# Location Filter Implementation Plan

## Changes needed:

###  1. Add State Variables (after line 57 in App.tsx):
```typescript
const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
const [locationMenuOpen, setLocationMenuOpen] = useState(false);
```

### 2. Add Locations Array (after line 59):
```typescript
const locations = [
  '332 Sackville Drive',
  '400 Sackville Drive',
  'Buy Metro',
  'Phillips Auto',
  'Mount Uniacke',
  'Lower Sackville',
  'Truro'
];
```

### 3. Add location field to all car objects:
- Distribute locations across cars (cycling through locations array)

### 4. Add Location Dropdown Menu to Navigation:
Replace Location button with:
```typescript
<div className="relative">
  <button 
    onClick={() => setLocationMenuOpen(!locationMenuOpen)}
    className="flex items-center font-medium justify-center bg-[rgba(139,_130,_246,_0.15)] text-[rgb(139,_130,_246)] text-[16px] gap-[5px] py-[11px] px-[15px] rounded-full hover:bg-[rgba(139,_130,_246,_0.25)]"
  >
    <Icons.Location />
    <span>{selectedLocation || 'Location'}</span>
    <Icons.ChevronDown className="w-4 h-4" />
  </button>
  
  {locationMenuOpen && (
    <>
      <div 
        className="fixed inset-0 z-[998]" 
        onClick={() => setLocationMenuOpen(false)}
      />
      <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-[999]">
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="text-sm font-semibold text-[rgb(5,_15,_35)]">Select Location</p>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {locations.map((location) => {
            const carsInLocation = allHomeCars.filter(car => car.location === location).length;
            return (
              <button
                key={location}
                onClick={() => {
                  setSelectedLocation(location);
                  setLocationMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                  selectedLocation === location ? 'bg-[rgba(139,_130,_246,_0.1)]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[16px] ${
                    selectedLocation === location 
                      ? 'text-[rgb(139,_130,_246)] font-semibold' 
                      : 'text-[rgb(5,_15,_35)]'
                  }`}>
                    {location}
                  </span>
                  <span className="text-sm text-gray-500">{carsInLocation} cars</span>
                </div>
              </button>
            );
          })}
        </div>
        {selectedLocation && (
          <div className="px-4 py-2 border-t border-gray-100">
            <button
              onClick={() => {
                setSelectedLocation(null);
                setLocationMenuOpen(false);
              }}
              className="text-sm text-[rgb(139,_130,_246)] hover:text-[rgb(129,_120,_236)] font-semibold"
            >
              Clear Location
            </button>
          </div>
        )}
      </div>
    </>
  )}
</div>
```

### 5. Filter cars by location in Featured Cars section:
```typescript
// Filter by location if selected
const filteredHomeCars = selectedLocation 
  ? allHomeCars.filter(car => car.location === selectedLocation)
  : allHomeCars;

const totalHomePages = Math.ceil(filteredHomeCars.length / homeItemsPerPage);
const startHomeIndex = (currentHomePage - 1) * homeItemsPerPage;
const endHomeIndex = startHomeIndex + homeItemsPerPage;
const currentHomeCars = filteredHomeCars.slice(startHomeIndex, endHomeIndex);
```

### 6. Show "No cars found" message when location has no cars:
```typescript
{filteredHomeCars.length === 0 && (
  <div className="col-span-full text-center py-16">
    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-[rgb(5,_15,_35)] mb-2">We didn't find any cars</h3>
    <p className="text-gray-500">Please try another params</p>
  </div>
)}
```

### 7. Show recommended cars from other locations below "No cars found" message
