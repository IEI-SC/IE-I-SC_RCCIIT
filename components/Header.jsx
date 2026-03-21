import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/events', label: 'Events' },
  { path: '/team', label: 'Team' },
  { path: '/contact', label: 'Contact Us' },
  { path: '/join', label: 'Join Us' },
  { path: 'https://iceberg-cosmos.vercel.app', label: 'ICEBERG COSMOS 2K25-26' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-brand-secondary/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-brand-primary/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink 
              to="/" 
              className="flex-shrink-0 flex items-center gap-3 transition-transform transform hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img src="https://ie-i-scrcciit.vercel.app/images/Official_ieircciit_Logo.png" alt="IEI Student Chapter RCCIIT Logo" className="h-10 w-10 object-contain bg-white p-1 rounded-md" />
              <span className="text-xl font-bold text-brand-text">IE(I)-SC RCCIIT</span>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-110 after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-brand-primary after:transition-all after:duration-300 hover:after:w-full ${
                      isActive
                        ? 'bg-brand-primary text-white scale-110'
                        : 'text-brand-text-muted hover:bg-brand-secondary hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
          
          {/* Premium Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-brand-primary transition-all duration-300"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-5 h-5">
                <span className={`absolute h-0.5 w-5 bg-white rounded-full transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'rotate-45 top-2' : 'top-1'
                }`}></span>
                <span className={`absolute h-0.5 w-5 bg-white rounded-full transition-all duration-300 ease-in-out top-2 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute h-0.5 w-5 bg-white rounded-full transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? '-rotate-45 top-2' : 'top-3'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Premium Mobile Navigation Menu */}
        <div className={`md:hidden fixed inset-0 z-50 transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}>
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Menu Panel */}
          <div className={`absolute top-0 right-0 h-full w-80 bg-brand-secondary/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-xl font-bold text-white">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navLinks.map((link, index) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:translate-x-2 ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-primary to-brand-primary/80 text-white shadow-lg'
                          : 'text-brand-text-muted hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
