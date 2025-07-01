import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import MobileMenuPortal from './MobileMenuPortal';

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
    { id: 'all', name: 'All' },
    { id: 'necklaces', name: 'Necklace' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'bracelets', name: 'Bracelets' },
    { id: 'rings', name: 'Anklets' }
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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gold-100 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center h-full pr-4 sm:pr-8 relative" style={{ zIndex: 1 }}>
            <img
              src="https://1e1f49807d.imgdist.com/pub/bfra/cx67fqqt/ukl/noq/ze2/logo.png"
              alt="Logo"
              className="h-20 w-20 sm:h-24 sm:w-24 object-contain cursor-pointer -my-8"
              style={{ maxHeight: '96px', maxWidth: '96px' }}
              onClick={() => window.location.reload()}
            />
          </div>

          {/* Hamburger for mobile */}
          <button
            className="lg:hidden p-3 rounded-full hover:bg-gold-50 transition-colors focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            {isMenuOpen ? <X className="h-8 w-8 text-slate-700" /> : <Menu className="h-8 w-8 text-slate-700" />}
          </button>

          {/* Centered Navigation (Desktop) */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="text-slate-700 hover:text-gold-600 px-4 py-2 text-lg font-medium transition-colors duration-200 relative group tracking-wide"
                >
                  {category.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gradient group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4 sm:space-x-8 pl-2 sm:pl-8">
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
                className="w-32 sm:w-48 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
              />
            ) : (
              <button className="p-3 rounded-full hover:bg-gold-50 transition-colors" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-6 w-6 sm:h-7 sm:w-7 text-slate-400" />
              </button>
            )}
            <button
              onClick={user ? undefined : onAuthClick}
              className="flex items-center space-x-1 sm:space-x-2 text-slate-700 hover:text-gold-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gold-50"
            >
              <User className="h-5 w-5 sm:h-6 sm:w-6" />
              {user && <span className="hidden sm:block text-xs sm:text-sm font-medium">{user.name}</span>}
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-slate-700 hover:text-gold-600 transition-colors duration-200 rounded-lg hover:bg-gold-50"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-medium animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Hamburger Dropdown */}
        {isMenuOpen && (
          <MobileMenuPortal>
            {/* Overlay */}
            <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            {/* Drawer */}
            <div
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs z-50 bg-white/60 backdrop-blur-2xl border-r border-white/30 shadow-2xl rounded-tr-3xl rounded-br-3xl flex flex-col justify-between py-10 px-6 animate-slide-in-glass"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/40 transition" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                <X className="h-7 w-7 text-slate-700" />
              </button>
              {/* Nav items */}
              <div className="flex flex-col gap-6 mt-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className="text-slate-800 hover:text-gold-600 px-2 py-3 text-xl font-semibold transition-colors duration-200 relative group text-left rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                  >
                    {category.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gradient group-hover:w-full transition-all duration-300"></span>
                  </button>
                ))}
              </div>
              {/* Auth & Cart */}
              <div className="flex flex-col gap-4 mt-12 border-t border-white/40 pt-8">
                <button
                  onClick={user ? handleLogout : onAuthClick}
                  className="flex items-center gap-3 text-slate-800 hover:text-gold-600 transition-colors duration-200 p-3 rounded-lg hover:bg-white/40 text-lg font-medium text-left"
                >
                  <User className="h-6 w-6" />
                  {user ? 'Logout' : 'Login'}
                </button>
                <button
                  onClick={onCartClick}
                  className="flex items-center gap-3 text-slate-800 hover:text-gold-600 transition-colors duration-200 p-3 rounded-lg hover:bg-white/40 text-lg font-medium text-left"
                >
                  <ShoppingCart className="h-6 w-6" />
                  Cart{itemCount > 0 ? ` (${itemCount})` : ''}
                </button>
              </div>
            </div>
          </MobileMenuPortal>
        )}
      </div>
    </header>
  );
}