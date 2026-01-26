import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { Car } from '../types/car';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface BookTestDriveModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

export function BookTestDriveModal({ car, isOpen, onClose }: BookTestDriveModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-baa3db23/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          notes: formData.message,
          carInterest: `${car.year} ${car.make} ${car.model}`,
          source: 'Test Drive Form',
          status: 'New'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit lead');
      }

      alert("Test drive request submitted successfully! We will contact you shortly.");
      onClose();
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-[rgb(5,15,35)]">Book a Test Drive</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left Side - Car Info */}
          <div className="w-full md:w-5/12 p-6 bg-gray-50">
            <div className="bg-white p-2 rounded-2xl shadow-sm mb-4">
              <img 
                src={car.images?.[0] || car.image} 
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            
            <h3 className="text-lg font-bold text-[rgb(5,15,35)] mb-2">
              {car.year} {car.make} {car.model}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 text-[rgb(139,130,246)]" />
              <span>{car.location || "400 Sackville Drive"}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
              <Check className="w-4 h-4" />
              <span>No accidents. View CarFax</span>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-7/12 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[rgb(139,130,246)] focus:ring-1 focus:ring-[rgb(139,130,246)] transition-all placeholder:text-gray-400"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[rgb(139,130,246)] focus:ring-1 focus:ring-[rgb(139,130,246)] transition-all placeholder:text-gray-400"
                />
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[rgb(139,130,246)] focus:ring-1 focus:ring-[rgb(139,130,246)] transition-all placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[rgb(139,130,246)] focus:ring-1 focus:ring-[rgb(139,130,246)] transition-all placeholder:text-gray-400 resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[rgb(139,130,246)] text-white font-medium py-3 rounded-xl hover:bg-[rgb(120,110,230)] transition-colors shadow-lg shadow-[rgba(139,130,246,0.25)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
              
              <p className="text-center text-xs text-gray-400 mt-4">
                We respect your privacy
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
