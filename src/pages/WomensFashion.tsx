import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import CheckoutModal from '@/components/CheckoutModal';

const WomensFashion = () => {
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [checkoutModal, setCheckoutModal] = useState<{
    isOpen: boolean;
    productId: number | null;
  }>({ isOpen: false, productId: null });
  const { toast } = useToast();

  const womensProducts = [
    {
      id: 1,
      name: "Floral Maxi Dress",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      description: "Elegant flowing maxi dress with beautiful floral patterns"
    },
    {
      id: 2,
      name: "Chic Blazer Set",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      description: "Professional blazer and skirt set perfect for business"
    },
    {
      id: 3,
      name: "Casual Summer Top",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1544957992-20514f595d6f?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      description: "Comfortable and stylish summer blouse"
    },
    {
      id: 4,
      name: "Evening Gown",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1566479179817-c7e1e5d7a5b9?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      description: "Stunning evening gown for special occasions"
    }
  ];

  const addToCart = (productId: number) => {
    const product = womensProducts.find(p => p.id === productId);
    if (product) {
      setCheckoutModal({ isOpen: true, productId });
    }
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const closeCheckoutModal = () => {
    setCheckoutModal({ isOpen: false, productId: null });
  };

  const selectedProduct = checkoutModal.productId 
    ? womensProducts.find(p => p.id === checkoutModal.productId)
    : null;

  return (
    <div className="min-h-screen bg-soft-cream">
      <header className="bg-deep-emerald shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-soft-cream hover:text-earthy-gold">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-playfair font-bold text-soft-cream">Women's Fashion</h1>
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
            Women's Fashion Collection
          </h2>
          <p className="text-xl text-charcoal-black/70">
            Discover elegant and stylish clothing designed for the modern woman
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {womensProducts.map((product) => (
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

export default WomensFashion;
