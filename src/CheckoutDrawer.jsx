// Color palette updated June 2024: Modern teal/green for accessibility and style
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from 'lucide-react';

// setCart must be passed as a prop from App.jsx
export default function CheckoutModal({ open, cart, setCart, onClose, bgColor = "#e5e7eb" }) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState({ name: "", addr: "", city: "", pincode: "" });
  const [payment, setPayment] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showExit, setShowExit] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price ? parseFloat(String(item.price).replace(/[^\d.]/g, '')) * (item.quantity || 1) : 0), 0);

  // 1. Set a 1-second timeout for mobile error
  const handleMobileContinue = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      setTimeout(() => setError(""), 1000);
      return;
    }
    setError("");
    setStep(2);
  };
  const handleAddressContinue = () => {
    if (!address.name || !address.addr || !address.city || !/^\d{6}$/.test(address.pincode)) {
      setError("Please fill all address fields and valid pincode.");
      return;
    }
    setError("");
    setStep(3);
  };
  const handlePaymentContinue = () => {
    if (!payment) {
      setError("Please select a payment method.");
      return;
    }
    setError("");
    setSuccess(true);
    setStep(4);
  };
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-[95vw] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-[420px] mx-auto rounded-2xl shadow-2xl p-0 overflow-hidden"
          style={{ background: bgColor }}
          initial={{ scale: 0.95, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 40 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          {/* Top icon and banner */}
          <div className="flex flex-col items-center justify-center pt-6 pb-2 bg-[#178582]">
            <div className="w-14 h-14 rounded-full bg-[#ffec3d] flex items-center justify-center text-3xl mb-2 border-4 border-white shadow-lg">🛒</div>
            <div className="w-full text-center bg-[#ffec3d] text-[#1a1a1a] font-bold py-2 text-sm">CONGRATS! You get FREE SHIPPING on Prepaid Orders</div>
          </div>
          {/* Only show sorry to see you modal if cart has items */}
          <button onClick={() => (step === 1 && cart.length > 0 ? setShowExit(true) : onClose())} className="absolute top-3 right-3 z-10 p-2 bg-transparent text-[#222] hover:bg-transparent text-2xl focus:outline-none" aria-label="Close">&times;</button>
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 py-3 bg-[#178582] border-b border-[#a8d3e1]">
            {[1,2,3].map(n => (
              <button
                key={n}
                type="button"
                className={`w-3 h-3 rounded-full transition-colors duration-150 focus:outline-none ${step===n?"bg-[#ffec3d]":"bg-[#4cae4f]"} ${n<=step?"cursor-pointer hover:ring-2 ring-[#ffec3d]":"cursor-not-allowed opacity-60"}`}
                onClick={() => { if (n <= step) setStep(n); }}
                aria-label={`Go to step ${n}`}
                disabled={n > step}
              />
            ))}
          </div>
          <div className="p-4 sm:p-6 bg-white">
            {success ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <CheckCircle className="text-[#178582] w-16 h-16 mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-[#178582]">Order placed!</h2>
                <p className="mb-6 text-[#333] text-base">Thank you for shopping with us.</p>
                <button onClick={() => { setCart([]); localStorage.setItem('cart', '[]'); onClose(); }} className="px-8 py-3 rounded-full bg-[#178582] text-white font-bold shadow hover:bg-[#14696a] transition text-lg">Close</button>
              </div>
            ) : step === 1 ? (
              <>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 text-[#1a1a1a]">Order summary <span className="text-xs sm:text-sm md:text-base lg:text-lg font-normal">({cart.length} Item{cart.length!==1?'s':''})</span></h2>
                <div className="mb-2 text-right font-bold text-[#178582] text-lg">₹{subtotal.toFixed(2)}</div>
                {/* Cart items */}
                <div className="bg-[#a8d3e1] rounded-xl p-2 mb-4 max-h-24 sm:max-h-28 overflow-y-auto flex flex-col gap-2 border border-[#4cae4f] shadow-inner snap-y snap-mandatory">
                  {cart.length === 0 ? (
                    <div className="text-gray-400 text-sm text-center">Your cart is empty.</div>
                  ) : (
                    cart.map((item, idx) => (
                      <div key={item.id + item.size + idx} className="flex items-center gap-2 bg-[#e0f7fa] rounded-lg p-2 min-h-[64px] snap-center w-full">
                        <img src={item.img} alt={item.name} className="w-10 h-10 rounded object-cover border border-[#178582]" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[#222] truncate">{item.name}</div>
                          <div className="text-xs text-[#333]">Size: {item.size}  Qty: {item.quantity}</div>
                        </div>
                        <div className="font-bold text-[#178582] whitespace-nowrap">₹{item.price}</div>
                        <button onClick={() => {
                          // Remove item from cart and update localStorage
                          const updated = cart.filter((_, i) => i !== idx);
                          setCart(updated);
                          localStorage.setItem('cart', JSON.stringify(updated));
                        }} className="ml-2 px-3 py-1 rounded bg-yellow-300 text-yellow-900 font-bold text-xs hover:bg-yellow-400 transition">Remove</button>
                      </div>
                    ))
                  )}
                </div>
                <div className="mb-4">
                  <input type="text" placeholder="Add coupon (UI only)" className="w-full px-3 py-2 rounded border border-[#a8d3e1] bg-[#fff] text-[#178582] placeholder:text-[#4cae4f]" disabled />
                </div>
                <label className="block mb-2 font-semibold text-[#1a1a1a]">Enter mobile number</label>
                <div className="flex gap-2 mb-2">
                  <span className="px-3 py-2 bg-[#a8d3e1] text-[#178582] rounded-l border border-r-0 border-[#a8d3e1]">+91</span>
                  <input type="tel" maxLength={10} value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g, ''))} className="w-full px-3 py-2 rounded-r border border-[#a8d3e1] bg-[#fff] text-[#1a1a1a] placeholder:text-[#4cae4f]" placeholder="10-digit mobile number" />
                </div>
                {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
                <button onClick={handleMobileContinue} className="w-full mt-2 px-4 sm:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full bg-[#178582] text-white font-bold shadow hover:bg-[#14696a] transition text-base sm:text-lg lg:text-xl">Continue</button>
              </>
            ) : step === 2 ? (
              <>
                <h2 className="text-lg font-bold mb-2 text-[#1a1a1a]">Delivery Address</h2>
                <input type="text" className="w-full px-3 py-2 rounded border border-[#a8d3e1] bg-[#fff] text-[#1a1a1a] placeholder:text-[#4cae4f] mb-2" placeholder="Full Name" value={address.name} onChange={e=>setAddress(a=>({...a,name:e.target.value}))} />
                <input type="text" className="w-full px-3 py-2 rounded border border-[#a8d3e1] bg-[#fff] text-[#1a1a1a] placeholder:text-[#4cae4f] mb-2" placeholder="Address" value={address.addr} onChange={e=>setAddress(a=>({...a,addr:e.target.value}))} />
                <input type="text" className="w-full px-3 py-2 rounded border border-[#a8d3e1] bg-[#fff] text-[#1a1a1a] placeholder:text-[#4cae4f] mb-2" placeholder="City" value={address.city} onChange={e=>setAddress(a=>({...a,city:e.target.value}))} />
                <input type="text" className="w-full px-3 py-2 rounded border border-[#a8d3e1] bg-[#fff] text-[#1a1a1a] placeholder:text-[#4cae4f] mb-2" placeholder="Pincode" maxLength={6} value={address.pincode} onChange={e=>setAddress(a=>({...a,pincode:e.target.value.replace(/\D/g, '')}))} />
                {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
                <button onClick={handleAddressContinue} className="w-full mt-2 px-6 py-2 rounded-full bg-[#178582] text-white font-bold shadow hover:bg-[#14696a] transition">Continue</button>
              </>
            ) : step === 3 ? (
              <>
                <h2 className="text-lg font-bold mb-2 text-[#1a1a1a]">Payment Method</h2>
                <div className="flex flex-col gap-3 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer text-[#1a1a1a]">
                    <input type="radio" name="pay" value="upi" checked={payment==='upi'} onChange={()=>setPayment('upi')} />
                    <span>UPI</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[#1a1a1a]">
                    <input type="radio" name="pay" value="card" checked={payment==='card'} onChange={()=>setPayment('card')} />
                    <span>Credit/Debit Card</span>
                  </label>
                </div>
                {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
                <button onClick={handlePaymentContinue} className="w-full mt-2 px-6 py-2 rounded-full bg-[#178582] text-white font-bold shadow hover:bg-[#14696a] transition">Proceed to Pay</button>
              </>
            ) : null}
            {/* Bottom icons and info */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#a8e6cf] text-[#178582] text-xs sm:text-sm md:text-base lg:text-lg bg-white">
              <div className="flex flex-col items-center flex-1">
                <span className="text-lg mb-1">💳</span>
                <span className="text-[#1a1a1a]">Secure payments</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-lg mb-1">🚚</span>
                <span className="text-[#1a1a1a]">Assured delivery</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-lg mb-1">✅</span>
                <span className="text-[#1a1a1a]">Verified seller</span>
              </div>
            </div>
          </div>
          {/* Sorry to see you go modal */}
          <AnimatePresence>
            {showExit && cart.length > 0 && (
              <motion.div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* 2. Make 'Sorry to see you go!' modal smaller */}
                <motion.div className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-center text-center border-2 border-[#a8e6cf] w-[90vw] max-w-xs mx-auto" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
                  {/* Icon and heading */}
                  <div className="flex flex-col items-center w-full">
                    <span className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#a8e6cf] bg-white mb-2">
                      <XCircle className="w-10 h-10 text-[#ffe066]" />
                    </span>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-black text-black text-center mb-0">Sorry to see you go!</h2>
                  </div>
                  <p className="mb-4 mt-2 text-[#2d3a2e]">We hope to see you again soon.</p>
                  <button onClick={() => { setShowExit(false); onClose(); }} className="px-6 py-2 rounded-full bg-[#a8e6cf] text-[#2d3a2e] font-bold shadow hover:bg-[#b2f7e2] transition">Close</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Add handleRemoveItem function at the top level of the component
function handleRemoveItem(idx) {
  const newCart = [...cart];
  newCart.splice(idx, 1);
  // Assuming setCart is available in the component's scope or passed as a prop
  // For now, we'll just update the state locally if setCart is not directly accessible
  // If setCart is a prop, you would set it here: setCart(newCart);
  // Since setCart is not defined in this component's scope, we'll just update the state
  // This function is primarily for the UI to trigger a state update, but the actual cart state
  // needs to be managed by the parent component (e.g., App.jsx)
  // For now, we'll just log the change for demonstration
  console.log("Removing item at index:", idx);
  console.log("New cart state:", newCart);
} 