
import React from 'react';
import { Sparkles, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-charcoal-black text-soft-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-earthy-gold p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-charcoal-black" />
              </div>
              <h3 className="text-2xl font-playfair font-bold">NiaWear</h3>
            </div>
            <p className="text-soft-cream/70 max-w-sm">
              Fashion meets purpose. AI-powered styling for a sustainable and personalized wardrobe experience.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-soft-cream/70 hover:text-earthy-gold">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-soft-cream/70 hover:text-earthy-gold">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-soft-cream/70 hover:text-earthy-gold">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-soft-cream/70 hover:text-earthy-gold">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-lg font-playfair font-semibold">Product</h4>
            <ul className="space-y-2 text-soft-cream/70">
              <li><a href="#" className="hover:text-earthy-gold transition-colors">AI Styling</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Photo Matching</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Outfit Browser</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Daily Tips</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Marketplace</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-playfair font-semibold">Company</h4>
            <ul className="space-y-2 text-soft-cream/70">
              <li><a href="#" className="hover:text-earthy-gold transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-playfair font-semibold">Support</h4>
            <ul className="space-y-2 text-soft-cream/70">
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-earthy-gold transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-soft-cream/20 mt-12 pt-8 text-center">
          <p className="text-soft-cream/60">
            © 2024 NiaWear. All rights reserved. Made with ❤️ for sustainable fashion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
