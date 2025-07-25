// Color palette updated June 2024: Modern teal/green for accessibility and style
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ShoppingCart, CreditCard, Truck, ShieldCheck, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CheckoutDrawer({ open, cart, setCart, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', email: '', address: '', city: '', postalCode: '', phone: '' });
    const [formErrors, setFormErrors] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [emptyTries, setEmptyTries] = useState(0);
    const [phoneAutoErase, setPhoneAutoErase] = useState(false);

    // Reset success and step when modal is opened
    useEffect(() => {
        if (open) {
            setIsSuccess(false);
            setStep(1);
        }
    }, [open]);

    const subtotal = cart.reduce((acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 1), 0);
    const shippingFee = subtotal > 100 ? 0 : 15.00;
    const total = subtotal + shippingFee;
    const isCartEmpty = cart.length === 0;

    // --- Event Handlers ---
    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Full Name is required.';
        if (!formData.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address.';
        }
        if (!formData.address.trim()) errors.address = 'Address is required.';
        if (!formData.city.trim()) errors.city = 'City is required.';
        if (!formData.postalCode.trim()) {
            errors.postalCode = 'Pin Code is required.';
        } else if (formData.postalCode.length !== 6) {
            errors.postalCode = 'Please enter a valid 6-digit Pin Code.';
        }
        return errors;
    };

    const handleNextStep = () => {
        if (isCartEmpty) {
            setEmptyTries(t => t + 1);
            return;
        }
        if (step === 2) {
            const errors = validateForm();
            setFormErrors(errors);
            if (Object.keys(errors).length === 0) {
                setStep(prev => prev + 1);
            }
            return;
        }
        setFormErrors({});
        setStep(prev => prev + 1);
    };

    const handlePrevStep = () => {
        setFormErrors({});
        setStep(prev => prev - 1);
    };

    const handlePayment = () => {
        if (paymentMethod === 'upi') {
            setStep(4);
        } else {
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setIsSuccess(true);
            }, 1500);
        }
    };

    const handleClose = () => {
        setShowExitConfirmation(false);
        setIsSuccess(false);
        setStep(1);
        onClose();
    };

    const handleAttemptClose = () => {
        if (cart.length > 0 && !isSuccess) {
            setShowExitConfirmation(true);
        } else {
            onClose();
        }
    };

    const removeItem = (id) => {
        const updated = cart.filter(item => item.id !== id);
        setCart(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    // Fun: auto-erase phone number after typing
    useEffect(() => {
        if (phoneAutoErase && formData.phone) {
            const timer = setTimeout(() => {
                setFormData(f => ({ ...f, phone: f.phone.slice(0, -1) }));
            }, 80);
            if (formData.phone.length === 0) setPhoneAutoErase(false);
            return () => clearTimeout(timer);
        }
    }, [formData.phone, phoneAutoErase]);

    // Effect to handle UPI payment simulation
    useEffect(() => {
        let timer;
        if (step === 4) {
            setIsProcessing(true);
            timer = setTimeout(() => {
                setIsProcessing(false);
                setIsSuccess(true);
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
            if (step === 4) setIsProcessing(false);
        };
    }, [step]);

    // Empty the cart after successful order
    useEffect(() => {
        if (isSuccess) {
            setCart([]);
            localStorage.setItem('cart', JSON.stringify([]));
        }
    }, [isSuccess]);

    if (!open) return null;

    // --- Animation Variants ---
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
    };
    const modalVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 150, damping: 25 } },
        exit: { y: 50, opacity: 0, transition: { duration: 0.3 } },
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={handleAttemptClose}
                >
                    <motion.div
                        className="relative bg-slate-50 rounded-2xl shadow-2xl w-full max-w-[95vw] sm:max-w-[400px] max-h-[90vh] flex flex-col"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* --- Modal Header (Compact) --- */}
                        <header className="flex-shrink-0 p-4 bg-slate-100 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center">
                                        <ShoppingCart className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-800">Secure Checkout</h2>
                                </div>
                                <button onClick={handleAttemptClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors">
                                    <XCircle size={24} />
                                </button>
                            </div>
                            {!isCartEmpty && (
                                <div className="w-full text-center bg-amber-100 text-amber-800 font-semibold py-1.5 mt-3 text-xs rounded-full">
                                    Congrats! You get FREE SHIPPING!
                                </div>
                            )}
                        </header>
                        {/* --- Progress Indicator --- */}
                        {!isCartEmpty && (
                            <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-slate-200">
                                {["Cart", "Shipping", "Payment"].map((name, index) => (
                                    <React.Fragment key={name}>
                                        <div className="flex items-center">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step > index + 1 ? 'bg-teal-500 text-white' : step === index + 1 || (index === 2 && step > 2) ? 'bg-teal-500 text-white ring-4 ring-teal-500/20' : 'bg-slate-300 text-slate-500'}`}>
                                                {step > index + 1 ? <CheckCircle size={14} /> : index + 1}
                                            </div>
                                            <p className={`ml-2 text-sm font-semibold transition-colors duration-300 ${step >= index + 1 ? 'text-teal-600' : 'text-slate-500'}`}>{name}</p>
                                        </div>
                                        {index < 2 && <div className="flex-1 h-0.5 bg-slate-300 mx-3"><div className="h-0.5 bg-teal-500 transition-all duration-500" style={{ width: step > index + 1 ? '100%' : '0%' }}></div></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                        {/* --- Modal Content --- */}
                        <div className="flex-grow overflow-y-auto p-1 sm:p-4 min-h-[200px] max-h-[320px] sm:max-h-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    {(
                                        isSuccess ? <SuccessStep onClose={onClose} /> :
                                        isCartEmpty ? <EmptyCartStep onClose={onClose} emptyTries={emptyTries} setEmptyTries={setEmptyTries} formData={formData} setFormData={setFormData} setPhoneAutoErase={setPhoneAutoErase} /> :
                                        step === 1 ? <OrderSummaryStep cart={cart} removeItem={removeItem} subtotal={subtotal} shippingFee={shippingFee} total={total} /> :
                                        step === 2 ? <ShippingStep formData={formData} setFormData={setFormData} errors={formErrors} /> :
                                        step === 3 ? <PaymentStep paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} /> :
                                        step === 4 ? <UpiStep total={total} /> : null
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        {/* --- Modal Footer --- */}
                        {!isSuccess && !isCartEmpty && (
                            <footer className="flex-shrink-0 p-4 bg-white/50 backdrop-blur-sm border-t border-slate-200">
                                <div className="flex justify-between items-center">
                                    <button onClick={handlePrevStep} className={`font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-all duration-300 ${step > 1 && step < 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}><ArrowLeft size={16} /> Back</button>
                                    <button
                                        onClick={step === 3 ? handlePayment : handleNextStep}
                                        disabled={isProcessing}
                                        className={`flex items-center justify-center gap-2 w-1/2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-xl hover:shadow-cyan-500/20 transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none ${step >= 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                    >
                                        <span>{step === 3 ? 'Proceed to Pay' : 'Continue'}</span>
                                        {step < 3 && <ArrowRight size={16} />}
                                    </button>
                                </div>
                                {isProcessing && step === 4 && <div className="text-center text-slate-600 font-semibold animate-pulse">Waiting for payment confirmation...</div>}
                            </footer>
                        )}
                        {/* --- Exit Confirmation Modal --- */}
                        <AnimatePresence>
                            {showExitConfirmation && (
                                <motion.div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <motion.div className="bg-white rounded-2xl shadow-2xl max-w-[320px] w-full p-3 flex flex-col items-center text-center border-t-4 border-amber-400" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
                                        <XCircle className="w-12 h-12 text-red-500 mb-2" />
                                        <h2 className="text-xl font-bold text-slate-800">Leaving So Soon?</h2>
                                        <p className="mb-4 mt-1 text-slate-600 text-sm">Your stylish finds are waiting for you!</p>
                                        <div className="flex justify-center gap-2 w-full">
                                            <button onClick={handleClose} className="px-6 py-2 rounded-full bg-red-500 text-white font-bold shadow-sm hover:bg-red-600 transition-colors text-center">Leave</button>
                                            <button onClick={() => setShowExitConfirmation(false)} className="px-6 py-2 rounded-full bg-slate-200 text-slate-800 font-bold shadow-sm hover:bg-slate-300 transition-colors text-center">Stay</button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// --- Step Components ---

const EmptyCartStep = ({ onClose, emptyTries, setEmptyTries, formData, setFormData, setPhoneAutoErase }) => (
    <div className="flex flex-col items-center text-center py-8">
        <ShoppingBag className="w-20 h-20 text-slate-300 mb-4" />
        <h3 className="text-2xl font-bold text-slate-700">Your Cart is Empty</h3>
        <p className="text-slate-500 mt-2 mb-6">Looks like you haven't added anything yet.</p>
        <button onClick={() => { setEmptyTries(t => t + 1); }} className="w-full bg-teal-500 text-white font-bold py-3 rounded-full hover:bg-teal-600 transition-colors mb-2">
            Try to Checkout
        </button>
        {emptyTries >= 2 && <div className="text-amber-600 font-bold mt-2 animate-bounce">Kuch kharid lo pehle!</div>}
        <input
            type="tel"
            placeholder="Enter phone for fun..."
            value={formData.phone}
            onChange={e => setFormData(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))}
            onBlur={() => setPhoneAutoErase(true)}
            className="mt-4 p-2 border rounded w-full max-w-xs mx-auto text-center"
        />
    </div>
);

const OrderSummaryStep = ({ cart, removeItem, subtotal, shippingFee, total }) => (
    <div>
        <div className="space-y-3 max-h-40 overflow-y-auto">
            {cart.map(item => (
                <motion.div layout key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center space-x-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <img src={item.img || item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg" onError={() => console.error('Cart item image failed to load:', item.img || item.image)} />
                    <div className="flex-grow">
                        <p className="font-semibold text-slate-800">{item.name}</p>
                        <p className="text-sm text-slate-500">Size: {item.size} | Qty: {Number(item.quantity || 1)}</p>
                        <p className="text-sm font-bold text-slate-600">₹{Number(item.price || 0).toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-full"><XCircle size={20} /></button>
                </motion.div>
            ))}
        </div>
        <div className="border-t border-slate-200 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>₹{Number(subtotal || 0).toFixed(2)}</span></div>
            <div className="flex justify-between text-slate-600"><span>Shipping</span><span>{shippingFee > 0 ? `₹${Number(shippingFee || 0).toFixed(2)}` : 'Free'}</span></div>
            <div className="flex justify-between font-bold text-lg text-slate-800 mt-2"><span>Total</span><span>₹{Number(total || 0).toFixed(2)}</span></div>
        </div>
    </div>
);

const FormField = ({ placeholder, value, onChange, error, type = 'text', maxLength }) => {
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (error) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    return (
        <div className="h-14">
            <input
                type={type}
                placeholder={showError && error ? error : placeholder}
                value={showError && error ? '' : value}
                onChange={onChange}
                maxLength={maxLength}
                className={`p-2 border rounded-lg w-full transition ${showError && error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500 placeholder-red-500' : 'border-slate-300 focus:ring-teal-500/50 focus:border-teal-500'}`}
                disabled={showError && error}
            />
        </div>
    );
};

const ShippingStep = ({ formData, setFormData, errors }) => (
    <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">Shipping Address</h3>
        <div className="space-y-1">
            <FormField placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} error={errors.name} />
            <FormField placeholder="Email Address" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} error={errors.email} />
            <FormField placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} error={errors.address} />
            <div className="grid grid-cols-2 gap-4">
                <FormField placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} error={errors.city} />
                <FormField placeholder="Pin Code" type="text" maxLength={6} value={formData.postalCode} onChange={e => setFormData({ ...formData, postalCode: e.target.value.replace(/\D/g, '') })} error={errors.postalCode} />
            </div>
        </div>
    </div>
);

const UpiIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.3391 5.53442H13.6453L14.0213 3H10L10.3391 5.53442Z" fill="#F58220" />
        <path d="M10 3H6L4 21H7.83688L8.36875 18.231H15.6312L16.1631 21H20L18 3H14.0213L13.6453 5.53442H10.3391L10 3Z" fill="#F58220" />
        <path d="M12.8094 15.6966H9.175L9.70687 12.9276H13.3412L12.8094 15.6966Z" fill="#00AEEF" />
        <path d="M13.8731 10.3931H10.2387L10.7706 7.62412H14.405L13.8731 10.3931Z" fill="#00AEEF" />
    </svg>
);

const PaymentStep = ({ paymentMethod, setPaymentMethod }) => (
    <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">Payment Method</h3>
        <div className="space-y-3">
            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-300 ${paymentMethod === 'card' ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20' : 'border-slate-300 bg-white hover:border-slate-400'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="sr-only" />
                <CreditCard className={`mr-3 transition-colors ${paymentMethod === 'card' ? 'text-teal-600' : 'text-slate-500'}`} />
                <span className="font-semibold text-slate-700">Credit / Debit Card</span>
                <div className={`w-5 h-5 ml-auto border-2 rounded-full flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-teal-500 bg-teal-500' : 'border-slate-400'}`}>
                    {paymentMethod === 'card' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
            </label>
            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-300 ${paymentMethod === 'upi' ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20' : 'border-slate-300 bg-white hover:border-slate-400'}`}>
                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="sr-only" />
                <UpiIcon />
                <span className="font-semibold text-slate-700 ml-3">UPI</span>
                <div className={`w-5 h-5 ml-auto border-2 rounded-full flex items-center justify-center transition-all ${paymentMethod === 'upi' ? 'border-teal-500 bg-teal-500' : 'border-slate-400'}`}>
                    {paymentMethod === 'upi' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
            </label>
        </div>
    </div>
);

const UpiStep = ({ total }) => (
    <div className="flex flex-col items-center text-center">
        <h3 className="text-xl font-bold text-slate-800">Scan & Pay</h3>
        <p className="text-slate-600 mt-1 mb-4">Use any UPI app to scan the code below.</p>
        <div className="p-2 bg-white rounded-lg shadow-md border w-32 h-32 sm:w-40 sm:h-40 mx-auto flex items-center justify-center">
            {/* Fake QR code SVG */}
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="#eee" />
                <rect x="10" y="10" width="20" height="20" fill="#222" />
                <rect x="70" y="10" width="20" height="20" fill="#222" />
                <rect x="10" y="70" width="20" height="20" fill="#222" />
                <rect x="40" y="40" width="20" height="20" fill="#222" />
                <rect x="70" y="70" width="20" height="20" fill="#222" />
            </svg>
        </div>
        <p className="mt-4 font-bold text-2xl text-slate-800">Pay ₹{total.toFixed(2)}</p>
        <p className="text-slate-500 text-sm">to complete your purchase</p>
    </div>
);

const SuccessStep = ({ onClose }) => (
    <div className="flex flex-col items-center text-center py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { type: 'spring', stiffness: 200, damping: 10, delay: 0.1 } }}>
            <CheckCircle className="text-teal-500 w-16 h-16 mb-3" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2 text-slate-800">Order Placed!</h2>
        <p className="mb-4 text-slate-600 text-sm">Thank you! Your order is confirmed and will be shipped soon.</p>
        <div className="flex justify-around w-full mt-2 text-slate-600">
            <div className="text-center text-xs"><Truck className="mx-auto mb-1" size={20} /><span>Assured Delivery</span></div>
            <div className="text-center text-xs"><ShieldCheck className="mx-auto mb-1" size={20} /><span>Secure Payment</span></div>
        </div>
        <button onClick={onClose} className="mt-6 w-full bg-slate-700 text-white font-bold py-3 rounded-full hover:bg-slate-800 transition-colors">Done</button>
    </div>
); 