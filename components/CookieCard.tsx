import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Cookie } from '../types';

interface CookieCardProps {
    cookie: Cookie;
    onAdd: (cookie: Cookie) => void;
    isRecommended?: boolean;
}

export const CookieCard: React.FC<CookieCardProps> = ({ cookie, onAdd, isRecommended }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddClick = () => {
        onAdd(cookie);
        setIsAdded(true);

        // Reset button state after 2 seconds
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <div className={`group relative flex flex-col bg-white rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl ${isRecommended ? 'ring-4 ring-blue-500/50 scale-105 shadow-xl z-10' : 'shadow-sm hover:-translate-y-2'}`}>

            {isRecommended && (
                <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Recomendado para você
                    </span>
                </div>
            )}

            <div className="h-64 w-full overflow-hidden bg-gray-100 relative">
                <img
                    src={cookie.imageUrl}
                    alt={cookie.name}
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80"; // Fallback image
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            <div className="flex flex-col flex-grow p-8">
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${cookie.color}`}>
                    {cookie.tagline}
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    {cookie.name}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6 flex-grow">
                    {cookie.description}
                </p>

                <div className="mb-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Ingredientes
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {cookie.ingredients.map((ingredient, index) => (
                            <span
                                key={index}
                                className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100"
                            >
                                {ingredient}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                    <span className="text-2xl font-semibold text-gray-900">
                        {cookie.price.toFixed(2).replace('.', ',')} €
                    </span>
                    <button
                        onClick={handleAddClick}
                        disabled={isAdded}
                        className={`
                    relative overflow-hidden p-3 rounded-full transition-all duration-300 flex items-center gap-2 group/btn
                    ${isAdded
                                ? 'bg-green-500 text-white w-32 justify-center'
                                : 'bg-gray-900 text-white hover:bg-blue-600 w-auto'
                            }
                `}
                        aria-label={`Adicionar ${cookie.name} ao carrinho`}
                    >
                        <div className="flex items-center gap-2">
                            {isAdded ? (
                                <>
                                    <Check size={20} className="animate-bounce" />
                                    <span className="text-sm font-medium animate-fade-in">
                                        Adicionado
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Plus size={20} />
                                    <span className="hidden group-hover/btn:inline text-sm font-medium pr-2 animate-fade-in">
                                        Adicionar
                                    </span>
                                </>
                            )}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};