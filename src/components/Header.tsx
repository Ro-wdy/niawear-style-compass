
import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Camera, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-deep-emerald shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-earthy-gold p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-charcoal-black" />
              </div>
              <h1 className="text-2xl font-playfair font-bold text-soft-cream">
                NiaWear
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-soft-cream hover:text-earthy-gold transition-colors duration-200">
              Features
            </a>
            <a href="#styling" className="text-soft-cream hover:text-earthy-gold transition-colors duration-200">
              AI Styling
            </a>
            <a href="#browse" className="text-soft-cream hover:text-earthy-gold transition-colors duration-200">
              Browse Outfits
            </a>
            <a href="#marketplace" className="text-soft-cream hover:text-earthy-gold transition-colors duration-200">
              Marketplace
            </a>
            <Button className="bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black font-semibold">
              Get Started
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-soft-cream"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-charcoal-black/20 rounded-lg mb-4">
              <a href="#features" className="block px-3 py-2 text-soft-cream hover:text-earthy-gold transition-colors duration-200">
                Features
              </a>
              <a href="#styling" className="block px-3 py-2 text-soft-cream hover:text-earthy-gold transition-colors duration-200">
                AI Styling
              </a>
              <a href="#browse" className="block px-3 py-2 text-soft-cream hover:text-earthy-gold transition-colors duration-200">
                Browse Outfits
              </a>
              <a href="#marketplace" className="block px-3 py-2 text-soft-cream hover:text-earthy-gold transition-colors duration-200">
                Marketplace
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black font-semibold">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
