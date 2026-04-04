import React, { useEffect, useState } from "react";
import Quiz from "./quiz/Quiz";

/**
 * QuizPage: Vstupní brána k diagnostickému kvízu.
 * Má za úkol zvýšit konverzi (motivovat k vyplnění) a zlepšit SEO.
 */
const QuizPage: React.FC = () => {
  const [started, setStarted] = useState(false);

  // SEO Optimalizace a reset scrollování
  useEffect(() => {
    document.title = "Kvíz: Jaký jsi typ podnikatele? | Uspejeme.cz";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [started]);

  const startQuiz = () => {
    setStarted(true);
  };

  return (
    <main className="app-container fade-in" style={{ paddingBottom: '80px', minHeight: '100vh' }}>
      
      {!started ? (
        /* --- ÚVODNÍ STRÁNKA (PŘED SPUŠTĚNÍM) --- */
        <section className="quiz-intro fade-in" style={{ marginTop: '60px' }}>
          <div className="intro-badge">Diagnostika OSVČ</div>
          
          <h1 className="intro-title">
            Jaký jsi <span>typ podnikatele?</span>
          </h1>
          
          <p className="intro-lead">
            Většina podnikatelů naráží na stejné bariéry, protože se snaží kopírovat cizí styl práce. 
            Zjistěte, jak funguje váš "vnitřní motor" a jak ho nastavit na maximální výkon.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">⏱️</span>
              <div className="feature-text">
                <h4>60 sekund času</h4>
                <p>5 rychlých otázek zaměřených na vaši praxi.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <div className="feature-text">
                <h4>Personalizovaná analýza</h4>
                <p>Radarový graf vašich dovedností a návyků.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛠️</span>
              <div className="feature-text">
                <h4>Akční kroky</h4>
                <p>Doporučení nástrojů přímo pro váš profil.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={startQuiz}
            className="btn btn-primary btn-block"
            style={{ borderRadius: '16px', fontWeight: '700', letterSpacing: '0.5px' }}
          >
            Spustit test zdarma
          </button>
          
          <p className="intro-note">Není vyžadována žádná registrace.</p>
        </section>
      ) : (
        /* --- SEKCE SOTÁZKAMI (PO SPUŠTĚNÍ) --- */
        <div className="fade-in" style={{ marginTop: '40px' }}>
          <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', opacity: 0.8 }}>Diagnostický test</h2>
          </header>
          
          <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 15px' }}>
            <div className="quiz-wrapper" style={{
              background: 'var(--glass-bg)',
              borderRadius: '24px',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <Quiz />
            </div>
          </section>
        </div>
      )}

{/* EDUKATIVNÍ SEKCE POD ČAROU - Opraveno pro nulové cukání */}
      <section style={{ marginTop: '100px', padding: '0' }}> 
        <div className="smart-grid" style={{
          display: 'grid',
          /* min(100%, 300px) zajistí, že karta nikdy nebude širší než displej */
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '25px',
          maxWidth: '1000px',
          margin: '0 auto',
          width: '100%'
        }}>
          <article className="glass-card" style={{ 
            padding: '30px', 
            borderRadius: '20px',
            boxSizing: 'border-box',
            width: '100%' 
          }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '15px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>💡</span> Proč znát svůj styl?
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.6' }}>
              Každý OSVČ má unikátní přístup k času a penězům. Zatímco <em>Strategický hráč</em> exceluje v plánování, 
              <em> Noční makáč</em> zase v krizovém sprintu. Poznání svého typu je první krok k optimalizaci příjmů.
            </p>
          </article>
          
          <article className="glass-card" style={{ 
            padding: '30px', 
            borderRadius: '20px',
            boxSizing: 'border-box',
            width: '100%'
          }}>
            <h3 style={{ color: 'var(--success)', marginBottom: '15px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🚀</span> Co získáte?
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.6' }}>
              Nejde jen o nálepku. Získáte konkrétní rady, jak pracovat méně a vydělávat více, 
              včetně doporučení na kalkulačky a nástroje z našeho portálu.
            </p>
          </article>
        </div>
      </section>

      <footer style={{ 
        marginTop: '80px', 
        textAlign: 'center', 
        borderTop: '1px solid var(--glass-border)', 
        paddingTop: '40px',
        paddingBottom: '20px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', maxWidth: '550px', margin: '0 auto', opacity: 0.6 }}>
          Tento test je navržen pro <strong>OSVČ a malé podnikatele v ČR</strong>. <br/>
          © {new Date().getFullYear()} Uspejeme.cz
        </p>
      </footer>
    </main>
  );
};

export default QuizPage;