import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Cart } from './components/Cart';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { products } from './data/products';
import { Product } from './types';
import { Sparkles, Award, Shield, Truck, ArrowUp, Settings } from 'lucide-react';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Debug logging
  React.useEffect(() => {
    console.log('Current user:', user);
    console.log('Is admin?', user?.isAdmin);
  }, [user]);

  React.useEffect(() => {
    setIsAuthModalOpen(!user);
  }, [user]);

  React.useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setTimeout(() => {
      productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  // --- WEBSITE FOR ALL USERS (INCLUDING ADMIN) ---
  return (
      <CartProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gold-50">
          <Header
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onCartClick={() => setIsCartOpen(true)}
            onAuthClick={() => setIsAuthModalOpen(true)}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="mb-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-100/20 via-rose-100/20 to-emerald-100/20 rounded-3xl"></div>
              <div className="relative py-16 px-8">
                <div className="inline-flex items-center bg-luxury-gradient text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-float">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Handcrafted Excellence Since 2024
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                  Exquisite{' '}
                  <span className="bg-luxury-gradient bg-clip-text text-transparent italic font-serif">
                    Handicrafts
                  </span>
                  <br />
                  & Fine Jewelry
                </h1>
                <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Discover timeless treasures crafted by master artisans. Each piece tells a story of 
                  tradition, passion, and uncompromising quality that transcends generations.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-gold-200">
                    <div className="text-3xl font-serif font-bold text-gold-600 mb-1">500+</div>
                    <div className="text-sm text-slate-600 font-medium">Unique Pieces</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-emerald-200">
                    <div className="text-3xl font-serif font-bold text-emerald-600 mb-1">Free</div>
                    <div className="text-sm text-slate-600 font-medium">Worldwide Shipping</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-rose-200">
                    <div className="text-3xl font-serif font-bold text-rose-600 mb-1">24/7</div>
                    <div className="text-sm text-slate-600 font-medium">Concierge Service</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="mb-16" ref={productsSectionRef}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">
                    {selectedCategory === 'all' 
                      ? 'Our Collections' 
                      : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')}`}
                  </h2>
                  {searchTerm && (
                    <p className="text-lg text-slate-600">
                      Search results for "{searchTerm}"
                    </p>
                  )}
                </div>
                <div className="text-sm text-slate-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
                  {filteredProducts.length} piece{filteredProducts.length !== 1 ? 's' : ''} available
                </div>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200">
                  <div className="text-slate-400 mb-4">
                    <Sparkles className="mx-auto h-16 w-16" />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-3">No treasures found</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Try adjusting your search or explore our different collections to discover the perfect piece.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.slice(0, 38).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="mt-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-600/10 via-transparent to-rose-600/10"></div>
              <div className="relative">
                <h2 className="text-4xl font-serif font-bold text-center mb-4">
                  The Evershine Promise
                </h2>
                <p className="text-xl text-center text-slate-300 mb-12 max-w-3xl mx-auto">
                  Every piece in our collection represents the pinnacle of craftsmanship and luxury
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-luxury-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold mb-3">Handcrafted Excellence</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Each piece is meticulously crafted by master artisans using time-honored techniques passed down through generations.
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-emerald-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold mb-3">Certified Authenticity</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Every item comes with a certificate of authenticity and detailed provenance documentation.
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-rose-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold mb-3">Lifetime Guarantee</h3>
                    <p className="text-slate-300 leading-relaxed">
                      We stand behind our craftsmanship with comprehensive warranties and lifetime repair services.
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Truck className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold mb-3">White Glove Service</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Complimentary worldwide shipping with secure packaging and personalized concierge service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-slate-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-3xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent mb-6">
                    Evershine
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
                    Curating the world's finest handicrafts and jewelry since 2024. 
                    Each piece represents a legacy of artisanal excellence and timeless beauty.
                  </p>
                  <div className="flex space-x-4">
                    <a href="https://www.instagram.com/evershineandglowjewellery?igsh=MnQ2c2J6bTZxbzUy&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-400 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                      </svg>
                    </a>
                    <a href="https://evershineandglow.mini.site/?path=%2F" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#fc8019] transition-colors duration-200">
                      <img src="https://1e1f49807d.imgdist.com/pub/bfra/cx67fqqt/cvf/vxk/3ob/swiggy.svg" alt="Swiggy" className="w-6 h-6 object-contain filter invert brightness-0" />
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-lg mb-6">Collections</h4>
                  <ul className="space-y-3 text-slate-300">
                    <li><a href="#" className="hover:text-gold-400 transition-colors">Fine Jewelry</a></li>
                    <li><a href="#" className="hover:text-gold-400 transition-colors">Handcrafted Accessories</a></li>
                    <li><a href="#" className="hover:text-gold-400 transition-colors">Home Décor</a></li>
                    <li><a href="#" className="hover:text-gold-400 transition-colors">Limited Editions</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-lg mb-6">Customer Care</h4>
                  <ul className="space-y-3 text-slate-300">
                    <li><a href="#" className="hover:text-gold-400 transition-colors">Contact Us</a></li>
                    <li><a href="#" className="hover:text-gold-400 transition-colors">Size Guide</a></li>
                    <li><a href="#" className="hover:text-gold-400 transition-colors">Care Instructions</a></li>
                    <li><a href="#" className="hover:text-gold-400 transition-colors">Returns & Exchanges</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
                <p>&copy; 2024 Evershine. All rights reserved. | Crafted with passion since 2024</p>
              </div>
            </div>
          </footer>

          {/* Modals */}
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              isOpen={true}
              onClose={() => setSelectedProduct(null)}
            />
          )}

          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={handleCheckout}
          />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />

          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
          />

          {/* Admin Panel Modal */}
          <AdminPanel
            isOpen={isAdminPanelOpen}
            onClose={() => setIsAdminPanelOpen(false)}
          />
        </div>

        {/* Admin Settings Gear Icon - Only visible for admin users when dashboard is closed */}
        {user?.isAdmin && (
          <button
            onClick={() => setIsAdminPanelOpen(true)}
            className={`fixed bottom-8 left-8 z-50 bg-gradient-to-tr from-slate-700 to-slate-900 text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-500 ease-out group border-2 border-gold-400 ${
              isAdminPanelOpen 
                ? 'opacity-0 scale-50 -translate-y-4 pointer-events-none' 
                : 'opacity-100 scale-100 translate-y-0'
            }`}
            aria-label="Admin Settings"
          >
            <Settings className="h-7 w-7 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={handleScrollTop}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-tr from-gold-400 to-rose-400 text-white p-4 rounded-full shadow-xl hover:scale-110 hover:rotate-12 hover:shadow-2xl transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-7 w-7 group-hover:animate-bounce" />
          </button>
        )}
      </CartProvider>
  );
}

export default App;