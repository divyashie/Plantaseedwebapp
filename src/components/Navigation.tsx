import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show nav when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide nav when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
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

    // Scroll to content section smoothly
    const contentSection = document.querySelector('.max-w-7xl');
    if (contentSection) {
      const navHeight = 80;
      const elementPosition = contentSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-green-900 text-white border-b border-green-800 shadow-md transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/images/logo.jpeg" alt="Plant A Seed Logo" className="w-10 h-10 object-contain" />
            <span className="font-bold text-lg text-white hidden sm:inline">Plant A Seed</span>
          </div>

          {/* Navigation Items - Always Horizontal */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => handleNavClick(item.value)}
                className={`text-white hover:text-green-200 hover:bg-green-800 text-sm sm:text-base px-3 sm:px-4 py-2 h-auto font-medium transition-colors ${
                  activeTab === item.value ? "text-green-200 bg-green-800" : ""
                }`}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
