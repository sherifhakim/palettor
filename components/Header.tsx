import React from 'react';

export function Header() {
  return (
    <header className="w-full shrink-0 bg-white/90 backdrop-blur-xl border-b border-zinc-200 relative z-50">
      <div className="max-w-[2400px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center">
        <span
          className="text-3xl sm:text-4xl tracking-tight"
          style={{ 
            fontFamily: 'var(--font-fredoka, Fredoka, sans-serif)', 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #200122 0%, #6f0000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Palettor
        </span>
      </div>
    </header>
  );
}
