import { useState } from 'react';
import { Menu, X, ChevronDown, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen, tools, subItems }: any) => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleNav = (path: string) => {
    if (path !== '#') {
      navigate(path);
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
    }
  };

  return (
    <header className="main-header">
      <div className="header-wrapper">
        {/* LOGO: Nyní používá vnitřní navigaci místo reloadu stránky */}
        <div className="logo-section" onClick={() => handleNav('/')} style={{ cursor: 'pointer' }}>
          <h1>Uspějeme<span>.cz</span></h1>
        </div>

        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          <button className="nav-link" onClick={() => handleNav('/')}>
            <Home size={18} />
          </button>
          
          {tools.map((tool: any) => {
            const hasSubs = subItems[tool.id] && subItems[tool.id].length > 0;

            return (
              <div 
                key={tool.id} 
                className="nav-dropdown-container"
                onMouseEnter={() => !isMobileMenuOpen && hasSubs && setOpenDropdown(tool.id)}
                onMouseLeave={() => !isMobileMenuOpen && setOpenDropdown(null)}
              >
                <button 
                  className="nav-link" 
                  onClick={() => {
                    if (isMobileMenuOpen && hasSubs) {
                      setOpenDropdown(openDropdown === tool.id ? null : tool.id);
                    } else {
                      handleNav(tool.path);
                    }
                  }}
                >
                  {tool.label}
                  {hasSubs && <ChevronDown size={14} style={{ 
                    transform: openDropdown === tool.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }} />}
                </button>

                {hasSubs && openDropdown === tool.id && (
                  <div className="dropdown-menu">
                    {subItems[tool.id].map((sub: any) => (
                      <button key={sub.path} onClick={() => handleNav(sub.path)}>
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};