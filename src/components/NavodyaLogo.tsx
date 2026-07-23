import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'dark-full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const NavodyaLogo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', title: 'text-base', subtitle: 'text-[9px]' },
    md: { icon: 'w-11 h-11', title: 'text-xl', subtitle: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', title: 'text-2xl', subtitle: 'text-[11px]' },
    xl: { icon: 'w-20 h-20', title: 'text-3xl', subtitle: 'text-[13px]' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon recreating Navodya Kidney Emblem */}
      <div className={`relative flex-shrink-0 ${currentSize.icon} transition-transform hover:scale-105 duration-300`}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <defs>
            {/* Left Pink-Magenta Gradient */}
            <linearGradient id="pinkGradient" x1="20" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>

            {/* Right Purple Gradient */}
            <linearGradient id="purpleGradient" x1="100" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>

            {/* Blue Background accent ring */}
            <linearGradient id="ringGradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#6b21a8" />
            </linearGradient>
          </defs>

          {/* Outer Ring Circle Frame with top opening for Cross */}
          <path
            d="M 45,45 A 85,85 0 1,0 155,45"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Red/Magenta Cross Symbol at Top */}
          <g transform="translate(100, 24)">
            <rect x="-4" y="-12" width="8" height="24" rx="2" fill="#e11d48" />
            <rect x="-12" y="-4" width="24" height="8" rx="2" fill="#e11d48" />
          </g>

          {/* LEFT KIDNEY (Pink/Magenta) */}
          <g>
            <path
              d="M 88,52 C 60,50 48,72 52,98 C 55,118 70,132 86,132 C 92,132 94,122 90,112 C 86,102 82,90 88,78 C 92,70 94,52 88,52 Z"
              fill="url(#pinkGradient)"
            />
            {/* Renal Arteries/Veins Branches Left */}
            <path
              d="M 88,80 Q 75,85 68,75 M 86,92 Q 72,94 65,88 M 87,104 Q 74,108 68,102"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Ureter Left */}
            <path
              d="M 86,120 L 86,155"
              fill="none"
              stroke="url(#pinkGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* RIGHT KIDNEY (Purple) */}
          <g>
            <path
              d="M 112,52 C 140,50 152,72 148,98 C 145,118 130,132 114,132 C 108,132 106,122 110,112 C 114,102 118,90 112,78 C 108,70 106,52 112,52 Z"
              fill="url(#purpleGradient)"
            />
            {/* Renal Arteries/Veins Branches Right */}
            <path
              d="M 112,80 Q 125,85 132,75 M 114,92 Q 128,94 135,88 M 113,104 Q 126,108 132,102"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Ureter Right */}
            <path
              d="M 114,120 L 114,155"
              fill="none"
              stroke="url(#purpleGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* CARING HANDS AT BOTTOM */}
          {/* Left Hand Cradling (Pink) */}
          <path
            d="M 38,90 C 32,110 40,140 70,165 C 80,173 95,178 100,178 C 95,160 80,148 65,138 C 50,128 42,108 38,90 Z"
            fill="url(#pinkGradient)"
          />
          <path
            d="M 52,112 C 48,125 58,145 82,160 C 88,164 96,168 100,170 C 92,152 78,140 68,132 C 58,124 52,112 52,112 Z"
            fill="#e11d48"
            opacity="0.8"
          />

          {/* Right Hand Cradling (Purple) */}
          <path
            d="M 162,90 C 168,110 160,140 130,165 C 120,173 105,178 100,178 C 105,160 120,148 135,138 C 150,128 158,108 162,90 Z"
            fill="url(#purpleGradient)"
          />
          <path
            d="M 148,112 C 152,125 142,145 118,160 C 112,164 104,168 100,170 C 108,152 122,140 132,132 C 142,124 148,112 148,112 Z"
            fill="#7e22ce"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {variant !== 'icon' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${currentSize.title} ${
                variant === 'dark-full' ? 'text-white' : 'text-slate-900'
              }`}
            >
              NAVODYA
            </span>
            <span className="h-2 w-2 rounded-full bg-rose-500 inline-block animate-pulse"></span>
          </div>
          <span
            className={`font-bold tracking-wider uppercase mt-1 ${currentSize.subtitle} ${
              variant === 'dark-full' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            KIDNEY & MULTISPECIALTY HOSPITAL
          </span>
          <span className="text-[8px] font-semibold tracking-widest text-emerald-600 uppercase mt-0.5">
            24x7 Dialysis & Transplant Center
          </span>
        </div>
      )}
    </div>
  );
};
