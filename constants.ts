import { Cookie } from './types';

export const COOKIES: Cookie[] = [
  {
    id: 'c1',
    name: 'Red Velvet',
    tagline: 'Clássico e sofisticado.',
    description: 'A elegância do Red Velvet em forma de cookie. Uma combinação suave e irresistível.',
    price: 3.50,
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Chocolate Branco', 'Cacau', 'Baunilha'],
    color: 'text-red-700'
  },
  {
    id: 'c2',
    name: 'Boundy Nutella',
    tagline: 'Avelã em dobro.',
    description: 'Uma explosão de texturas com massa folhada e o creme de avelã mais amado do mundo.',
    price: 4.20,
    imageUrl: 'https://images.unsplash.com/photo-1618923860182-f1e291d09273?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Massa Folhada', 'Avelã Torrada', 'Chocolate de Leite', 'Chocolate Negro', 'Recheio de Nutella'],
    color: 'text-amber-900'
  },
  {
    id: 'c3',
    name: 'Kit Kat',
    tagline: 'Have a break.',
    description: 'O crocante do Kit Kat envolvido em nossa massa especial. O break perfeito.',
    price: 3.80,
    imageUrl: 'https://images.unsplash.com/photo-1559557229-838f5319579c?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Pedaços de Kit Kat', 'Chocolate de Leite', 'Cacau', 'Recheio de Creme de Kit Kat'],
    color: 'text-red-600'
  },
  {
    id: 'c4',
    name: 'Peanut Butter',
    tagline: 'Para os amantes de amendoim.',
    description: 'Cremoso, crocante e intenso. O equilíbrio perfeito entre doce e salgado.',
    price: 3.90,
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Amendoim Torrado', 'Chocolate de Leite', 'Chocolate Negro', 'Recheio de Manteiga de Amendoim'],
    color: 'text-yellow-700'
  },
  {
    id: 'c5',
    name: 'Crunchy Almond',
    tagline: 'Crocância e tradição.',
    description: 'Amêndoas torradas com um toque de canela e o doce de leite que derrete na boca.',
    price: 3.80,
    imageUrl: 'https://images.unsplash.com/photo-1564842497547-09a72652691a?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Amêndoa Torrada', 'Canela', 'Baunilha', 'Recheio de Doce de Leite'],
    color: 'text-orange-600'
  },
  {
    id: 'c6',
    name: 'Pistacio',
    tagline: 'O ouro verde.',
    description: 'Sofisticação pura com pistácios selecionados e chocolate branco cremoso.',
    price: 4.50,
    imageUrl: 'https://images.unsplash.com/photo-1619148514797-0a8a2569f845?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Chocolate Branco', 'Pistácio Torrado', 'Creme de Pistácio'],
    color: 'text-green-700'
  }
];