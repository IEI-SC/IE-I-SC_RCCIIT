import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IEI_LOGO_IMG } from '../constants';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: 'https://iceberg-cosmos.vercel.app', label: 'ICEBERG COSMOS 2K25-26' },
  { path: '/events', label: 'Events' },
  { path: '/team', label: 'Team' },
  { path: '/contact', label: 'Contact Us' },
  { path: '/join', label: 'Join Us' },
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
              <img src={IEI_LOGO_IMG} alt="IEI Logo" className="h-10 w-10 object-contain bg-white p-1 rounded-md" />
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
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-text-muted hover:text-white hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'transform rotate-90' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18极狐M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-brand-primary text-white'
                      : 'text-brand-text-muted hover:bg-brand-secondary hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
