# Supabase Integration for Buy Metro Cars

## 📋 Огляд

Повна інтеграція Supabase для управління автомобілями на сайті Buy Metro Pre-Owned.

## 🗂️ Структура файлів

```
/supabase/migrations/
  └── create_cars_table.sql      # SQL для створення таблиці

/types/
  └── car.ts                       # TypeScript типи для автомобілів

/utils/
  ├── carApi.ts                    # API функції для роботи з Supabase
  └── excelImport.ts               # Імпорт/експорт Excel даних
```

## 🚀 Крок 1: Налаштування Supabase

### 1.1 Створення таблиці

1. Відкрийте Supabase Dashboard → SQL Editor
2. Скопіюйте весь вміст файлу `/supabase/migrations/create_cars_table.sql`
3. Вставте в SQL Editor і натисніть "Run"
4. Таблиця `cars` буде створена з усіма індексами та тригерами

### 1.2 Перевірка таблиці

Виконайте в SQL Editor:
```sql
SELECT * FROM cars LIMIT 10;
```

Якщо таблиця порожня - все ОК, готові до імпорту даних!

## 📊 Структура даних автомобіля

### Обов'язкові поля:
- **make** (string) - Марка (наприклад: Honda, Toyota, Ford)
- **model** (string) - Модель (наприклад: Civic, Camry, F-150)
- **year** (number) - Рік випуску (наприклад: 2022)
- **price** (number) - Ціна (наприклад: 25900)
- **mileage** (number) - Пробіг в милях (наприклад: 15000)
- **status** (string) - Статус: `Available`, `Sold`, `Reserved`, `Service`, `Pending`
- **type** (string) - Тип: `Sedan`, `SUV`, `Truck`, `Coupe`, `Hatchback`, `Van`

### Опціональні поля:
- **vin** (string) - VIN код
- **color** (string) - Колір
- **transmission** (string) - Трансмісія: `Automatic`, `Manual`
- **fuel_type** (string) - Тип палива: `Gasoline`, `Diesel`, `Electric`, `Hybrid`
- **location** (string) - Локація (наприклад: 332 Sackville Drive)
- **images** (array) - Масив зображень `[{id: "1", url: "https://..."}]`
- **description** (text) - Опис автомобіля
- **features** (array) - Особливості `["GPS", "Leather Seats", "Sunroof"]`
- **body_style** (string) - Стиль кузова
- **engine** (string) - Двигун
- **drivetrain** (string) - Привід
- **exterior_color** (string) - Зовнішній колір
- **interior_color** (string) - Внутрішній колір
- **doors** (number) - Кількість дверей
- **seats** (number) - Кількість місць

## 📥 Крок 2: Підготовка Excel файлу

### Формат Excel файлу

Створіть Excel файл з такими колонками (заголовки мають точно відповідати):

| Make | Model | Year | Price | Mileage | Status | Type | VIN | Color | Transmission | Fuel Type | Location | Images | Description |
|------|-------|------|-------|---------|--------|------|-----|-------|--------------|-----------|----------|--------|-------------|
| Honda | Civic | 2022 | 25900 | 15000 | Available | Sedan | 1HG... | Silver | Automatic | Gasoline | 332 Sackville Drive | https://... | Great car |

### Важливі примітки:

1. **Make, Model** - обов'язкові поля
2. **Year** - число від 1900 до поточного року + 2
3. **Price, Mileage** - числа без коми (25900, не 25,900)
4. **Status** - один з: Available, Sold, Reserved, Service, Pending
5. **Type** - один з: Sedan, SUV, Truck, Coupe, Hatchback, Van
6. **Transmission** - Automatic або Manual
7. **Fuel Type** - Gasoline, Diesel, Electric або Hybrid
8. **Location** - одна з локацій:
   - 332 Sackville Drive
   - 400 Sackville Drive
   - Buy Metro
   - Phillips Auto
   - Mount Uniacke
   - Lower Sackville
   - Truro
9. **Images** - URL зображень через кому: `https://img1.jpg, https://img2.jpg`

### Шаблон Excel

Завантажте шаблон: [cars_template.xlsx](#)

Або створіть новий файл з такими стовпцями:
```
Make | Model | Year | Price | Mileage | Status | Type | Location | VIN | Color | Transmission | Fuel Type | Images | Description
```

## 📤 Крок 3: Імпорт даних з Excel

### Вручну через Supabase Dashboard

1. Відкрийте Supabase Dashboard → Table Editor → cars
2. Натисніть "Insert" → "Insert row"
3. Заповніть всі поля
4. Натисніть "Save"

### Через SQL (рекомендовано для великої кількості)

1. Конвертуйте Excel в CSV
2. У Supabase Dashboard → SQL Editor виконайте:

```sql
-- Приклад масового вставлення
INSERT INTO cars (make, model, year, price, mileage, status, type, location, vin, color, transmission, fuel_type, published_at)
VALUES 
  ('Honda', 'Civic', 2022, 25900, 15000, 'Available', 'Sedan', '332 Sackville Drive', '1HGBH41JXMN109186', 'Silver', 'Automatic', 'Gasoline', NOW()),
  ('Toyota', 'Camry', 2023, 32500, 8000, 'Available', 'Sedan', '400 Sackville Drive', '4T1BF1FK5HU123456', 'Blue', 'Automatic', 'Hybrid', NOW()),
  ('Ford', 'F-150', 2021, 42000, 25000, 'Available', 'Truck', 'Buy Metro', '1FTFW1E84MFA12345', 'Red', 'Automatic', 'Gasoline', NOW());
```

### Через Admin Panel (коли буде готовий імпорт)

1. Увійдіть в Admin Panel
2. Перейдіть в Cars → Import
3. Завантажте Excel файл
4. Натисніть "Import"
5. Перевірте результати

## 🔧 Крок 4: Підключення до сайту

### 4.1 Оновлення App.tsx

Замініть mock дані на реальні з Supabase:

```typescript
import { fetchAllCars, fetchCarsWithFilters } from './utils/carApi';

// В компоненті
const [cars, setCars] = useState<Car[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadCars();
}, []);

async function loadCars() {
  setLoading(true);
  try {
    const data = await fetchAllCars();
    setCars(data);
  } catch (error) {
    console.error('Failed to load cars:', error);
  } finally {
    setLoading(false);
  }
}
```

### 4.2 Фільтрація по локації

```typescript
async function filterByLocation(location: string) {
  const filtered = await fetchCarsWithFilters({ location });
  setCars(filtered);
}
```

### 4.3 Пошук

```typescript
async function searchCars(term: string) {
  const results = await searchCars(term);
  setCars(results);
}
```

## 📝 Приклади використання API

### Отримати всі автомобілі
```typescript
const cars = await fetchAllCars();
```

### Фільтрація
```typescript
const filtered = await fetchCarsWithFilters({
  status: 'Available',
  location: '332 Sackville Drive',
  minPrice: 20000,
  maxPrice: 40000,
});
```

### Створити автомобіль
```typescript
const newCar = await createCar({
  make: 'Honda',
  model: 'Civic',
  year: 2022,
  price: 25900,
  mileage: 15000,
  status: 'Available',
  type: 'Sedan',
  location: '332 Sackville Drive',
});
```

### Оновити автомобіль
```typescript
await updateCar(carId, {
  price: 24900,
  status: 'Reserved',
});
```

### Видалити автомобіль
```typescript
await deleteCar(carId);
```

### Масове завантаження
```typescript
const result = await bulkCreateCars([car1, car2, car3]);
console.log(`Success: ${result.success}, Failed: ${result.failed}`);
```

## 🎯 Наступні кроки

1. ✅ Створіть таблицю в Supabase
2. ✅ Підготуйте Excel файл з автомобілями
3. ⏳ Надішліть мені Excel файл
4. ⏳ Я завантажу всі дані в Supabase
5. ⏳ Підключу сайт до бази даних
6. ⏳ Тестування та запуск

## 🔐 Security (RLS)

Row Level Security вже налаштовано:
- ✅ Всі можуть читати опубліковані автомобілі
- ✅ Тільки автентифіковані користувачі можуть створювати/оновлювати/видаляти
- ✅ Автоматична генерація slug
- ✅ Автоматичне оновлення timestamp

## 🐛 Troubleshooting

### Помилка: "relation cars does not exist"
→ Запустіть SQL з файлу `create_cars_table.sql`

### Помилка: "RLS policy violation"
→ Увійдіть в систему або додайте політику для публічного доступу

### Дані не відображаються
→ Перевірте чи поле `published_at` заповнено

### Помилки імпорту
→ Перевірте формат Excel файлу та обов'язкові поля

## 📞 Контакт

Коли Excel файл буде готовий - надішліть мені, і я завантажу всі дані!
