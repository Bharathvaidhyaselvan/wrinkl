import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shirt className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">Wrinkl</span>
            </div>
            <p className="mb-4 text-sm">
              Professional laundry services that bring freshness and cleanliness to your wardrobe.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors duration-200">Services</Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-blue-400 transition-colors duration-200">Schedule Pickup</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>+91 9566766646</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>wrinklcontact@gmail.com.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>TechKnots LLP, Ramapuram, Chennai-600 089</span>
              </li>
            </ul>
          </div>
          
          {/* Business Hours */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Business Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p>Monday - Friday</p>
                  <p>8:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p>Saturday - Sunday</p>
                  <p>8:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Wrinkl. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;