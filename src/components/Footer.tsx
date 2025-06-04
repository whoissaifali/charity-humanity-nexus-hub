
import React from 'react';
import { Heart, Mail, MapPin, Phone, Facebook, Youtube, Shield } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: "How to Donate", href: "#donate" },
      { name: "Top Donors", href: "#donors" },
      { name: "Request Help", href: "#request-help" },
      { name: "Transparency", href: "#transparency" },
      { name: "Video Guides", href: "#guides" }
    ],
    about: [
      { name: "About Us", href: "#about" },
      { name: "Our Work", href: "#our-work" },
      { name: "FAQ", href: "#faq" },
      { name: "Contact Us", href: "#contact" },
      { name: "Privacy Policy", href: "#privacy" }
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Upload Receipt", href: "#receipt" },
      { name: "Payment Methods", href: "#payment" },
      { name: "Tax Benefits", href: "#tax" },
      { name: "Report Issue", href: "#report" }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="h-8 w-8 text-red-500 fill-current" />
                <span className="text-xl font-bold">CharityHumanity Nepal</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                A transparent charity platform dedicated to helping communities across Nepal and beyond. 
                Every donation tracked, every transaction visible, every rupee accountable.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span>Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="h-5 w-5 text-red-500" />
                  <span>contact@charityhumanitynepal.org</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="h-5 w-5 text-red-500" />
                  <span>+977-1-4567890</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Platform</h3>
              <ul className="space-y-4">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">About</h3>
              <ul className="space-y-4">
                {footerLinks.about.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust & Security Banner */}
        <div className="border-t border-gray-800 py-8">
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-6 border border-green-800/30">
            <div className="flex items-center justify-center space-x-4 text-center">
              <Shield className="h-8 w-8 text-green-400" />
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-1">100% Secure & Transparent</h4>
                <p className="text-gray-400">All transactions are encrypted and publicly viewable for complete transparency</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 CharityHumanity Nepal. All rights reserved. | Registration No: NPO/2024/001
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
