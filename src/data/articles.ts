export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'finance' | 'productivity' | 'strategy';
  readTime: string;
  date: string;
}

export const articles: Article[] = [
  {
    id: '0',
    title: 'Vítejte na Uspějeme.cz!',
    excerpt: 'OSVČ tvoří páteř ekonomiky, přesto většina z nás riskuje svou budoucnost špatným naceňováním.',
    category: 'strategy',
    readTime: '4 min',
    date: '28. 02. 2026',
    content: `V České republice jsou statisíce OSVČ. Jsme programátoři, řemeslníci, kreativci i konzultanti...`
  },
  {
    id: '1',
    title: 'Jak správně počítat ROI u digitálních projektů',
    excerpt: 'Návratnost investice není jen o číslech, ale i o čase a riziku.',
    category: 'finance',
    readTime: '5 min',
    date: '15. 02. 2026',
    content: 'Zde je detailní rozbor výpočtu ROI...'
  },
  {
    id: '2',
    title: 'Hodinová sazba: Past na freelancery?',
    excerpt: 'Proč fixace na hodinovou sazbu může brzdit váš růst.',
    category: 'productivity',
    readTime: '7 min',
    date: '10. 02. 2026',
    content: 'Prodávat svůj čas je nejjednodušší cesta...'
  }
];