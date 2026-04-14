import React from 'react';
import { FileText, ChevronRight, Lightbulb } from 'lucide-react';
import type { Article } from '../data/articles';
import { useNavigate } from "react-router-dom";

interface StrategyWidgetProps {
  articles: Article[];
  onNavigate?: (id: string) => void;
  onViewAll?: () => void;
}

export const StrategyWidget: React.FC<StrategyWidgetProps> = ({ articles }) => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      padding: '16px',
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.01)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px', flexShrink: 0 }}>
          <Lightbulb size={20} color="#fff" />
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, color: '#fff' }}>
          Nejnovější strategie
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {articles?.slice(0, 5).map((article: Article) => (
          <div 
            key={article.id}
            onClick={() => navigate(`/clanky/${article.id}`)}
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '12px', 
              padding: '12px', 
              borderRadius: '14px', 
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              cursor: 'pointer',
              borderLeft: '4px solid var(--primary)', 
              transition: 'all 0.2s ease-in-out' // Plynulý přechod efektu
            }}
            // --- EFEKT PRO KARTU ČLÁNKU ---
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = 'translateX(0px)';
            }}
            // -----------------------------
          >
            <div style={{ 
              minWidth: '32px', height: '32px', borderRadius: '8px', 
              background: 'rgba(59, 130, 246, 0.1)', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', color: 'var(--primary)',
              flexShrink: 0
            }}>
              <FileText size={16} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {article.category}
                </span>
                <ChevronRight size={14} color="var(--text-dim)" />
              </div>
              <div style={{ 
                fontSize: '0.9rem', fontWeight: 'bold', color: '#fff', 
                lineHeight: '1.2', marginTop: '2px',
                display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'
              }}>
                {article.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/clanky')}
        style={{ 
          width: '100%', 
          marginTop: '16px', 
          padding: '12px', 
          borderRadius: '12px',
          background: 'rgba(59, 130, 246, 0.05)', 
          border: '1px solid rgba(59, 130, 246, 0.1)',
          color: 'var(--primary)', 
          fontWeight: 'bold', 
          cursor: 'pointer', 
          fontSize: '0.85rem',
          transition: 'all 0.2s ease-in-out' 
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.1)';
        }}
      >
        Zobrazit články
      </button>
    </div>
  );
};