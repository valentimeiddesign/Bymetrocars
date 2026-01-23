// =====================================================
// EXCEL TO SUPABASE IMPORT SCRIPT
// =====================================================

import { Car } from '../types/car';
import { bulkCreateCars } from './carApi';

/**
 * Парсинг Excel даних в формат Car
 * 
 * Очікуваний формат Excel:
 * - Make (Марка)
 * - Model (Модель)
 * - Year (Рік)
 * - Price (Ціна)
 * - Mileage (Пробіг)
 * - Status (Статус)
 * - Type (Тип)
 * - VIN (VIN код)
 * - Color (Колір)
 * - Transmission (Трансмісія)
 * - Fuel Type (Тип палива)
 * - Location (Локація)
 * - Images (Зображення - URL через кому)
 * - Description (Опис)
 */

interface ExcelRow {
  Make?: string;
  Model?: string;
  Year?: number | string;
  Price?: number | string;
  Mileage?: number | string;
  Status?: string;
  Type?: string;
  VIN?: string;
  Color?: string;
  Transmission?: string;
  'Fuel Type'?: string;
  Location?: string;
  Images?: string;
  Description?: string;
  Features?: string;
  'Body Style'?: string;
  Engine?: string;
  Drivetrain?: string;
  'Exterior Color'?: string;
  'Interior Color'?: string;
  Doors?: number | string;
  Seats?: number | string;
}

/**
 * Нормалізація статусу
 */
function normalizeStatus(status?: string): Car['status'] {
  if (!status) return 'Available';
  const normalized = status.toLowerCase().trim();
  
  if (normalized.includes('avail')) return 'Available';
  if (normalized.includes('sold')) return 'Sold';
  if (normalized.includes('reserv')) return 'Reserved';
  if (normalized.includes('service')) return 'Service';
  if (normalized.includes('pend')) return 'Pending';
  
  return 'Available';
}

/**
 * Нормалізація типу автомобіля
 */
function normalizeType(type?: string): Car['type'] {
  if (!type) return 'Sedan';
  const normalized = type.toLowerCase().trim();
  
  if (normalized.includes('sedan')) return 'Sedan';
  if (normalized.includes('suv')) return 'SUV';
  if (normalized.includes('truck') || normalized.includes('pickup')) return 'Truck';
  if (normalized.includes('coupe')) return 'Coupe';
  if (normalized.includes('hatch')) return 'Hatchback';
  if (normalized.includes('van')) return 'Van';
  
  return 'Sedan';
}

/**
 * Нормалізація трансмісії
 */
function normalizeTransmission(transmission?: string): Car['transmission'] {
  if (!transmission) return 'Automatic';
  const normalized = transmission.toLowerCase().trim();
  
  if (normalized.includes('auto')) return 'Automatic';
  if (normalized.includes('manual') || normalized.includes('stick')) return 'Manual';
  
  return 'Automatic';
}

/**
 * Нормалізація типу палива
 */
function normalizeFuelType(fuelType?: string): Car['fuel_type'] {
  if (!fuelType) return 'Gasoline';
  const normalized = fuelType.toLowerCase().trim();
  
  if (normalized.includes('gas') || normalized.includes('petrol')) return 'Gasoline';
  if (normalized.includes('diesel')) return 'Diesel';
  if (normalized.includes('electric') || normalized.includes('ev')) return 'Electric';
  if (normalized.includes('hybrid')) return 'Hybrid';
  
  return 'Gasoline';
}

/**
 * Парсинг зображень з рядка
 */
function parseImages(imagesString?: string): any[] {
  if (!imagesString) return [];
  
  const urls = imagesString.split(',').map(url => url.trim()).filter(url => url);
  return urls.map((url, index) => ({
    id: `img-${index}`,
    url: url
  }));
}

/**
 * Парсинг features з рядка
 */
function parseFeatures(featuresString?: string): string[] {
  if (!featuresString) return [];
  
  return featuresString
    .split(',')
    .map(f => f.trim())
    .filter(f => f);
}

/**
 * Конвертація Excel рядка в Car об'єкт
 */
export function excelRowToCar(row: ExcelRow): Partial<Car> {
  const car: Partial<Car> = {
    make: row.Make?.trim() || '',
    model: row.Model?.trim() || '',
    year: typeof row.Year === 'number' ? row.Year : parseInt(String(row.Year || new Date().getFullYear())),
    price: typeof row.Price === 'number' ? row.Price : parseFloat(String(row.Price || 0)),
    mileage: typeof row.Mileage === 'number' ? row.Mileage : parseInt(String(row.Mileage || 0)),
    status: normalizeStatus(row.Status),
    type: normalizeType(row.Type),
    vin: row.VIN?.trim(),
    color: row.Color?.trim(),
    transmission: normalizeTransmission(row.Transmission),
    fuel_type: normalizeFuelType(row['Fuel Type']),
    location: row.Location?.trim(),
    images: parseImages(row.Images),
    description: row.Description?.trim(),
    features: parseFeatures(row.Features),
    body_style: row['Body Style']?.trim(),
    engine: row.Engine?.trim(),
    drivetrain: row.Drivetrain?.trim(),
    exterior_color: row['Exterior Color']?.trim(),
    interior_color: row['Interior Color']?.trim(),
    doors: typeof row.Doors === 'number' ? row.Doors : parseInt(String(row.Doors || 4)),
    seats: typeof row.Seats === 'number' ? row.Seats : parseInt(String(row.Seats || 5)),
    source: 'db',
    published_at: new Date().toISOString(),
  };

  return car;
}

/**
 * Імпорт автомобілів з Excel даних
 */
export async function importCarsFromExcel(excelData: ExcelRow[]): Promise<{
  success: number;
  failed: number;
  errors: string[];
}> {
  const errors: string[] = [];
  const validCars: Partial<Car>[] = [];

  // Валідація та конвертація
  for (let i = 0; i < excelData.length; i++) {
    try {
      const row = excelData[i];
      
      // Базова валідація
      if (!row.Make || !row.Model) {
        errors.push(`Row ${i + 1}: Missing required fields (Make or Model)`);
        continue;
      }

      const car = excelRowToCar(row);
      
      // Додаткова валідація
      if (!car.make || !car.model) {
        errors.push(`Row ${i + 1}: Invalid Make or Model`);
        continue;
      }
      
      if (!car.year || car.year < 1900 || car.year > new Date().getFullYear() + 2) {
        errors.push(`Row ${i + 1}: Invalid Year (${car.year})`);
        continue;
      }
      
      if (!car.price || car.price < 0) {
        errors.push(`Row ${i + 1}: Invalid Price (${car.price})`);
        continue;
      }

      validCars.push(car);
    } catch (error) {
      errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Завантаження в Supabase
  let success = 0;
  let failed = 0;

  if (validCars.length > 0) {
    console.log(`Importing ${validCars.length} valid cars...`);
    const result = await bulkCreateCars(validCars);
    success = result.success;
    failed = result.failed;
  }

  return {
    success,
    failed: failed + errors.length,
    errors,
  };
}

/**
 * Приклад використання з FileReader для читання Excel
 */
export function handleExcelFileUpload(file: File, onComplete: (result: any) => void) {
  // Потрібно встановити бібліотеку: npm install xlsx
  // import * as XLSX from 'xlsx';
  
  const reader = new FileReader();
  
  reader.onload = async (e) => {
    try {
      const data = e.target?.result;
      if (!data) throw new Error('No data read from file');

      // Використовуємо XLSX для парсингу
      // const workbook = XLSX.read(data, { type: 'binary' });
      // const firstSheetName = workbook.SheetNames[0];
      // const worksheet = workbook.Sheets[firstSheetName];
      // const excelData = XLSX.utils.sheet_to_json(worksheet);

      // Тимчасово для демонстрації
      const excelData: ExcelRow[] = [];
      
      const result = await importCarsFromExcel(excelData);
      onComplete(result);
    } catch (error) {
      console.error('Error processing Excel file:', error);
      onComplete({ success: 0, failed: 0, errors: ['Failed to process file'] });
    }
  };
  
  reader.readAsBinaryString(file);
}

/**
 * Експорт даних в формат для Excel (CSV)
 */
export function exportCarsToCSV(cars: Car[]): string {
  const headers = [
    'Make',
    'Model',
    'Year',
    'Price',
    'Mileage',
    'Status',
    'Type',
    'VIN',
    'Color',
    'Transmission',
    'Fuel Type',
    'Location',
    'Images',
    'Description',
  ];

  const rows = cars.map(car => [
    car.make,
    car.model,
    car.year,
    car.price,
    car.mileage,
    car.status,
    car.type,
    car.vin || '',
    car.color || '',
    car.transmission || '',
    car.fuel_type || '',
    car.location || '',
    car.images?.map(img => img.url).join(', ') || '',
    car.description || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csvContent;
}

/**
 * Завантаження CSV файлу
 */
export function downloadCSV(csvContent: string, filename: string = 'cars_export.csv') {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
