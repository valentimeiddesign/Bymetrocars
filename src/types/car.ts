// =====================================================
// SUPABASE CAR DATABASE TYPES AND FUNCTIONS
// =====================================================

export interface CarImage {
  id: string;
  url: string;
  file?: File;
}

export const CarImagesSparator = "; ";

export function parseCsvStringArray(
  data: string,
  fallback: string,
) {
  return data
    ? data.indexOf(CarImagesSparator) > -1
      ? data.split(CarImagesSparator)
      : [data]
    : [fallback];
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
  status:
    | "Available"
    | "Sold"
    | "Reserved"
    | "Service"
    | "Pending";
  type:
    | "Sedan"
    | "SUV"
    | "Truck"
    | "Coupe"
    | "Hatchback"
    | "Van";

  // Деталі автомобіля
  vin?: string;
  color?: string;
  transmission?: "Automatic" | "Manual";
  fuel_type?: "Gasoline" | "Diesel" | "Electric" | "Hybrid";

  // Локація
  location?: string;

  // Зображення
  image: string;
  images?: string[];

  // Додаткові поля
  description?: string;
  features?: string[];
  body_style?: string;
  engine?: string;
  drivetrain?: string;
  exterior_color?: string;
  interior_color?: string;
  doors?: number;
  seats?: string;

  // SEO та маркетинг
  slug?: string;
  meta_title?: string;
  meta_description?: string;

  // Статистика
  views?: number;
  leads?: number;

  // Джерело даних
  source: "all" | "db";

  // Timestamps
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

// Database Car - як зберігається в Supabase (з snake_case)
export interface DatabaseCar {
  // Join properties (from Supabase relations)
  id: string;
  slug: string;
  brand?: string | null;
  type?: string | null;
  color?: string | null;
  transmission?: string | null;
  fueltype?: string | null;
  location?: string | null;
  features: string | null;
  drivetrain?: string | null;
  seats?: string | null; // seats table might have name or value
  status?: string | null;
  // Specific columns in 'data' table
  Available?: boolean;
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;
  vin?: string;
  description?: string;
  image?: string; // Single image?
  images?: string; // Array?
}

// Конвертація з Database формату в App формат
export function dbCarToAppCar(dbCar: DatabaseCar): Car {
  // Determine status from Available boolean if present, otherwise use status string
  let status: Car["status"] = "Available";
  if (typeof dbCar.Available === "boolean") {
    status = dbCar.Available ? "Available" : "Sold";
  } else if (dbCar.status) {
    status = dbCar.status as Car["status"];
  }

  // Handle images
  const images: string[] = parseCsvStringArray(
    dbCar.images,
    dbCar.image,
  );

  const features: string[] = parseCsvStringArray(
    dbCar.features,
    "",
  );

  // Helper to extract name from relation or fallback to column
  const getRelName = (rel: any, col: any) =>
    rel?.name || col || "";

  const CarImages = dbCar.images.split(" ;");

  return {
    id: dbCar.id,
    make: dbCar.brand || "Unknown",
    model: dbCar.model || "Unknown",
    year: dbCar.year || new Date().getFullYear(),
    price: dbCar.price || 0,
    mileage: dbCar.mileage || 0,
    status,
    type: (dbCar.type as Car["type"]) || "Sedan",
    vin: dbCar.vin,
    color: dbCar.color,
    transmission: dbCar.transmission as Car["transmission"],
    fuel_type: dbCar.fueltype as Car["fuel_type"],
    location: dbCar.location,
    image: dbCar.image,
    images,
    description: dbCar.description,
    features,
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
    source: (dbCar.source as Car["source"]) || "db",
    created_at: dbCar.created_at,
    updated_at: dbCar.updated_at,
    published_at: dbCar.published_at,
  };
}

// Конвертація з App формату в Database формат
export function appCarToDbCar(
  car: Partial<Car>,
): Partial<DatabaseCar> {
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
    image: car.image,
    images: car.images?.join(" ;") || "",
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
export type CarStatus = Car["status"];
export type CarType = Car["type"];
export type CarTransmission = Car["transmission"];
export type CarFuelType = Car["fuel_type"];