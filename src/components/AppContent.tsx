import { Routes, Route, useNavigate } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { Dashboard } from './Dashboard'; // Předpokládám, že Dashboard.tsx je ve stejné složce, jinak upravte cestu
import { ArticleSection } from './ArticleSection';
import { CalendarPage } from './CalendarPage';
import { ProsperityPlanner } from './calculators/ProsperityPlanner';
import { ROICalculator } from './calculators/ROICalculator';
import { EnergyCalculator } from './calculators/EnergyCalculator';
import { AssetsCalculator } from './calculators/AssetsCalculator';
import { StabilityCalculator } from './calculators/StabilityCalculator';
import { ProjectProfitCalculator } from './calculators/ProjectProfitCalculator';
import { ReservesCalculator } from './calculators/ReservesCalculator';
import { RiskAssessment } from './calculators/RiskAssessment';
import { HourlyRateCalculator } from './calculators/HourlyRateCalculator';
import { QRGenerator } from './generators/QRGenerator';
import { DuesGenerator } from './generators/DuesGenerator';
import { EliteInvoice } from './generators/EliteInvoice';
import { MiniCard } from './MiniCard';
import { InflationCalculator } from "./calculators/InflationCalculator";
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import { Sitemap } from './SiteMap'; // Předpokládám, že ho máš v /components/
import { AboutUs } from './AboutUs'; // Přidat
import { Contact } from './Contact'; // Přidat
import { SafeBuyCalculator } from './calculators/SafeBuyCalculator';
import { ScrollToTop } from './ScrollToTop'; // Import hooku
import { NotFound } from './NotFound'; // Import fallbacku
import QuizPage from './QuizPage';
import { 
  FileText, Activity, Zap, ShieldAlert, Briefcase, Coins, QrCode, FileWarning, Target, 
  TrendingUp, TrendingDown, PiggyBank 
} from 'lucide-react';

// --- ROZCESTNÍKY (Musí být definovány mimo hlavní komponentu) ---

const FakturyNav = () => (
  <div className="nav-container">
    <h2>Faktury & platby</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '15px' }}>
      <MiniCard title="Faktura" desc="Vytvořit novou" icon={FileText} to="/faktury/faktura" />
      <MiniCard title="QR Platba" desc="Generátor kódu" icon={QrCode} to="/faktury/qr" />
      <MiniCard title="Splatnost" desc="Hlídač termínů" icon={FileWarning} to="/faktury/upominky" />
    </div>
  </div>
);

const AuditNav = () => (
  <div className="nav-container">
    <h2>Audit stability</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '15px' }}>
      <MiniCard title="Index stability" desc="Celková diagnostika" icon={Activity} to="/audit/stabilita" />
      <MiniCard title="Rezerva" desc="Finanční polštář" icon={PiggyBank} to="/audit/rezerva" />
      <MiniCard title="Rizika" desc="Analýza hrozeb" icon={ShieldAlert} to="/audit/rizika" />
      <MiniCard title="Energie" desc="Hlídač nákladů" icon={Zap} to="/audit/energie" />
    </div>
  </div>
);

const StrategieNav = () => (
  <div className="nav-container">
    <h2>Strategie & růst</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '15px' }}>
      <MiniCard title="Plánovač" desc="Kalkulačka prosperity" icon={Target} to="/planovac" />
      <MiniCard title="Hodinovka" desc="Ideální sazba" icon={Coins} to="/strategie/hodinovka" />
      <MiniCard title="Zakázky" desc="Ziskovost projektů" icon={Briefcase} to="/strategie/projekt" />
    </div>
  </div>
);

const InvesticeNav = () => (
  <div className="nav-container">
    <h2>Investice & ROI</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '15px' }}>
      <MiniCard title="Návratnost" desc="Kalkulačka ROI" icon={TrendingUp} to="/investice/roi" />
      <MiniCard title="Inflace" desc="Znehodnocení úspor" icon={TrendingDown} to="/investice/inflace" />
      <MiniCard title="Aktiva" desc="Zlato a drahé kovy" icon={Coins} to="/investice/aktiva" />
	  <MiniCard title="Nákupy" desc="Dobrá investice" icon={Coins} to="/investice/nakupy" />
    </div>
  </div>
);

// --- HLAVNÍ KOMPONENTA ---

export const AppContent = () => {
  const navigate = useNavigate();

  const handleNavigate = (view: string, articleId?: string) => {
    const routes: Record<string, string> = {
      dashboard: '/panel',
	  prosperita: '/planovac',
      rezerva: '/audit/rezerva',
      rizika: '/audit/rizika',
      hodinovka: '/strategie/hodinovka',
      clanky: '/clanky',
      kalendar: '/kalendar',
      faktury: '/faktury',
      strategie: '/strategie',
      investice: '/investice',
	  archetyp: '/archetyp'
    };
    const targetPath = routes[view] || view;
    navigate(articleId ? `${targetPath}/${articleId}` : targetPath);
  };

  return (
  <>
      {/* KLÍČOVÁ ZMĚNA: ScrollToTop musí být uvnitř Routeru, ale vně Routes */}
      <ScrollToTop />
    <Routes>
      <Route path="/" element={<LandingPage onNavigate={handleNavigate} />} />
      <Route path="/panel" element={<Dashboard />} />

      {/* 1. Faktury & platby */}
      <Route path="/faktury" element={<FakturyNav />} />
      <Route path="/faktury/faktura" element={<EliteInvoice />} />
      <Route path="/faktury/qr" element={<QRGenerator />} />
      <Route path="/faktury/upominky" element={<DuesGenerator />} />

      {/* 2. Audit stability */}
      <Route path="/audit" element={<AuditNav />} />
      <Route path="/audit/stabilita" element={<StabilityCalculator />} />
      <Route path="/audit/rezerva" element={<ReservesCalculator />} />
      <Route path="/audit/rizika" element={<RiskAssessment />} />
	  <Route path="/audit/energie" element={<EnergyCalculator />} />

      {/* 3. Strategie & růst */}
      <Route path="/strategie" element={<StrategieNav />} />
	  <Route path="/planovac" element={<ProsperityPlanner />} />
      <Route path="/strategie/hodinovka" element={<HourlyRateCalculator />} />
      <Route path="/strategie/projekt" element={<ProjectProfitCalculator />} />

      {/* 4. Investice & ROI */}
      <Route path="/investice" element={<InvesticeNav />} />
      <Route path="/investice/roi" element={<ROICalculator />} />
      <Route path="/investice/inflace" element={<InflationCalculator />} />
      <Route path="/investice/aktiva" element={<AssetsCalculator />} />
	  <Route path="/investice/nakupy" element={<SafeBuyCalculator />} />

      {/* Ostatní */}
      <Route path="/kalendar" element={<CalendarPage userType="vse" />} />
      <Route path="/clanky" element={<ArticleSection />} />
      <Route path="/clanky/:id" element={<ArticleSection />} />
	  <Route path="/archetyp" element={<QuizPage />} />
	  
{/* --- Footer & Info --- */}
      <Route path="/o-nas" element={<AboutUs />} />
      <Route path="/kontakt" element={<Contact />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/mapa-stranek" element={<Sitemap />} />
      
      {/* Catch-all route musí být POSLEDNÍ uvnitř <Routes> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </> // <--- TADY CHYBĚLA TATO ZNAČKA
  );
};

export default AppContent;