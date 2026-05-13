import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="article-container fade-in">
      <style>
        {`
          .article-content p {
            text-align: justify;
            line-height: 1.6;
          }
          @media (max-width: 768px) {
            .article-content p {
              text-align: left;
            }
          }
        `}
      </style>
      
      <div className="article-card">
        <h1 className="article-title">ZÁSADY OCHRANY OSOBNÍCH ÚDAJŮ</h1>
        
        <div className="article-meta">
          <span>Verze dokumentu: 2026-05-B | Datum poslední revize: 14. května 2026</span>
        </div>

        <div className="article-content">
          <h3>1. Úvodní ustanovení</h3>
          <p>
            Tento dokument stanovuje zásady zpracování a ochrany osobních údajů uživatelů webové aplikace Uspejeme.cz. Provozovatel klade maximální důraz na soukromí a technické zabezpečení dat. Aplikace je navržena architekturou "Local-First", což znamená, že primární zpracování dat probíhá na straně klienta.
          </p>

          <h3>2. Rozsah zpracovávaných údajů</h3>
          <p>
            Provozovatel prohlašuje, že neshromažďuje, neukládá ani nezpracovává na svých serverech žádná finanční ani osobní data vložená uživatelem do kalkulačních modulů. Veškeré údaje vložené do formulářů jsou zpracovávány výhradně v rámci operační paměti prohlížeče uživatele nebo v jeho lokálním úložišti.
          </p>

          <h3>3. Reklamní systém a soubory cookie třetích stran</h3>
          <p>
            Za účelem financování provozu této bezplatné aplikace jsou využívány reklamní systémy. V souladu s požadavky poskytovatelů uvádíme:
          </p>
          <ul>
            <li><strong>Google AdSense:</strong> Společnost Google jako dodavatel třetí strany používá soubory cookie k zobrazování reklam na tomto webu. Díky souboru cookie DoubleClick může Google a jeho partneři zobrazovat reklamy uživatelům na základě jejich návštěv na tomto webu a dalších webových stránkách.</li>
            <li>Uživatelé se mohou z používání personalizované reklamy odhlásit prostřednictvím <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Nastavení reklam Google</a>.</li>
          </ul>

          <h3>4. Technické ukládání dat (LocalStorage)</h3>
          <p>
            Webová aplikace využívá mechanismus LocalStorage pro uchování uživatelského nastavení. Toto úložiště je plně pod kontrolou uživatele. Provozovatel nemá k těmto datům technický přístup. Uživatel má právo data kdykoliv odstranit v nastavení prohlížeče.
          </p>

          <h3>5. Kontaktní údaje</h3>
          <p>
            V případě dotazů se lze obrátit na správce na e-mailové adrese: <a href="mailto:KryptidSoft@gmail.com">KryptidSoft@gmail.com</a>
          </p>
        </div>

        <div className="footer-bottom" style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          Poslední aktualizace: 05/2026 | Uspejeme.cz
        </div>
      </div>
    </div>
  );
};

export { PrivacyPolicy };