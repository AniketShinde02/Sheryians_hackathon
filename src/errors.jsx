import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Link } from "react-router-dom";

// --- ICONS ---
const HomeIcon = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 11.25V21h6.75v-5.25h4.5V21H21v-9.75M12 3l9 8.25"
    />
  </svg>
);
const RefreshCwIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

// --- 404 PAGE: "Lost in Space" with Astronaut Game ---
const AstronautGame = () => {
  // ... (same as your provided code) ...
 
  return <div className="w-full max-w-2xl mx-auto mt-8">{/* ...game... */}</div>;
};

// --- THEMED ERROR PAGE COMPONENT ---
function ThemedErrorPage({ code, title, message }) {
  const [reloadCount, setReloadCount] = React.useState(() => Number(localStorage.getItem('errorReloadCount') || 0));
  const [reloading, setReloading] = React.useState(false);
  const [finalFail, setFinalFail] = React.useState(false);

  React.useEffect(() => {
    const lastTriedPath = localStorage.getItem('errorLastTriedPath');
    const currentPath = window.location.pathname + window.location.search;
    if (reloadCount < 1) {
      setReloading(true);
      localStorage.setItem('errorLastTriedPath', currentPath);
      const timer = setTimeout(() => {
        localStorage.setItem('errorReloadCount', reloadCount + 1);
        window.location.reload();
      }, 1800);
      return () => clearTimeout(timer);
    } else if (reloadCount === 1) {
      setReloading(true);
      // If already tried homepage, go to error
      const timer = setTimeout(() => {
        localStorage.setItem('errorReloadCount', reloadCount + 1);
        localStorage.setItem('errorLastTriedPath', '/');
        window.location.href = '/';
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      setFinalFail(true);
      setReloading(false);
      localStorage.removeItem('errorReloadCount');
      localStorage.removeItem('errorLastTriedPath');
    }
  }, []); // Only run on mount

  React.useEffect(() => {
    // Reset reload count if error page unmounts (user navigates away or error is fixed)
    return () => {
      localStorage.removeItem('errorReloadCount');
      localStorage.removeItem('errorLastTriedPath');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f0] text-yellow-300 p-2 sm:p-4 md:p-6 text-center font-mono">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto rounded-2xl shadow-lg bg-[#232b24]/90 p-4 sm:p-6 md:p-8 mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black glitch" data-text={code}>{code}</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mt-2 mb-2 sm:mb-3">{title}</h2>
        <p className="text-sm sm:text-base md:text-lg text-yellow-100 max-w-xs sm:max-w-md mx-auto mb-2">{message}</p>
        {reloading && (
          <div className="my-4 text-base sm:text-lg md:text-xl text-yellow-200 animate-pulse">We are reloading for you...</div>
        )}
        {finalFail && (
          <div className="my-4 text-base sm:text-lg md:text-xl text-red-300">Sorry, we could not fix the issue automatically.</div>
        )}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
          <button onClick={() => { localStorage.removeItem('errorReloadCount'); localStorage.removeItem('errorLastTriedPath'); window.location.reload(); }} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-yellow-300 text-yellow-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transform hover:-translate-y-1 transition-all duration-300 text-xs sm:text-sm md:text-base">
            &#x21bb; Refresh Page
          </button>
          <button onClick={() => { localStorage.removeItem('errorReloadCount'); localStorage.removeItem('errorLastTriedPath'); window.location.href = '/'; }} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-yellow-100 transition-colors text-xs sm:text-sm md:text-base">
            &#8962; Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

// --- ERROR PAGES ---
export function Page404() {
  return <ThemedErrorPage code="404" title="LOST IN SPACE" message="The page you’re looking for doesn’t exist. Maybe you took a wrong turn in the matrix?" />;
}
export function Page403() {
  return <ThemedErrorPage code="403" title="ACCESS DENIED" message="You don’t have permission to access this page. Please check your credentials or try logging in again." />;
}
export function Page401() {
  return <ThemedErrorPage code="401" title="UNAUTHORIZED" message="You must be logged in to view this page. Please sign in and try again." />;
}
export function Page502() {
  return <ThemedErrorPage code="502" title="BAD GATEWAY" message="The server received an invalid response. Our engineers are on it!" />;
}
export function Page503() {
  return <ThemedErrorPage code="503" title="SERVICE UNAVAILABLE" message="The service is temporarily unavailable. Please try again later." />;
}
export function Page504() {
  return <ThemedErrorPage code="504" title="GATEWAY TIMEOUT" message="The server took too long to respond. Please refresh or try again soon." />;
}
export function Page500() {
  return <ThemedErrorPage code="500" title="SYSTEM MALFUNCTION" message="Our circuits are fried! A team of robotic engineers has been dispatched to fix the issue. Please try refreshing." />;
}

// --- RELOAD TIMEOUT ERROR PAGE ---
export function ReloadTimeoutErrorPage({ onCountdownEnd }) {
  const [secondsLeft, setSecondsLeft] = React.useState(30);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          if (onCountdownEnd) onCountdownEnd();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onCountdownEnd]);
  // Format as 0:30, 0:29, ...
  const formattedTime = `0:${secondsLeft.toString().padStart(2, '0')}`;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f0] text-yellow-300 p-2 sm:p-4 md:p-6 text-center font-mono">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto rounded-2xl shadow-lg bg-[#232b24]/90 p-4 sm:p-6 md:p-8 mb-8 flex flex-col items-center">
        <svg className="mb-4 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="32,6 62,58 2,58" fill="#FACC15" stroke="#F59E42" strokeWidth="2" />
          <text x="32" y="46" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#B91C1C" dy="-2">!</text>
        </svg>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-red-500 mb-2">Too Many Reloads</h2>
        <p className="text-sm sm:text-base md:text-lg text-red-400 max-w-xs sm:max-w-md mx-auto mb-4 font-bold">You've reloaded the site too many times in a short span.<br />Please wait <span className="font-bold text-red-500 text-lg">{formattedTime}</span> before trying again.</p>
        <button disabled className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-red-200 text-red-700 font-bold rounded-lg shadow-lg text-xs sm:text-sm md:text-base opacity-60 cursor-not-allowed">
          Please wait...
        </button>
      </div>
    </div>
  );
}

// --- ERROR PAGE LAYOUT ---
export function ErrorPageLayout({ statusCode }) {
  switch (statusCode) {
    case 404: return <Page404 />;
    case 500: return <Page500 />;
    case 403: return <Page403 />;
    case 503: return <Page503 />;
    case 401: return <ThemedErrorPage code="401" title="UNAUTHORIZED" message="You must be logged in to view this page. Please sign in and try again." />;
    case 502: return <ThemedErrorPage code="502" title="BAD GATEWAY" message="The server received an invalid response. Our engineers are on it!" />;
    default: return <ThemedErrorPage code={statusCode} title="SYSTEM MALFUNCTION" message="Something went wrong. Please try refreshing the page or go back to the homepage." />;
  }
}

// --- ERROR BOUNDARY ---
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, reloadCount: Number(localStorage.getItem('errorReloadCount') || 0), reloading: false, finalFail: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    if (window && window.console) {
      console.error('Boundary Error:', error, errorInfo);
    }
    const lastTriedPath = localStorage.getItem('errorLastTriedPath');
    const currentPath = window.location.pathname + window.location.search;
    if (this.state.reloadCount < 1) {
      this.setState({ reloading: true });
      localStorage.setItem('errorLastTriedPath', currentPath);
      setTimeout(() => {
        localStorage.setItem('errorReloadCount', this.state.reloadCount + 1);
        window.location.reload();
      }, 1800);
    } else if (this.state.reloadCount === 1) {
      this.setState({ reloading: true });
      setTimeout(() => {
        localStorage.setItem('errorReloadCount', this.state.reloadCount + 1);
        localStorage.setItem('errorLastTriedPath', '/');
        window.location.href = '/';
      }, 1800);
    } else {
      this.setState({ finalFail: true, reloading: false });
      localStorage.removeItem('errorReloadCount');
      localStorage.removeItem('errorLastTriedPath');
    }
  }
  handleReload = () => { localStorage.removeItem('errorReloadCount'); localStorage.removeItem('errorLastTriedPath'); window.location.reload(); };
  handleHome = () => { localStorage.removeItem('errorReloadCount'); localStorage.removeItem('errorLastTriedPath'); window.location.href = '/'; };
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f0] text-yellow-300 p-4 text-center font-mono">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto rounded-2xl shadow-lg bg-[#232b24]/90 p-6 mb-8">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black glitch" data-text="500">500</h1>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mt-2 mb-2 sm:mb-3">SYSTEM MALFUNCTION</h2>
            <p className="text-base sm:text-lg text-yellow-100 max-w-xs sm:max-w-md mx-auto mb-2">Something went wrong. Please try refreshing the page or go back to the homepage.</p>
            {this.state.reloading && (
              <div className="my-4 text-base sm:text-lg md:text-xl text-yellow-200 animate-pulse">We are reloading for you...</div>
            )}
            {this.state.finalFail && (
              <div className="my-4 text-base sm:text-lg md:text-xl text-red-300">Sorry, we could not fix the issue automatically.</div>
            )}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              <button onClick={this.handleReload} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-yellow-300 text-yellow-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
                &#x21bb; Try Again
              </button>
              <button onClick={this.handleHome} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-yellow-100 transition-colors text-sm sm:text-base">
                &#8962; Homepage
              </button>
            </div>
            <div className="mt-4 text-xs text-yellow-200 break-all text-left">
              <strong>Error:</strong>
              <pre className="bg-[#181c17] text-yellow-200 rounded p-2 overflow-x-auto text-xs mt-2 mb-2 whitespace-pre-wrap">{String(this.state.error)}</pre>
              {this.state.errorInfo && <details open><summary>Stack Trace</summary><pre className="bg-[#181c17] text-yellow-200 rounded p-2 overflow-x-auto text-xs whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre></details>}
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- OFFLINE ERROR POPUP ---
export function OfflineErrorPopup() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm w-full h-full min-h-screen p-2 sm:p-4 md:p-6 text-center select-none">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto rounded-2xl shadow-lg bg-[#232b24]/90 p-4 sm:p-6 md:p-8 mb-8 flex flex-col items-center">
        {/* Warning triangle with exclamation mark */}
        <svg className="mb-4 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="32,6 62,58 2,58" fill="#FACC15" stroke="#F59E42" strokeWidth="2" />
          <text x="32" y="46" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#B91C1C" dy="-2">!</text>
        </svg>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-red-500 mb-2">You are offline</h2>
        <p className="text-sm sm:text-base md:text-lg text-yellow-100 max-w-xs sm:max-w-md mx-auto mb-4">It looks like your device is not connected to the internet. Please check your connection and try again. The site will automatically resume when you are back online.</p>
        <button onClick={() => window.location.reload()} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-yellow-300 text-yellow-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transform hover:-translate-y-1 transition-all duration-300 text-xs sm:text-sm md:text-base">
          &#x21bb; Try Again
        </button>
      </div>
    </div>
  );
}
