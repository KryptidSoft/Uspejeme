import React, { useState, useEffect } from 'react'; 
import { BookOpen, ArrowLeft, Clock } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { articles } from '../data/articles';
import type { Article } from '../data/articles'; // <-- důležité: import typu

export const ArticleSection: React.FC<{ initialArticleId?: string | null }> = ({ initialArticleId }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Pokud přijde initialArticleId, nastavíme detail článku
  useEffect(() => {
    if (initialArticleId) {
      const article = articles.find(a => a.id === initialArticleId) || null;
      setSelectedArticle(article);
    }
  }, [initialArticleId]);

  // DETAIL ČLÁNKU
  if (selectedArticle) {
    return (
      <GlassCard className="article-detail" style={{ padding: '30px' }}>
        <button 
          onClick={() => setSelectedArticle(null)} 
          style={{ marginBottom: '20px', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}
        >
          <ArrowLeft size={16} /> Zpět na seznam
        </button>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{selectedArticle.title}</h1>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', opacity: 0.7, fontSize: '0.9rem' }}>
          <span>{selectedArticle.category}</span>
          <span><Clock size={14} style={{ verticalAlign: 'middle' }} /> {selectedArticle.readTime} čtení</span>
        </div>
        <div style={{ lineHeight: '1.8', whiteSpace: 'pre-line' }}>
          {selectedArticle.content}
        </div>
      </GlassCard>
    );
  }

  // SEZNAM ČLÁNKŮ
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      {articles.map(article => (
        <GlassCard 
          key={article.id} 
          onClick={() => setSelectedArticle(article)} 
          style={{ cursor: 'pointer', padding: '20px' }}
          className="hover-card"
        >
          <BookOpen size={20} color="var(--primary)" />
          <h3 style={{ margin: '15px 0 10px' }}>{article.title}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '20px' }}>{article.excerpt}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.8 }}>
            <span>{article.readTime}</span>
            <span style={{ color: 'var(--primary)' }}>Číst více →</span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};