
import React, { useState } from 'react';
import { ArrowLeft, Heart, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const AfricanDesigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const designs = [
    {
      id: 1,
      name: "Kente Pattern",
      origin: "Ghana",
      image: "/lovable-uploads/75b0a51a-4727-424a-9bf4-c1ab7a5bd92d.png",
      description: "Traditional handwoven cloth with geometric patterns representing various meanings",
      category: "Traditional",
      colors: ["Gold", "Green", "Red"]
    },
    {
      id: 2,
      name: "Ankara Print",
      origin: "West Africa",
      image: "/lovable-uploads/75b0a51a-4727-424a-9bf4-c1ab7a5bd92d.png",
      description: "Vibrant wax print fabric known for its bold patterns and bright colors",
      category: "Contemporary",
      colors: ["Blue", "Orange", "Yellow"]
    },
    {
      id: 3,
      name: "Mudcloth Design",
      origin: "Mali",
      image: "/lovable-uploads/75b0a51a-4727-424a-9bf4-c1ab7a5bd92d.png",
      description: "Handwoven cotton fabric dyed with fermented mud, featuring symbolic patterns",
      category: "Traditional",
      colors: ["Brown", "Cream", "Black"]
    },
    {
      id: 4,
      name: "Dashiki Pattern",
      origin: "Nigeria",
      image: "/lovable-uploads/75b0a51a-4727-424a-9bf4-c1ab7a5bd92d.png",
      description: "Colorful garment with ornate embroidery around the neckline",
      category: "Traditional",
      colors: ["Multi-colored"]
    },
    {
      id: 5,
      name: "Adinkra Symbols",
      origin: "Ghana",
      image: "/lovable-uploads/75b0a51a-4727-424a-9bf4-c1ab7a5bd92d.png",
      description: "Visual symbols representing concepts and wisdom from Akan culture",
      category: "Symbolic",
      colors: ["Black", "White", "Gold"]
    },
    {
      id: 6,
      name: "Shweshwe Print",
      origin: "South Africa",
      image: "/lovable-uploads/75b0a51a-4727-424a-9bf4-c1ab7a5bd92d.png",
      description: "Indigo-printed cotton fabric with intricate geometric patterns",
      category: "Contemporary",
      colors: ["Blue", "White", "Brown"]
    }
  ];

  const categories = ['All', 'Traditional', 'Contemporary', 'Symbolic'];

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || design.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-soft-cream">
      {/* Header */}
      <header className="bg-deep-emerald shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-soft-cream hover:text-earthy-gold">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-playfair font-bold text-soft-cream">African Design Heritage</h1>
            <div className="flex items-center gap-2 text-soft-cream">
              <Heart className="h-5 w-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-charcoal-black mb-4">
            Explore African Design Heritage
          </h2>
          <p className="text-xl text-charcoal-black/70 max-w-3xl mx-auto">
            Discover the rich history and cultural significance of traditional African patterns, 
            prints, and designs from across the continent
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-charcoal-black/50" />
            <Input
              placeholder="Search designs or origins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-deep-emerald/20 focus:border-deep-emerald"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 
                  "bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream" : 
                  "border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-soft-cream"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigns.map((design) => (
            <Card key={design.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={design.image} 
                    alt={design.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-charcoal-black"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Badge 
                    className="absolute top-2 left-2 bg-deep-emerald text-soft-cream"
                  >
                    {design.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg font-playfair text-charcoal-black">
                    {design.name}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs border-warm-terracotta text-warm-terracotta">
                    {design.origin}
                  </Badge>
                </div>
                <CardDescription className="text-charcoal-black/70 mb-4 leading-relaxed">
                  {design.description}
                </CardDescription>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-charcoal-black">Traditional Colors:</div>
                  <div className="flex flex-wrap gap-1">
                    {design.colors.map((color, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDesigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-charcoal-black/70">
              No designs found matching your search criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AfricanDesigns;
