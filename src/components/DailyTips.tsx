
import React from 'react';
import { Lightbulb, TrendingUp, Sun, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DailyTips = () => {
  const tips = [
    {
      icon: Sun,
      category: "Weather Style",
      tip: "Layer lightweight fabrics for unpredictable spring weather - a silk blouse under a linen blazer works perfectly!",
      time: "Today"
    },
    {
      icon: TrendingUp,
      category: "Trending Now",
      tip: "Earthy tones are dominating this season. Try incorporating warm terracotta and sage green into your wardrobe.",
      time: "This Week"
    },
    {
      icon: Calendar,
      category: "Occasion Ready",
      tip: "For casual Friday meetings, pair wide-leg trousers with a structured tee and statement jewelry for professional polish.",
      time: "Weekly"
    }
  ];

  return (
    <section className="py-20 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-warm-terracotta font-semibold mb-4">
            <Lightbulb className="h-5 w-5" />
            <span>Daily Fashion Intelligence</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal-black mb-4">
            Your Daily Style Guide
          </h2>
          <p className="text-xl text-charcoal-black/70 max-w-2xl mx-auto">
            Personalized fashion tips and trending insights delivered fresh every day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur border-0 shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-warm-terracotta/10 p-2 rounded-lg group-hover:bg-warm-terracotta/20 transition-colors">
                    <tip.icon className="h-5 w-5 text-warm-terracotta" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold text-warm-terracotta">
                      {tip.category}
                    </CardTitle>
                    <CardDescription className="text-xs text-charcoal-black/50">
                      {tip.time}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-black/80 leading-relaxed mb-4">
                  {tip.tip}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Button className="bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black font-semibold px-8 py-3">
            Get Personal Daily Tips
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DailyTips;
