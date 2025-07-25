import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductDrawer({ open, product, onClose, onAddToCart, onAddToCartAndCheckout, setGlobalError }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedSize("");
      setQuantity(1);
    }
  }, [open, product]);

  useEffect(() => {
    if (open) setAdded(false);
  }, [open, product]);

  if (!product) return null;
  const unavailableSizes = product.unavailableSizes || [];

  const handleAdd = () => {
    if (!selectedSize) {
      setError("Please select a size before adding to cart.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }
    try {
      onAddToCart({ ...product, size: selectedSize, quantity });
      setAdded(true);
    } catch (e) {
      console.error('Error in handleAdd (ProductDrawer):', e);
      if (setGlobalError) setGlobalError(e);
      setError("Failed to add to cart. Please try again.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };
  const handleGoToCart = () => {
    if (typeof onAddToCartAndCheckout === 'function') {
      onAddToCartAndCheckout();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 w-[95vw] max-w-xs sm:max-w-md md:max-w-lg 2xl:max-w-[420px] h-full bg-white z-50 shadow-2xl flex flex-col mx-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-2 sm:p-4 border-b">
              <h2 className="text-lg sm:text-xl font-bold">Choose options</h2>
              <button onClick={onClose} className="text-lg sm:text-2xl font-bold p-1 sm:p-2 bg-transparent text-[#222] hover:bg-transparent focus:outline-none" aria-label="Close">&times;</button>
            </div>
            {/* Product Info */}
            <div className="flex-1 flex flex-col items-center px-2 sm:px-4 md:px-6 py-2 gap-2 sm:gap-3 md:gap-4 overflow-y-visible scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <img src={product.img} alt={product.name} className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded-lg mx-auto" onError={() => console.error('Product image failed to load:', product.img)} />
              <div className="w-full text-center">
                <div className="font-bold text-sm sm:text-base md:text-lg">{product.brand || "OVERLAYS CLOTHING"}</div>
                <div className="text-base sm:text-lg md:text-xl font-semibold">{product.name}</div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-orange-600 font-bold text-lg sm:text-xl md:text-2xl">{product.price}</span>
                  {product.oldPrice && (
                    <span className="line-through text-gray-400 text-xs sm:text-sm"> {product.oldPrice}</span>
                  )}
                </div>
              </div>
              {/* Size Selection */}
              <div className="w-full flex flex-col items-center gap-2">
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-xs sm:text-sm md:text-base">Size:</span>
                  <a href="#" className="text-xs underline text-gray-500">Size chart</a>
                </div>
                {/* Size selection: make buttons smaller and fit in a single row */}
                <div className="flex flex-row gap-1 sm:gap-2 w-full justify-center overflow-x-auto pb-1">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      disabled={unavailableSizes.includes(size)}
                      className={`min-w-[2.5rem] px-2 py-1.5 text-sm sm:min-w-[2.75rem] sm:text-base md:min-w-[3rem] md:text-base md:max-w-[2.5rem] rounded border font-bold transition-all duration-150 ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : unavailableSizes.includes(size)
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-black hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Quantity Selector */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-2">
                <span className="font-semibold text-xs sm:text-sm md:text-base">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 border rounded text-lg font-bold"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >-</button>
                  <span className="min-w-[2ch] text-center">{quantity}</span>
                  <button
                    className="px-3 py-1 border rounded text-lg font-bold"
                    onClick={() => setQuantity(q => q + 1)}
                  >+</button>
                </div>
              </div>
              {/* Add to Cart */}
              <div className="flex justify-center mt-4">
                {added ? (
                  <button
                    className="px-8 py-2 rounded-full font-bold text-base sm:text-lg bg-green-700 text-white hover:bg-green-800"
                    onClick={handleGoToCart}
                  >
                    GO TO CART
                  </button>
                ) : (
                  <button
                    className={`px-8 py-2 rounded-full font-bold text-base sm:text-lg ${
                      selectedSize
                        ? "bg-green-700 text-white hover:bg-green-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!selectedSize}
                    onClick={handleAdd}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
              {/* Error Toast */}
              {showToast && error && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg z-[9999] font-bold animate-fade-in-up">
                  {error}
                </div>
              )}
              {/* Trust Badges */}
              <div className="flex flex-row justify-between items-start w-full mt-3 gap-2 text-xs text-gray-700">
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <span className="text-lg">👥</span>
                  <span className="font-semibold leading-tight text-center">4 Lakhs+<br/>Satisfied</span>
                </div>
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <span className="text-lg">↩️</span>
                  <span className="font-semibold leading-tight text-center">7 Days Easy<br/>Return & Exchange</span>
                </div>
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <span className="text-lg">👕</span>
                  <span className="font-semibold leading-tight text-center">100%<br/>Cotton</span>
                </div>
              </div>
              {/* Offers */}
              <div className="mt-4 w-full text-center">
                <div className="font-semibold">Available offers</div>
                <a href="#" className="text-blue-600 underline text-xs">View details</a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 