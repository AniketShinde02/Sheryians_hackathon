import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from './errors.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import ProductDrawer from './ProductDrawer.jsx';

const trendingProducts = [
  { id: 1, name: "Glory Arc Relaxed Fit", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800", price: "₹1,299.00", desc: "A relaxed fit tee with our signature Glory Arc print, crafted from premium 240 GSM cotton for ultimate comfort." },
  { id: 2, name: "Chase Grey Distressed", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800", price: "₹1,699.00", desc: "This distressed tee offers a vintage look with modern comfort. Each piece is uniquely treated for a one-of-a-kind finish." },
  { id: 3, name: "Articwave Oversized", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=800", price: "₹1,599.00", desc: "Ride the wave of style with this oversized tee, featuring a bold back print and a comfortable, dropped-shoulder fit." },
  { id: 4, name: "Flamewave Oversized", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800", price: "₹1,599.00", desc: "Ignite your wardrobe with the Flamewave tee. Its vibrant design and oversized silhouette make a fiery statement." },
  { id: 5, name: "Blazing Wild Relaxed Fit", img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?q=80&w=800", price: "₹1,299.00", desc: "Unleash your wild side. This relaxed fit tee combines a subtle front logo with a stunning back graphic." },
  { id: 6, name: "Amber Joggers", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800", price: "₹1,699.00", desc: "The perfect blend of style and comfort, these joggers are ideal for both lounging and hitting the streets." },
];

const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;
  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl h-auto md:h-[85vh] bg-[#2F3D3D] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-full md:w-1/2 h-64 md:h-full bg-[#3A4A4A] overflow-hidden">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-transparent text-[#222] hover:bg-transparent focus:outline-none" aria-label="Close">
              <CloseIcon className="w-6 h-6"/>
            </button>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">{product.name}</h2>
            <p className="text-yellow-400 font-bold text-2xl mb-4">{product.price}</p>
            <p className="text-white/80 font-sans mb-6 flex-grow">{product.desc}</p>
            <div className="mb-6">
              <p className="text-white font-bold mb-2">Select Size:</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-md border-2 font-bold transition-all ${selectedSize === size ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-transparent text-white border-white/30 hover:border-white'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full py-4 rounded-lg bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-500 transition-colors shadow-lg" onClick={() => {
              // This logic is now handled in App.jsx, so we just show the toast
              // onRequireAuth && onRequireAuth(); // This line is removed
              // onAddToCart(product); // This line is removed
            }}>
              Add to Cart
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Add a fallback image and loading skeleton for product images
const ProductImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 border-2 border-[#4A5C5C] bg-[#3A4A4A] shadow-lg">
      {!loaded && !error && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      <img
        src={error ? 'https://images.unsplash.com/photo-1611890798517-07b0fcb4a811?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' : src}
        alt={alt}
        className={`object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110 ${loaded ? '' : 'hidden'}`}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); console.error('Image failed to load:', src); }}
      />
    </div>
  );
};

// Fix TrendingProductCard: pass onCart as a prop
const TrendingProductCard = ({ product, onAddToCart, onCart, setGlobalError }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleImageError = () => {
    setImgError(true);
    setError("Failed to load product image.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };
  const handleAddToCart = () => {
    try {
      setDrawerOpen(true);
    } catch (e) {
      console.error('Error in handleAddToCart (TrendingProductCard):', e);
      if (setGlobalError) setGlobalError(e);
      setError("Failed to open product drawer. Please try again.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };
  return (
    <>
    <motion.div
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } } }}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xs mx-auto rounded-2xl bg-[#232b24] shadow-lg p-2 sm:p-3 flex flex-col group text-center mb-3"
    >
      <div className="w-full aspect-[4/5] bg-[#3A4A4A] flex items-center justify-center overflow-hidden rounded-xl mb-2">
        <img src={imgError ? 'https://images.unsplash.com/photo-1611890798517-07b0fcb4a811?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' : product.img} alt={product.name} className="object-cover w-full h-full" onError={() => { handleImageError(); console.error('Product image failed to load:', product.img); }} />
      </div>
        <h4 className="text-base sm:text-lg font-serif font-bold text-white mb-1 group-hover:text-orange-300 transition-colors duration-300">{product.name}</h4>
        <p className="text-orange-300 font-bold text-xs sm:text-base mb-2">{product.price}</p>
      <button
          onClick={handleAddToCart}
          className="mt-auto px-4 py-2 rounded-full font-semibold shadow transition-all text-xs sm:text-sm w-full group-hover:shadow-lg group-hover:scale-105 bg-yellow-300 text-yellow-900 font-bold"
        >
          Add to Cart
      </button>
      {/* Error Toast */}
      {showToast && error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg z-[9999] font-bold animate-fade-in-up">
          {error}
        </div>
      )}
    </motion.div>
      <ProductDrawer
        open={drawerOpen}
        product={product}
        onClose={() => setDrawerOpen(false)}
        onAddToCart={onAddToCart}
        onAddToCartAndCheckout={onCart}
      />
    </>
  );
};

// Toast notification component
function Toast({ message, show }) {
  return show ? (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-full shadow-lg z-[9999] font-bold animate-fade-in-up">
      {message}
    </div>
  ) : null;
}

// Floating Go to Cart button
function GoToCartButton({ cartCount, onGoToCart }) {
  if (!cartCount || cartCount < 1) return null;
  return (
    <button
      onClick={onGoToCart}
      className="fixed z-50 bottom-5 right-2 sm:bottom-8 sm:right-3 bg-green-700 text-white rounded-full shadow-lg flex items-center gap-2 px-4 py-2 sm:px-3 sm:py-2 font-bold text-sm sm:text-base hover:bg-green-800 transition-all drop-shadow-lg min-w-[44px] min-h-[44px]"
    >
      <FontAwesomeIcon icon={faBagShopping} className="w-5 h-5" />
      <span className="ml-2 bg-yellow-300 text-yellow-900 rounded-full px-2 py-0.5 text-xs font-bold animate-pulse">{cartCount}</span>
    </button>
  );
}

// TrendingModal: responsive grid and padding
const TrendingModal = ({ trendingSet, onClose, onAddToCart, onCart }) => {
  if (!trendingSet) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-1 sm:p-2 md:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="relative w-[95vw] max-w-xs sm:max-w-2xl md:max-w-5xl max-h-[80vh] bg-[#2F3D3D] rounded-2xl shadow-2xl flex flex-col mx-auto overflow-y-auto overflow-x-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-3 sm:p-4 md:p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-base sm:text-lg md:text-2xl font-bold text-white font-grotesk tracking-wider">{trendingSet.name}</h2>
            <button onClick={onClose} className="p-2 bg-transparent text-[#222] hover:bg-transparent focus:outline-none" aria-label="Close">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow p-2 sm:p-3 md:p-6 overflow-y-auto overflow-x-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-6">
              {trendingSet.products.map(product => (
                <div className="w-full max-w-xs mx-auto" key={product.id}>
                  <TrendingProductCard product={product} onAddToCart={onAddToCart} onCart={onCart} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Trending sets (like collections)
const trendingSets = [
  {
    id: 1,
    name: "Blue Retail",
    products: [
      { id: 11, name: "Blue Tee", price: "₹1,299", img: "https://images.unsplash.com/photo-1677709678785-bbe8227262cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 12, name: "Khadi Shorts", price: "₹1,499", img: "https://images.unsplash.com/photo-1599346821185-6860259a6db7?q=80&w=659&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 13, name: "Ocean Hoodie", price: "₹1,899", img: "https://images.unsplash.com/photo-1720410849401-fd5ed7360056?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 14, name: "Crop Top", price: "₹2,299", img: "https://images.unsplash.com/photo-1530981785497-a62037228fe9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ]
  },
  {
    id: 2,
    name: "Urban Street",
    products: [
      { id: 21, name: "Street Tee", price: "₹1,399", img: "https://images.unsplash.com/photo-1622445275992-e7efb32d2257?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 22, name: "Cargo Pants", price: "₹1,999", img: "https://images.unsplash.com/photo-1584302052177-2e90841dad6a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 23, name: "Urban Jacket", price: "₹2,499", img: "https://images.unsplash.com/photo-1559038295-f32f4d5bb27c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 24, name: "Summer wears", price: "₹2,799", img: "https://images.unsplash.com/photo-1604506847073-4a8e18e07d92?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ]
  },
  {
    id: 3,
    name: "Minimalist",
    products: [
      { id: 31, name: "White Tee", price: "₹999", img: "https://images.unsplash.com/photo-1602107545989-576b14346164?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 32, name: "Grey Joggers", price: "₹1,299", img: "https://media.gettyimages.com/id/2204126041/photo/outside-arrivals-paris-fashion-week-womenswear-fall-winter-2025-2026.jpg?s=1024x1024&w=gi&k=20&c=BA2AqE-Q9kgEQqkucdLDzCWsHk2jH0jm_K_h8f-158U=" },
      { id: 33, name: "Simple Hoodie", price: "₹1,599", img: "https://images.unsplash.com/photo-1517298257259-f72ccd2db392?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 34, name: "Basic Sneakers", price: "₹1,899", img: "https://images.unsplash.com/photo-1518362165686-c587a1de1003?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ]
  },
  {
    id: 4,
    name: "Pop Culture",
    products: [
      { id: 41, name: "Graphic Tee", price: "₹1,499", img: "https://images.unsplash.com/photo-1525393839361-867d646aea41?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 42, name: "Comic Hoodie", price: "₹1,999", img: "https://images.unsplash.com/photo-1609873814058-a8928924184a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 43, name: "Retro Cap", price: "₹799", img: "https://images.unsplash.com/photo-1747869040611-52f41d5e06db?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 44, name: "Sneaker Pop", price: "₹2,199", img: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ]
  },
];

// Replace trending grid with same grid and card style as ShopByCollection
// Remove main green container
// Use motion.div with cardVariants and whileHover for each trending card
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
};

export default function TrendingPage({ onAddToCart, cartCount = 0, onCart }) {
  const [selectedTrending, setSelectedTrending] = useState(null);
  const navigate = useNavigate();
  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full bg-[#F7F7F2] font-sans">
        <header className="p-4 sm:p-5 md:px-10 lg:px-16 xl:px-24 flex flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-gray-800" />
            <span className="text-xl font-bold text-gray-800 font-grotesk tracking-wider">OVERLAYS</span>
          </div>
          <Link to="/" className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition text-xs sm:text-sm w-max font-grotesk">
            Home
          </Link>
        </header>
        <main className="px-2 sm:px-4 md:px-8">
          <section className="text-center mb-2 pt-2">
            <div className="w-16 h-1 bg-yellow-300 rounded-full mx-auto mb-2"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 mb-1 font-grotesk" style={{letterSpacing: '-0.02em'}}>
              TRENDING
            </h1>
            <p className="max-w-xs sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-700 mb-0">
              Discover the most sought-after styles and freshest drops taking the fashion world by storm.
            </p>
          </section>
          <section className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-7xl mx-auto items-stretch">
              {trendingSets.map((set) => (
                <motion.div
                  key={set.id}
                  onClick={() => setSelectedTrending(set)}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)' }}
                  className="w-[90vw] max-w-xs mx-auto sm:w-full sm:max-w-none bg-[#2F3D3D] rounded-2xl shadow-lg p-0 flex flex-col group transition-all duration-200 border border-[#e5e5e5] overflow-hidden cursor-pointer"
                >
                  <div className="w-full aspect-[4/5] bg-[#3A4A4A] flex items-center justify-center overflow-hidden">
                    <img
                      src={set.products[0].img}
                      alt={set.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-between p-2 sm:p-3 md:p-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300 truncate">{set.name}</h3>
                    <div className="mt-auto flex items-center justify-center gap-2 px-2 sm:px-3 py-2 rounded-full bg-orange-300 text-gray-900 font-semibold shadow text-xs sm:text-sm md:text-base w-full group-hover:shadow-lg group-hover:scale-105">
                      <span>View Details</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <TrendingModal trendingSet={selectedTrending} onClose={() => setSelectedTrending(null)} onAddToCart={onAddToCart} onCart={onCart} />
          </section>
        </main>
        <GoToCartButton cartCount={cartCount} onGoToCart={onCart} />
      </div>
    </ErrorBoundary>
  );
} 