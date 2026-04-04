import React from 'react';
import { Link } from 'react-router-dom';

export const Sitemap: React.FC = () => {
  return (
    <div className="sitemap-container p-8 max-w-6xl mx-auto min-h-screen">
      <header className="mb-12 border-b border-white/10 pb-6">
        <h1 className="text-4xl font-extrabold text-white mb-2">Mapa stránek</h1>
        <p className="text-gray-400">Kompletní přehled všech nástrojů a sekcí portálu Uspejeme.cz</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* 1. Projekt */}
        <section>
          <h2 className="text-sm uppercase tracking-widest text-orange-500 font-bold mb-4">Projekt</h2>
          <ul className="flex flex-col gap-3">
            <li><Link to="/" className="text-gray-300 hover:text-orange-500 transition-colors">Úvodní stránka</Link></li>
            <li><Link to="/o-nas" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">O nás</Link></li>
            <li><Link to="/panel" className="text-gray-300 hover:text-orange-500 transition-colors">Osobní nástěnka</Link></li>
            <li><Link to="/clanky" className="text-gray-300 hover:text-orange-500 transition-colors">Vzdělávání a články</Link></li>
            <li><Link to="/kalendar" className="text-gray-300 hover:text-orange-500 transition-colors">Kalendář termínů 2026</Link></li>
            <li><Link to="/archetyp" className="text-orange-500 font-bold hover:underline transition-colors">Poznej se (Kvíz)</Link></li>
            <li><Link to="/kontakt" className="text-gray-300 hover:text-orange-500 transition-colors">Kontakt</Link></li>
          </ul>
        </section>

        {/* 2. Finance & Stabilita */}
        <section>
          <h2 className="text-sm uppercase tracking-widest text-orange-500 font-bold mb-4">Finance & Stabilita</h2>
          <ul className="flex flex-col gap-3">
            <li><Link to="/faktury" className="text-gray-300 hover:text-orange-500 transition-colors font-medium text-lg">Faktury a platby</Link>
              <ul className="pl-4 mt-2 border-l border-white/5 flex flex-col gap-2 text-sm">
                <li><Link to="/faktury/invoice" className="text-gray-500 hover:text-orange-400 italic">Elite Faktura</Link></li>
                <li><Link to="/faktury/qr" className="text-gray-500 hover:text-orange-400 italic">QR Generátor</Link></li>
                <li><Link to="/faktury/dues" className="text-gray-500 hover:text-orange-400 italic">Hlídač splatnosti</Link></li>
              </ul>
            </li>
            <li className="mt-2"><Link to="/audit/stability" className="text-gray-300 hover:text-orange-500 transition-colors">Index stability</Link></li>
            <li><Link to="/audit/reserves" className="text-gray-300 hover:text-orange-500 transition-colors">Finanční rezerva</Link></li>
            <li><Link to="/audit/rizika" className="text-gray-300 hover:text-orange-500 transition-colors">Analýza rizik</Link></li>
            <li><Link to="/energy" className="text-gray-300 hover:text-orange-500 transition-colors">Kalkulačka energií</Link></li>
          </ul>
        </section>

        {/* 3. Strategie & Investice */}
        <section>
          <h2 className="text-sm uppercase tracking-widest text-orange-500 font-bold mb-4">Strategie & Investice</h2>
          <ul className="flex flex-col gap-3">
            <li><Link to="/planovac" className="text-orange-500 font-medium text-lg">Plánovač prosperity</Link></li>
            <li><Link to="/strategie/hodinovka" className="text-gray-300 hover:text-orange-500 transition-colors">Hodinová sazba</Link></li>
            <li><Link to="/strategie/projekt" className="text-gray-300 hover:text-orange-500 transition-colors">Ziskovost projektů</Link></li>
            <li><Link to="/investice/roi_calc" className="text-gray-300 hover:text-orange-500 transition-colors">Návratnost ROI</Link></li>
            <li><Link to="/safe-buy" className="text-green-500 font-semibold hover:underline">Safe-Buy Kalkulačka</Link></li>
            <li><Link to="/investice/inflation" className="text-gray-300 hover:text-orange-500 transition-colors">Inflační kalkulačka</Link></li>
            <li><Link to="/investice/gold" className="text-gray-300 hover:text-orange-500 transition-colors">Správa aktiv (Drahé kovy)</Link></li>
          </ul>
        </section>

        {/* 4. Právní a informace */}
        <section>
          <h2 className="text-sm uppercase tracking-widest text-orange-500 font-bold mb-4">Informace</h2>
          <ul className="flex flex-col gap-3">
            <li><Link to="/o-nas" className="text-gray-400 hover:text-white transition-colors">O projektu</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Ochrana údajů</Link></li>
            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Právní podmínky</Link></li>
            <li><Link to="/kontakt" className="text-gray-400 hover:text-white transition-colors">Napište nám</Link></li>
            <li><Link to="/mapa-stranek" className="text-orange-500 font-bold hover:underline transition-colors">Mapa stránek</Link></li>
          </ul>
        </section>

      </div>

      <footer className="mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
        Uspejeme.cz — Poslední aktualizace mapy: Březen 2026
      </footer>
    </div>
  );
};