import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Car, Users, DollarSign, Clock, CheckCircle } from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  // Mock дані для статистики
  const stats = {
    totalCars: 358,
    availableCars: 312,
    soldCars: 46,
    totalLeads: 842,
    newLeads: 127,
    convertedLeads: 46,
    conversionRate: 5.5,
    averagePrice: 28500
  };

  // Дані для графіку лідів по місяцях
  const leadsData = [
    { month: 'Jan', leads: 65, conversions: 4 },
    { month: 'Feb', leads: 78, conversions: 5 },
    { month: 'Mar', leads: 92, conversions: 7 },
    { month: 'Apr', leads: 85, conversions: 6 },
    { month: 'May', leads: 103, conversions: 8 },
    { month: 'Jun', leads: 127, conversions: 9 },
  ];

  // Дані для графіку лідів по автомобілях (топ-5)
  const leadsByCarData = [
    { car: 'Honda Civic', leads: 45 },
    { car: 'Toyota Camry', leads: 38 },
    { car: 'Ford F-150', leads: 32 },
    { car: 'BMW 3 Series', leads: 28 },
    { car: 'Tesla Model 3', leads: 24 },
  ];

  // Дані для статусів автомобілів
  const carStatusData = [
    { name: 'Available', value: 312, color: '#10b981' },
    { name: 'Sold', value: 46, color: '#8b82f6' },
  ];

  // Дані для джерел лідів
  const leadSourceData = [
    { name: 'Quiz', value: 342, color: '#8b82f6' },
    { name: 'Contact Form', value: 256, color: '#3b82f6' },
    { name: 'Financing', value: 178, color: '#10b981' },
    { name: 'Trade-In', value: 66, color: '#f59e0b' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-[rgb(5,15,35)]">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your dealership performance</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Cars */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Cars</p>
                <p className="text-3xl font-bold text-[rgb(5,15,35)] mt-2">{stats.totalCars}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stats.availableCars} available
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-[rgb(139,130,246)]" />
              </div>
            </div>
          </div>

          {/* Total Leads */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Leads</p>
                <p className="text-3xl font-bold text-[rgb(5,15,35)] mt-2">{stats.totalLeads}</p>
                <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {stats.newLeads} new this month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Cars Sold */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Cars Sold</p>
                <p className="text-3xl font-bold text-[rgb(5,15,35)] mt-2">{stats.soldCars}</p>
                <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  This month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Conversion Rate</p>
                <p className="text-3xl font-bold text-[rgb(5,15,35)] mt-2">{stats.conversionRate}%</p>
                <p className="text-xs text-gray-500 mt-2">
                  {stats.convertedLeads} / {stats.totalLeads} leads
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads Over Time */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-[rgb(5,15,35)] mb-4">Leads & Conversions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="leads" stroke="#8b82f6" strokeWidth={2} name="Leads" />
                <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="Conversions" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Cars by Leads */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-[rgb(5,15,35)] mb-4">Top Cars by Leads</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadsByCarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="car" stroke="#888" angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="leads" fill="#8b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Car Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-[rgb(5,15,35)] mb-4">Car Status Distribution</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={carStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {carStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {carStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Sources */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-[rgb(5,15,35)] mb-4">Lead Sources</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leadSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {leadSourceData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-[rgb(5,15,35)] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('admin-leads')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
            >
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-semibold text-[rgb(5,15,35)]">View All Leads</p>
              <p className="text-sm text-gray-500 mt-1">{stats.newLeads} new leads waiting</p>
            </button>

            <button
              onClick={() => onNavigate('admin-cars')}
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
            >
              <Car className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-semibold text-[rgb(5,15,35)]">Manage Cars</p>
              <p className="text-sm text-gray-500 mt-1">{stats.availableCars} cars in inventory</p>
            </button>

            <button
              onClick={() => onNavigate('admin-cars')}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
            >
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-semibold text-[rgb(5,15,35)]">Add New Car</p>
              <p className="text-sm text-gray-500 mt-1">Add vehicle to inventory</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
