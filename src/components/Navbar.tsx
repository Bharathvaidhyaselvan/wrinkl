import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Shirt, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
      isActive 
        ? 'text-blue-600 bg-blue-50' 
        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
    }`;

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shirt className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Wrinkl</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/services" className={navLinkClass}>Services</NavLink>
            <NavLink to="/schedule" className={navLinkClass}>Schedule Pickup</NavLink>
            <Link 
              to="/schedule" 
              className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden py-4 px-4 bg-white border-t">
          <div className="flex flex-col space-y-2">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/services" className={navLinkClass}>Services</NavLink>
            <NavLink to="/schedule" className={navLinkClass}>Schedule Pickup</NavLink>
            <Link 
              to="/schedule" 
              className="mt-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Book Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;