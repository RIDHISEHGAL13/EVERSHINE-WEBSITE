import React from 'react';
import { Star, ShoppingCart, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 hover:border-gold-300 relative"
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-semibold text-lg">Currently Unavailable</span>
          </div>
        )}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="h-6 w-6 text-gold-400 animate-pulse" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif font-semibold text-lg text-slate-900 group-hover:text-gold-700 transition-colors duration-300 line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-gold-400 fill-current'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-slate-600 font-medium">
            {product.rating} ({product.reviews})
          </span>
        </div>
        
        <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          
          {product.inStock && (
            <button
              onClick={handleAddToCart}
              className="bg-luxury-gradient hover:shadow-lg text-white p-3 rounded-xl transition-all duration-300 group-hover:scale-110 hover:rotate-3"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="mt-4 text-xs text-slate-500 font-medium">
          by {product.brand}
        </div>
      </div>
    </div>
  );
}