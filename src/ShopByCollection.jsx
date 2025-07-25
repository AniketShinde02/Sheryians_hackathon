import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingBag, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from './errors.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import ProductDrawer from './ProductDrawer.jsx';

// Import images for Our Store products
import top1 from './assets/Top/top1.png';
import top2 from './assets/Top/top 2.png';
import top3 from './assets/Top/top 3.png';
import top5 from './assets/Top/top5.png';
import tshirt1 from './assets/TShirt/shirt1.png';
import tshirt2 from './assets/TShirt/Shirt2.png';
import tshirt3 from './assets/TShirt/Shirt3.png';
import tshirt4 from './assets/TShirt/Shirt4.png';
import coursel1 from './assets/images/coursel/1L9A2782.jpg';
// At the top, import 4-5 local shirt images
import shirt1 from './assets/shirts/overlay_04.jpg';
import shirt2 from './assets/shirts/OVERLAYS207.jpg';
import shirt3 from './assets/shirts/OVERLAYS240.jpg';
import shirt4 from './assets/shirts/OVERLAYS676_0f3c0376-fa33-4d93-b33d-046b9dfe284f_400x.jpg';
import shirt5 from './assets/shirts/OVERLAYS408_54951362-5620-4929-9e9e-17cca07de52a_400x.jpg';

const fallbackImg =
  'https://images.unsplash.com/photo-1611890798517-07b0fcb4a811?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

// Update collectionsData to use local images for each category
const collectionsData = [
  {
    id: 1,
    name: "Our Store",
    description: "A curated selection of our bestsellers and new arrivals.",
    img: coursel1,
    products: [
      { id: 1, name: "Classic White Top", price: "₹1,299.00", img: top1 },
      { id: 2, name: "Blue Linen Top", price: "₹1,499.00", img: top2 },
      { id: 3, name: "Striped Summer Top", price: "₹1,399.00", img: top3 },
      { id: 4, name: "Sleeveless Black Top", price: "₹1,199.00", img: top5 },
      { id: 5, name: "Graphic Print T-Shirt", price: "₹999.00", img: tshirt1 },
      { id: 6, name: "Oversized Black T-Shirt", price: "₹1,199.00", img: tshirt2 },
      { id: 7, name: "Minimalist White T-Shirt", price: "₹899.00", img: tshirt3 },
      { id: 8, name: "Striped Crewneck T-Shirt", price: "₹1,099.00", img: tshirt4 },
    ]
  },
  {
    id: 2,
    name: "Shirts",
    description: "Light fabrics and breezy silhouettes inspired by the sea.",
    img: shirt1,
    products: [
      { id: 201, name: "Classic White Shirt", price: "₹2,499", img: shirt1 },
      { id: 202, name: "Pastel Blue Shirt", price: "₹1,999", img: shirt2 },
      { id: 203, name: "Urban Casual Shirt", price: "₹1,799", img: shirt3 },
      { id: 204, name: "Summer Linen Shirt", price: "₹1,599", img: shirt4 },
      { id: 205, name: "Minimalist Black Shirt", price: "₹1,499", img: shirt5 },
    ]
  },
  {
    id: 3,
    name: "Midnight Gala",
    description: "Exquisite eveningwear for unforgettable nights.",
    img: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1964&auto=format&fit=crop",
    products: [
      { id: 301, name: "Velvet Tuxedo", price: "₹12,999", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800" },
      { id: 302, name: "Silk Evening Gown", price: "₹15,499", img: "https://images.unsplash.com/photo-1641307518666-1e4427921762?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 303, name: "Blazor", price: "₹36,799", img: "https://images.unsplash.com/photo-1574781824015-6dc89cb75ff1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 304, name: "Long Coat", price: "₹86,799", img: "https://images.unsplash.com/photo-1717674798009-1ddf82a9dedc?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ]
  },
  {
    id: 4,
    name: "Retro Revival",
    description: "Bold patterns and timeless cuts from a bygone era.",
    img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1964&auto=format&fit=crop",
    products: [
      { id: 401, name: "70s Pattern Shirt", price: "₹2,199", img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800" },
      { id: 402, name: "Jacket", price: "₹1,599", img: "https://images.unsplash.com/photo-1605628458120-5e52dd239a14?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ]
  },
];

const pageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 18, staggerChildren: 0.08 } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
};

const modalBgVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 22 } },
  exit: { opacity: 0, scale: 0.95, y: 40, transition: { duration: 0.18 } },
};

const modalGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// Update CollectionCard for responsive layout
const CollectionCard = ({ collection, onSelect }) => {
  const { name, img } = collection;
  return (
    <motion.div
      variants={cardVariants}
      className="w-full max-w-xs mx-auto rounded-2xl bg-[#2F3D3D] shadow-lg p-2 sm:p-3 flex flex-col group transition-all duration-200 border border-[#e5e5e5] overflow-hidden cursor-pointer mb-3"
      onClick={onSelect}
    >
      <div className="w-full aspect-[4/5] bg-[#3A4A4A] flex items-center justify-center overflow-hidden">
        <img
          src={img}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          draggable={false}
        />
      </div>
      <div className="flex flex-col flex-grow justify-between p-2 sm:p-3 md:p-4">
        <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300 truncate">{name}</h3>
        <div className="mt-auto flex items-center justify-center gap-2 px-2 sm:px-3 py-2 rounded-full bg-orange-300 text-gray-900 font-semibold shadow text-xs sm:text-sm md:text-base w-full group-hover:shadow-lg group-hover:scale-105">
          <span>View Details</span>
        </div>
      </div>
    </motion.div>
  );
};

// Add a fallback image and loading skeleton for product images
const ProductImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-2 sm:mb-3 border-2 border-[#4A5C5C] shadow-md bg-[#3A4A4A] relative">
      {!loaded && !error && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      <img
        src={error ? fallbackImg : src}
        alt={alt}
        className={`object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 ${loaded ? '' : 'hidden'}`}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); console.error('Image failed to load:', src); }}
      />
    </div>
  );
};

// Fix add to cart and modal logic: use App's onAddToCart and onProductClick
// Remove local cart logic, rely on props
const ProductCard = ({ product, onProductClick, setGlobalError }) => {
  const [imgError, setImgError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const handleImageError = () => {
    setImgError(true);
    setError("Failed to load product image.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };
  const handleAddToCart = () => {
    try {
      onProductClick(product);
    } catch (e) {
      console.error('Error in handleAddToCart (ProductCard):', e);
      if (setGlobalError) setGlobalError(e);
      setError("Failed to add to cart. Please try again.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };
  return (
    <motion.div
      variants={cardVariants}
      className="w-full max-w-xs mx-auto rounded-2xl bg-[#232b24] shadow-lg p-2 sm:p-3 flex flex-col group text-center mb-3"
    >
      <div className="w-full aspect-[4/5] bg-[#3A4A4A] flex items-center justify-center overflow-hidden rounded-xl mb-2">
        <img src={imgError ? fallbackImg : product.img} alt={product.name} className="object-cover w-full h-full" onError={() => { handleImageError(); console.error('Product image failed to load:', product.img); }} />
      </div>
      <h4 className="text-base sm:text-lg md:text-xl font-serif font-bold text-white mb-1 group-hover:text-orange-300 transition-colors duration-300">{product.name}</h4>
      <p className="text-orange-300 font-bold text-xs sm:text-base md:text-lg mb-2">{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-auto px-4 py-2 rounded-full font-semibold shadow transition-all text-xs sm:text-sm md:text-base w-full group-hover:shadow-lg group-hover:scale-105 bg-yellow-300 text-yellow-900 font-bold"
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
  );
};

// In CollectionModal, pass onProductClick to ProductCard
const CollectionModal = ({ collection, onClose, onProductClick }) => {
  useEffect(() => {
    if (collection) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, [collection]);
  if (!collection) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="modal-bg"
        variants={modalBgVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-1 sm:p-2 md:p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-[95vw] max-w-xs sm:max-w-2xl md:max-w-5xl max-h-[80vh] bg-[#2F3D3D] rounded-2xl shadow-2xl flex flex-col mx-auto overflow-y-auto overflow-x-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-3 sm:p-4 md:p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-base sm:text-lg md:text-2xl font-bold text-white font-grotesk tracking-wider">{collection.name}</h2>
            <button onClick={onClose} className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <motion.div
            variants={modalGridVariants}
            initial="hidden"
            animate="visible"
            className="flex-grow p-2 sm:p-3 md:p-6 overflow-y-auto overflow-x-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-6">
              {collection.products.map(p => (
                <div className="w-full max-w-xs mx-auto" key={p.id}>
                  <ProductCard product={p} onProductClick={onProductClick} />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
      className="fixed z-50 bottom-5 right-5 sm:bottom-8 sm:right-8 bg-green-700 text-white rounded-full shadow-lg flex items-center gap-2 px-4 py-2 sm:px-3 sm:py-2 font-bold text-sm sm:text-base hover:bg-green-800 transition-all drop-shadow-lg min-w-[44px] min-h-[44px]"
    >
      <FontAwesomeIcon icon={faBagShopping} className="w-5 h-5" />
      <span className="ml-2 bg-yellow-300 text-yellow-900 rounded-full px-2 py-0.5 text-xs font-bold animate-pulse">{cartCount}</span>
    </button>
  );
}

// In ShopByCollectionInteractive, use onCart prop for GoToCartButton
export default function ShopByCollectionInteractive({ onAddToCart, cartCount, cart = [], onProductClick, onCart }) {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerProduct, setDrawerProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Handler for product card click (universal)
  const handleProductClick = (product) => {
    setDrawerProduct(product);
    setDrawerOpen(true);
  };

  // Handler for add to cart with toast
  const handleAddToCartWithToast = (product) => {
    if (onAddToCart) onAddToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1000);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full bg-[#F7F7F2] text-gray-800 antialiased font-sans">
        <header className="p-4 sm:p-5 md:px-10 lg:px-16 xl:px-24 flex flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-gray-800" />
            <span className="text-xl font-bold text-gray-800 font-grotesk tracking-wider">OVERLAYS</span>
          </div>
          <Link to="/" className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition text-xs sm:text-sm w-max font-grotesk">
            Home
          </Link>
        </header>
        <Toast message="Added to cart!" show={showToast} />
        <motion.main
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          className="px-2 sm:px-4 md:px-8 pt-2 pb-4 sm:pt-4 sm:pb-8 mt-6 sm:mt-8 lg:-mt-6"
        >
          <motion.div
            variants={cardVariants}
            className="text-center mb-4 sm:mb-6 md:mb-8 mt-6 pt-2"
            style={{ marginTop: '-2.5rem' }}
          >
            <div className="w-12 sm:w-16 h-1 bg-yellow-300 rounded-full mx-auto mb-2 sm:mb-4"></div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 mb-2 sm:mb-3 font-grotesk">SHOP BY COLLECTION</h1>
            <p className="max-w-2xl mx-auto text-xs sm:text-base md:text-lg text-gray-700">Explore our hand-picked selections, where every piece tells a unique story of style and craftsmanship.</p>
          </motion.div>
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-7xl mx-auto items-stretch"
          >
            {collectionsData.map(c => (
              <CollectionCard key={c.id} collection={c} onSelect={() => setSelectedCollection(c)} />
            ))}
          </motion.div>
          <CollectionModal
            collection={selectedCollection}
            onClose={() => setSelectedCollection(null)}
            onProductClick={handleProductClick}
          />
        </motion.main>
        <GoToCartButton cartCount={cartCount} onGoToCart={onCart} />
        <ProductDrawer
          open={drawerOpen}
          product={drawerProduct}
          onClose={() => setDrawerOpen(false)}
          onAddToCart={(product) => {
            if (onAddToCart) onAddToCart(product);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 1000);
          }}
          onAddToCartAndCheckout={() => {
            setDrawerOpen(false);
            if (typeof onCart === 'function') onCart();
          }}
        />
      </div>
    </ErrorBoundary>
  );
} 