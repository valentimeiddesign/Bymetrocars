// =====================================================
// SUPABASE CAR API FUNCTIONS
// =====================================================

import { createClient } from '@supabase/supabase-js';
import type { Car, DatabaseCar } from '../types/car';
import { dbCarToAppCar, appCarToDbCar } from '../types/car';
import { projectId, publicAnonKey } from './supabase/info';

// Ініціалізація Supabase client (singleton)
let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = `https://${projectId}.supabase.co`;
    supabaseClient = createClient(supabaseUrl, publicAnonKey);
  }
  return supabaseClient;
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
    const { data, error } = await supabase
      .from('data')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }

    return (data || []).map(dbCarToAppCar);
  } catch (error) {
    console.error('Failed to fetch cars:', error);
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
  source?: 'all' | 'db';
}): Promise<Car[]> {
  try {
    const supabase = getSupabaseClient();
    let query = supabase.from('data').select('*');

    // Додаємо фільтри
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    if (filters.type && filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }
    if (filters.location) {
      query = query.eq('location', filters.location);
    }
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters.minYear) {
      query = query.gte('year', filters.minYear);
    }
    if (filters.maxYear) {
      query = query.lte('year', filters.maxYear);
    }
    if (filters.make) {
      query = query.ilike('make', `%${filters.make}%`);
    }
    if (filters.source) {
      query = query.eq('source', filters.source);
    }

    // Сортування
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching cars with filters:', error);
      throw error;
    }

    return (data || []).map(dbCarToAppCar);
  } catch (error) {
    console.error('Failed to fetch cars with filters:', error);
    return [];
  }
}

/**
 * Отримати автомобіль по ID
 */
export async function fetchCarById(carId: string): Promise<Car | null> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('data')
      .select('*')
      .eq('id', carId)
      .single();

    if (error) {
      console.error('Error fetching car by ID:', error);
      throw error;
    }

    return data ? dbCarToAppCar(data) : null;
  } catch (error) {
    console.error('Failed to fetch car by ID:', error);
    return null;
  }
}

/**
 * Отримати автомобіль по slug
 */
export async function fetchCarBySlug(slug: string): Promise<Car | null> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('data')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching car by slug:', error);
      throw error;
    }

    return data ? dbCarToAppCar(data) : null;
  } catch (error) {
    console.error('Failed to fetch car by slug:', error);
    return null;
  }
}

/**
 * Пошук автомобілів
 */
export async function searchCars(searchTerm: string): Promise<Car[]> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('data')
      .select('*')
      .or(`make.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching cars:', error);
      throw error;
    }

    return (data || []).map(dbCarToAppCar);
  } catch (error) {
    console.error('Failed to search cars:', error);
    return [];
  }
}

// =====================================================
// CREATE/UPDATE/DELETE FUNCTIONS
// =====================================================

/**
 * Створити новий автомобіль
 */
export async function createCar(car: Partial<Car>): Promise<Car | null> {
  try {
    const supabase = getSupabaseClient();
    const dbCar = appCarToDbCar(car);
    
    const { data, error } = await supabase
      .from('data')
      .insert([dbCar])
      .select()
      .single();

    if (error) {
      console.error('Error creating car:', error);
      throw error;
    }

    return data ? dbCarToAppCar(data) : null;
  } catch (error) {
    console.error('Failed to create car:', error);
    return null;
  }
}

/**
 * Оновити автомобіль
 */
export async function updateCar(carId: string, updates: Partial<Car>): Promise<Car | null> {
  try {
    const supabase = getSupabaseClient();
    const dbUpdates = appCarToDbCar(updates);
    
    const { data, error } = await supabase
      .from('data')
      .update(dbUpdates)
      .eq('id', carId)
      .select()
      .single();

    if (error) {
      console.error('Error updating car:', error);
      throw error;
    }

    return data ? dbCarToAppCar(data) : null;
  } catch (error) {
    console.error('Failed to update car:', error);
    return null;
  }
}

/**
 * Видалити автомобіль
 */
export async function deleteCar(carId: string): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('data')
      .delete()
      .eq('id', carId);

    if (error) {
      console.error('Error deleting car:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Failed to delete car:', error);
    return false;
  }
}

/**
 * Оновити статус автомобіля
 */
export async function updateCarStatus(carId: string, status: Car['status']): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('data')
      .update({ status })
      .eq('id', carId);

    if (error) {
      console.error('Error updating car status:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Failed to update car status:', error);
    return false;
  }
}

/**
 * Збільшити кількість переглядів
 */
export async function incrementCarViews(carId: string): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.rpc('increment_car_views', { id: carId });

    if (error) {
      console.error('Error incrementing car views:', error);
      // Fallback: оновити вручну
      const car = await fetchCarById(carId);
      if (car) {
        await updateCar(carId, { views: (car.views || 0) + 1 });
      }
    }

    return true;
  } catch (error) {
    console.error('Failed to increment car views:', error);
    return false;
  }
}

/**
 * Отримати статистику по автомобілях
 */
export async function getCarsStats(): Promise<{
  total: number;
  available: number;
  sold: number;
  reserved: number;
  totalValue: number;
}> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('data').select('status, price');

    if (error) {
      console.error('Error fetching cars stats:', error);
      throw error;
    }

    const stats = {
      total: data?.length || 0,
      available: data?.filter(c => c.status === 'Available').length || 0,
      sold: data?.filter(c => c.status === 'Sold').length || 0,
      reserved: data?.filter(c => c.status === 'Reserved').length || 0,
      totalValue: data?.reduce((sum, c) => sum + (c.price || 0), 0) || 0,
    };

    return stats;
  } catch (error) {
    console.error('Failed to fetch cars stats:', error);
    return { total: 0, available: 0, sold: 0, reserved: 0, totalValue: 0 };
  }
}

// =====================================================
// BULK OPERATIONS
// =====================================================

/**
 * Масове створення автомобілів (для завантаження з Excel)
 */
export async function bulkCreateCars(cars: Partial<Car>[]): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  try {
    const supabase = getSupabaseClient();
    const dbCars = cars.map(appCarToDbCar);

    // Supabase підтримує batch insert
    const { data, error } = await supabase
      .from('data')
      .insert(dbCars)
      .select();

    if (error) {
      console.error('Error bulk creating cars:', error);
      failed = cars.length;
    } else {
      success = data?.length || 0;
      failed = cars.length - success;
    }
  } catch (error) {
    console.error('Failed to bulk create cars:', error);
    failed = cars.length;
  }

  return { success, failed };
}

/**
 * Видалити всі автомобілі (ОБЕРЕЖНО!)
 */
export async function deleteAllCars(): Promise<boolean> {
  try {
    if (!confirm('Are you sure you want to delete ALL cars? This action cannot be undone!')) {
      return false;
    }

    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('data')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all except impossible UUID

    if (error) {
      console.error('Error deleting all cars:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Failed to delete all cars:', error);
    return false;
  }
}