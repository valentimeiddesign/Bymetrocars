import { projectId } from './supabase/info';

/**
 * Base API URL for all backend endpoints
 */
export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-baa3db23`;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/health`,
  publicInfo: `${API_BASE_URL}/public/info`,
  publicData: `${API_BASE_URL}/public/data`,
  apiCars: `${API_BASE_URL}/api/cars`,
  apiData: `${API_BASE_URL}/api/data`,
  leads: `${API_BASE_URL}/leads`,
  settings: `${API_BASE_URL}/settings`,
};

/**
 * Fetch all data from the "data" table
 * @returns Array of data records in JSON format
 */
export async function fetchApiData() {
  try {
    const response = await fetch(API_ENDPOINTS.apiData);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching API data:', error);
    throw error;
  }
}

/**
 * Fetch all cars from the "data" table
 * @returns Array of car records in JSON format
 */
export async function fetchApiCars() {
  try {
    const response = await fetch(API_ENDPOINTS.apiCars);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching API cars:', error);
    throw error;
  }
}

/**
 * Fetch data with extended information (includes count)
 * @returns Object with success, count, and data array
 */
export async function fetchPublicData() {
  try {
    const response = await fetch(API_ENDPOINTS.publicData);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching public data:', error);
    throw error;
  }
}
