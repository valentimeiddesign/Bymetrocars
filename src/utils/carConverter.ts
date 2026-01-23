// Helper function to convert old format cars to new Car type
import type { Car } from '../types/car';

interface OldCarFormat {
  id: number;
  name: string;
  price: number;
  mileage: number;
  image: string;
  status: string;
  location: string;
}

export function convertOldCarToNew(oldCar: OldCarFormat): Car {
  // Parse name to extract make, model, year
  const nameParts = oldCar.name.split(' ');
  const year = parseInt(nameParts[0]) || new Date().getFullYear();
  const make = nameParts[1] || 'Unknown';
  const model = nameParts.slice(2).join(' ') || 'Unknown';

  return {
    id: oldCar.id.toString(),
    make: make,
    model: model,
    year: year,
    price: oldCar.price,
    mileage: oldCar.mileage,
    status: (oldCar.status === 'Pending' ? 'Pending' : 
             oldCar.status === 'Available' ? 'Available' : 
             'Available') as Car['status'],
    type: 'Sedan' as Car['type'], // Default type
    location: oldCar.location,
    images: oldCar.image ? [{ id: '1', url: oldCar.image }] : [],
    source: 'all',
  };
}

export function convertOldCarsToNew(oldCars: OldCarFormat[]): Car[] {
  return oldCars.map(convertOldCarToNew);
}
