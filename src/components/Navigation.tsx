import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isCompact, setIsCompact] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsCompact(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsCompact(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsCompact(true);
        setIsMobileMenuOpen(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "About", value: "about" },
    { name: "eBook", value: "ebook" },
    { name: "Products", value: "products" },
    { name: "Shop", value: "shop" },
    { name: "Music", value: "music" },
    { name: "Guide", value: "guide" },
    { name: "Gallery", value: "gallery" },
  ];

  const handleNavClick = (value: string) => {
    onTabChange(value);
    setIsMobileMenuOpen(false);

    const contentSection = document.querySelector('.max-w-7xl');
    if (contentSection) {
      const navHeight = 80;
      const elementPosition = contentSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Check if we're on a large screen (desktop)
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Show hamburger on mobile always, or on desktop when compact
  const showHamburger = !isDesktop || isCompact;
  // Show nav items on desktop when not compact
  const showNavItems = isDesktop && !isCompact;

  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-green-900 text-white border-b border-green-800 shadow-md"
      style={{ zIndex: 9999 }}
    >
      <div className="flex items-center h-16 lg:h-20">
        {/* Logo - at the left edge */}
        <button
          onClick={() => handleNavClick('about')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity pl-1"
        >
          <img src="/images/logo.jpeg" alt="Plant A Seed Logo" className="w-10 h-10 object-contain" />
          <span className="font-bold text-lg text-white hidden sm:inline">Plant A Seed</span>
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop Nav Items - only when not compact */}
        {showNavItems && (
          <div className="flex items-center gap-1 pr-4">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => handleNavClick(item.value)}
                className={`text-white hover:text-green-200 hover:bg-green-800 text-sm px-3 py-2 h-auto font-medium transition-colors ${
                  activeTab === item.value ? "text-green-200 bg-green-800" : ""
                }`}
              >
                {item.name}
              </Button>
            ))}
          </div>
        )}

        {/* Hamburger - on mobile always, on desktop when compact */}
        {showHamburger && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 mr-2 lg:mr-4 text-white hover:text-green-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-green-800 bg-green-900">
          <div className="flex flex-col py-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => handleNavClick(item.value)}
                className={`text-white hover:text-green-200 hover:bg-green-800 text-base px-6 py-3 h-auto font-medium transition-colors w-full justify-start rounded-none ${
                  activeTab === item.value ? "text-green-200 bg-green-800" : ""
                }`}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
