import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // --- LOGIKA PŘEKLADU ---
  const isEn = typeof window !== 'undefined' && !navigator.language.startsWith('cs') && !navigator.language.startsWith('sk');
  
  const text = {
    h4: isEn ? "🍪 Help us keep tools free" : "🍪 Pomozte nám držet nástroje zdarma",
    p: isEn ? "This portal uses cookies for traffic analysis and ad personalization. Thanks to your consent, we can continue to develop Uspejeme.cz and offer calculators for free. More in" : "Tento portál využívá cookies pro analýzu návštěvnosti a personalizaci reklam. Díky vašemu souhlasu můžeme platformu Uspejeme.cz nadále vyvíjet a nabízet kalkulačky pro OSVČ zcela zdarma. Více v",
    link: isEn ? "Privacy Policy" : "Zásadách soukromí",
    btnAll: isEn ? "ACCEPT ALL" : "PŘIJMOUT VŠE",
    btnMin: isEn ? "NECESSARY ONLY" : "JEN NEZBYTNÉ"
  };
  // ------------------------

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: 'all' | 'necessary') => {
    localStorage.setItem('cookie-consent', type);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
          .cookie-overlay {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 500px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideUp 0.5s ease-out;
          }

          @keyframes slideUp {
            from { transform: translate(-50%, 100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
          }

          .cookie-content h4 {
            margin: 0 0 10px 0;
            color: #1a1a1a;
            font-size: 1.1rem;
          }

          .cookie-content p {
            font-size: 0.9rem;
            color: #444;
            line-height: 1.5;
            margin-bottom: 20px;
          }

          .cookie-buttons {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }

          .btn-cookie {
            padding: 10px 20px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.85rem;
            transition: all 0.2s;
            flex: 1;
            min-width: 140px;
          }

          .btn-accept {
            background: #2563eb;
            color: white;
          }

          .btn-accept:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
          }

          .btn-minimal {
            background: rgba(0, 0, 0, 0.05);
            color: #555;
          }

          .btn-minimal:hover {
            background: rgba(0, 0, 0, 0.1);
          }

          .cookie-link {
            color: #2563eb;
            text-decoration: underline;
            cursor: pointer;
          }
        `}
      </style>

      <div className="cookie-overlay">
        <div className="cookie-content">
          <h4>{text.h4}</h4>
          <p>
            {text.p} <a href="/privacy" className="cookie-link">{text.link}</a>.
          </p>
          <div className="cookie-buttons">
            <button 
              className="btn-cookie btn-accept" 
              onClick={() => handleConsent('all')}
            >
              {text.btnAll}
            </button>
            <button 
              className="btn-cookie btn-minimal" 
              onClick={() => handleConsent('necessary')}
            >
              {text.btnMin}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;