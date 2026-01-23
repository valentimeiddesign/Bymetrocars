// =====================================================
// SUPABASE CAR DATABASE TYPES AND FUNCTIONS
// =====================================================

export interface CarImage {
  id: string;
  url: string;
  file?: File;
}

export interface Car {
  // Основні поля
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  
  // Статус та тип
  status: 'Available' | 'Sold' | 'Reserved' | 'Service' | 'Pending';
  type: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Hatchback' | 'Van';
  
  // Деталі автомобіля
  vin?: string;
  color?: string;
  transmission?: 'Automatic' | 'Manual';
  fuel_type?: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  
  // Локація
  location?: string;
  
  // Зображення
  images?: string[];

  image?: string;
  
  // Додаткові поля
  description?: string;
  features?: string[];
  body_style?: string;
  engine?: string;
  drivetrain?: string;
  exterior_color?: string;
  interior_color?: string;
  doors?: number;
  seats?: number;
  
  // SEO та маркетинг
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  
  // Статистика
  views?: number;
  leads?: number;
  
  // Джерело даних
  source: 'all' | 'db';
  
  // Timestamps
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

// Database Car - як зберігається в Supabase (з snake_case)
export interface DatabaseCar {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  status: string;
  type: string;
  vin?: string;
  color?: string;
  transmission?: string;
  fuel_type?: string;
  location?: string;
  image?: string;
  images?: string;
  description?: string;
  features?: string[];
  body_style?: string;
  engine?: string;
  drivetrain?: string;
  exterior_color?: string;
  interior_color?: string;
  doors?: number;
  seats?: number;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  views?: number;
  leads?: number;
  source?: string;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

// Конвертація з Database формату в App формат
export function dbCarToAppCar(dbCar: DatabaseCar): Car {
  return {
    id: dbCar.id,
    make: dbCar.make,
    model: dbCar.model,
    year: dbCar.year,
    price: dbCar.price,
    mileage: dbCar.mileage,
    status: dbCar.status as Car['status'],
    type: dbCar.type as Car['type'],
    vin: dbCar.vin,
    color: dbCar.color,
    transmission: dbCar.transmission as Car['transmission'],
    fuel_type: dbCar.fuel_type as Car['fuel_type'],
    location: dbCar.location,
    image: dbCar.image,
    images: dbCar.images?.replace(/\s/g, '').split(';') || [],
    description: dbCar.description,
    features: dbCar.features,
    body_style: dbCar.body_style,
    engine: dbCar.engine,
    drivetrain: dbCar.drivetrain,
    exterior_color: dbCar.exterior_color,
    interior_color: dbCar.interior_color,
    doors: dbCar.doors,
    seats: dbCar.seats,
    slug: dbCar.slug,
    meta_title: dbCar.meta_title,
    meta_description: dbCar.meta_description,
    views: dbCar.views || 0,
    leads: dbCar.leads || 0,
    source: (dbCar.source as Car['source']) || 'db',
    created_at: dbCar.created_at,
    updated_at: dbCar.updated_at,
    published_at: dbCar.published_at,
  };
}

// Конвертація з App формату в Database формат
export function appCarToDbCar(car: Partial<Car>): Partial<DatabaseCar> {
  return {
    make: car.make,
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    status: car.status,
    type: car.type,
    vin: car.vin,
    color: car.color,
    transmission: car.transmission,
    fuel_type: car.fuel_type,
    location: car.location,
    images: car.images?.join(' ;') || '',
    description: car.description,
    features: car.features,
    body_style: car.body_style,
    engine: car.engine,
    drivetrain: car.drivetrain,
    exterior_color: car.exterior_color,
    interior_color: car.interior_color,
    doors: car.doors,
    seats: car.seats,
    slug: car.slug,
    meta_title: car.meta_title,
    meta_description: car.meta_description,
    views: car.views,
    leads: car.leads,
    source: car.source,
    published_at: car.published_at,
  };
}

// Експортуємо типи для фільтрів
export type CarStatus = Car['status'];
export type CarType = Car['type'];
export type CarTransmission = Car['transmission'];
export type CarFuelType = Car['fuel_type'];
