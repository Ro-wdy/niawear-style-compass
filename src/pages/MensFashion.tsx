
import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const MensFashion = () => {
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const { toast } = useToast();

  const mensProducts = [
    {
      id: 1,
      name: "Classic Suit",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      description: "Elegant two-piece suit perfect for business and formal events"
    },
    {
      id: 2,
      name: "Casual Shirt",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      description: "Comfortable cotton shirt ideal for everyday wear"
    },
    {
      id: 3,
      name: "Denim Jeans",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1542272454315-7ad9f9b2b9fb?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      description: "Premium denim jeans with modern fit and style"
    },
    {
      id: 4,
      name: "Leather Jacket",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      description: "Genuine leather jacket with classic design"
    }
  ];

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
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
      <header className="bg-deep-emerald shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-soft-cream hover:text-earthy-gold">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-playfair font-bold text-soft-cream">Men's Fashion</h1>
            <div className="flex items-center gap-2 text-soft-cream">
              <ShoppingCart className="h-5 w-5" />
              <span>{getTotalItems()} items</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-charcoal-black mb-4">
            Men's Fashion Collection
          </h2>
          <p className="text-xl text-charcoal-black/70">
            Discover sophisticated and modern clothing for the contemporary man
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mensProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-charcoal-black"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg font-playfair text-charcoal-black">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 text-earthy-gold fill-current" />
                    {product.rating}
                  </div>
                </div>
                <CardDescription className="text-charcoal-black/60 mb-3">
                  {product.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-deep-emerald">
                    ${product.price}
                  </span>
                  <Button 
                    onClick={() => addToCart(product.id)}
                    className="bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream"
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MensFashion;
