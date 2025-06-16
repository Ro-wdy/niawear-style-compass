
import React from 'react';
import { Camera, Sparkles, ShoppingBag, Users, MapPin, Lightbulb, Palette, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "Photo Matching",
      description: "Take photos of your clothes and get instant styling suggestions with AI-powered outfit matching.",
      color: "text-deep-emerald"
    },
    {
      icon: Palette,
      title: "African Design Library",
      description: "Access thousands of authentic African prints, patterns, and traditional outfit designs from across the continent.",
      color: "text-warm-terracotta"
    },
    {
      icon: Sparkles,
      title: "AI Style Assistant",
      description: "Get personalized outfit recommendations based on your preferences, body type, and cultural style preferences.",
      color: "text-deep-emerald"
    },
    {
      icon: Globe,
      title: "Cultural Context",
      description: "Learn about the history and cultural significance of African prints and traditional garments while styling.",
      color: "text-warm-terracotta"
    },
    {
      icon: Users,
      title: "Gender Inclusive",
      description: "Tailored styling experiences for all genders with inclusive African and contemporary fashion recommendations.",
      color: "text-deep-emerald"
    },
    {
      icon: MapPin,
      title: "Secondhand Markets",
      description: "Discover local secondhand and vintage stores for sustainable African-inspired and contemporary fashion finds.",
      color: "text-warm-terracotta"
    }
  ];

  return (
    <section id="features" className="section-gradient py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal-black mb-4">
            Fashion Intelligence
            <span className="gradient-text block">meets African Heritage</span>
          </h2>
          <p className="text-xl text-charcoal-black/70 max-w-3xl mx-auto">
            Experience the future of fashion with our comprehensive suite of AI-powered styling tools 
            that celebrate African design heritage while making sustainable fashion accessible and personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur border-0 shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-12 w-12" />
                </div>
                <CardTitle className="text-xl font-playfair text-charcoal-black group-hover:text-deep-emerald transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-charcoal-black/70 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
