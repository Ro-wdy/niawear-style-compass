
import React, { useState } from 'react';
import { ArrowLeft, Heart, Search, Filter, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const AfricanDesigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const { toast } = useToast();

  const designs = [
    {
      id: 1,
      name: "Contemporary Yellow Tracksuit",
      origin: "Modern Africa",
      image: "/lovable-uploads/fef49afa-b6ba-4afc-9ba3-351cf36508b8.png",
      description: "Modern African-inspired yellow tracksuit with geometric print details",
      category: "Contemporary",
      colors: ["Yellow", "Navy", "White"],
      price: 89.99
    },
    {
      id: 2,
      name: "Ankara Kimono Coat",
      origin: "West Africa",
      image: "/lovable-uploads/76a451a9-71e2-4139-8bb5-beca9dfc5f74.png",
      description: "Elegant flowing kimono-style coat with traditional Ankara print patterns",
      category: "Contemporary",
      colors: ["Orange", "Gold", "Black", "Red"],
      price: 129.99
    },
    {
      id: 3,
      name: "African Print Gown",
      origin: "Central Africa",
      image: "/lovable-uploads/2cb8f323-cb3a-4dae-9804-9544ad9b87e0.png",
      description: "Stunning off-shoulder ball gown with circular African print motifs",
      category: "Traditional",
      colors: ["Orange", "Black", "White", "Gold"],
      price: 149.99
    },
    {
      id: 4,
      name: "Mudcloth Bucket Hats",
      origin: "Mali",
      image: "/lovable-uploads/5c827bd6-5816-4a96-a547-9625a1926c0f.png",
      description: "Traditional mudcloth-inspired bucket hats with symbolic patterns",
      category: "Accessories",
      colors: ["Black", "White", "Orange"],
      price: 24.99
    },
    {
      id: 5,
      name: "Kente Print Backpack",
      origin: "Ghana",
      image: "/lovable-uploads/b3730133-85a4-46d1-abce-100bcd544c84.png",
      description: "Practical crossbody bag featuring vibrant Kente-inspired patterns",
      category: "Accessories",
      colors: ["Yellow", "Green", "Red", "Black"],
      price: 45.99
    },
    {
      id: 6,
      name: "Ankara Print Slides",
      origin: "Nigeria",
      image: "/lovable-uploads/e6538ac0-42ec-48dd-ba3f-f153d27427b7.png",
      description: "Comfortable slides featuring mixed African print patterns",
      category: "Footwear",
      colors: ["Yellow", "Black", "White"],
      price: 32.99
    },
    {
      id: 7,
      name: "Kente Accessories Set",
      origin: "Ghana",
      image: "/lovable-uploads/8ee99d7d-f688-41bd-b808-8853ff69bf17.png",
      description: "Complete summer set with Kente-print hat, bag, and sandals",
      category: "Accessories",
      colors: ["Multi-colored", "Gold", "Blue", "Green"],
      price: 79.99
    },
    {
      id: 8,
      name: "Kente Pattern",
      origin: "Ghana",
      image: "/lovable-uploads/75b0a51a-4727-424a-9bf4-c1ab7a5bd92d.png",
      description: "Traditional handwoven cloth with geometric patterns representing various meanings",
      category: "Traditional",
      colors: ["Gold", "Green", "Red"],
      price: 65.99
    },
    {
      id: 9,
      name: "Adinkra Symbols",
      origin: "Ghana",
      image: "/lovable-uploads/75b0a51a-4727-424a-9bf4-c1ab7a5bd92d.png",
      description: "Visual symbols representing concepts and wisdom from Akan culture",
      category: "Symbolic",
      colors: ["Black", "White", "Gold"],
      price: 35.99
    },
    {
      id: 10,
      name: "Dashiki Pattern",
      origin: "Nigeria",
      image: "/lovable-uploads/75b0a51a-4727-424a-9bf4-c1ab7a5bd92d.png",
      description: "Colorful garment with ornate embroidery around the neckline",
      category: "Traditional",
      colors: ["Multi-colored"],
      price: 55.99
    }
  ];

  const categories = ['All', 'Traditional', 'Contemporary', 'Symbolic', 'Accessories', 'Footwear'];

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || design.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (designId: number) => {
    setCart(prev => ({
      ...prev,
      [designId]: (prev[designId] || 0) + 1
    }));
    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart successfully!",
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

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
            <div className="flex items-center gap-4 text-soft-cream">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span>{getTotalItems()} items</span>
              </div>
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
          <div className="flex gap-2 flex-wrap">
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
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-charcoal-black">Traditional Colors:</div>
                  <div className="flex flex-wrap gap-1">
                    {design.colors.map((color, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {color}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-2xl font-bold text-deep-emerald">
                      ${design.price}
                    </span>
                    <Button 
                      onClick={() => addToCart(design.id)}
                      className="bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
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
