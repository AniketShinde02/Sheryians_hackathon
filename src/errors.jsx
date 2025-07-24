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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#232b24] text-yellow-300 p-4 text-center font-mono">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto rounded-2xl shadow-lg bg-[#232b24]/90 p-6 mb-8">
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black glitch" data-text={code}>{code}</h1>
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mt-2 mb-2 sm:mb-3">{title}</h2>
        <p className="text-base sm:text-lg text-yellow-100 max-w-xs sm:max-w-md mx-auto mb-2">{message}</p>
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
          <button onClick={() => window.location.reload()} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-yellow-300 text-yellow-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
            &#x21bb; Refresh Page
          </button>
          <button onClick={() => window.location.href = '/'} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-yellow-100 transition-colors text-sm sm:text-base">
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
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // Optionally log to a remote service here
    if (window && window.console) {
      console.error('Boundary Error:', error, errorInfo);
    }
  }
  handleReload = () => window.location.reload();
  handleHome = () => window.location.href = '/';
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#2d3a2e] text-yellow-300 p-4 text-center font-mono">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto rounded-2xl shadow-lg bg-[#232b24]/90 p-6 mb-8">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black glitch" data-text="500">500</h1>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mt-2 mb-2 sm:mb-3">SYSTEM MALFUNCTION</h2>
            <p className="text-base sm:text-lg text-yellow-100 max-w-xs sm:max-w-md mx-auto mb-2">Something went wrong. Please try refreshing the page or go back to the homepage.</p>
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
