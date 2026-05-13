import React from 'react';

const TermsOfService: React.FC = () => {
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
        <h1 className="article-title">VŠEOBECNÉ PODMÍNKY UŽÍVÁNÍ</h1>
        
        <div className="article-meta">
          <span>Platnost od: 14. května 2026 | Uspejeme.cz</span>
        </div>

        <div className="article-content">
          <h3>1. Akceptace podmínek</h3>
          <p>
            Vstupem na tuto webovou aplikaci a jejím používáním vyjadřuje uživatel bezvýhradný souhlas s těmito všeobecnými podmínkami užívání. Pokud uživatel s těmito podmínkami nesouhlasí, je povinen aplikaci neprodleně opustit.
          </p>

          <h3>2. Charakter poskytovaných informací</h3>
          <p>
            Veškeré výstupy, výpočty a simulace poskytované touto aplikací mají pouze informativní a orientační charakter. Aplikace využívá zjednodušené matematické modely, které nemusí reflektovat aktuální legislativní změny nebo specifické individuální okolnosti uživatele.
          </p>
          <p>
            Výsledky generované aplikací <strong>nenahrazují</strong> odborné daňové, účetní ani právní poradenství. Provozovatel důrazně doporučuje konzultovat finanční rozhodnutí s kvalifikovaným odborníkem.
          </p>

          <h3>3. Omezení odpovědnosti</h3>
          <p>
            Provozovatel nenese žádnou odpovědnost za škody, ztráty zisku nebo sankce vzniklé v důsledku použití nebo nemožnosti použití této aplikace. Uživatel nese plnou odpovědnost za svá rozhodnutí a správnost vkládaných dat.
          </p>

          <h3>4. Autorská práva</h3>
          <p>
            Veškerý obsah aplikace, včetně zdrojového kódu a algoritmů, je chráněn autorským zákonem. Jakékoliv kopírování nebo komerční využívání bez písemného souhlasu provozovatele je zakázáno.
          </p>

          <h3>5. Změny služby</h3>
          <p>
            Provozovatel si vyhrazuje právo kdykoliv omezit nebo ukončit provoz aplikace či změnit její funkcionality i tyto podmínky.
          </p>
          
          <p style={{ marginTop: '40px', color: '#666', fontSize: '0.9rem' }}>
            Dokumentace podléhá právnímu řádu České republiky.
          </p>
        </div>
      </div>
    </div>
  );
};

export { TermsOfService };