# Container Updates Progress

## Completed ✓

Ці файли вже оновлено до нового стандарту контейнерів:
- `/components/Footer.tsx` - оновлено контейнер
- `/App.tsx` - оновлено основний header/navigation (рядок 964)
- `/components/AboutUs.tsx` - всі секції оновлено
- `/components/Contacts.tsx` - всі секції оновлено

## Потребують оновлення

Ці файли ще потребують оновлення до стандарту `max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]`:

### App.tsx
- Рядок 191: Header navigation (Sell or Trade Ins page)
- Рядок 286: Header navigation (Financing page)
- Рядок 381: Header navigation (Locations page)
- Рядок 476: Header navigation (About page)
- Рядок 574: Header navigation (Contacts page)
- Рядок 672: Header navigation (Vacancies page)
- Рядок 770: Header navigation (Car Details page)
- Рядок 868: Header navigation (другий Home page header)
- Рядок 1047: Hero Section container
- Рядок 2120: Browse by Type Section
- Рядок 2160: Popular Brands Section

### Components
- `/components/Financing.tsx` - 2 секції (рядки 49, 103)
- `/components/Locations.tsx` - 1 секція (рядок 55)
- `/components/Navigation.tsx` - 1 header (рядок 27)
- `/components/Quiz.tsx` - 2 місця (рядки 83, 909)
- `/components/SellTrade.tsx` - 4 секції (рядки 30, 84, 150, 238)
- `/components/ShopCars.tsx` - 4 секції (рядки 204, 224, 240, 738)
- `/components/Vacancies.tsx` - 3 секції (рядки 41, 78, 133)

## Як оновити решту файлів

### Опція 1: Python скрипт (рекомендовано)
Запустіть створений скрипт для автоматичного оновлення всіх файлів:
```bash
python3 /apply-container-updates.py
```

### Опція 2: Bash скрипт
```bash
bash /update-all-containers.sh
```

### Опція 3: Вручну
Замініть у кожному файлі:

**Старий паттерн 1:**
```
w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32
```
**Новий:**
```
w-full max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]
```

**Старий паттерн 2 (headers):**
```
flex items-center justify-between h-full px-4 md:px-8 lg:px-20
```
**Новий:**
```
max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 xl:px-[164px]
```

## Новий стандарт контейнерів

Всі контейнери на сайті тепер використовують:
- `max-w-[2304px]` - максимальна ширина відповідно до Figma макету
- `mx-auto` - центрування
- `px-4 md:px-8 xl:px-[164px]` - адаптивні padding з боків (4px мобайл, 8px планшет, 164px десктоп)

Це забезпечує консистентність дизайну по всьому сайту та відповідає Figma макету з шириною 2304px та паддінгами 164px.
