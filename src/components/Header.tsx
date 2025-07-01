import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onCartClick: () => void;
  onAuthClick: () => void;
}

export function Header({ onSearchChange, onCategoryChange, onCartClick, onAuthClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'rings', name: 'Rings' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'bracelets', name: 'Bracelets' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gold-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center h-full">
            <img src="https://1e1f49807d.imgdist.com/pub/bfra/cx67fqqt/ukl/noq/ze2/logo.png" alt="Logo" className="h-32 w-32 object-contain cursor-pointer" onClick={() => window.location.reload()} />
          </div>

          {/* Centered Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center space-x-10">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="text-slate-700 hover:text-gold-600 px-3 py-2 text-base font-medium transition-colors duration-200 relative group"
                >
                  {category.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gradient group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Icon and Conditional Input */}
            {isSearchOpen ? (
              <input
                autoFocus
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onBlur={() => setIsSearchOpen(false)}
                onKeyDown={e => { if (e.key === 'Escape') setIsSearchOpen(false); }}
                placeholder="Search luxury items..."
                className="w-48 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
              />
            ) : (
              <button className="p-3 rounded-full hover:bg-gold-50 transition-colors" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-7 w-7 text-slate-400" />
              </button>
            )}
            <button
              onClick={user ? undefined : onAuthClick}
              className="flex items-center space-x-2 text-slate-700 hover:text-gold-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gold-50"
            >
              <User className="h-6 w-6" />
              {user && <span className="hidden sm:block text-sm font-medium">{user.name}</span>}
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-slate-700 hover:text-gold-600 transition-colors duration-200 rounded-lg hover:bg-gold-50"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex flex-col items-center mt-4">
          <nav>
            <div className="flex flex-wrap justify-center space-x-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="text-slate-700 hover:text-gold-600 px-2 py-2 text-base font-medium transition-colors duration-200 relative group"
                >
                  {category.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gradient group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}