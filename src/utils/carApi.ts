// =====================================================
// SUPABASE CAR API FUNCTIONS
// =====================================================

import { createClient } from "@supabase/supabase-js";
import type { Car, DatabaseCar } from "../types/car";
import {
  dbCarToAppCar,
  parseCsvStringArray,
} from "../types/car";
import { projectId, publicAnonKey } from "./supabase/info";

// Ініціалізація Supabase client (singleton)
let supabaseClient: ReturnType<typeof createClient> | null =
  null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = `https://${projectId}.supabase.co`;
    supabaseClient = createClient(supabaseUrl, publicAnonKey);
  }
  return supabaseClient;
}

// Helper to safely get image URL (handles string or object)
export function getCarImageUrl(image: any): string {
  if (!image) return "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80";
  if (typeof image === 'string') return image;
  if (typeof image === 'object' && image.url) return image.url;
  return "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80";
}

// Cache for lookup tables
let lookupsCache: any = null;

async function fetchLookups() {
  if (lookupsCache) return lookupsCache;

  const supabase = getSupabaseClient();
  const tables = [
    "brands",
    "types",
    "colors",
    "transmissions",
    "fueltypes",
    "locations",
    "drivetrains",
    "seats",
  ];

  const results = await Promise.all(
    tables.map((table) =>
      supabase.from(table).select("id, name, Slug"),
    ),
  );

  lookupsCache = {};
  results.forEach((result, index) => {
    const tableName = tables[index];
    if (result.data) {
      lookupsCache[tableName] = result.data.reduce(
        (acc: any, item: any) => {
          acc[item.Slug || item.id] = item.name;
          // Also map by name if needed, but ID is primary lookup
          return acc;
        },
        {},
      );
    } else {
      lookupsCache[tableName] = {};
    }
  });

  return lookupsCache;
}

// Helper to resolve value from ID or return original if not found
function resolveLookup(value: any, tableName: string) {
  if (!value) return null;

  if (
    lookupsCache[tableName] &&
    lookupsCache[tableName][value]
  ) {
    return lookupsCache[tableName][value];
  }

  // If it's already a string (and not a numeric string that looks like an ID), return it
  if (typeof value === "string" && isNaN(Number(value)))
    return value;

  if (lookupsCache && lookupsCache[tableName]) {
    return lookupsCache[tableName][value] || value;
  }
  return value;
}

// Extended mapper that uses lookups
function mapDataToCar(item: any): Car {
  // Helper to safely get relation name if the join actually worked (legacy support) or use lookup
  const getVal = (
    colValue: any,
    relationName: string,
    lookupTable: string,
  ) => {
    // If Supabase returned a joined object { name: 'BMW' }
    if (
      typeof colValue === "object" &&
      colValue !== null &&
      "name" in colValue
    ) {
      return colValue.name;
    }
    // Otherwise try to resolve ID from cache
    return resolveLookup(colValue, lookupTable);
  };

  const images = parseCsvStringArray(item.images, item.images);

  const status =
    typeof item.Available === "boolean"
      ? item.Available
        ? "Available"
        : "Sold"
      : item.status || "Available";

  return {
    id: item.id?.toString() || "",
    make: getVal(item.brand, "brands", "brands") || "Unknown",
    model: item.model || "Unknown",
    year: Number(item.year) || new Date().getFullYear(),
    price: Number(item.price) || 0,
    mileage: Number(item.mileage) || 0,
    status: status as Car["status"],
    type:
      (getVal(item.type, "types", "types") as Car["type"]) ||
      "Sedan",
    vin: item.vin || "",
    color: getVal(item.color, "colors", "colors"),
    transmission: getVal(
      item.transmission,
      "transmissions",
      "transmissions",
    ) as Car["transmission"],
    fuel_type: getVal(
      item.fuel_type,
      "fueltypes",
      "fueltypes",
    ) as Car["fuel_type"],
    location: getVal(item.location, "locations", "locations"),
    images: images,
    description: item.description,
    features: parseCsvStringArray(item.features, ""),
    engine: item.engine,
    drivetrain: getVal(
      item.drivetrain,
      "drivetrains",
      "drivetrains",
    ),
    doors: item.doors,
    seats: Number(getVal(item.seats, "seats", "seats")) || 5,
    source: "db",
    created_at: item.created_at,
  };
}

// =====================================================
// FETCH FUNCTIONS
// =====================================================

/**
 * Отримати всі автомобілі
 */
export async function fetchAllCars(): Promise<Car[]> {
  try {
    const supabase = getSupabaseClient();

    // Fetch lookups first
    await fetchLookups();

    // Fetch raw data without joins to avoid PGRST200
    const { data, error } = await supabase
      .from("data")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(
        "Error fetching cars from data table:",
        error,
      );
      throw error;
    }

    return (data || []).map(mapDataToCar);
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return [];
  }
}

/**
 * Отримати автомобілі з фільтрами
 */
export async function fetchCarsWithFilters(filters: {
  status?: string;
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  make?: string;
  source?: "all" | "db";
}): Promise<Car[]> {
  try {
    // For simplicity and to support lookups correctly, we fetch all and filter in memory
    // This avoids complex query construction with manual ID lookups
    let cars = await fetchAllCars();

    if (filters.minPrice) {
      cars = cars.filter((c) => c.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      cars = cars.filter((c) => c.price <= filters.maxPrice!);
    }
    if (filters.minYear) {
      cars = cars.filter((c) => c.year >= filters.minYear!);
    }
    if (filters.maxYear) {
      cars = cars.filter((c) => c.year <= filters.maxYear!);
    }
    if (filters.make) {
      cars = cars.filter((c) =>
        c.make
          .toLowerCase()
          .includes(filters.make!.toLowerCase()),
      );
    }
    if (filters.type && filters.type !== "all") {
      cars = cars.filter((c) => c.type === filters.type);
    }
    if (filters.status && filters.status !== "all") {
      cars = cars.filter((c) => c.status === filters.status);
    }
    if (filters.location) {
      cars = cars.filter(
        (c) => c.location === filters.location,
      );
    }

    return cars;
  } catch (error) {
    console.error("Failed to fetch cars with filters:", error);
    return [];
  }
}

/**
 * Отримати автомобіль по ID
 */
export async function fetchCarById(
  carId: string,
): Promise<Car | null> {
  try {
    const supabase = getSupabaseClient();
    await fetchLookups();

    const { data, error } = await supabase
      .from("data")
      .select("*")
      .eq("id", carId)
      .single();

    if (error) {
      console.error("Error fetching car by ID:", error);
      throw error;
    }

    return data ? mapDataToCar(data) : null;
  } catch (error) {
    console.error("Failed to fetch car by ID:", error);
    return null;
  }
}

/**
 * Отримати автомобіль по slug
 */
export async function fetchCarBySlug(
  slug: string,
): Promise<Car | null> {
  return null;
}

/**
 * Пошук автомобілів
 */
export async function searchCars(
  searchTerm: string,
): Promise<Car[]> {
  try {
    const cars = await fetchAllCars();
    const term = searchTerm.toLowerCase();

    return cars.filter(
      (car) =>
        car.make.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term) ||
        car.description?.toLowerCase().includes(term) ||
        car.vin?.toLowerCase().includes(term),
    );
  } catch (error) {
    console.error("Failed to search cars:", error);
    return [];
  }
}

// Helper to reverse lookup ID from name
function resolveId(
  name: string | undefined,
  tableName: string,
) {
  if (!name || !lookupsCache || !lookupsCache[tableName])
    return null;

  // Find ID where value matches name (case insensitive?)
  const entries = Object.entries(lookupsCache[tableName]);
  const found = entries.find(
    ([_, val]) =>
      String(val).toLowerCase() === name.toLowerCase(),
  );

  return found ? found[0] : null;
}

// Convert App Car to DB Payload
function appCarToDbPayload(car: Partial<Car>) {
  // Map images array to string format expected by DB
  const imagesStr = car.images ? (Array.isArray(car.images) ? car.images.join(' ;') : car.images) : '';

  return {
    make: resolveId(car.make, "brands") || car.make, // Fallback to raw value if not found
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    // Map status to Available boolean if possible, or store in status column if it exists
    Available: car.status === "Available",
    type: resolveId(car.type, "types") || car.type,
    vin: car.vin,
    color: resolveId(car.color, "colors") || car.color,
    transmission:
      resolveId(car.transmission, "transmissions") ||
      car.transmission,
    fuel_type:
      resolveId(car.fuel_type, "fueltypes") || car.fuel_type,
    location:
      resolveId(car.location, "locations") || car.location,
    images: imagesStr,
    description: car.description,
    features: car.features,
    engine: car.engine,
    drivetrain:
      resolveId(car.drivetrain, "drivetrains") ||
      car.drivetrain,
    doors: car.doors,
    seats: resolveId(String(car.seats), "seats") || car.seats,
  };
}

// =====================================================
// CREATE/UPDATE/DELETE FUNCTIONS
// =====================================================

export async function createCar(
  car: Partial<Car>,
): Promise<Car | null> {
  try {
    const supabase = getSupabaseClient();
    await fetchLookups(); // Ensure we have lookups for ID resolution

    const payload = appCarToDbPayload(car);

    const { data, error } = await supabase
      .from("data")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Error creating car:", error);
      throw error;
    }

    return data ? mapDataToCar(data) : null;
  } catch (error) {
    console.error("Failed to create car:", error);
    return null;
  }
}

export async function updateCar(
  carId: string,
  updates: Partial<Car>,
): Promise<Car | null> {
  try {
    const supabase = getSupabaseClient();
    await fetchLookups();

    const payload = appCarToDbPayload(updates);

    const { data, error } = await supabase
      .from("data")
      .update(payload)
      .eq("id", carId)
      .select()
      .single();

    if (error) {
      console.error("Error updating car:", error);
      throw error;
    }

    return data ? mapDataToCar(data) : null;
  } catch (error) {
    console.error("Failed to update car:", error);
    return null;
  }
}

export async function deleteCar(
  carId: string,
): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("data")
      .delete()
      .eq("id", carId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to delete car:", error);
    return false;
  }
}

export async function updateCarStatus(
  carId: string,
  status: Car["status"],
): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("data")
      .update({ Available: status === "Available" }) // Assuming Available boolean mapping
      .eq("id", carId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to update car status:", error);
    return false;
  }
}

export async function bulkCreateCars(
  cars: Partial<Car>[],
): Promise<Car[]> {
  try {
    const supabase = getSupabaseClient();
    await fetchLookups();

    // Process in batches of 50 to avoid payload limits
    const BATCH_SIZE = 50;
    const results: Car[] = [];

    for (let i = 0; i < cars.length; i += BATCH_SIZE) {
      const batch = cars.slice(i, i + BATCH_SIZE);
      const payloads = batch.map(appCarToDbPayload);

      const { data, error } = await supabase
        .from("data")
        .insert(payloads)
        .select();

      if (error) {
        console.error("Error in bulk create batch:", error);
        throw error;
      }

      if (data) {
        results.push(...data.map(mapDataToCar));
      }
    }

    return results;
  } catch (error) {
    console.error("Failed to bulk create cars:", error);
    return [];
  }
}