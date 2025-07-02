import React, { useState } from 'react';
import { X, Eye, EyeOff, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [showPasswordDropdown, setShowPasswordDropdown] = useState(false);
  const { login } = useAuth();

  // Predefined credentials
  const credentials = [
    { email: 'admin@evershine.com', password: 'evershine123', name: 'Admin User' },
    { email: 'john@example.com', password: 'password123', name: 'John Doe' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const success = await login(email, password);
    setIsLoading(false);
    if (!success) setError('Invalid email or password');
    else onClose();
  };

  const handleEmailSelect = (selectedEmail: string) => {
    setEmail(selectedEmail);
    setShowEmailDropdown(false);
    // Auto-fill password if available
    const credential = credentials.find(c => c.email === selectedEmail);
    if (credential) {
      setPassword(credential.password);
    }
  };

  const handlePasswordSelect = (selectedPassword: string) => {
    setPassword(selectedPassword);
    setShowPasswordDropdown(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
        <div className="flex flex-col items-center mb-6">
          <img src="https://1e1f49807d.imgdist.com/pub/bfra/cx67fqqt/ukl/noq/ze2/logo.png" alt="Logo" className="w-24 h-24 object-contain mb-4" />
          <h2 className="text-2xl font-bold font-serif text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-4 text-sm">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setShowEmailDropdown(true)}
              onBlur={() => setTimeout(() => setShowEmailDropdown(false), 200)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="Click to select email"
            />
            
            {/* Email Dropdown */}
            {showEmailDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                {credentials.map((credential, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleEmailSelect(credential.email)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{credential.email}</div>
                      <div className="text-xs text-gray-500">{credential.name}</div>
                    </div>
                    {credential.email === 'admin@evershine.com' && (
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setShowPasswordDropdown(true)}
              onBlur={() => setTimeout(() => setShowPasswordDropdown(false), 200)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="Click to select password"
            />
            
            {/* Password Dropdown */}
            {showPasswordDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                {credentials.map((credential, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handlePasswordSelect(credential.password)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-gray-900">••••••••••</div>
                      <div className="text-xs text-gray-500">{credential.name}</div>
                    </div>
                    {credential.email === 'admin@evershine.com' && (
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold-600 hover:bg-gold-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          
          {/* Quick Login Hint */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 text-center">
              <strong>💡 Quick Login:</strong><br />
              Click on email/password fields to select from saved credentials
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}