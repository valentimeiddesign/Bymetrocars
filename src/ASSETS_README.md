# Assets Documentation

## Структура папок

```
/assets
  /icons          - SVG іконки (стрілки, пошук, локація, тощо)
  /logos          - Логотипи брендів автомобілів
  /images         - Зображення автомобілів та інші картинки
/components
  /Icons.tsx      - React компоненти для всіх іконок
```

## Використання іконок

### Основні іконки

```tsx
import { Icons } from './components/Icons';

// Стрілка вправо
<Icons.ArrowRight className="w-4" />

// Локація
<Icons.Location className="w-5 text-purple-500" />

// Пошук
<Icons.Search className="w-5" />

// Фільтр
<Icons.Filter className="w-[15px] opacity-30" />

// Соціальні мережі
<Icons.Facebook className="w-[25px]" />
<Icons.Instagram className="w-[25px]" />

// Chevron Down
<Icons.ChevronDown className="w-4" />
```

### Типи автомобілів

```tsx
import { CarTypeIcons } from './components/Icons';

<CarTypeIcons.Sedan className="w-16 md:w-20" />
<CarTypeIcons.SUV className="w-16 md:w-20" />
<CarTypeIcons.Hatchback className="w-16 md:w-20" />
<CarTypeIcons.Truck className="w-16 md:w-20" />
<CarTypeIcons.VAN className="w-16 md:w-20" />
<CarTypeIcons.Coupe className="w-16 md:w-20" />
```

### Логотипи брендів

```tsx
import { BrandLogos } from './components/Icons';

<BrandLogos.Toyota className="w-16 md:w-20" />
<BrandLogos.Honda className="w-16 md:w-20" />
<BrandLogos.Ford className="w-16 md:w-20" />
<BrandLogos.Nissan className="w-16 md:w-20" />
<BrandLogos.Hyundai className="w-16 md:w-20" />
<BrandLogos.Chevrolet className="w-16 md:w-20" />
```

## Кольори

Всі SVG іконки використовують `currentColor`, що дозволяє легко змінювати колір через className:

```tsx
<Icons.Location className="text-purple-500" />  // Фіолетова іконка
<Icons.Search className="text-gray-400" />       // Сіра іконка
<Icons.ArrowRight className="text-white" />      // Біла іконка
```

## Додавання нових іконок

1. Створіть SVG файл у `/assets/icons/`
2. Додайте компонент у `/components/Icons.tsx`:

```tsx
export const Icons = {
  // ... існуючі іконки
  
  NewIcon: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* SVG content */}
    </svg>
  ),
};
```

## Переваги локальних SVG

✅ Немає залежності від зовнішніх CDN  
✅ Швидше завантаження (інлайн SVG)  
✅ Легке керування кольорами через currentColor  
✅ Легко змінювати розміри через className  
✅ Можна комітити в Git репозиторій  
✅ Працює офлайн  

## Зображення автомобілів

Для фотографій автомобілів використовуйте:
- Локальні зображення з папки `/assets/images/`
- Або Unsplash для реальних фотографій (через unsplash_tool)

## Важливо

⚠️ Всі SVG іконки оптимізовані для використання в React  
⚠️ Використовуйте `className` для стилізації замість inline styles  
⚠️ Всі іконки підтримують responsive розміри через Tailwind класи  
