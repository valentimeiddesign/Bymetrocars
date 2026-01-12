import React, { useState } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { AdminLeads } from './AdminLeads';
import { AdminCars } from './AdminCars';
import { AdminSettings } from './AdminSettings';
import { LayoutDashboard, Users, Car, LogOut, Menu, X, Settings } from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'leads' | 'cars' | 'settings'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads' as const, label: 'Leads', icon: Users },
    { id: 'cars' as const, label: 'Cars', icon: Car },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const handleNavigate = (page: string) => {
    if (page === 'admin-leads') {
      setCurrentPage('leads');
    } else if (page === 'admin-cars') {
      setCurrentPage('cars');
    } else if (page === 'admin-dashboard') {
      setCurrentPage('dashboard');
    } else if (page === 'admin-settings') {
      setCurrentPage('settings');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-[rgb(5,15,35)]">Buy Metro</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[rgb(139,130,246)] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-[rgb(5,15,35)]">Buy Metro</h1>
                <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setCurrentPage(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-[rgb(139,130,246)] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-[rgb(5,15,35)]">Admin Panel</h1>
          <button onClick={onLogout} className="text-red-600">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {currentPage === 'dashboard' && <AdminDashboard onNavigate={handleNavigate} />}
          {currentPage === 'leads' && <AdminLeads />}
          {currentPage === 'cars' && <AdminCars />}
          {currentPage === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}