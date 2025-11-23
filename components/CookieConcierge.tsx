import React, { useState } from 'react';
import { Sparkles, Loader2, Send } from 'lucide-react';
import { getCookieRecommendation } from '../services/geminiService';
import { Cookie } from '../types';

interface CookieConciergeProps {
  cookies: Cookie[];
  onRecommendation: (cookieId: string) => void;
}

export const CookieConcierge: React.FC<CookieConciergeProps> = ({ cookies, onRecommendation }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setAiResponse(null);

    try {
      const result = await getCookieRecommendation(input, cookies);
      setAiResponse(result.reason);
      onRecommendation(result.recommendedCookieId);

      // Scroll to the recommended card roughly
      const element = document.getElementById(`cookie-${result.recommendedCookieId}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }

    } catch (error) {
      console.error(error);
      setAiResponse("Ocorreu um erro na nossa rede neural de sabores. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="concierge" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse delay-700"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-1 rounded-full mb-8 border border-gray-700">
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-sm font-medium text-gray-300 uppercase tracking-widest">Conselheiro Bound</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Não sabe o que escolher?
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Diga ao nosso Concierge como você está se sentindo. Nossa IA analisará seu estado de espírito e calculará o sabor perfeito com precisão matemática.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto mb-12">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Tive um dia estressante e preciso de um abraço..."
            className="w-full bg-gray-900/80 border border-gray-700 text-white rounded-full py-5 px-8 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-2xl transition-all placeholder-gray-600"
          />
          <button
            type="submit"
            disabled={isLoading || !input}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>

        {aiResponse && (
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto animate-fade-in-up">
            <p className="text-lg font-light italic text-gray-200">
              "{aiResponse}"
            </p>
            <p className="text-sm text-blue-400 mt-4 font-medium uppercase tracking-widest">
              Recomendação Aplicada Abaixo
            </p>
          </div>
        )}
      </div>
    </section>
  );
};