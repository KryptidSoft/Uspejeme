import './index.css';
import { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { 
  Activity, FileText, Target, Coins, ShieldAlert, GraduationCap, type LucideIcon 
} from 'lucide-react';

import { BusinessProvider } from './hooks/useBusinessData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DisclaimerModal } from './components/DisclaimerModal';
import { AppContent } from './components/AppContent';

interface ToolItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

const TOOLS_REGISTRY: ToolItem[] = [
  { id: 'dashboard', label: 'Můj panel', icon: Activity, path: '/dashboard' },
  { id: 'finance', label: 'Faktury & platby', icon: FileText, path: '/faktury' },
  { id: 'stability', label: 'Audit stability', icon: ShieldAlert, path: '/audit' },
  { id: 'strategie', label: 'Strategie & růst', icon: Target, path: '/strategie' },
  { id: 'investice', label: 'Investice & ROI', icon: Coins, path: '/investice' },
  { id: 'vzdelavani', label: 'Vzdělávání', icon: GraduationCap, path: '#' }, 
];

const SUB_ITEMS: Record<string, { label: string, path: string }[]> = {
  'finance': [
    { label: 'Faktura', path: '/faktury/invoice' },
    { label: 'QR Platba', path: '/faktury/qr' },
    { label: 'Splatnost', path: '/faktury/dues' },
  ],
  'stability': [
    { label: 'Index stability', path: '/audit/stability' },
    { label: 'Rezerva', path: '/audit/reserves' },
    { label: 'Rizika', path: '/audit/rizika' },
    { label: 'Energie', path: '/energy' },
  ],
  'strategie': [
    { label: 'Plánovač', path: '/planner' },
    { label: 'Hodinovka', path: '/strategie/hourly' },
    { label: 'Zakázky', path: '/strategie/projects' },
  ],
  'investice': [
    { label: 'Návratnost', path: '/investice/roi_calc' },
    { label: 'Inflace', path: '/investice/inflation' },
    { label: 'Aktiva', path: '/investice/gold' },
    { label: 'Nákupy', path: '/safe-buy' },
  ],
  'vzdelavani': [
    { label: 'Články', path: '/articles' },
    { label: 'Termíny 2026', path: '/calendar' },
    { label: 'Poznej se', path: '/archetyp' },
  ]
};

// Vnitřní komponenta, která už má přístup k Routeru (díky tomu funguje location)
const AppInner = () => {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app-container">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        tools={TOOLS_REGISTRY}
        subItems={SUB_ITEMS}
      />

      {/* KEY={location.pathname} je lék na to zamrzání kalkulaček */}
      <main className="main-content" key={location.pathname}>
        <AppContent />
      </main>

      <Footer onShowDisclaimer={() => setIsDisclaimerOpen(true)} />
      <DisclaimerModal isOpen={isDisclaimerOpen} onClose={() => setIsDisclaimerOpen(false)} />
    </div>
  );
};

// Hlavní export, který vše obaluje
export const App = () => {
  return (
    <BusinessProvider>
      <Router>
        <AppInner />
      </Router>
    </BusinessProvider>
  );
};

export default App;