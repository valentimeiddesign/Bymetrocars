import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - в реальному проекті тут буде API запит
    if (email === 'admin@buymetro.ca' && password === 'admin123') {
      setError('');
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[rgb(139,130,246)] to-[rgb(100,90,200)] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[rgb(5,15,35)] mb-2">Admin Panel</h1>
          <p className="text-[rgb(5,15,35)] opacity-60">Buy Metro Pre-Owned</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[rgb(5,15,35)] mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] focus:border-transparent"
              placeholder="admin@buymetro.ca"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[rgb(5,15,35)] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[rgb(139,130,246)] text-white font-semibold py-3 rounded-lg hover:bg-[rgb(120,110,230)] transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800 font-medium mb-1">Demo Credentials:</p>
          <p className="text-xs text-blue-600">Email: admin@buymetro.ca</p>
          <p className="text-xs text-blue-600">Password: admin123</p>
        </div>
      </div>
    </div>
  );
}
