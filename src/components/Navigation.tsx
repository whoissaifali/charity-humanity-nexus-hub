
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Heart, 
  Users, 
  TrendingUp, 
  HelpCircle,
  FileText,
  Shield,
  LogIn,
  UserPlus,
  LogOut,
  User
} from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const location = useLocation();
  const { user, signOut, loading } = useAuth();

  const navItems = [
    { name: 'Donate Now', href: '/donate', icon: Heart },
    { name: 'Top Donors', href: '/donors', icon: Users },
    { name: 'Transparency', href: '/transparency', icon: TrendingUp },
    { name: 'Request Help', href: '/request-help', icon: HelpCircle },
    { name: 'Our Work', href: '/our-work', icon: FileText },
    { name: 'About Us', href: '/about', icon: Shield },
  ];

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (href: string) => location.pathname === href;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold text-gray-900">CharityHumanity Nepal</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 transition-colors duration-200 ${
                    isActive(item.href) 
                      ? 'text-red-600' 
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center space-x-2"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center space-x-2"
                    onClick={() => handleAuthClick('login')}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-red-600 hover:bg-red-700 flex items-center space-x-2"
                    onClick={() => handleAuthClick('signup')}
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                <div className="px-4 pt-4 border-t border-gray-200 space-y-2">
                  {user ? (
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600 p-2">
                        Signed in as: {user.email}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center space-x-2"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center space-x-2"
                        onClick={() => handleAuthClick('login')}
                      >
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                      </Button>
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700 flex items-center space-x-2"
                        onClick={() => handleAuthClick('signup')}
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>Sign Up</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Navigation;
