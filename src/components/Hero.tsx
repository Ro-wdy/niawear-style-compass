
import React from 'react';
import { Camera, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
              </h1>
              
              <p className="text-xl text-charcoal-black/80 max-w-lg leading-relaxed">
                Transform your wardrobe with AI-powered styling. Take photos, get instant outfit matching, 
                and discover sustainable fashion that reflects your unique style and values.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black font-semibold px-8 py-3 text-lg group">
                Start Styling Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" className="border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-soft-cream px-8 py-3 text-lg">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-deep-emerald">50K+</div>
                <div className="text-sm text-charcoal-black/60">Outfits Styled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-deep-emerald">98%</div>
                <div className="text-sm text-charcoal-black/60">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-deep-emerald">2M+</div>
                <div className="text-sm text-charcoal-black/60">Style Matches</div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div className="relative animate-scale-in">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto">
              {/* Phone Mockup */}
              <div className="bg-gradient-to-br from-deep-emerald to-warm-terracotta p-6 rounded-2xl text-center">
                <div className="bg-soft-cream rounded-xl p-6 mb-4">
                  <Camera className="h-12 w-12 text-deep-emerald mx-auto mb-3" />
                  <h3 className="font-playfair font-semibold text-charcoal-black mb-2">
                    Snap Your Style
                  </h3>
                  <p className="text-sm text-charcoal-black/70">
                    Take a photo of any clothing item
                  </p>
                </div>
                
                <div className="bg-soft-cream rounded-xl p-6 mb-4">
                  <Sparkles className="h-12 w-12 text-warm-terracotta mx-auto mb-3" />
                  <h3 className="font-playfair font-semibold text-charcoal-black mb-2">
                    AI Magic
                  </h3>
                  <p className="text-sm text-charcoal-black/70">
                    Get instant styling suggestions
                  </p>
                </div>
                
                <Button className="w-full bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black font-semibold">
                  Try It Now
                </Button>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-warm-terracotta text-soft-cream p-3 rounded-full shadow-lg animate-bounce">
                <Heart className="h-5 w-5" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-deep-emerald text-soft-cream p-3 rounded-full shadow-lg animate-pulse">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
