import React, { useState, useMemo } from 'react';
import { 
  Save, FileText, RefreshCcw, AlertTriangle, Activity, 
  TrendingUp, Zap, Clock, ShieldCheck, Coins, PiggyBank, 
  X, ChevronRight, BookOpen, Trash2, Facebook, Twitter, Linkedin
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Importy tvých pomocných funkcí (předpokládám, že cesty sedí)
import { formatCZK, safeNumber } from './utils/calculations/mathHelpers';
import { calculateROI } from './utils/calculations/roi';
import { calculateHourlyRate } from './utils/calculations/hourly';
import { calculateEnergy } from './utils/calculations/energy';
import { calculateStability } from './utils/calculations/stability';
import { convertFiatToAssets } from './utils/calculations/assets';
import { calculateReserves } from './utils/calculations/reserves';
import { usePersistentState } from './hooks/usePersistentState';

const ARTICLES = [
  {
    id: 1,
    date: "25. 02. 2026",
    title: "Jak přežít jako OSVČ v roce 2026",
    excerpt: "Nová pravidla pro paušální daň a jak si správně nastavit rezervy...",
    content: "Zde bude tvůj celý článek o financích v roce 2026."
  },
  {
    id: 2,
    date: "10. 02. 2026",
    title: "Proč je NPV důležitější než prostá návratnost?",
    excerpt: "Vysvětlení, proč inflace a čas hrají proti vašim penězům...",
    content: "Detailní rozbor diskontování a čisté současné hodnoty."
  }
];

const App = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // --- STAVY ---
  const [roiData, setRoiData] = usePersistentState('rozhodni_roi', { investment: 100000, initialCosts: 10000, monthlyBenefit: 15000, risk: 10, discountRate: 8 });
  const [hourlyData, setHourlyData] = usePersistentState('rozhodni_hourly', { grossIncome: 50000, billableHours: 100, nonBillableHours: 40, taxes: 5000, overhead: 3000, material: 1000, reserves: 2000 });
  const [energyData, setEnergyData] = usePersistentState('rozhodni_energy', { watts: 200, hoursPerDay: 8, pricePerKWh: 6.5 });
  const [stabilityData, setStabilityData] = usePersistentState('rozhodni_stability', { reservesMonths: 6, incomeSustainability: 80, workload: 70, roiEfficiency: 75, expenseStability: 90 });
  const [fiatAmount, setFiatAmount] = usePersistentState('rozhodni_fiat', 100000);
  const [reservesInputs, setReservesInputs] = usePersistentState('rozhodni_reserves', { monthlyExpenses: 30000, targetMonths: 6, savingMonths: 12 });
  const [notes, setNotes] = usePersistentState('rozhodni_notes', "");

  // --- VÝPOČTY ---
  const resultsROI = useMemo(() => calculateROI(roiData), [roiData]);
  const resultsHourly = useMemo(() => calculateHourlyRate({
    grossIncome: hourlyData.grossIncome,
    billableHours: hourlyData.billableHours,
    nonBillableHours: hourlyData.nonBillableHours,
    costs: { taxes: hourlyData.taxes, overhead: hourlyData.overhead, material: hourlyData.material, reserves: hourlyData.reserves }
  }), [hourlyData]);
  const resultsEnergy = useMemo(() => calculateEnergy(energyData.watts, energyData.hoursPerDay, energyData.pricePerKWh), [energyData]);
  const resultsStability = useMemo(() => calculateStability(stabilityData), [stabilityData]);
 // --- STATICKÉ CENY AKTIV ---
const STATIC_ASSETS = [
  { name: "Zlato", pricePerUnit: 3471, unit: "g" },
  { name: "Stříbro", pricePerUnit: 55, unit: "g" },
  { name: "Bitcoin", pricePerUnit: 1385000, unit: "BTC" }
];

// --- VÝPOČET AKTIV ---
const resultsAssets = useMemo(() => {
  return STATIC_ASSETS.map(asset => ({
    name: asset.name,
    amount: (fiatAmount / asset.pricePerUnit).toFixed(4), // kolik jednotek za zadanou částku
    unit: asset.unit
  }));
}, [fiatAmount]);
  const resultsReserves = useMemo(() => calculateReserves(reservesInputs.monthlyExpenses, reservesInputs.targetMonths, reservesInputs.savingMonths), [reservesInputs]);

  // --- FUNKCE ---
  const resetData = () => {
    if (window.confirm("Opravdu chcete smazat všechna data?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("ROZHODNI.CZ - Report", 10, 15);
    autoTable(doc, { 
      head: [['Metrika', 'Hodnota']], 
      body: [
        ['NPV (Investice)', formatCZK(resultsROI.npv)],
        ['Hodinová sazba', `${formatCZK(resultsHourly.billableRate)}/h`],
        ['Měsíční náklady energie', formatCZK(resultsEnergy.monthlyCost)],
        ['Stabilita skóre', `${resultsStability.score}/100`],
        ['Cílová rezerva', formatCZK(resultsReserves.targetAmount)]
      ] 
    });
    doc.save("rozhodni_report.pdf");
  };

  return (
    <div className="container">
      {/* HLAVIČKA */}
      <header className="main-header" onClick={() => {setActiveTab('home'); setSelectedArticle(null);}}>
        <h1>Rozhodni<span style={{color: 'var(--accent)'}}>.cz</span></h1>
      </header>

      <main>
        {/* HOMEPAGE */}
        {activeTab === 'home' && !selectedArticle && (
          <div className="homepage-menu">
            <h2 className="title-center">Vítejte v Rozhodni.cz</h2>
            <div className="grid-layout">
              <div className="glass-card menu-item" onClick={() => setActiveTab('calculators')}>
                <Activity size={32} color="var(--accent)" />
                <h3>Finanční nástroje</h3>
                <p>6 profesionálních kalkulaček pro vaše podnikání.</p>
                <ChevronRight className="arrow" />
              </div>
              <div className="glass-card menu-item" onClick={() => setActiveTab('blog')}>
                <BookOpen size={32} color="#f59e0b" />
                <h3>Články a rady</h3>
                <p>Tipy pro efektivní finance a strategii.</p>
                <ChevronRight className="arrow" />
              </div>
            </div>
          </div>
        )}

        {/* BLOG SEZNAM */}
        {activeTab === 'blog' && !selectedArticle && (
          <div>
            <button className="text-link" onClick={() => setActiveTab('home')}>← Zpět</button>
            <div className="grid-layout" style={{marginTop: '1rem'}}>
              {ARTICLES.map(article => (
                <div key={article.id} className="glass-card clickable" onClick={() => setSelectedArticle(article)}>
                  <small className="accent-text">{article.date}</small>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DETAIL ČLÁNKU */}
        {selectedArticle && (
          <div className="article-container">
            <button className="text-link" onClick={() => setSelectedArticle(null)}>← Zpět na seznam</button>
            <article className="glass-card" style={{marginTop: '1rem'}}>
              <small>{selectedArticle.date}</small>
              <h2 className="accent-text">{selectedArticle.title}</h2>
              <div className="article-content">{selectedArticle.content}</div>
            </article>
          </div>
        )}

        {/* KALKULAČKY */}
        {activeTab === 'calculators' && (
          <div>
            <button className="text-link" onClick={() => setActiveTab('home')}>← Zpět do menu</button>
            
            <div className="grid-layout">
              {/* 1. ROI */}
              <section className="glass-card">
                <h2><TrendingUp size={20} /> ROI & Investice</h2>
                <div className="input-group">
                  <label>Investice (Kč)</label>
                  <input type="number" value={roiData.investment} onChange={e => setRoiData({...roiData, investment: safeNumber(e.target.value)})} />
                  <div className="tooltip-box">Celková suma, kterou do projektu vložíte na začátku.</div>
                </div>
                <div className="result-row success">NPV: {formatCZK(resultsROI.npv)}</div>
              </section>

              {/* 2. HODINOVKA */}
              <section className="glass-card">
                <h2><Clock size={20} /> Hodinová sazba</h2>
                <div className="input-group">
                  <label>Cílový příjem (Kč/měs)</label>
                  <input type="number" value={hourlyData.grossIncome} onChange={e => setHourlyData({...hourlyData, grossIncome: safeNumber(e.target.value)})} />
                  <div className="tooltip-box">Čistý zisk, který chcete mít po odečtení nákladů a daní.</div>
                </div>
                <div className="result-row">Sazba: <strong>{formatCZK(resultsHourly.billableRate)}/h</strong></div>
              </section>

              {/* 3. ENERGIE */}
              <section className="glass-card">
                <h2><Zap size={20} /> Energie</h2>
                <div className="input-group">
                  <label>Příkon (W)</label>
                  <input type="number" value={energyData.watts} onChange={e => setEnergyData({...energyData, watts: safeNumber(e.target.value)})} />
                  <div className="tooltip-box">Spotřeba zařízení ve Wattech (např. 200W pro PC).</div>
                </div>
                <div className="result-row">Náklad: <strong>{formatCZK(resultsEnergy.monthlyCost)}/měs</strong></div>
              </section>

              {/* 4. REZERVY */}
              <section className="glass-card">
                <h2><PiggyBank size={20} /> Rezervy</h2>
                <div className="input-group">
                  <label>Měsíční výdaje (Kč)</label>
                  <input type="number" value={reservesInputs.monthlyExpenses} onChange={e => setReservesInputs({...reservesInputs, monthlyExpenses: safeNumber(e.target.value)})} />
                  <div className="tooltip-box">Všechny vaše měsíční náklady (nájem, jídlo, služby).</div>
                </div>
                <div className="result-row">Cíl: <strong>{formatCZK(resultsReserves.targetAmount)}</strong></div>
              </section>

              {/* 5. AKTIVA */}
              <section className="glass-card">
                <h2><Coins size={20} /> Kupní síla</h2>
                <div className="input-group">
                  <label>Částka v CZK</label>
                  <input type="number" value={fiatAmount} onChange={e => setFiatAmount(safeNumber(e.target.value))} />
                  <div className="tooltip-box">Přepočet vaší hotovosti na reálné hodnoty (zlato, BTC atd.).</div>
                </div>
                <div className="assets-list">
                  {resultsAssets.map((a, i) => <div key={i}>{a.name}: {a.amount} {a.unit}</div>)}
                </div>
              </section>

              {/* 6. STABILITA */}
              <section className="glass-card">
                <h2><ShieldCheck size={20} /> Stabilita</h2>
                <div className="input-group">
                  <label>Rezerva (měsíce): {stabilityData.reservesMonths}</label>
                  <input type="range" min="1" max="12" value={stabilityData.reservesMonths} onChange={e => setStabilityData({...stabilityData, reservesMonths: safeNumber(e.target.value)})} />
                  <div className="tooltip-box">Jak dlouho vydržíte bez příjmů. Bezpečné minimum je 6 měsíců.</div>
                </div>
                <div className="stability-score">{resultsStability.score}/100</div>
              </section>
            </div>

            <div className="action-bar">
               <button className="btn-main" onClick={exportPDF}><Save size={18} /> Exportovat PDF analýzu</button>
            </div>
          </div>
        )}
      </main>

      {/* PATIČKA SE SOCIÁLNÍMI SÍTĚMI */}
      <footer className="main-footer">
        <div className="social-links">
          <a href="#"><Facebook size={20} /></a>
          <a href="#"><Twitter size={20} /></a>
          <a href="#"><Linkedin size={20} /></a>
        </div>
        <div className="footer-actions">
          <button className="text-link" onClick={() => setShowDisclaimer(true)}>Právní upozornění</button>
          <button className="text-link danger" onClick={resetData}><Trash2 size={14} /> Smazat data</button>
        </div>
        <p className="copy">© 2026 Rozhodni.cz | Verze 1.0.0</p>
      </footer>

      {/* MODÁLNÍ OKNO */}
      {showDisclaimer && (
        <div className="modal-overlay" onClick={() => setShowDisclaimer(false)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()}>
            <h2>Právní upozornění</h2>
            <p>Aplikace je pouze informativní nástroj. Výpočty jsou orientační.</p>
            <button className="btn-main" style={{width: '100%'}} onClick={() => setShowDisclaimer(false)}>Rozumím</button>
          </div>
        </div>
      )}

      {/* VNITŘNÍ STYLY - ZDE JSOU TY TOOLTIPY A STRUKTURA */}
      <style>{`
        :root {
          --accent: #3b82f6;
          --glass-bg: rgba(255, 255, 255, 0.05);
          --glass-border: rgba(255, 255, 255, 0.1);
          --success: #10b981;
          --danger: #ef4444;
        }
        .container { max-width: 1200px; margin: 0 auto; color: white; font-family: sans-serif; }
        .main-header { padding: 2rem; text-align: center; cursor: pointer; }
        .grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; padding: 1rem; }
        .glass-card { background: var(--glass-bg); backdrop-filter: blur(10px); border: 1px solid var(--glass-border); border-radius: 16px; padding: 1.5rem; transition: 0.3s; }
        .clickable:hover { transform: translateY(-5px); background: rgba(255,255,255,0.1); cursor: pointer; }
        
        /* TOOLTIP LOGIKA */
        .input-group { position: relative; margin: 1rem 0; }
        .input-group label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; opacity: 0.8; }
        .input-group input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); padding: 0.8rem; color: white; border-radius: 8px; }
        
        .tooltip-box { 
          display: none; position: absolute; bottom: 110%; left: 0; right: 0; 
          background: #1e293b; padding: 0.7rem; border-radius: 6px; font-size: 0.8rem; 
          border: 1px solid var(--accent); z-index: 100; 
        }
        .input-group:hover .tooltip-box { display: block; }

        .result-row { margin-top: 1rem; font-size: 1.1rem; }
        .stability-score { font-size: 2.5rem; font-weight: bold; text-align: center; color: var(--accent); }
        .action-bar { display: flex; justify-content: center; margin-top: 2rem; }
        .btn-main { background: var(--accent); color: white; border: none; padding: 1rem 2rem; border-radius: 12px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 8px; }
        
        .main-footer { margin-top: 4rem; padding: 2rem; border-top: 1px solid var(--glass-border); text-align: center; }
        .social-links { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 1rem; }
        .social-links a { color: white; opacity: 0.6; transition: 0.3s; }
        .social-links a:hover { opacity: 1; color: var(--accent); }
        .footer-actions { display: flex; justify-content: center; gap: 2rem; }
        .danger { color: var(--danger) !important; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; }
      `}</style>
    </div>
  );
};

export default App;