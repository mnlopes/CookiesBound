
import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Menu as MenuIcon, ArrowDownUp, Box, ChevronDown } from 'lucide-react';
import { COOKIES } from './constants';
import { Cookie, CartItem } from './types';
import { Hero } from './components/Hero';
import { CookieCard } from './components/CookieCard';
import { CookieConcierge } from './components/CookieConcierge';
import { CartDrawer } from './components/CartDrawer';
import { BoxBuilder } from './components/BoxBuilder';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recommendedId, setRecommendedId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (cookie: Cookie) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === cookie.id && !item.isBox);
      if (existing) {
        return prev.map(item =>
          item.id === cookie.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // CartItem extends Cookie, so we spread cookie properties
      return [...prev, { ...cookie, quantity: 1 }];
    });
  };

  const addBoxToCart = (contents: Cookie[]) => {
    const newBoxItem: CartItem = {
      id: `box-${Date.now()}`, // Unique ID for each custom box
      name: 'Box Personalizada (6)',
      tagline: 'Sua seleção especial',
      description: 'Uma caixa com 6 cookies escolhidos a dedo.',
      price: 18.00,
      imageUrl: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=800&q=80', // Generic box image
      ingredients: [],
      color: 'text-gray-900',
      quantity: 1,
      isBox: true,
      boxContents: contents
    };
    setCartItems(prev => [...prev, newBoxItem]);
    setIsCartOpen(true); // Open cart to show the box was added
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const sortedCookies = useMemo(() => {
    const items = [...COOKIES];
    if (sortOrder === 'price-asc') return items.sort((a, b) => a.price - b.price);
    if (sortOrder === 'price-desc') return items.sort((a, b) => b.price - a.price);
    return items;
  }, [sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-amber-200 selection:text-amber-900">

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src="bound-logo.png"
              alt="Bound"
              className="h-12 w-12 object-cover rounded-full"
            />
            <div className="hidden md:flex gap-6 ml-8 text-sm font-medium text-gray-500">
              <a href="#menu" className="hover:text-gray-900 transition-colors">Cookies</a>
              <a href="#box-builder" className="hover:text-gray-900 transition-colors">Criar Box</a>
              <a href="#concierge" className="hover:text-gray-900 transition-colors">Encomendar</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-black/5 transition-colors group"
            >
              <ShoppingBag className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-gray-800'}`} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-bound text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-gray-800">
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Hero />

        <CookieConcierge
          cookies={COOKIES}
          onRecommendation={setRecommendedId}
        />

        <BoxBuilder cookies={COOKIES} onAddBox={addBoxToCart} />

        <section id="menu" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight font-serif">
              A Coleção.
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
              Cada sabor é uma obra de engenharia. Escolha o seu.
            </p>

            {/* Collection Toolbar / CTA */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-20">
              <button
                onClick={() => document.getElementById('box-builder')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-full text-sm font-bold transition-colors border border-gray-200 shadow-sm"
              >
                <Box size={16} />
                Ou crie sua Box Personalizada (6 unid.)
              </button>

              {/* Custom Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
                  className="flex items-center gap-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-md"
                >
                  <ArrowDownUp size={16} className="text-gray-400" />
                  <span>
                    {sortOrder === 'default' && 'Ordenar: Padrão'}
                    {sortOrder === 'price-asc' && 'Preço: Menor para Maior'}
                    {sortOrder === 'price-desc' && 'Preço: Maior para Menor'}
                  </span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top-right z-30 ${isSortOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                  <div className="p-2">
                    {[
                      { value: 'default', label: 'Padrão (Recomendado)' },
                      { value: 'price-asc', label: 'Preço: Menor para Maior' },
                      { value: 'price-desc', label: 'Preço: Maior para Menor' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortOrder(option.value as any);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${sortOrder === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sortedCookies.map(cookie => (
              <div key={cookie.id} id={`cookie-${cookie.id}`}>
                <CookieCard
                  cookie={cookie}
                  onAdd={addToCart}
                  isRecommended={cookie.id === recommendedId}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-400 text-sm">
            2025 Bound. Design in Algarve. Cookies with love
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:underline">Privacidade</a>
            <a href="#" className="hover:underline">Termos</a>
            <a href="#" className="hover:underline">Política de Cookies (Literalmente)</a>
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
      />

    </div>
  );
};

export default App;
