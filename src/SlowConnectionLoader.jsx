import React from 'react';

// Tailwind-based responsive wrapper for loader
const SlowConnectionLoader = () => {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm w-full h-full min-h-screen p-4 text-center select-none">
      <svg className="mx-auto mb-6" viewBox="0 0 160 160" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" stopColor="#000" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <mask id="mask1">
            <rect x={0} y={0} width={160} height={160} fill="url(#grad)" />
          </mask>
          <mask id="mask2">
            <rect x={28} y={28} width={104} height={104} fill="url(#grad)" />
          </mask>
        </defs>
        <g>
          <g className="pl__ring-rotate">
            <circle className="pl__ring-stroke" cx={80} cy={80} r={72} fill="none" stroke="hsl(223,90%,55%)" strokeWidth={16} strokeDasharray="452.39 452.39" strokeDashoffset={452} strokeLinecap="round" transform="rotate(-45,80,80)" />
          </g>
        </g>
        <g mask="url(#mask1)">
          <g className="pl__ring-rotate">
            <circle className="pl__ring-stroke" cx={80} cy={80} r={72} fill="none" stroke="hsl(193,90%,55%)" strokeWidth={16} strokeDasharray="452.39 452.39" strokeDashoffset={452} strokeLinecap="round" transform="rotate(-45,80,80)" />
          </g>
        </g>
        <g>
          <g strokeWidth={4} strokeDasharray="12 12" strokeDashoffset={12} strokeLinecap="round" transform="translate(80,80)">
            <polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-135,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-90,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-45,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(0,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(45,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(90,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(135,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(180,0,0) translate(0,40)" />
          </g>
        </g>
        <g mask="url(#mask1)">
          <g strokeWidth={4} strokeDasharray="12 12" strokeDashoffset={12} strokeLinecap="round" transform="translate(80,80)">
            <polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-135,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-90,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-45,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(0,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(45,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(90,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(135,0,0) translate(0,40)" />
            <polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(180,0,0) translate(0,40)" />
          </g>
        </g>
        <g>
          <g transform="translate(64,28)">
            <g className="pl__arrows" transform="rotate(45,16,52)">
              <path fill="hsl(3,90%,55%)" d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z" />
              <path fill="hsl(223,10%,90%)" d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z" />
            </g>
          </g>
        </g>
        <g mask="url(#mask2)">
          <g transform="translate(64,28)">
            <g className="pl__arrows" transform="rotate(45,16,52)">
              <path fill="hsl(333,90%,55%)" d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z" />
              <path fill="hsl(223,90%,80%)" d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z" />
            </g>
          </g>
        </g>
      </svg>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Your Internet is slow</h2>
      <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto mb-2">Please check your connection, switch to WiFi or mobile data, and try again. The site will load automatically when your connection is stable.</p>
    </div>
  );
};

export default SlowConnectionLoader; 