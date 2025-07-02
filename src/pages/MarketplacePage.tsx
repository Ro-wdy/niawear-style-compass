import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import CheckoutModal from '@/components/CheckoutModal';

const MarketplacePage = () => {
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [checkoutModal, setCheckoutModal] = useState<{
    isOpen: boolean;
    productId: number | null;
  }>({ isOpen: false, productId: null });
  const { toast } = useToast();

  const products = [
    {
      id: 1,
      name: "Ankara Print Jumpsuit",
      price: 18833,
      image: "/lovable-uploads/7bc4068b-f22d-4c1b-bb00-752a0d184568.png",
      rating: 4.9,
      description: "Stunning strapless jumpsuit with bold African print patterns",
      category: "Jumpsuits"
    },
    {
      id: 2,
      name: "Modern Agbada Set",
      price: 24511,
      image: "/lovable-uploads/81e383f1-e9d0-4ff8-b800-7fff7c41cc45.png",
      rating: 4.8,
      description: "Contemporary black Agbada with white accent stripes",
      category: "Traditional"
    },
    {
      id: 3,
      name: "Kente Print Blazer",
      price: 16767,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      description: "Contemporary blazer with traditional Kente patterns",
      category: "Outerwear"
    },
    {
      id: 4,
      name: "Ankara Midi Dress",
      price: 11607,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      description: "Elegant midi dress with vibrant Ankara prints",
      category: "Dresses"
    },
    {
      id: 5,
      name: "Dashiki Shirt",
      price: 9031,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      description: "Classic dashiki with modern tailoring",
      category: "Shirts"
    },
    {
      id: 6,
      name: "Mudcloth Bag",
      price: 6449,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      description: "Handcrafted bag with traditional mudcloth design",
      category: "Accessories"
    },
    {
      id: 7,
      name: "African Print Kimono",
      price: 12383,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      description: "Flowing kimono with bold African prints",
      category: "Outerwear"
    },
    {
      id: 8,
      name: "Tribal Jewelry Set",
      price: 9803,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      description: "Authentic tribal-inspired necklace and earring set",
      category: "Accessories"
    },
    {
      id: 9,
      name: "Wax Print Palazzo Pants",
      price: 10189,
      image: "https://images.unsplash.com/photo-1544957992-20514f595d6f?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      description: "Wide-leg palazzo pants in authentic African wax print",
      category: "Bottoms"
    },
    {
      id: 10,
      name: "Boubou Traditional Robe",
      price: 21413,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      description: "Elegant traditional Boubou robe with intricate embroidery",
      category: "Traditional"
    }
  ];

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setCheckoutModal({ isOpen: true, productId });
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const closeCheckoutModal = () => {
    setCheckoutModal({ isOpen: false, productId: null });
  };

  const selectedProduct = checkoutModal.productId 
    ? products.find(p => p.id === checkoutModal.productId)
    : null;

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
            <h1 className="text-2xl font-playfair font-bold text-soft-cream">NiaWear Marketplace</h1>
            <div className="flex items-center gap-2 text-soft-cream">
              <ShoppingCart className="h-5 w-5" />
              <span>{getTotalItems()} items</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-charcoal-black mb-4">
            Authentic African Fashion
          </h2>
          <p className="text-xl text-charcoal-black/70">
            Discover our curated collection of contemporary African-inspired clothing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
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
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 text-earthy-gold fill-current" />
                    {product.rating}
                  </div>
                </div>
                <CardTitle className="text-lg font-playfair text-charcoal-black mb-2">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-charcoal-black/60 mb-3">
                  {product.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-deep-emerald">
                    KSh {product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-2">
                    {cart[product.id] ? (
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeFromCart(product.id)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold">{cart[product.id]}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => addToCart(product.id)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => addToCart(product.id)}
                        className="bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream"
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <CheckoutModal
        isOpen={checkoutModal.isOpen}
        onClose={closeCheckoutModal}
        productName={selectedProduct?.name || ''}
        productPrice={selectedProduct?.price || 0}
        productImage={selectedProduct?.image || ''}
      />
    </div>
  );
};

export default MarketplacePage;
