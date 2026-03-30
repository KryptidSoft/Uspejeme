import React from "react";
import { quizQuestions, quizResults } from "./quizData";
import { usePersistentState } from "../../hooks/usePersistentState";

// KOMPONENTA RADAROVÉHO GRAFU (SVG)
const RadarChart: React.FC<{ scores: Record<string, number> }> = ({ scores }) => {
  const keys = Object.keys(scores); // Změněno z quizResults na scores
  
  const size = 300;
  const center = size / 2;
  const radius = size * 0.35;
  const angleStep = (Math.PI * 2) / keys.length;

  // Body pro polygon
  const points = keys.map((key, i) => {
    const val = (scores[key] || 0) / 15; // Normalizace
    const r = radius * (0.2 + val * 0.8);
    const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
    const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Pozadí - soustředné kruhy */}
        {[0.5, 1].map((m) => (
          <circle key={m} cx={center} cy={center} r={radius * m} fill="none" stroke="var(--glass-border)" strokeDasharray="4" />
        ))}
        {/* Paprsky */}
        {keys.map((_, i) => {
          const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
          const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
          return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="var(--glass-border)" />;
        })}
        {/* Samotný graf */}
        <polygon points={points} fill="var(--primary)" fillOpacity="0.4" stroke="var(--primary)" strokeWidth="3" />
        {/* Štítky */}
        {keys.map((key, i) => {
          const x = center + (radius + 25) * Math.cos(i * angleStep - Math.PI / 2);
          const y = center + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2);
          return (
            <text key={key} x={x} y={y} fill="var(--text-dim)" fontSize="10" textAnchor="middle" style={{ textTransform: 'capitalize' }}>
              {quizResults[key]?.type.split(' ')[0] || key}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const Quiz: React.FC = () => {
  const [current, setCurrent] = usePersistentState<number>("quiz_step", 0);
  const [scores, setScores] = usePersistentState<Record<string, number>>("quiz_scores", {});
  const [finished, setFinished] = usePersistentState<boolean>("quiz_finished", false);

  const handleAnswer = (weights: Record<string, number>) => {
    const nextScores = { ...scores };
    Object.entries(weights).forEach(([type, val]) => {
      nextScores[type] = (nextScores[type] || 0) + val;
    });
    setScores(nextScores);

    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const getWinnerKey = () => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : "chaotic";
  };

  const handleShare = (isFeedbackShare = false) => {
    const res = quizResults[getWinnerKey()];
    const text = isFeedbackShare 
      ? `Vyšel mi podnikatelský typ: ${res.type}. Sedí to na mě? Zjisti svůj typ taky:`
      : `Můj podnikatelský typ je: ${res.type}! Zjisti ten svůj na Uspejeme.cz:`;
    
    if (navigator.share) {
      navigator.share({ title: "Kvíz pro OSVČ", text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert("Zkopírováno do schránky!");
    }
  };

  const reset = () => {
    setCurrent(0);
    setScores({});
    setFinished(false);
  };

  if (finished) {
    const res = quizResults[getWinnerKey()];
    return (
      <div className="glass-card fade-in" style={{ padding: '30px', textAlign: 'center' }}>
        <p style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Tvůj hlavní archetyp je:</p>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{res.type}</h2>
        
        <RadarChart scores={scores} />

        <p style={{ color: 'var(--text-main)', marginBottom: '25px', fontSize: '1.1rem' }}>{res.description}</p>
        
        {/* SEKCE CO TEĎ? */}
        <div className="glass-card" style={{ textAlign: 'left', padding: '25px', marginBottom: '25px', background: 'rgba(59, 130, 246, 0.05)' }}>
          <h4 style={{ color: 'var(--primary)', marginBottom: '15px' }}>🚀 Akční plán pro tento týden:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div><strong>Dnes:</strong> <span style={{ color: 'var(--text-dim)' }}>{res.actionPlan.today}</span></div>
            <div><strong>Zítra:</strong> <span style={{ color: 'var(--text-dim)' }}>{res.actionPlan.tomorrow}</span></div>
            <div><strong>Tento týden:</strong> <span style={{ color: 'var(--text-dim)' }}>{res.actionPlan.week}</span></div>
          </div>
        </div>

        {/* OSTATNÍ O MNĚ */}
        <div style={{ marginBottom: '30px', padding: '20px', border: '1px dashed var(--glass-border)', borderRadius: '16px' }}>
          <p style={{ marginBottom: '15px' }}><strong>🤔 Sedí to na tebe?</strong></p>
          <button className="util-btn" style={{ margin: '0 auto' }} onClick={() => handleShare(true)}>
             Zeptej se kolegů, jak tě vidí oni
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          <button className="btn" onClick={() => handleShare(false)}>Sdílet výsledek</button>
          <button className="util-btn" onClick={() => window.print()}>Uložit PDF</button>
        </div>
        
        <button className="footer-item" onClick={reset} style={{ width: '100%', textAlign: 'center', marginTop: '20px', opacity: 0.5 }}>
          Restartovat kvíz
        </button>

        <div style={{ marginTop: '30px', padding: '20px', background: 'var(--bg-dark)', borderRadius: '16px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '10px' }}>Nástroj pro tvůj typ:</p>
          <button className="nav-item" style={{ margin: '0 auto', borderColor: 'var(--primary)' }} onClick={() => window.location.href=res.cta.link}>
             {res.cta.label}
          </button>
        </div>
      </div>
    );
  }

  const progress = (current / quizQuestions.length) * 100;

  return (
    <div className="glass-card fade-in" style={{ padding: '30px' }}>
      <div style={{ marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
          <span>Postup testem</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: '0.5s ease' }} />
        </div>
      </div>

      <h3 style={{ marginBottom: '25px', color: 'var(--text-main)', fontSize: '1.4rem' }}>{quizQuestions[current].question}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {quizQuestions[current].answers.map((opt, i) => (
          <button 
            key={i} 
            className="nav-item" 
            style={{ width: '100%', padding: '18px', justifyContent: 'flex-start', whiteSpace: 'normal', textAlign: 'left', background: 'rgba(255,255,255,0.02)' }}
            onClick={() => handleAnswer(opt.weights)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;