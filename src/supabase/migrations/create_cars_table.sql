-- =====================================================
-- SUPABASE DATABASE SCHEMA FOR BUY METRO CARS
-- =====================================================

-- Створення таблиці автомобілів
CREATE TABLE IF NOT EXISTS cars (
  -- Основні поля
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  mileage INTEGER NOT NULL,
  
  -- Статус та тип
  status VARCHAR(20) NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Sold', 'Reserved', 'Service', 'Pending')),
  type VARCHAR(20) NOT NULL CHECK (type IN ('Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'Van')),
  
  -- Деталі автомобіля
  vin VARCHAR(17) UNIQUE,
  color VARCHAR(50),
  transmission VARCHAR(20) CHECK (transmission IN ('Automatic', 'Manual')),
  fuel_type VARCHAR(20) CHECK (fuel_type IN ('Gasoline', 'Diesel', 'Electric', 'Hybrid')),
  
  -- Локація
  location VARCHAR(100),
  
  -- Зображення (масив URL)
  images JSONB DEFAULT '[]'::jsonb,
  
  -- Додаткові поля
  description TEXT,
  features TEXT[], -- Масив особливостей
  body_style VARCHAR(50),
  engine VARCHAR(100),
  drivetrain VARCHAR(50),
  exterior_color VARCHAR(50),
  interior_color VARCHAR(50),
  doors INTEGER,
  seats INTEGER,
  
  -- SEO та маркетинг
  slug VARCHAR(255) UNIQUE,
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Статистика
  views INTEGER DEFAULT 0,
  leads INTEGER DEFAULT 0,
  
  -- Джерело даних
  source VARCHAR(20) DEFAULT 'db' CHECK (source IN ('all', 'db')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Індекси для швидкого пошуку
CREATE INDEX IF NOT EXISTS idx_cars_make ON cars(make);
CREATE INDEX IF NOT EXISTS idx_cars_model ON cars(model);
CREATE INDEX IF NOT EXISTS idx_cars_year ON cars(year);
CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);
CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
CREATE INDEX IF NOT EXISTS idx_cars_type ON cars(type);
CREATE INDEX IF NOT EXISTS idx_cars_location ON cars(location);
CREATE INDEX IF NOT EXISTS idx_cars_vin ON cars(vin);
CREATE INDEX IF NOT EXISTS idx_cars_slug ON cars(slug);
CREATE INDEX IF NOT EXISTS idx_cars_source ON cars(source);
CREATE INDEX IF NOT EXISTS idx_cars_created_at ON cars(created_at DESC);

-- Індекс для пошуку по make+model
CREATE INDEX IF NOT EXISTS idx_cars_make_model ON cars(make, model);

-- Full-text search індекс
CREATE INDEX IF NOT EXISTS idx_cars_search ON cars USING gin(
  to_tsvector('english', make || ' ' || model || ' ' || COALESCE(description, ''))
);

-- Автоматичне оновлення updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Автоматична генерація slug
CREATE OR REPLACE FUNCTION generate_car_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(
      regexp_replace(
        NEW.year::text || '-' || NEW.make || '-' || NEW.model || '-' || substr(NEW.id::text, 1, 8),
        '[^a-z0-9-]+', '-', 'gi'
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_cars_slug
  BEFORE INSERT OR UPDATE ON cars
  FOR EACH ROW
  EXECUTE FUNCTION generate_car_slug();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Увімкнути RLS
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Політика: всі можуть читати опубліковані автомобілі
CREATE POLICY "Anyone can view published cars"
  ON cars FOR SELECT
  USING (published_at IS NOT NULL OR auth.role() = 'authenticated');

-- Політика: тільки автентифіковані користувачі можуть вставляти
CREATE POLICY "Authenticated users can insert cars"
  ON cars FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Політика: тільки автентифіковані користувачі можуть оновлювати
CREATE POLICY "Authenticated users can update cars"
  ON cars FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Політика: тільки автентифіковані користувачі можуть видаляти
CREATE POLICY "Authenticated users can delete cars"
  ON cars FOR DELETE
  USING (auth.role() = 'authenticated');

-- =====================================================
-- SAMPLE DATA INSERT (опціонально)
-- =====================================================

-- Приклад вставки даних
-- INSERT INTO cars (make, model, year, price, mileage, status, type, location, vin, color, transmission, fuel_type, published_at)
-- VALUES 
--   ('Honda', 'Civic', 2022, 25900, 15000, 'Available', 'Sedan', '332 Sackville Drive', '1HGBH41JXMN109186', 'Silver', 'Automatic', 'Gasoline', NOW()),
--   ('Toyota', 'Camry', 2023, 32500, 8000, 'Available', 'Sedan', '400 Sackville Drive', '4T1BF1FK5HU123456', 'Blue', 'Automatic', 'Hybrid', NOW());

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- Порахувати автомобілі по статусу
-- SELECT status, COUNT(*) as count FROM cars GROUP BY status;

-- Знайти автомобілі в певному ціновому діапазоні
-- SELECT * FROM cars WHERE price BETWEEN 20000 AND 40000 AND status = 'Available';

-- Знайти автомобілі по локації
-- SELECT * FROM cars WHERE location = '332 Sackville Drive';

-- Full-text search
-- SELECT * FROM cars WHERE to_tsvector('english', make || ' ' || model || ' ' || COALESCE(description, '')) @@ to_tsquery('english', 'honda');
