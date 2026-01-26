import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, DollarSign, Calendar, Gauge, Check, X, Upload, GripVertical, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as carApi from '../utils/carApi';
import { getSupabaseClient } from '../utils/carApi';
import { CarImportExport } from './CarImportExport';
import type { Car } from '../types/car';

interface CarImage {
  id: string;
  url: string;
  file?: File;
}

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

  const [{ isDragging }, drag] = useDrag({
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
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Modal state
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  
  // Images state for the form
  const [formImages, setFormImages] = useState<CarImage[]>([]);
  
  const initialCarState: Partial<Car> = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    status: 'Available',
    type: 'Sedan',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    color: '',
    vin: '',
    leads: 0,
    images: [],
    source: 'db',
    description: '',
    features: [],
    engine: '',
    drivetrain: '',
    doors: 4,
    seats: 5
  };

  const [newCar, setNewCar] = useState<Partial<Car>>(initialCarState);

  // Load data from Supabase
  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await carApi.fetchAllCars();
      setCars(data);
    } catch (err) {
      console.error('Error loading cars:', err);
      setError('Failed to load cars from database');
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (images: CarImage[]): Promise<string[]> => {
    const supabase = getSupabaseClient();
    const urls: string[] = [];

    for (const img of images) {
      if (img.file) {
        // Upload new file
        const fileName = `${Date.now()}-${img.file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const { data, error } = await supabase.storage
          .from('car-images')
          .upload(fileName, img.file);

        if (error) {
          console.error('Error uploading image:', error);
          // If upload fails, we might want to skip or handle error
          // For now, continue
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('car-images')
          .getPublicUrl(fileName);
          
        urls.push(publicUrl);
      } else {
        // Keep existing URL
        urls.push(img.url);
      }
    }
    return urls;
  };

  const handleAddCar = async () => {
    if (!newCar.make || !newCar.model || !newCar.year || !newCar.price) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setActionLoading(true);
      
      // Upload images first
      const uploadedUrls = await uploadImages(formImages);
      
      const carToCreate = {
        ...newCar,
        images: uploadedUrls,
        source: 'db' as const
      };

      const createdCar = await carApi.createCar(carToCreate);
      
      if (createdCar) {
        await loadCars();
        setIsAddingCar(false);
        setNewCar(initialCarState);
        setFormImages([]);
      } else {
        setError('Failed to create car');
      }
    } catch (err) {
      console.error('Error creating car:', err);
      setError('An error occurred while creating the car');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateCar = async () => {
    if (!editingCar) return;

    try {
      setActionLoading(true);
      
      // Upload images first
      const uploadedUrls = await uploadImages(formImages);
      
      const carToUpdate = {
        ...editingCar,
        images: uploadedUrls
      };

      const updatedCar = await carApi.updateCar(editingCar.id, carToUpdate);
      
      if (updatedCar) {
        await loadCars();
        setEditingCar(null);
        setFormImages([]);
      } else {
        setError('Failed to update car');
      }
    } catch (err) {
      console.error('Error updating car:', err);
      setError('An error occurred while updating the car');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCar = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car? This cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(true);
      const success = await carApi.deleteCar(carId);
      
      if (success) {
        // Optimistic update
        setCars(cars.filter(c => c.id !== carId));
      } else {
        setError('Failed to delete car');
        await loadCars(); // Revert on failure
      }
    } catch (err) {
      console.error('Error deleting car:', err);
      setError('An error occurred while deleting the car');
    } finally {
      setActionLoading(false);
    }
  };

  const updateCarStatus = async (carId: string, newStatus: Car['status']) => {
    try {
      // Optimistic update
      setCars(cars.map(c => c.id === carId ? { ...c, status: newStatus } : c));
      
      const success = await carApi.updateCarStatus(carId, newStatus);
      if (!success) {
        await loadCars(); // Revert if failed
        setError('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
    }
  };

  const startEditCar = (car: Car) => {
    setEditingCar(car);
    // Transform string URLs to CarImage objects
    const images: CarImage[] = (car.images || []).map((img, index) => ({
      id: `existing-${index}`,
      url: carApi.getCarImageUrl(img)
    }));
    setFormImages(images);
  };

  const startAddCar = () => {
    setNewCar(initialCarState);
    setFormImages([]);
    setIsAddingCar(true);
  };

  // Filter Logic
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

  const CarFormFields = ({ car, onChange }: { car: Partial<Car>, onChange: (updates: Partial<Car>) => void }) => (
    <div className="space-y-6">
      {/* Images Section */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Photos
        </label>
        <DndProvider backend={HTML5Backend}>
          <ImageUpload
            images={formImages}
            onChange={setFormImages}
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
            min="1900"
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
          <label className="block text-sm font-medium text-gray-600 mb-2">Mileage (km)</label>
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
            <option value="Van">Van</option>
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
            <option value="Pending">Pending</option>
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
            value={car.fuel_type || 'Gasoline'}
            onChange={(e) => onChange({ fuel_type: e.target.value as Car['fuel_type'] })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
          >
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Engine</label>
          <input
            type="text"
            value={car.engine || ''}
            onChange={(e) => onChange({ engine: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
            placeholder="2.0L 4-Cylinder"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Drivetrain</label>
          <input
            type="text"
            value={car.drivetrain || ''}
            onChange={(e) => onChange({ drivetrain: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
            placeholder="FWD, AWD, 4x4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Seats</label>
          <input
            type="number"
            value={car.seats || 5}
            onChange={(e) => onChange({ seats: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
            min="2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
          <textarea
            value={car.description || ''}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] h-24"
            placeholder="Enter detailed description..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Features (comma separated)</label>
          <textarea
            value={Array.isArray(car.features) ? car.features.join(', ') : ''}
            onChange={(e) => onChange({ features: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] h-24"
            placeholder="Bluetooth, Backup Camera, Heated Seats..."
          />
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
            <p className="text-sm text-gray-500 mt-1">
              {cars.length} vehicles in database
              {loading && <span className="ml-2 text-blue-500">Refreshing...</span>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadCars}
              className="p-2 text-gray-500 hover:text-[rgb(139,130,246)] hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={startAddCar}
              className="flex items-center gap-2 bg-[rgb(139,130,246)] text-white px-6 py-3 rounded-lg hover:bg-[rgb(120,110,230)] transition-colors font-semibold shadow-lg shadow-indigo-200"
            >
              <Plus className="w-5 h-5" />
              Add New Car
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Import / Export Section */}
        <div className="mb-6">
          <CarImportExport onImportComplete={loadCars} />
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
                  placeholder="Search by make, model, VIN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] text-gray-600"
              >
                <option value="all">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Reserved">Reserved</option>
                <option value="Service">Service</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] text-gray-600"
              >
                <option value="all">All Types</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cars List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mileage</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading && cars.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(139,130,246)]"></div>
                        <p>Loading inventory...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredCars.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No cars found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredCars.map((car) => (
                    <tr key={car.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                            {car.images && car.images.length > 0 && car.images[0] ? (
                              <img 
                                src={typeof car.images[0] === 'string' ? car.images[0] : (car.images[0] as any).url} 
                                alt="" 
                                className="w-full h-full object-cover" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <ImageIcon className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-[rgb(5,15,35)]">{car.year} {car.make} {car.model}</div>
                            <div className="text-xs text-gray-500">VIN: {car.vin || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">${car.price.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(car.status)}`}>
                          {car.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600">{car.type}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600">{car.mileage.toLocaleString()} km</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => startEditCar(car)}
                            className="p-2 text-gray-500 hover:text-[rgb(139,130,246)] hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {(isAddingCar || editingCar) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => { setIsAddingCar(false); setEditingCar(null); }}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-[rgb(5,15,35)]">
                {isAddingCar ? 'Add New Car' : 'Edit Car'}
              </h2>
              <button onClick={() => { setIsAddingCar(false); setEditingCar(null); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <CarFormFields 
                car={isAddingCar ? newCar : (editingCar || {})} 
                onChange={(updates) => isAddingCar ? setNewCar({...newCar, ...updates}) : setEditingCar(editingCar ? {...editingCar, ...updates} : null)} 
              />
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
              <button 
                onClick={() => { setIsAddingCar(false); setEditingCar(null); }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={isAddingCar ? handleAddCar : handleUpdateCar}
                className="px-6 py-2 bg-[rgb(139,130,246)] text-white rounded-lg font-bold hover:bg-[rgb(120,110,230)] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={actionLoading}
              >
                {actionLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                {isAddingCar ? 'Create Car' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}