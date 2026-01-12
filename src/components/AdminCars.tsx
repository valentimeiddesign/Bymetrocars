import React, { useState, useRef } from 'react';
import { Search, Plus, Edit, Trash2, Eye, DollarSign, Calendar, Gauge, Check, X, Upload, Image as ImageIcon, GripVertical, Database } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface CarImage {
  id: string;
  url: string;
  file?: File;
}

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  status: 'Available' | 'Sold' | 'Reserved' | 'Service';
  type: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Hatchback';
  images?: CarImage[];
  vin?: string;
  color?: string;
  transmission?: 'Automatic' | 'Manual';
  fuelType?: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  leads?: number;
  source: 'all' | 'db'; // Додано для визначення джерела
}

// Mock дані автомобілів - All Cars (внутрішня база)
const mockAllCars: Car[] = [
  {
    id: '1',
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    price: 25900,
    mileage: 15000,
    status: 'Available',
    type: 'Sedan',
    vin: '1HGBH41JXMN109186',
    color: 'Silver',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    leads: 45,
    images: [
      { id: '1-1', url: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800' }
    ],
    source: 'all'
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 32500,
    mileage: 8000,
    status: 'Available',
    type: 'Sedan',
    vin: '4T1BF1FK5HU123456',
    color: 'Blue',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    leads: 38,
    images: [
      { id: '2-1', url: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800' }
    ],
    source: 'all'
  },
  {
    id: '3',
    make: 'Ford',
    model: 'F-150',
    year: 2021,
    price: 42000,
    mileage: 25000,
    status: 'Reserved',
    type: 'Truck',
    vin: '1FTFW1E84MFA12345',
    color: 'Red',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    leads: 32,
    images: [
      { id: '3-1', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800' }
    ],
    source: 'all'
  },
  {
    id: '4',
    make: 'BMW',
    model: '3 Series',
    year: 2022,
    price: 38900,
    mileage: 12000,
    status: 'Sold',
    type: 'Sedan',
    vin: 'WBA8E9G59HNU12345',
    color: 'Black',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    leads: 28,
    images: [
      { id: '4-1', url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800' }
    ],
    source: 'all'
  },
  {
    id: '5',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 45900,
    mileage: 5000,
    status: 'Available',
    type: 'Sedan',
    vin: '5YJ3E1EA1KF123456',
    color: 'White',
    transmission: 'Automatic',
    fuelType: 'Electric',
    leads: 24,
    images: [
      { id: '5-1', url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800' }
    ],
    source: 'all'
  },
  {
    id: '6',
    make: 'Mazda',
    model: 'CX-5',
    year: 2023,
    price: 31500,
    mileage: 10000,
    status: 'Available',
    type: 'SUV',
    vin: 'JM3KFBDM5N0123456',
    color: 'Gray',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    leads: 22,
    images: [
      { id: '6-1', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800' }
    ],
    source: 'all'
  }
];

// Mock дані автомобілів - DB Cars (зовнішня база даних)
const mockDBCars: Car[] = [
  {
    id: 'db-1',
    make: 'Chevrolet',
    model: 'Silverado 1500',
    year: 2022,
    price: 48900,
    mileage: 18000,
    status: 'Available',
    type: 'Truck',
    vin: '1GCUYEED5NZ123456',
    color: 'Black',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    leads: 56,
    images: [
      { id: 'db-1-1', url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800' }
    ],
    source: 'db'
  },
  {
    id: 'db-2',
    make: 'Audi',
    model: 'Q5',
    year: 2023,
    price: 52900,
    mileage: 7000,
    status: 'Available',
    type: 'SUV',
    vin: 'WA1AAAF40P123456',
    color: 'White',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    leads: 42,
    images: [
      { id: 'db-2-1', url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800' }
    ],
    source: 'db'
  },
  {
    id: 'db-3',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2022,
    price: 44900,
    mileage: 15000,
    status: 'Reserved',
    type: 'Sedan',
    vin: '55SWF4JB1NU123456',
    color: 'Silver',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    leads: 38,
    images: [
      { id: 'db-3-1', url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800' }
    ],
    source: 'db'
  },
  {
    id: 'db-4',
    make: 'Jeep',
    model: 'Grand Cherokee',
    year: 2023,
    price: 46500,
    mileage: 9000,
    status: 'Available',
    type: 'SUV',
    vin: '1C4RJFBG0PC123456',
    color: 'Blue',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    leads: 35,
    images: [
      { id: 'db-4-1', url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800' }
    ],
    source: 'db'
  }
];

// Draggable Image Component
interface DraggableImageProps {
  image: CarImage;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  onRemove: () => void;
}

function DraggableImage({ image, index, moveImage, onRemove }: DraggableImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'image',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'image',
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`relative group ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
        <img src={image.url} alt="" className="w-full h-full object-cover" />
        
        {/* Drag Handle */}
        <div className="absolute top-2 left-2 bg-white/90 rounded p-1 cursor-move">
          <GripVertical className="w-4 h-4 text-gray-600" />
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Primary Badge */}
        {index === 0 && (
          <div className="absolute bottom-2 left-2 bg-[rgb(139,130,246)] text-white text-xs px-2 py-1 rounded">
            Primary
          </div>
        )}
      </div>
    </div>
  );
}

// Image Upload Component
interface ImageUploadProps {
  images: CarImage[];
  onChange: (images: CarImage[]) => void;
}

function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );

    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const newImages: CarImage[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      file
    }));

    onChange([...images, ...newImages]);
  };

  const moveImage = (dragIndex: number, hoverIndex: number) => {
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, draggedImage);
    onChange(updatedImages);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-[rgb(139,130,246)] bg-purple-50'
            : 'border-gray-300 hover:border-[rgb(139,130,246)] hover:bg-gray-50'
        }`}
      >
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold text-[rgb(139,130,246)]">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Images Grid */}
      {images.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-3">
            {images.length} image{images.length !== 1 ? 's' : ''} (Drag to reorder, first image is primary)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <DraggableImage
                key={image.id}
                image={image}
                index={index}
                moveImage={moveImage}
                onRemove={() => removeImage(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminCars() {
  const [activeDatabase, setActiveDatabase] = useState<'all' | 'db'>('all');
  const [allCars, setAllCars] = useState<Car[]>(mockAllCars);
  const [dbCars, setDBCars] = useState<Car[]>(mockDBCars);
  
  // Вибираємо активну базу даних
  const cars = activeDatabase === 'all' ? allCars : dbCars;
  const setCars = activeDatabase === 'all' ? setAllCars : setDBCars;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [newCar, setNewCar] = useState<Partial<Car>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    status: 'Available',
    type: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    color: '',
    vin: '',
    leads: 0,
    images: [],
    source: activeDatabase // Додано для визначення джерела
  });

  // Фільтрація автомобілів
  const filteredCars = cars.filter(car => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      car.make.toLowerCase().includes(searchLower) ||
      car.model.toLowerCase().includes(searchLower) ||
      car.year.toString().includes(searchLower) ||
      car.vin?.toLowerCase().includes(searchLower);
    
    const matchesStatus = filterStatus === 'all' || car.status === filterStatus;
    const matchesType = filterType === 'all' || car.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700';
      case 'Sold': return 'bg-purple-100 text-purple-700';
      case 'Reserved': return 'bg-yellow-100 text-yellow-700';
      case 'Service': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddCar = () => {
    if (newCar.make && newCar.model && newCar.year && newCar.price) {
      const car: Car = {
        id: Date.now().toString(),
        make: newCar.make,
        model: newCar.model,
        year: newCar.year,
        price: newCar.price,
        mileage: newCar.mileage || 0,
        status: newCar.status || 'Available',
        type: newCar.type || 'Sedan',
        transmission: newCar.transmission || 'Automatic',
        fuelType: newCar.fuelType || 'Gasoline',
        color: newCar.color,
        vin: newCar.vin,
        leads: 0,
        images: newCar.images || [],
        source: 'all' // Додано для визначення джерела
      };
      setCars([...cars, car]);
      setIsAddingCar(false);
      setNewCar({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        mileage: 0,
        status: 'Available',
        type: 'Sedan',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        color: '',
        vin: '',
        leads: 0,
        images: [],
        source: 'all' // Додано для визначення джерела
      });
    }
  };

  const handleUpdateCar = () => {
    if (editingCar) {
      setCars(cars.map(car => car.id === editingCar.id ? editingCar : car));
      setEditingCar(null);
    }
  };

  const handleDeleteCar = (carId: string) => {
    if (confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter(car => car.id !== carId));
    }
  };

  const updateCarStatus = (carId: string, newStatus: Car['status']) => {
    setCars(cars.map(car => 
      car.id === carId ? { ...car, status: newStatus } : car
    ));
  };

  const CarFormFields = ({ car, onChange }: { car: Partial<Car>, onChange: (updates: Partial<Car>) => void }) => (
    <div className="space-y-6">
      {/* Images Section */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Photos
        </label>
        <DndProvider backend={HTML5Backend}>
          <ImageUpload
            images={car.images || []}
            onChange={(images) => onChange({ images })}
          />
        </DndProvider>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Make *</label>
          <input
            type="text"
            value={car.make || ''}
            onChange={(e) => onChange({ make: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
            placeholder="Honda, Toyota, Ford..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Model *</label>
          <input
            type="text"
            value={car.model || ''}
            onChange={(e) => onChange({ model: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
            placeholder="Civic, Camry, F-150..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Year *</label>
          <input
            type="number"
            value={car.year || new Date().getFullYear()}
            onChange={(e) => onChange({ year: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
            min="2000"
            max={new Date().getFullYear() + 1}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Price ($) *</label>
          <input
            type="number"
            value={car.price || 0}
            onChange={(e) => onChange({ price: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Mileage</label>
          <input
            type="number"
            value={car.mileage || 0}
            onChange={(e) => onChange({ mileage: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Type</label>
          <select
            value={car.type || 'Sedan'}
            onChange={(e) => onChange({ type: e.target.value as Car['type'] })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
            <option value="Coupe">Coupe</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
          <select
            value={car.status || 'Available'}
            onChange={(e) => onChange({ status: e.target.value as Car['status'] })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Reserved">Reserved</option>
            <option value="Service">Service</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Color</label>
          <input
            type="text"
            value={car.color || ''}
            onChange={(e) => onChange({ color: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
            placeholder="Black, White, Blue..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">VIN</label>
          <input
            type="text"
            value={car.vin || ''}
            onChange={(e) => onChange({ vin: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
            placeholder="17-character VIN"
            maxLength={17}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Transmission</label>
          <select
            value={car.transmission || 'Automatic'}
            onChange={(e) => onChange({ transmission: e.target.value as Car['transmission'] })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Fuel Type</label>
          <select
            value={car.fuelType || 'Gasoline'}
            onChange={(e) => onChange({ fuelType: e.target.value as Car['fuelType'] })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
          >
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[rgb(5,15,35)]">Cars Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your vehicle inventory</p>
          </div>
          <button
            onClick={() => setIsAddingCar(true)}
            className="flex items-center gap-2 bg-[rgb(139,130,246)] text-white px-6 py-3 rounded-lg hover:bg-[rgb(120,110,230)] transition-colors font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add New Car
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Database Selector */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100">
          <div className="flex items-center gap-4">
            <Database className="w-5 h-5 text-gray-500" />
            <div className="flex gap-2">
              <button
                onClick={() => setActiveDatabase('all')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  activeDatabase === 'all'
                    ? 'bg-[rgb(139,130,246)] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Cars
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-white/20">
                  {allCars.length}
                </span>
              </button>
              <button
                onClick={() => setActiveDatabase('db')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  activeDatabase === 'db'
                    ? 'bg-[rgb(139,130,246)] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                DB Cars
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-white/20">
                  {dbCars.length}
                </span>
              </button>
            </div>
            <div className="ml-auto text-sm text-gray-500">
              Viewing: <span className="font-semibold text-[rgb(139,130,246)]">
                {activeDatabase === 'all' ? 'All Cars Database' : 'DB Cars Database'}
              </span>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by make, model, year, VIN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
              >
                <option value="all">All Types</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
              >
                <option value="all">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Reserved">Reserved</option>
                <option value="Service">Service</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{cars.filter(c => c.status === 'Available').length}</p>
              <p className="text-xs text-gray-500 mt-1">Available</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{cars.filter(c => c.status === 'Sold').length}</p>
              <p className="text-xs text-gray-500 mt-1">Sold</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{cars.filter(c => c.status === 'Reserved').length}</p>
              <p className="text-xs text-gray-500 mt-1">Reserved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{cars.length}</p>
              <p className="text-xs text-gray-500 mt-1">Total</p>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {/* Car Image */}
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                {car.images && car.images.length > 0 ? (
                  <img 
                    src={car.images[0].url} 
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-gray-400">{car.make.charAt(0)}{car.model.charAt(0)}</p>
                      <p className="text-sm text-gray-500 mt-2">{car.year}</p>
                    </div>
                  </div>
                )}
                
                {/* Image Count Badge */}
                {car.images && car.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    {car.images.length}
                  </div>
                )}
              </div>

              {/* Car Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-[rgb(5,15,35)]">{car.year} {car.make} {car.model}</h3>
                    <p className="text-sm text-gray-500">{car.type} • {car.color}</p>
                  </div>
                  <select
                    value={car.status}
                    onChange={(e) => updateCarStatus(car.id, e.target.value as Car['status'])}
                    className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(car.status)}`}
                  >
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Service">Service</option>
                  </select>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price
                    </span>
                    <span className="font-semibold text-[rgb(5,15,35)]">${car.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Gauge className="w-4 h-4" />
                      Mileage
                    </span>
                    <span className="font-semibold text-[rgb(5,15,35)]">{car.mileage.toLocaleString()} km</span>
                  </div>
                  {car.leads !== undefined && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Leads</span>
                      <span className="font-semibold text-purple-600">{car.leads}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingCar(car)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[rgb(139,130,246)] text-white rounded-lg hover:bg-[rgb(120,110,230)] transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCar(car.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">No cars found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Add Car Modal */}
      {isAddingCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={() => setIsAddingCar(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-xl">
              <h2 className="text-2xl font-bold text-[rgb(5,15,35)]">Add New Car</h2>
              <button onClick={() => setIsAddingCar(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <CarFormFields 
                car={newCar} 
                onChange={(updates) => setNewCar({ ...newCar, ...updates })} 
              />

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
                <button
                  onClick={() => setIsAddingCar(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCar}
                  className="flex-1 px-6 py-3 bg-[rgb(139,130,246)] text-white rounded-lg hover:bg-[rgb(120,110,230)] transition-colors font-semibold"
                >
                  Add Car
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Car Modal */}
      {editingCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={() => setEditingCar(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-xl">
              <h2 className="text-2xl font-bold text-[rgb(5,15,35)]">Edit Car</h2>
              <button onClick={() => setEditingCar(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <CarFormFields 
                car={editingCar} 
                onChange={(updates) => setEditingCar({ ...editingCar, ...updates })} 
              />

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
                <button
                  onClick={() => setEditingCar(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateCar}
                  className="flex-1 px-6 py-3 bg-[rgb(139,130,246)] text-white rounded-lg hover:bg-[rgb(120,110,230)] transition-colors font-semibold"
                >
                  Update Car
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}