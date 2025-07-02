
import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Camera, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useShoppingContext } from '@/contexts/ShoppingContext';
import CartDropdown from './CartDropdown';
import WishlistDropdown from './WishlistDropdown';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { getCartCount, wishlist } = useShoppingContext();

  return (
    <header className="bg-deep-emerald shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-earthy-gold p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-charcoal-black" />
              </div>
              <h1 className="text-2xl font-playfair font-bold text-soft-cream">
                NiaWear
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-soft-cream hover:text-earthy-gold transition-colors duration-200">
              Features
            </a>
            <Link to="/ai-styling" className="text-soft-cream hover:text-earthy-gold transition-colors duration-200">
              AI Styling
            </Link>
            <Link to="/african-designs" className="text-soft-cream hover:text-earthy-gold transition-colors duration-200">
              Browse Designs
            </Link>
            <Link to="/marketplace" className="text-soft-cream hover:text-earthy-gold transition-colors duration-200">
              Marketplace
            </Link>
            
            {/* Wishlist Icon */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsWishlistOpen(!isWishlistOpen)}
                className="text-soft-cream hover:text-earthy-gold relative"
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
              <WishlistDropdown 
                isOpen={isWishlistOpen} 
                onClose={() => setIsWishlistOpen(false)} 
              />
            </div>

            {/* Cart Icon */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="text-soft-cream hover:text-earthy-gold relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-earthy-gold text-charcoal-black rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Button>
              <CartDropdown 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
              />
            </div>

            <Link to="/ai-styling">
              <Button className="bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black font-semibold">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Wishlist */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsWishlistOpen(!isWishlistOpen)}
                className="text-soft-cream hover:text-earthy-gold relative"
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
              <WishlistDropdown 
                isOpen={isWishlistOpen} 
                onClose={() => setIsWishlistOpen(false)} 
              />
            </div>

            {/* Mobile Cart */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="text-soft-cream hover:text-earthy-gold relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-earthy-gold text-charcoal-black rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Button>
              <CartDropdown 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
              />
            </div>

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
              <Link to="/ai-styling" className="block px-3 py-2 text-soft-cream hover:text-earthy-gold transition-colors duration-200">
                AI Styling
              </Link>
              <Link to="/african-designs" className="block px-3 py-2 text-soft-cream hover:text-earthy-gold transition-colors duration-200">
                Browse Designs
              </Link>
              <Link to="/marketplace" className="block px-3 py-2 text-soft-cream hover:text-earthy-gold transition-colors duration-200">
                Marketplace
              </Link>
              <div className="px-3 py-2">
                <Link to="/ai-styling">
                  <Button className="w-full bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black font-semibold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
