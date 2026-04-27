import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { settings } from "../lib/content";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);

  const navItems = settings.navigation.menuItems
    .filter(item => item.visible)
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      if (y > lastY + 10 && y > 80) setMenuOpen(false);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (value: string) => {
    onTabChange(value);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: scrolled || menuOpen ? 'rgba(5,46,22,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(74,222,128,0.12)' : 'none',
        transition: 'background-color 0.25s ease',
      }}
    >
      {/* ── Top bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        height: '3.75rem',
        paddingLeft: '0.75rem',
        paddingRight: '0.5rem',
      }}>

        {/* Logo — far left */}
        <button
          onClick={() => handleClick('about')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.625rem',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '0.35rem 0.5rem', borderRadius: '0.5rem',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <img
            src="/images/logo.jpeg"
            alt="Plant A Seed"
            style={{
              width: '2rem', height: '2rem',
              borderRadius: '50%', objectFit: 'contain',
              border: '1.5px solid rgba(74,222,128,0.4)',
            }}
          />
          <span style={{
            fontWeight: 700, fontSize: '0.95rem', color: 'white',
            letterSpacing: '0.01em', whiteSpace: 'nowrap',
          }}>
            Plant A Seed
          </span>
        </button>

        <div style={{ flex: 1 }} />

        {/* Hamburger toggle */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '2.5rem', height: '2.5rem',
            background: menuOpen ? 'rgba(74,222,128,0.15)' : 'none',
            border: menuOpen ? '1px solid rgba(74,222,128,0.3)' : '1px solid transparent',
            borderRadius: '0.5rem',
            cursor: 'pointer', color: 'white',
            transition: 'background-color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => {
            if (!menuOpen) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.1)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
            }
          }}
          onMouseLeave={e => {
            if (!menuOpen) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent';
            }
          }}
        >
          {menuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </div>

      {/* ── Dropdown ── */}
      {menuOpen && (
        <div style={{
          borderTop: '1px solid rgba(74,222,128,0.15)',
          paddingTop: '0.375rem',
          paddingBottom: '0.75rem',
        }}>
          {navItems.map(item => {
            const isActive = activeTab === item.value;
            return (
              <button
                key={item.value}
                onClick={() => handleClick(item.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: isActive ? 'rgba(74,222,128,0.1)' : 'none',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #4ade80' : '3px solid transparent',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? '#86efac' : 'rgba(255,255,255,0.85)',
                  padding: '0.8rem 1.5rem',
                  transition: 'background-color 0.12s, color 0.12s',
                  letterSpacing: '0.005em',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'white';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.85)';
                  }
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
