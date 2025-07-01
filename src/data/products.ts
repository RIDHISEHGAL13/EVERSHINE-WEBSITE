import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Halo golden frame hoops',
    price: 649,
    originalPrice: 749,
    image: 'https://minis-media-assets.swiggy.com/swiggymini/image/upload/w_256,h_256,c_fit,fl_lossy,q_auto:eco,f_auto/IMAGE/b3a4d236-14c5-4649-89d1-d4420bd7b10a/lNLO5sDDoD-XBGnYC5d9C-06E589FD-9E35-453C-A17A-6E7CDF459399.jpg',
    images: [
      'https://minis-media-assets.swiggy.com/swiggymini/image/upload/w_256,h_256,c_fit,fl_lossy,q_auto:eco,f_auto/IMAGE/b3a4d236-14c5-4649-89d1-d4420bd7b10a/lNLO5sDDoD-XBGnYC5d9C-06E589FD-9E35-453C-A17A-6E7CDF459399.jpg'
    ],
    description: 'Elegant golden hoops with a halo frame design.',
    category: 'earrings',
    brand: 'Evershine',
    rating: 4.5,
    reviews: 10,
    inStock: true,
    features: [
      'Halo frame',
      'Gold finish'
    ],
    specifications: {
      'Material': 'Gold plated',
      'Weight': '10g'
    }
  },
  {
    id: '2',
    name: 'Vintage Rose Gold Ring',
    price: 1599,
    image: 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1454167/pexels-photo-1454167.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Timeless vintage-inspired ring crafted in rose gold with intricate filigree work. A perfect blend of classic elegance and modern sophistication.',
    category: 'rings',
    brand: 'Heritage Collection',
    rating: 4.8,
    reviews: 89,
    inStock: true,
    features: [
      '14k Rose Gold',
      'Vintage Filigree Design',
      'Hand-engraved Details',
      'Comfort Fit Band',
      'Antique Finish'
    ],
    specifications: {
      'Material': '14k Rose Gold',
      'Ring Size': 'Adjustable 6-8',
      'Width': '8mm',
      'Weight': '4.2g',
      'Style': 'Vintage Art Deco'
    }
  },
  {
    id: '3',
    name: 'Sapphire Chandelier Earrings',
    price: 2199,
    originalPrice: 2599,
    image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Stunning chandelier earrings featuring cascading sapphires in a delicate gold setting. Perfect for special occasions and formal events.',
    category: 'earrings',
    brand: 'Royal Gems',
    rating: 4.9,
    reviews: 156,
    inStock: true,
    features: [
      'Natural Blue Sapphires',
      '18k Yellow Gold',
      'Chandelier Design',
      'Secure Post Backs',
      'Gift Box Included'
    ],
    specifications: {
      'Material': '18k Gold, Sapphire',
      'Length': '2.5 inches',
      'Stone Count': '24 sapphires',
      'Stone Weight': '8 carats total',
      'Back Type': 'Secure post and butterfly'
    }
  },
  {
    id: '4',
    name: 'Handwoven Silk Scarf',
    price: 299,
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Luxurious handwoven silk scarf featuring traditional patterns and vibrant colors. Each piece is unique and crafted by skilled artisans.',
    category: 'accessories',
    brand: 'Silk Traditions',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    features: [
      '100% Pure Silk',
      'Hand-woven Traditional Patterns',
      'Natural Dyes',
      'Lightweight & Breathable',
      'Versatile Styling'
    ],
    specifications: {
      'Material': '100% Mulberry Silk',
      'Dimensions': '70" x 28"',
      'Weight': '120g',
      'Care': 'Dry clean only',
      'Origin': 'Handcrafted in Kashmir'
    }
  },
  {
    id: '5',
    name: 'Diamond Tennis Bracelet',
    price: 4299,
    image: 'https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Classic tennis bracelet featuring brilliant cut diamonds in a secure setting. A timeless piece that adds elegance to any ensemble.',
    category: 'bracelets',
    brand: 'Diamond Elite',
    rating: 5.0,
    reviews: 78,
    inStock: true,
    features: [
      'Brilliant Cut Diamonds',
      'Platinum Setting',
      'Secure Safety Clasp',
      'GIA Certified Stones',
      'Professional Cleaning Service'
    ],
    specifications: {
      'Material': 'Platinum, Diamond',
      'Length': '7 inches',
      'Diamond Count': '50 stones',
      'Total Carat Weight': '5.0 carats',
      'Clarity': 'VS1-VS2'
    }
  },
  {
    id: '6',
    name: 'Artisan Ceramic Vase',
    price: 189,
    originalPrice: 229,
    image: 'https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Beautiful handcrafted ceramic vase with unique glazing techniques. Each piece is one-of-a-kind and perfect for home decoration.',
    category: 'home-decor',
    brand: 'Clay Masters',
    rating: 4.6,
    reviews: 142,
    inStock: true,
    features: [
      'Hand-thrown Ceramic',
      'Unique Glaze Finish',
      'Food-safe Materials',
      'Dishwasher Safe',
      'Artist Signature'
    ],
    specifications: {
      'Material': 'High-fire Ceramic',
      'Height': '12 inches',
      'Diameter': '6 inches',
      'Weight': '2.1 lbs',
      'Finish': 'Matte glaze'
    }
  },
  {
    id: '7',
    name: 'Pearl Drop Earrings',
    price: 899,
    originalPrice: 1099,
    image: 'https://images.pexels.com/photos/1454170/pexels-photo-1454170.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1454170/pexels-photo-1454170.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Elegant pearl drop earrings featuring lustrous freshwater pearls in a classic gold setting. Perfect for both casual and formal wear.',
    category: 'earrings',
    brand: 'Pearl Essence',
    rating: 4.8,
    reviews: 234,
    inStock: true,
    features: [
      'Freshwater Pearls',
      '14k Gold Setting',
      'Classic Drop Design',
      'Hypoallergenic',
      'Pearl Care Kit Included'
    ],
    specifications: {
      'Material': '14k Gold, Freshwater Pearl',
      'Pearl Size': '10-11mm',
      'Length': '1.5 inches',
      'Luster': 'High',
      'Shape': 'Near Round'
    }
  },
  {
    id: '8',
    name: 'Handcrafted Leather Wallet',
    price: 159,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Premium handcrafted leather wallet made from full-grain leather. Features multiple card slots and a timeless design that ages beautifully.',
    category: 'accessories',
    brand: 'Leather Craft Co.',
    rating: 4.7,
    reviews: 189,
    inStock: true,
    features: [
      'Full-grain Leather',
      'Hand-stitched Construction',
      'RFID Blocking',
      '8 Card Slots',
      'Lifetime Repair Service'
    ],
    specifications: {
      'Material': 'Full-grain Cowhide',
      'Dimensions': '4.5" x 3.5" x 0.5"',
      'Card Slots': '8',
      'Bill Compartments': '2',
      'Color': 'Rich Brown'
    }
  },
  // Add placeholder products up to 38
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 9}`,
    name: `Placeholder Product ${i + 9}`,
    price: 999 + i * 10,
    image: 'https://via.placeholder.com/400x400?text=Product',
    images: ['https://via.placeholder.com/400x400?text=Product'],
    description: 'This is a placeholder product description.',
    category: 'accessories',
    brand: 'Evershine',
    rating: 4.5,
    reviews: 10 + i,
    inStock: true,
    features: ['Feature 1', 'Feature 2'],
    specifications: { 'Material': 'Mixed', 'Weight': '100g' }
  }))
];

export const categories = [
  { id: 'all', name: 'All Collections', count: products.length },
  { id: 'necklaces', name: 'Necklaces', count: products.filter(p => p.category === 'necklaces').length },
  { id: 'rings', name: 'Rings', count: products.filter(p => p.category === 'rings').length },
  { id: 'earrings', name: 'Earrings', count: products.filter(p => p.category === 'earrings').length },
  { id: 'bracelets', name: 'Bracelets', count: products.filter(p => p.category === 'bracelets').length },
  { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'accessories').length },
  { id: 'home-decor', name: 'Home Décor', count: products.filter(p => p.category === 'home-decor').length }
];

export const brands = Array.from(new Set(products.map(p => p.brand))).sort();