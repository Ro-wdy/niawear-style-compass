import React from 'react';
import { Camera, Sparkles, Heart, ArrowRight, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-gradient min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-warm-terracotta font-semibold">
                <Heart className="h-5 w-5" />
                <span>Fashion Meets Purpose</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-charcoal-black leading-tight">
                Style with
                <span className="gradient-text block">
                  Intelligence
                </span>
                <span className="text-3xl md:text-4xl lg:text-5xl block mt-2 text-warm-terracotta">
                  & African Heritage
                </span>
              </h1>
              
              <p className="text-xl text-charcoal-black/80 max-w-lg leading-relaxed">
                Transform your wardrobe with AI-powered styling and authentic African outfit designs. 
                Take photos, get instant outfit matching, and discover sustainable fashion that reflects 
                your unique style, cultural heritage, and values.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/ai-styling">
                <Button className="bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black font-semibold px-8 py-3 text-lg group">
                  Start Styling Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/african-designs">
                <Button variant="outline" className="border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-soft-cream px-8 py-3 text-lg">
                  Explore African Designs
                </Button>
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-deep-emerald">50K+</div>
                <div className="text-sm text-charcoal-black/60">Outfits Styled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-deep-emerald">15K+</div>
                <div className="text-sm text-charcoal-black/60">African Designs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-deep-emerald">98%</div>
                <div className="text-sm text-charcoal-black/60">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Contemporary African Fashion */}
          <div className="relative animate-scale-in">
            <div className="relative">
              {/* Main Contemporary African Fashion Image */}
              <div className="bg-gradient-to-br from-deep-emerald to-warm-terracotta p-4 rounded-3xl shadow-2xl">
                <img 
                  src="/lovable-uploads/75b0a51a-4727-424a-9bf4-c1ab7a5bd92d.png" 
                  alt="Contemporary African-inspired fashion - stylish couple in modern yellow outfits"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Floating Design Elements */}
              <div className="absolute -top-4 -right-4 bg-warm-terracotta text-soft-cream p-3 rounded-full shadow-lg animate-bounce">
                <Heart className="h-5 w-5" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-deep-emerald text-soft-cream p-3 rounded-full shadow-lg animate-pulse">
                <Palette className="h-5 w-5" />
              </div>

              {/* Contemporary Style Overlay */}
              <div className="absolute top-8 left-8 bg-soft-cream/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
                <div className="text-sm font-semibold text-charcoal-black">Modern African Style</div>
                <div className="text-xs text-charcoal-black/70">Contemporary Fashion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
