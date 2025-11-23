import React, { useState, useEffect } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  // 0 = Whole, 1-5 = Bitten stages, 6 = Gone/Resetting
  const [biteStage, setBiteStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Define the bite "holes" using radial gradients
  // STRATEGY: "Sheet with a Hole"
  // transparent inside the circle (the bite), black outside (the cookie).
  // We will composite these using 'intersect' so the holes accumulate.
  const bites = [
    'radial-gradient(circle 100px at 85% 15%, transparent 95%, black 100%)', // Top Right
    'radial-gradient(circle 90px at 20% 20%, transparent 95%, black 100%)',  // Top Left
    'radial-gradient(circle 110px at 80% 80%, transparent 95%, black 100%)', // Bottom Right
    'radial-gradient(circle 95px at 25% 75%, transparent 95%, black 100%)',  // Bottom Left
    'radial-gradient(circle 120px at 50% 50%, transparent 95%, black 100%)', // Center (Final Chomp)
  ];

  const handleInteraction = () => {
    if (biteStage >= 5) {
      // If fully eaten, wait a bit then reset
      setBiteStage(6); // Hide completely
      setTimeout(() => setBiteStage(0), 1000);
      return;
    }

    setIsAnimating(true);
    setBiteStage(prev => prev + 1);

    // Remove shake class after animation
    setTimeout(() => setIsAnimating(false), 200);
  };

  // Construct the mask image string based on current stage
  const getMaskStyle = () => {
    if (biteStage === 0) return {};
    if (biteStage >= 6) return { opacity: 0, transform: 'scale(0)' };

    // Combine all bites up to the current stage
    const activeBites = bites.slice(0, biteStage).join(', ');

    return {
      // Standard CSS
      maskImage: activeBites,
      // 'intersect': Only show pixels that are opaque in ALL layers.
      // Since each layer is "Black everywhere except the hole", 
      // the intersection results in "Black everywhere except Hole 1 AND Hole 2..."
      maskComposite: 'intersect',

      // WebKit (Chrome/Safari)
      WebkitMaskImage: activeBites,
      // 'source-in': The source is drawn where the destination is opaque.
      // When chained, this acts like intersection for alpha masks.
      WebkitMaskComposite: 'source-in',
    };
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#fbfbfd]">

      <div className="max-w-7xl mx-auto px-6 pt-20 grid lg:grid-cols-2 gap-12 items-center z-10">

        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-bound px-4 py-1 rounded-full mb-8 font-medium text-sm animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-bound animate-pulse"></span>
            Nova Coleção Disponível
          </div>

          <div className="mb-6">
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-gray-900 font-serif leading-none">
              Bound<span className="text-bound">.</span>
            </h1>
          </div>

          <p className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
            A arte do cookie.
          </p>

          <p className="text-lg text-gray-500 max-w-md mb-10 leading-relaxed">
            Feitos à mão. Ingredientes premium. Uma experiência de sabor projetada para ser inesquecível.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-bound hover:bg-blue-900 text-white rounded-full px-8 py-4 font-medium transition-all flex items-center justify-center gap-2 group"
            >
              Ver Cookies
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('concierge')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-gray-100 text-bound border border-gray-200 rounded-full px-8 py-4 font-medium transition-all"
            >
              Encomendar
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 md:w-[500px] md:h-[500px]">
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-100 rounded-full opacity-20 blur-3xl animate-pulse transition-opacity duration-500 ${biteStage > 4 ? 'opacity-0' : ''}`}></div>

            <img
              src="https://bakie.pt/cdn/shop/files/IMG_2032.jpg?v=1700580000"
              alt="Bakie Premium Cookie"
              onClick={handleInteraction}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1000&q=80"; // Reliable fallback
              }}
              style={getMaskStyle()}
              className={`
                        relative w-full h-full object-cover shadow-2xl z-10 cursor-pointer transition-all duration-100
                        rounded-[64%_36%_52%_48%/46%_58%_42%_54%]
                        ${isAnimating ? 'scale-95 rotate-1' : 'scale-100 rotate-0'}
                        ${biteStage === 0 ? 'animate-float' : ''}
                    `}
            />

            {/* Floating badges - Only visible when cookie exists */}
            <div
              onClick={handleInteraction}
              className={`
                        absolute -bottom-10 -left-4 md:bottom-10 md:-left-10 
                        backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 z-20 
                        cursor-pointer select-none transition-all duration-300 bg-white/80 hover:scale-110 animate-bounce
                        ${biteStage > 4 ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                    `}
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ingredientes</p>
              <p className="text-lg font-bold text-gray-900">100% Algarvia</p>
            </div>

            {/* Reset Hint (Visible only when eaten) */}
            {biteStage >= 5 && (
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <span className="text-gray-400 font-medium animate-pulse">Mais uma?</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-300">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};