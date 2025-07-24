// App.jsx - Main entry for the homepage UI and layout

import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './errors.jsx';
import { Link, Routes, Route, useNavigate } from 'react-router-dom'; // If using React Router
import { useRef, useEffect } from 'react';
import { ErrorPageLayout, Page401 } from './errors.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBagShopping } from '@fortawesome/free-solid-svg-icons';


// Carousel images (coursel folder)
import coursel1 from './assets/images/coursel/1L9A2782.jpg';
import coursel2 from './assets/images/coursel/Desktop_-_14.png';
import coursel3 from './assets/images/coursel/1_9c74b93e-dcc9-43a4-912c-6b5256a961b0.png';
import coursel4 from './assets/images/coursel/BD0A0221_086960d1-42e2-4719-922a-455cb8f4f7dc_400x.jpg';
import coursel5 from './assets/images/coursel/BD0A0171_400x.jpg';
import coursel6 from './assets/images/coursel/1L9A7688_400x.jpg';

import featureImg from './assets/atheletic/editorial.img.png';

import React from 'react'; // Added React and useEffect for auto-close

import ShopByCollection from './ShopByCollection.jsx';
import Trending from './Trending.jsx';
import { ShoppingBag } from 'lucide-react';
import ProductDrawer from './ProductDrawer.jsx';
import CheckoutDrawer from './CheckoutDrawer.jsx';


const categories = [
  { name: "T-Shirts", img: "./assets /TShirt/s1.jpeg" },
  { name: "Joggers", img: "./assets/images/1_7d05aebb-7dc7-4f40-ac81-63c683c361aa.jpg" },
  { name: "Oversized Fit", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { name: "Cargo Pants", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { name: "Shirts", img: "./assets/images/Shirts/s1.jpeg" },
  { name: "Shorts", img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80" },
  { name: "Jackets", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { name: "Hoodies", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
];

const collections = [
  { name: "Summer Spring'25", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { name: "Ember Steel Winter '24", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
  { name: "Majestic Pre Fall 2023", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { name: "Knit Wear Collection", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { name: "Distressed Collection", img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" },
  { name: "Untamed Wild", img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80" },
];

const trending = [
  { name: "Glory Arc Relaxed Fit T-Shirt", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80", price: "₹1,299.00" },
  { name: "Chase Grey Distressed T-Shirt", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", price: "₹1,699.00" },
  { name: "Articwave Oversized T-Shirt", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", price: "₹1,599.00" },
  { name: "Flamewave Oversized T-Shirt", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80", price: "₹1,599.00" },
  { name: "Blazing Wild Relaxed Fit T-Shirt", img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80", price: "₹1,299.00" },
  { name: "Free Spirit Orange T-shirt", img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80", price: "₹1,299.00" },
  { name: "Dragon Raven Shirt", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80", price: "₹1,499.00" },
  { name: "Amber Joggers", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80", price: "₹1,699.00" },
  { name: "Sahara Cargos", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", price: "₹1,799.00" },
  { name: "Wildflower Jacket", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", price: "₹2,199.00" },
  { name: "Thunder Hoodie", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80", price: "₹1,899.00" },
  { name: "Neon Pulse Tee", img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80", price: "₹1,399.00" },
];

// Update the news array/object for the NewsSection so each card's image matches its title/topic
const news = [
  {
    date: "24 AUG 2025",
    title: "The Rise of Digital Fashion Shows",
    desc: "How technology is changing the runway experience.",
    img: "https://plus.unsplash.com/premium_photo-1683121155720-36d1a0143217?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    date: "27 AUG 2025",
    title: "Revolutionizing Runways: The New Age of Sustainable Fashion",
    desc: "Eco-friendly materials and digital-first brands.",
    img: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    date: "26 AUG 2024",
    title: "The Untold Stories of Fashion Industry Workers",
    desc: "Behind the scenes of the global fashion machine.",
    img: "https://images.unsplash.com/photo-1730479602684-62188640a283?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    date: "28 AUG 2026",
    title: "Upcycled Fashion and the Future",
    desc: "How upcycling is shaping tomorrow's style.",
    img: "https://images.unsplash.com/photo-1544869705-6d44403ee284?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    date: "30 AUG 2024",
    title: "Who's Making Waves in Fashion This Year?",
    desc: "Spotlight on the most innovative designers.",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/cf3753119280873.609a66380e211.jpg"
  },
  {
    date: "01 NOV 2027",
    title: "The Future of Streetwear Culture",
    desc: "How streetwear is evolving in the digital age.",
    img: "https://images.unsplash.com/photo-1527780338772-bf4f87155378?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    date: "03 SEP 2024",
    title: "Sustainable Materials in Modern Fashion",
    desc: "Exploring eco-friendly fabrics and production methods.",
    img: "https://plus.unsplash.com/premium_photo-1672680444092-b33f1e526394?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    date: "05 SEP 2025",
    title: "The Psychology of Fashion Choices",
    desc: "Understanding what drives our clothing decisions.",
    img: "https://plus.unsplash.com/premium_photo-1706895888509-97c0a7ef9aee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const heroImages = [
  coursel1,
  coursel2,
  coursel3,
  coursel4,
  coursel5,
  coursel6,
];

/**
 * SquareGridMenuButton Component
 * 
 * PURPOSE: Mobile hamburger menu button that toggles the FloatingCardMenu
 * 
 * FEATURES:
 * - Only visible on mobile devices (hidden on md+ screens)
 * - Uses Font Awesome bars icon with fallback
 * - Accessible with proper ARIA labels
 * - Clean, minimal design with hover effects
 * 
 * PROPS:
 * - open: boolean - current menu state
 * - setOpen: function - toggles menu state
 */
function SquareGridMenuButton({ open, setOpen }) {
  return (
    <button
      className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-black ml-2 relative focus:outline-none"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={() => setOpen(!open)}
      style={{ alignSelf: 'center' }}
    >
      {/* Font Awesome Bars icon (requires CDN in index.html) */}
      <i className={`fa-solid fa-bars text-2xl`} />
      {/* Fallback SVG if Font Awesome fails */}
      <span className="sr-only">Menu</span>
    </button>
  );
}

/**
 * FloatingCardMenu Component
 * 
 * PURPOSE: Mobile menu overlay with animated card reveal and backdrop blur
 * 
 * FEATURES:
 * - Centered card with reverse corner fill animation
 * - Backdrop blur effect for all content including promo banner
 * - Staggered menu item animations
 * - Auto-close on screen resize or orientation change
 * - Glassmorphism design with deep green background
 * 
 * ANIMATION: Uses Framer Motion for smooth entrance/exit animations
 * Z-INDEX: Backdrop z-[45], Menu Card z-[55] for proper layering
 * 
 * PROPS:
 * - open: boolean - controls menu visibility
 * - onClose: function - closes the menu
 */
function FloatingCardMenu({ open, onClose, onScrollToCollection, cartCount, onCart }) {
  // Menu items with icons for visual appeal
  const menuItems = [
    { label: "Shop by Category", icon: "🛍️", href: "#collection-grid" },
    { label: "Shop by Collection", icon: "👗", href: "/ShopByCollection" },
    { label: "Trending", icon: "🔥", href: "/Trending" },
    { label: "Contact", icon: "📞" },
    // CartButton will be rendered separately below
  ];

  // Responsive: Only render on small screens using state/effect (React-compliant)
  const [isMobile, setIsMobile] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : true);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Auto-close on resize/orientation change
  React.useEffect(() => {
    if (!open) return;
    if (!isMobile) onClose();
  }, [open, isMobile, onClose]);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop: Covers entire screen including promo banner for blur effect */}
          <motion.div
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[45] overflow-hidden" // reduced blue/darkness and blur
            style={{
              top: '-10px',
              left: '-10px',
              right: '-10px',
              bottom: '-20px',
              width: 'calc(100vw + 20px)',
              height: 'calc(100vh + 30px)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
          <style>{`
            body, html {
              margin: 0 !important;
              padding: 0 !important;
              overflow-x: hidden !important;
            }
          `}</style>
          {/* Centered Menu Card with reverse corner fill effect and glassmorphism */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl p-5 z-[55] min-w-[85vw] max-w-xs sm:max-w-sm border border-white/20 bg-[#2d3a2e]/95 backdrop-blur-md relative"
            style={{ position: 'fixed', overflow: 'hidden', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
            initial={{ clipPath: 'inset(50% 50% 50% 50% round 100% 100% 100% 100%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 18px 18px 18px 18px)' }}
            exit={{ clipPath: 'inset(50% 50% 50% 50% round 100% 100% 100% 100%)' }}
            transition={{ type: "spring", stiffness: 200, damping: 20, when: "afterChildren" }}
          >
            {/* Close Button - positioned in top-right corner */}
            <button
              className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none z-10"
              onClick={onClose}
              aria-label="Close menu"
            >
              <i className="fa-regular fa-x text-lg"></i>
            </button>

            <div className="space-y-3">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className={
                    "flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors font-grotesk text-base text-white " +
                    (item.href ? "hover:bg-green-50/10" : "")
                  }
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 18, transition: { delay: i * 0.03, duration: 0.1 } }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={item.href === '#collection-grid' ? () => { onScrollToCollection(); onClose(); } : item.href ? undefined : onClose}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.href ? (
                    item.href === '#collection-grid' ? (
                      <span className="font-semibold text-white drop-shadow-md w-full block">{item.label}</span>
                    ) : (
                      <Link to={item.href} className="font-semibold text-white drop-shadow-md w-full block" onClick={onClose}>{item.label}</Link>
                    )
                  ) : (
                    <span className="font-semibold text-white drop-shadow-md">{item.label}</span>
                  )}
                </motion.div>
              ))}
              {/* CartButton styled like menu item, not oversized */}
              <motion.div
                className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors font-grotesk text-base text-white hover:bg-green-50/10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { onCart(); onClose(); }}
              >
                <FontAwesomeIcon icon={faCartShopping} className="w-4 h-4" />
                <span className="font-semibold text-white drop-shadow-md w-full block">My Cart</span>
                {cartCount > 0 && (
                  <span className="ml-2 bg-yellow-300 text-yellow-900 rounded-full px-2 py-0.5 text-xs font-bold animate-pulse">{cartCount}</span>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


function Navbar({ onScrollToCollection, cartCount, onShop, onCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-2 md:px-5 lg:px-6 h-12 md:h-14 lg:h-16 bg-white/90 shadow-sm font-grotesk">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-7 h-7 text-gray-800" />
          <span className="text-xl font-bold text-gray-800 font-grotesk tracking-wider">OVERLAYS</span>
        </div>
        <div className="hidden sm:flex gap-3 md:gap-2 text-sm md:text-xs lg:text-base font-semibold text-gray-700 font-sans items-center min-w-0 flex-shrink flex-wrap">
          <a href="#collection-grid" className="hover:text-green-700 transition cursor-pointer" onClick={onScrollToCollection}>Shop by Category</a>
          <Link to="/ShopByCollection" className="hover:text-green-700 transition cursor-pointer">Shop by Collection</Link>
          <Link to="/Trending" className="hover:text-green-700 transition cursor-pointer">Trending</Link>
          <span className="hover:text-green-700 transition cursor-pointer md:hidden lg:inline">Contact</span>
        </div>
        <div className="flex items-center gap-2">
          <SquareGridMenuButton open={menuOpen} setOpen={setMenuOpen} />
          {/* CartButton hidden on mobile, shown on sm+; smaller size on md */}
          <span className="hidden sm:inline-block">
            <CartButton cartCount={cartCount} onCart={onCart} className="!px-2 !py-1 !min-w-0 !h-8 text-base md:!px-2 md:!py-1 md:!text-xs" />
          </span>
        </div>
      </nav>
      <FloatingCardMenu open={menuOpen} onClose={() => setMenuOpen(false)} onScrollToCollection={onScrollToCollection} cartCount={cartCount} onCart={onCart} />
    </>
  );
}

/**
 * AnimatedBadge Component
 * 
 * PURPOSE: Utility component for creating animated badges with different animation types
 * 
 * FEATURES:
 * - Pulse animation for attention-grabbing badges (NEW DROP)
 * - Orbit animation for rotating elements (stars)
 * - Scale animation for exclusive badges
 * - Customizable styling through className prop
 * 
 * ANIMATIONS:
 * - pulse: Scale up and down for emphasis
 * - orbit: 360-degree rotation for stars
 * - exclusive: Special scale animation for EXCLUSIVE badge
 * 
 * PROPS:
 * - children: React node - content to display
 * - orbit: boolean - enables rotation animation
 * - pulse: boolean - enables scale animation
 * - className: string - additional CSS classes
 */
function AnimatedBadge({ children, orbit = false, pulse = false, className = "" }) {
  // Custom: pulse+glow effect for EXCLUSIVE
  const isExclusive = className.includes('exclusive-badge');
  return (
    <motion.span
      className={"inline-block " + className}
      animate={
        isExclusive
          ? { scale: [1, 1.12, 1] } // removed boxShadow
          : orbit
            ? { rotate: [0, 360] }
            : pulse
              ? { scale: [1, 1.15, 1] }
              : {}
      }
      transition={
        isExclusive
          ? { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
          : orbit
            ? { repeat: Infinity, duration: 2.5, ease: 'linear' }
            : pulse
              ? { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }
              : {}
      }
      style={orbit ? { display: 'inline-block', originX: 0.5, originY: 0.5 } : {}}
    >
      {children}
    </motion.span>
  );
}

/**
 * RippleButton Component
 * 
 * PURPOSE: Button component with ripple effect for modern UI feedback
 * 
 * FEATURES:
 * - CSS ripple effect on click for tactile feedback
 * - Customizable styling through className prop
 * - Spreads all additional props to the button element
 * - Automatic ripple cleanup after animation
 * 
 * RIPPLE EFFECT:
 * - Creates a circular ripple from click position
 * - Scales up and fades out over 0.6 seconds
 * - Automatically removes ripple element after animation
 * 
 * PROPS:
 * - children: React node - button content
 * - className: string - additional CSS classes
 * - ...props: any additional button props
 */
function RippleButton({ children, className = "", ...props }) {
  // Simple CSS ripple effect
  return (
    <button
      className={
        "relative overflow-hidden focus:outline-none " +
        className
      }
      {...props}
      onClick={e => {
        const btn = e.currentTarget;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = e.nativeEvent.offsetX + 'px';
        ripple.style.top = e.nativeEvent.offsetY + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        if (props.onClick) props.onClick(e);
      }}
    >
      {children}
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background: rgba(0,0,0,0.18);
          pointer-events: none;
          width: 120px;
          height: 120px;
          left: 50%;
          top: 50%;
          margin-left: -60px;
          margin-top: -60px;
        }
        @keyframes ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}

/**
 * EditorialHero Component
 * 
 * PURPOSE: Main hero section with animated content, carousel, and brand messaging
 * 
 * FEATURES:
 * - Animated entrance with spring physics
 * - Parallax background layers with floating elements
 * - Responsive design with mobile-first approach
 * - Product carousel with Swiper integration
 * - Trust signals and statistics display
 * - Call-to-action button with ripple effect
 * 
 * LAYOUT:
 * - Two-column layout on desktop (content + carousel)
 * - Single-column layout on mobile
 * - Fixed positioning accounts for header height
 * 
 * ANIMATIONS:
 * - Staggered entrance animations for content
 * - Floating background elements with infinite loops
 * - Spring-based transitions for natural feel
 */
function EditorialHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 60, damping: 18 }}
      className="relative w-full bg-[#f5f5f0] flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-20 pt-24 pb-8 md:pb-16 gap-8 md:gap-0 overflow-hidden font-grotesk"
    >
      {/* Parallax layers for visual depth */}
      <motion.div
        className="absolute left-0 top-0 w-full h-full pointer-events-none z-0"
        style={{ zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="absolute left-0 top-0 w-1/2 h-1/2 bg-blue-200 rounded-full blur-3xl opacity-30"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-yellow-200 rounded-full blur-2xl opacity-20"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
      </motion.div>
      {/* Main content area with staggered animations */}
      <div className="flex-1 flex flex-col gap-4 z-10 pt-6 sm:pt-8 md:pt-0">
        {/* Badge row with animated elements */}
        <div className="flex items-center gap-2 mb-2 relative z-20">
          <AnimatedBadge pulse className="bg-green-700 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide relative z-20 font-grotesk">NEW DROP</AnimatedBadge>
          <AnimatedBadge orbit className="text-yellow-600 text-lg font-bold relative z-20 font-grotesk">★</AnimatedBadge>
        </div>
        {/* Main headline with exclusive badge */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-grotesk font-black text-gray-900 leading-tight mb-2 tracking-tight relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 80, damping: 16 }}
        >
          <span className="relative inline-block align-middle px-0.5 z-10">PASSION</span>
          <AnimatedBadge className="exclusive-badge absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs sm:text-sm md:text-base px-2 py-1 rounded z-20 whitespace-nowrap leading-tight font-bold tracking-wide mt-2 sm:mt-3 font-grotesk">EXCLUSIVE</AnimatedBadge>
        </motion.h1>
        {/* Descriptive text */}
        <motion.p
          className="text-base md:text-lg text-gray-700 max-w-lg mb-4 font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 60, damping: 18 }}
        >In a world where style is limitless, Overlays strives to redefine fashion for the new era.</motion.p>
        {/* Trust signals and statistics */}
        <div className="flex items-center gap-6 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-green-700 font-grotesk">+1L</span>
            <span className="text-xs text-gray-500 font-sans">Happy Customers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-green-700 font-grotesk">24H</span>
            <span className="text-xs text-gray-500 font-sans">Fast Dispatch</span>
          </div>
        </div>
        {/* Call-to-action button */}
        <RippleButton className="mt-6 px-8 py-3 rounded-full bg-green-700 text-white font-bold shadow hover:bg-green-800 transition w-max font-grotesk text-lg">Shop New Arrivals</RippleButton>
      </div>
      {/* Product carousel section */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 60, damping: 18 }}
      >
        <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full bg-green-100 border-8 border-green-700 overflow-hidden shadow-lg flex items-center justify-center animate-fade-in">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            coverflowEffect={{ rotate: 30, stretch: 0, depth: 120, modifier: 1.5, slideShadows: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
            modules={[EffectCoverflow, Autoplay]}
            className="w-full h-full"
          >
            {heroImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt={`Hero ${idx + 1}`} loading="lazy" className="object-cover w-full h-full" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <AnimatedBadge pulse className="absolute bottom-4 right-4 bg-yellow-300 text-yellow-900 px-4 py-1 rounded-full font-bold text-xs shadow font-grotesk">STYLE</AnimatedBadge>
      </motion.div>
    </motion.section>
  );
}

// SectionDivider: Animated divider for editorial style
function SectionDivider() {
  return (
    <div className="w-full bg-green-700 py-2 overflow-hidden relative font-grotesk">
      <div className="whitespace-nowrap animate-marquee text-white text-lg font-bold tracking-widest">
        <span className="inline-block mr-12">STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE</span>
        <span className="inline-block mr-12">STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE</span>
        <span className="inline-block mr-12">STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE</span>
        <span className="inline-block mr-12">STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE &nbsp; FASHION &nbsp; STYLE</span>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {  
          display: flex;
          animation: marquee 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

// EditorialStory: Brand story/mission section (justified tagline)
function EditorialStory() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 py-12 font-grotesk px-4 sm:px-8 md:px-16">
      <div className="flex-1">
        <video
          className="rounded-2xl shadow-lg w-[98.5%] mx-auto h-auto"
          src="/Videos/Overlays.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="flex-1 pl-3 sm:pl-0 flex flex-col items-center md:items-start">
        <h2 className="text-3xl font-bold mb-4 w-full">Our Story in Motion</h2>
        <p className="text-lg text-gray-700 font-sans text-justify max-w-xs sm:max-w-prose md:max-w-2xl w-full mx-auto md:mx-0 px-2 sm:px-0 line-clamp-3 md:line-clamp-none">
          Step into a world where fabric meets innovation. Our latest collection is more than clothing—it's a feeling, a statement, and an extension of you. Discover the passion, precision, and energy woven into every piece, crafted to empower your bold and authentic self. Experience the art of dressing, reimagined.
        </p>
      </div>
    </section>
  );
}

// FunkyArtOverlay: Utility for SVG overlays (e.g., squiggle, star, blob)
function FunkyArtOverlay({ type = 'squiggle', className = '' }) {
  // Example SVG overlays: squiggle, neon line, paint splash, etc.
  if (type === 'squiggle') {
    return (
      <svg className={className} width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12C8 2 16 22 22 12C28 2 36 22 42 12C48 2 56 22 58 12" stroke="#FF00CC" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'star') {
    return (
      <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2L19.09 11.26L29 12.27L21 18.14L23.18 28.02L16 22.77L8.82 28.02L11 18.14L3 12.27L12.91 11.26L16 2Z" fill="#00FFF0" />
      </svg>
    );
  }
  if (type === 'blob') {
    return (
      <svg className={className} width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="30" rx="38" ry="18" fill="#FFD600" fillOpacity="0.18" />
      </svg>
    );
  }
  return null;
}

// Easing function for smooth scroll
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function smoothScrollTo(targetY, duration = 900) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start;
  function step(timestamp) {
    if (!start) start = timestamp;
    const time = Math.min(1, (timestamp - start) / duration);
    const eased = easeInOutQuad(time);
    window.scrollTo(0, startY + diff * eased);
    if (time < 1) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

// Fallback image for all products
const fallbackImg = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80';

// Import local images for each category
import top1 from './assets/Top/top1.png';
import top2 from './assets/Top/top 2.png';
import top3 from './assets/Top/top 3.png';
import top5 from './assets/Top/top5.png';
import tshirt1 from './assets/TShirt/shirt1.png';
import tshirt2 from './assets/TShirt/Shirt2.png';
import tshirt3 from './assets/TShirt/Shirt3.png';
import tshirt4 from './assets/TShirt/Shirt4.png';
import dress1 from './assets/Dress/Dress1.png';
import dress2 from './assets/Dress/Dress2.png';
import dress3 from './assets/Dress/Dress3.png';
import dress4 from './assets/Dress/Dress4.png';
import denim1 from './assets/Denim/d1.jpeg';
import denim2 from './assets/Denim/d2.jpeg';
import denim3 from './assets/Denim/d3.jpeg';
import denim4 from './assets/Denim/d4.jpeg';
import atheletic1 from './assets/atheletic/a1.jpeg';
import atheletic2 from './assets/atheletic/a2.jpeg';
import atheletic3 from './assets/atheletic/a3.jpeg';
import bag1 from './assets/Bag/bag.jpeg';
import bag2 from './assets/Bag/b2.jpeg';
import bag3 from './assets/Bag/b3.jpeg';
import bag4 from './assets/Bag/b4.jpeg';
import cap1 from './assets/Caps/c1.jpeg';
import cap2 from './assets/Caps/c2.jpeg';
import cap3 from './assets/Caps/c3.jpeg';
import cap4 from './assets/Caps/c4.jpeg';
import acc1 from './assets/acc/a1.jpeg';
import acc2 from './assets/acc/a2.jpeg';
import acc3 from './assets/acc/a3.jpeg';
import acc4 from './assets/acc/a4.jpeg';

// Only declare products array once
const products = [
  // Tops
  { name: "Classic White Top", img: top1 || fallbackImg, price: "₹1,299.00", category: "Tops" },
  { name: "Blue Linen Top", img: top2 || fallbackImg, price: "₹1,499.00", category: "Tops" },
  { name: "Striped Summer Top", img: top3 || fallbackImg, price: "₹1,399.00", category: "Tops" },
  { name: "Sleeveless Black Top", img: top5 || fallbackImg, price: "₹1,199.00", category: "Tops" },

  // T-Shirt
  { name: "Graphic Print T-Shirt", img: tshirt1 || fallbackImg, price: "₹999.00", category: "T-Shirt" },
  { name: "Oversized Black T-Shirt", img: tshirt2 || fallbackImg, price: "₹1,199.00", category: "T-Shirt" },
  { name: "Minimalist White T-Shirt", img: tshirt3 || fallbackImg, price: "₹899.00", category: "T-Shirt" },
  { name: "Striped Crewneck T-Shirt", img: tshirt4 || fallbackImg, price: "₹1,099.00", category: "T-Shirt" },

  // Dress
  { name: "Floral Midi Dress", img: dress1 || fallbackImg, price: "₹2,499.00", category: "Dress" },
  { name: "Summer Sundress", img: dress2 || fallbackImg, price: "₹2,199.00", category: "Dress" },
  { name: "Evening Gown", img: dress3 || fallbackImg, price: "₹3,499.00", category: "Dress" },
  { name: "Casual Day Dress", img: dress4 || fallbackImg, price: "₹1,999.00", category: "Dress" },

  // Denim
  { name: "Classic Blue Jeans", img: denim1 || fallbackImg, price: "₹1,799.00", category: "Denim" },
  { name: "Denim Jacket", img: denim2 || fallbackImg, price: "₹2,499.00", category: "Denim" },
  { name: "Distressed Skinny Jeans", img: denim3 || fallbackImg, price: "₹1,999.00", category: "Denim" },
  { name: "Cropped Denim Shirt", img: denim4 || fallbackImg, price: "₹1,599.00", category: "Denim" },

  // Athletic Wear
  { name: "Performance Running Shorts", img: atheletic1 || fallbackImg, price: "₹1,199.00", category: "Athletic Wear" },
  { name: "Moisture-Wick Tee", img: atheletic2 || fallbackImg, price: "₹999.00", category: "Athletic Wear" },
  { name: "Track Jacket", img: atheletic3 || fallbackImg, price: "₹1,799.00", category: "Athletic Wear" },
  { name: "Training Leggings", img: fallbackImg, price: "₹1,299.00", category: "Athletic Wear" },

  // Bags
  { name: "Classic Bag", img: bag1 || fallbackImg, price: "₹2,499.00", category: "Bags" },
  { name: "Leather Bag", img: bag2 || fallbackImg, price: "₹2,799.00", category: "Bags" },
  { name: "Canvas Bag", img: bag3 || fallbackImg, price: "₹2,999.00", category: "Bags" },
  { name: "Travel Bag", img: bag4 || fallbackImg, price: "₹2,199.00", category: "Bags" },

  // Caps
  { name: "Classic Cap", img: cap1 || fallbackImg, price: "₹799.00", category: "Caps" },
  { name: "Sports Cap", img: cap2 || fallbackImg, price: "₹899.00", category: "Caps" },
  { name: "Snapback Cap", img: cap3 || fallbackImg, price: "₹999.00", category: "Caps" },
  { name: "Trucker Cap", img: cap4 || fallbackImg, price: "₹1,099.00", category: "Caps" },

  // Accessories
  { name: "Leather Belt", img: acc1 || fallbackImg, price: "₹799.00", category: "Accessories" },
  { name: "Classic Watch", img: acc2 || fallbackImg, price: "₹3,499.00", category: "Accessories" },
  { name: "Canvas Tote Bag", img: acc3 || fallbackImg, price: "₹1,299.00", category: "Accessories" },
  { name: "Wool Scarf", img: acc4 || fallbackImg, price: "₹999.00", category: "Accessories" },
];

// CollectionGrid: Product grid with responsive layout and tilt/hover effects (no custom hover effect)
function CollectionGrid({ onRequireAuth, isLoggedIn, selectedProduct, setSelectedProduct, highlight, onAddToCart, onProductClick, onCart }) {
  // 2. Add 'Our Store' filter and update filter logic
  const filters = ["Our Store", "Tops", "T-Shirt", "Dress", "Denim","Athletic Wear", "Caps","Bags", "Accessories"];
  const [active, setActive] = useState("Our Store");
  const [adding, setAdding] = useState(null); // index of item being added

  // 3. Filter products based on active filter
  const filteredProducts = active === "Our Store"
    ? products.slice(0, 8)
    : products.filter((item) => item.category === active).slice(0, 8);

  return (
    <section id="collection-grid" className="w-full mx-auto bg-[#2d3a2e] py-6 sm:py-10 px-4 sm:px-8  my-10 font-grotesk">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4 items-center text-center md:items-start md:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-white mb-2">OUR COLLECTION FOR YOU</h2>
        {/* Sticky filter bar: stays at top of collection grid when scrolling */}
        <div className="sticky top-[5rem] z-30 bg-[#2d3a2e] grid grid-cols-2 sm:flex flex-wrap gap-2 justify-center md:justify-start py-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setActive(f)} className={`px-4 py-1 rounded-full text-xs font-bold border ${active === f ? "bg-yellow-300 text-yellow-900 border-yellow-300" : "bg-white/10 text-white border-white/20"} transition`}>{f}</button>
          ))}
        </div>
      </div>

  

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full justify-center items-stretch">
        {filteredProducts.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="w-[90vw] max-w-xs mx-auto rounded-2xl bg-[#232b24] shadow-lg p-3 sm:p-4 md:p-5 flex flex-col h-full items-center text-center md:items-start md:text-left cursor-pointer group mb-3"
          >
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 border-2 border-[#313d33] shadow-md transition-all duration-300 bg-[#232b24] flex items-center justify-center group-hover:shadow-xl">
              <img
                src={item.img || fallbackImg}
                alt={item.name}
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-white mb-1 mt-2 text-center md:text-left w-full group-hover:text-yellow-300 transition-colors duration-300">{item.name}</h3>
            <span className="text-yellow-300 font-bold text-sm sm:text-base mb-2 text-center md:text-left w-full">{item.price}</span>
            <RippleButton
              className={`mt-auto px-5 py-2 rounded-full bg-yellow-300 text-yellow-900 font-semibold shadow hover:bg-yellow-400 transition text-sm w-max mx-auto group-hover:shadow-lg group-hover:scale-105`}
              onClick={(e) => {
                e.stopPropagation();
                onProductClick(item);
              }}
            >
              Add to Cart
            </RippleButton>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <RippleButton className="px-6 py-2 rounded-full bg-white text-green-700 font-bold shadow hover:bg-green-100 transition text-sm font-grotesk">VIEW ALL</RippleButton>
      </div>
    </section>
  );
}

// NewsSection: Editorial/news/blog cards (no custom hover effect)
function NewsSection() {
  return (
    <section id="trending-news" className="w-full bg-white py-8 sm:py-12 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-24 font-grotesk">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-gray-900 mb-6 sm:mb-8">A LOOK AT FASHION TURN TOWARDS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full items-stretch justify-center">
        {news.map((n, i) => (
          <div key={i} className="w-full max-w-[96vw] mx-auto md:max-w-none md:mx-0 rounded-2xl bg-[#f5f5f0] shadow-lg p-4 sm:p-5 flex flex-col transition-transform duration-300 hover:scale-105 h-full animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 border-2 border-[#e5e5e5] shadow-md transition-all duration-300 bg-[#f5f5f0] flex items-center justify-center">
              <img src={n.img} alt={n.title} loading="lazy" className="object-cover w-full h-full" />
            </div>
            <span className="text-xs text-gray-500 mb-1">{n.date}</span>
            <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-gray-900 mb-1">{n.title}</h3>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-2">{n.desc}</p>
            <button className="mt-auto px-5 py-2 rounded-full bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition text-sm w-max mx-auto font-grotesk">Read More</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// FeatureBanner: Highlighted feature/collection section
function FeatureBanner() {
  return (
    <section className="w-[97.5%] mx-auto bg-[#2d3a2e] py-6 sm:py-12 px-4 sm:px-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 rounded-2xl my-10 font-grotesk">
      <div className="flex-1 flex flex-col gap-4 items-center text-center md:items-start md:text-left">
        <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-2">ELEGANCE IN EVERY THREAD</h2>
        <p className="text-lg text-white/80 max-w-lg mb-4 font-sans">Especially suitable for a brand or collection that focuses on intricate details, quality, and a timeless sense of style.</p>
        <span className="bg-yellow-300 text-yellow-900 px-4 py-1 rounded-full font-bold text-xs shadow animate-wiggle w-max font-grotesk">NEW DROP</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-48 h-48 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-lg mx-auto">
          <img src={featureImg} alt="Elegance" loading="lazy" className="object-cover w-full h-full" />
        </div>
      </div>
    </section>
  );
}

// Footer: Site footer with links, social, and newsletter (logo left, subscribe right, fully responsive)
function Footer() {
  return (
    <footer className="w-full bg-[#f5f5f0] border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8 mt-10 font-grotesk">
      <div className="max-w-7xl mx-auto">
        {/* Top section: Brand + Newsletter */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-6">
          {/* Left: Brand */}
          <Logo />
          {/* Right: Newsletter */}
          <div className="flex gap-2 w-full lg:w-auto lg:ml-auto">
            <input
              type="email"
              placeholder="Your email"
              className="w-48 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <button className="px-6 py-2 rounded-full bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition text-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom section: Navigation columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="flex flex-col gap-1 text-gray-700 text-sm">
            <span className="font-bold mb-1 text-gray-900">CATEGORIES</span>
            <span className="hover:text-green-700 transition cursor-pointer">T-Shirts</span>
            <span className="hover:text-green-700 transition cursor-pointer">Joggers</span>
            <span className="hover:text-green-700 transition cursor-pointer">Oversized Fit</span>
            <span className="hover:text-green-700 transition cursor-pointer">Cargo Pants</span>
            <span className="hover:text-green-700 transition cursor-pointer">Shirts</span>
            <span className="hover:text-green-700 transition cursor-pointer">Shorts</span>
            <span className="hover:text-green-700 transition cursor-pointer">Jackets</span>
            <span className="hover:text-green-700 transition cursor-pointer">Hoodies</span>
          </div>

          <div className="flex flex-col gap-1 text-gray-700 text-sm">
            <span className="font-bold mb-1 text-gray-900">COLLECTIONS</span>
            <span className="hover:text-green-700 transition cursor-pointer">Summer Spring'25</span>
            <span className="hover:text-green-700 transition cursor-pointer">Ember Steel Winter '24</span>
            <span className="hover:text-green-700 transition cursor-pointer">Majestic Pre Fall 2023</span>
            <span className="hover:text-green-700 transition cursor-pointer">Knit Wear Collection</span>
            <span className="hover:text-green-700 transition cursor-pointer">Distressed Collection</span>
            <span className="hover:text-green-700 transition cursor-pointer">Untamed Wild</span>
          </div>

          <div className="flex flex-col gap-1 text-gray-700 text-sm">
            <span className="font-bold mb-1 text-gray-900">COMPANY</span>
            <span className="hover:text-green-700 transition cursor-pointer">About</span>
            <span className="hover:text-green-700 transition cursor-pointer">Contact</span>
            <span className="hover:text-green-700 transition cursor-pointer">Terms of Use</span>
            <span className="hover:text-green-700 transition cursor-pointer">Shipping Policy</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-gray-400 text-xs text-center mt-6 pt-4 border-t border-gray-200">
          © {new Date().getFullYear()} Overlays. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// Logo component for consistent branding
function Logo({ className = '', textClass = '' }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <ShoppingBag className="w-7 h-7 text-gray-800" />
      <span className={`text-xl font-bold text-gray-800 font-grotesk tracking-wider ${textClass}`}>OVERLAYS</span>
    </span>
  );
}

// CartButton component for the navbar
function CartButton({ cartCount, onCart, className = "" }) {
  return (
    <button
      className={
        "relative flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold shadow hover:bg-green-800 transition text-sm min-w-[44px] sm:min-w-[48px] h-8 sm:h-9 border border-white/80 drop-shadow-md font-grotesk bg-green-700 text-white " +
        className
      }
      onClick={onCart}
    >
      <FontAwesomeIcon icon={faBagShopping} className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="ml-2 bg-yellow-300 text-yellow-900 rounded-full px-2 py-0.5 text-xs font-bold animate-pulse">{cartCount}</span>
      )}
    </button>
  );
}

// Utility to normalize product object
function normalizeProduct(product) {
  if (!product) return null;
  // Extract numeric price from string if needed
  let price = product.price;
  if (typeof price === 'string') {
    // Remove currency symbols and commas, then parse
    price = parseFloat(price.replace(/[^\d.]/g, ''));
    if (isNaN(price)) price = 0;
  }
  return {
    id: product.id ?? product.name ?? Math.random().toString(36).slice(2),
    name: product.name || 'Unknown Product',
    img: product.img || '',
    price,
    size: product.size || '',
    quantity: product.quantity || 1,
    // Add any other fields you want to persist
  };
}

// App: Main wrapper for all sections and state
export default function App() {
  // Margin-top: promo banner (h-10, 2.5rem) + header (h-10, 2.5rem) = 5rem
  const [selectedProduct, setSelectedProduct] = useState(null);
  const collectionGridRef = useRef(null);
  const [highlight, setHighlight] = useState(false);
  // Cart is an array of product objects
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerProduct, setDrawerProduct] = useState(null);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add to cart handler: only works if logged in
  const handleAddToCart = (product) => {
    const normalized = normalizeProduct(product);
    if (!normalized) return;
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === normalized.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: (updated[idx].quantity || 1) + 1 };
        return updated;
      }
      return [...prev, { ...normalized, quantity: 1 }];
    });
  };

  const handleAddToCartWithCheck = (product) => {
    // Check for duplicate (id+size)
    const exists = cart.some(
      (item) => item.id === product.id && item.size === product.size
    );
    if (exists) {
      setWarning("Already in cart");
      setTimeout(() => setWarning(""), 1500);
      return;
    }
    setCart((prev) => [...prev, product]);
  };

  // Cart navigation handler (open checkout drawer)
  const handleCart = () => setCheckoutDrawerOpen(true);

  // Enhanced smooth scroll handler for anchor links
  const handleScrollToCollection = () => {
    if (collectionGridRef.current) {
      const rect = collectionGridRef.current.getBoundingClientRect();
      const offset = window.scrollY + rect.top - 24; // offset for fixed header
      smoothScrollTo(offset, 900); // 900ms for deliberate glide
      setHighlight(true);
      setTimeout(() => setHighlight(false), 1200);
    }
  };

  // Handler for product card click (universal)
  const handleProductClick = (product) => {
    setDrawerProduct(product);
    setDrawerOpen(true);
  };

  return (
    <ErrorBoundary>
      <>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-[#f5f5f0] font-sans scroll-smooth">
              {/* Navbar: Main navigation bar */}
              <Navbar onScrollToCollection={handleScrollToCollection} cartCount={cart.length} onCart={handleCart} />
              {/* Main content container, always below fixed header/banner */}
              <div className="w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto mt-[3rem]">
                {/* EditorialHero: Hero section with animated carousel and headline */}
                <EditorialHero />
                {/* SectionDivider: Animated divider for editorial style */}
                <SectionDivider />
                {/* EditorialStory: Brand story/mission section */}
                <EditorialStory />
                {/* CollectionGrid: Product grid with responsive layout and tilt/hover effects */}
                <div ref={collectionGridRef}>
                  <CollectionGrid
                    isLoggedIn={false}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    highlight={highlight}
                    onAddToCart={handleAddToCartWithCheck}
                    onProductClick={handleProductClick}
                    onCart={handleCart}
                  />
                </div>
                {/* NewsSection: Editorial/news/blog cards */}
                <NewsSection />
                {/* FeatureBanner: Highlighted feature/collection section */}
                <FeatureBanner />
                {/* Footer: Site footer with links, social, and newsletter */}
                <Footer />
              </div>
              <ProductDrawer
                open={drawerOpen}
                product={drawerProduct}
                onClose={() => setDrawerOpen(false)}
                onAddToCart={handleAddToCartWithCheck}
                onAddToCartAndCheckout={() => {
                  setDrawerOpen(false);
                  setCheckoutDrawerOpen(true);
                }}
              />
            </div>
          } />
          <Route path="/ShopByCollection" element={<ShopByCollection onAddToCart={handleAddToCartWithCheck} cartCount={cart.length} cart={cart} onProductClick={handleProductClick} onCart={handleCart} />} />
          <Route path="/Trending" element={<Trending onCart={handleCart} cartCount={cart.length} onAddToCart={handleAddToCartWithCheck} />} />
          {/* Error test routes */}
          <Route path="/error/403" element={<ErrorPageLayout statusCode={403} />} />
          <Route path="/error/500" element={<ErrorPageLayout statusCode={500} />} />
          <Route path="/error/503" element={<ErrorPageLayout statusCode={503} />} />
          <Route path="/error/401" element={<ErrorPageLayout statusCode={401} />} />
          <Route path="/error/502" element={<ErrorPageLayout statusCode={502} />} />
          <Route path="/error/504" element={<ErrorPageLayout statusCode={504} />} />
          {/* Catch-all 404 */}
          <Route path="*" element={<ErrorPageLayout statusCode={404} />} />
        </Routes>
        <CheckoutDrawer
          open={checkoutDrawerOpen}
          cart={cart}
          setCart={setCart}
          onClose={() => setCheckoutDrawerOpen(false)}
          bgColor="#e5e7eb"
        />
        {warning && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-3 rounded-full shadow-lg z-[9999] font-bold animate-fade-in-up">
            {warning}
          </div>
        )}
      </>
    </ErrorBoundary>
  );
}
