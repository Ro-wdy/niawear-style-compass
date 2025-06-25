
import React from 'react';
import { MapPin, Heart, Star, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const markets = [
    {
      name: "Vintage Treasures Co.",
      location: "Downtown District",
      distance: "0.8 miles",
      rating: 4.8,
      specialty: "Vintage Dresses",
      price: "$$",
      description: "Curated collection of 60s-90s vintage pieces with authentic designer finds."
    },
    {
      name: "EcoStyle Exchange",
      location: "Green Valley",
      distance: "1.2 miles",
      rating: 4.9,
      specialty: "Sustainable Fashion",
      price: "$",
      description: "Eco-friendly secondhand clothing with a focus on ethical brands."
    },
    {
      name: "Urban Thrift Market",
      location: "Arts Quarter",
      distance: "2.1 miles",
      rating: 4.6,
      specialty: "Streetwear",
      price: "$",
      description: "Modern streetwear and contemporary pieces at affordable prices."
    }
  ];

  return (
    <section id="marketplace" className="py-20 bg-soft-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-deep-emerald font-semibold mb-4">
            <MapPin className="h-5 w-5" />
            <span>Sustainable Shopping</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal-black mb-4">
            Local Secondhand
            <span className="gradient-text block">Marketplace</span>
          </h2>
          <p className="text-xl text-charcoal-black/70 max-w-3xl mx-auto">
            Discover nearby secondhand stores and vintage boutiques in your area. 
            Fashion that's kind to your wallet and the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {markets.map((market, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur border-0 shadow-lg animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <CardTitle className="text-lg font-playfair text-charcoal-black group-hover:text-deep-emerald transition-colors">
                      {market.name}
                    </CardTitle>
                    <CardDescription className="text-charcoal-black/60 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {market.location} • {market.distance}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="text-charcoal-black/40 hover:text-warm-terracotta">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 text-sm text-charcoal-black/70">
                    <Star className="h-4 w-4 text-earthy-gold fill-current" />
                    {market.rating}
                  </div>
                  <Badge variant="secondary" className="text-xs bg-deep-emerald/10 text-deep-emerald">
                    {market.specialty}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-warm-terracotta text-warm-terracotta">
                    {market.price}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-charcoal-black/70 mb-4 leading-relaxed">
                  {market.description}
                </p>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream text-sm">
                    Visit Store
                  </Button>
                  <Button variant="outline" size="icon" className="border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-soft-cream">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Link to="/marketplace">
            <Button className="bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black font-semibold px-8 py-3">
              Visit NiaWear Marketplace
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
