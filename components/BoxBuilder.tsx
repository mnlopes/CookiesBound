
import React, { useState } from 'react';
import { Plus, X, Box, Check } from 'lucide-react';
import { Cookie } from '../types';

interface BoxBuilderProps {
  cookies: Cookie[];
  onAddBox: (boxContents: Cookie[]) => void;
}

export const BoxBuilder: React.FC<BoxBuilderProps> = ({ cookies, onAddBox }) => {
  const [boxSlots, setBoxSlots] = useState<(Cookie | null)[]>([null, null, null, null, null, null]);
  const [isAdded, setIsAdded] = useState(false);

  const filledCount = boxSlots.filter(s => s !== null).length;
  const isFull = filledCount === 6;
  const BOX_PRICE = 18.00; // Fixed price for 6 cookies

  const addToSlot = (cookie: Cookie) => {
    const firstEmptyIndex = boxSlots.findIndex(s => s === null);
    if (firstEmptyIndex !== -1) {
      const newSlots = [...boxSlots];
      newSlots[firstEmptyIndex] = cookie;
      setBoxSlots(newSlots);
    }
  };

  const removeFromSlot = (index: number) => {
    const newSlots = [...boxSlots];
    newSlots[index] = null;
    setBoxSlots(newSlots);
  };

  const handleAddBoxToCart = () => {
    if (!isFull) return;

    const contents = boxSlots.filter((c): c is Cookie => c !== null);
    onAddBox(contents);

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setBoxSlots([null, null, null, null, null, null]); // Reset
    }, 2000);
  };

  return (
    <section id="box-builder" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-bound font-medium text-sm mb-4">
            Personalização
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
            Crie a sua Box.
          </h2>
          <p className="text-xl text-gray-500">
            Escolha 6 favoritos. Perfeito para partilhar (ou não).
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left: The Box UI */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-gray-50 rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Sua Seleção</h3>
                  <p className="text-gray-500">{filledCount}/6 Cookies</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">{BOX_PRICE.toFixed(2).replace('.', ',')} €</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {boxSlots.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() => slot && removeFromSlot(index)}
                    className={`
                      aspect-square rounded-2xl flex items-center justify-center relative cursor-pointer transition-all duration-300
                      ${slot ? 'bg-white shadow-md hover:ring-2 ring-red-100' : 'bg-gray-200/50 border-2 border-dashed border-gray-300 hover:border-gray-400'}
                    `}
                  >
                    {slot ? (
                      <>
                        <img
                          src={slot.imageUrl}
                          alt={slot.name}
                          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80"; }}
                          className="w-full h-full object-cover rounded-2xl p-2"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 rounded-2xl flex items-center justify-center transition-colors group">
                          <X size={20} className="text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all" />
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-400 font-medium text-sm">{index + 1}</span>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddBoxToCart}
                disabled={!isFull}
                className={`
                  w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
                  ${isFull
                    ? (isAdded ? 'bg-green-500 text-white' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl')
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}
              >
                {isAdded ? (
                  <>
                    <Check size={20} /> Box Adicionada!
                  </>
                ) : (
                  <>
                    <Box size={20} /> {isFull ? 'Adicionar Box ao Carrinho' : `Escolha mais ${6 - filledCount}`}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Cookie Selection */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cookies.map((cookie) => (
                <div
                  key={cookie.id}
                  onClick={() => !isFull && addToSlot(cookie)}
                  className={`
                        flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer
                        ${isFull
                      ? 'opacity-50 border-gray-100 grayscale cursor-not-allowed'
                      : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md active:scale-95'}
                    `}
                >
                  <img
                    src={cookie.imageUrl}
                    alt={cookie.name}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80"; }}
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{cookie.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{cookie.description}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Plus size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
