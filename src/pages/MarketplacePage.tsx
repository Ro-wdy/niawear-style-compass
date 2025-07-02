import React, { useState } from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useShoppingContext } from '@/contexts/ShoppingContext';
import { useToast } from '@/hooks/use-toast';
import CheckoutModal from '@/components/CheckoutModal';

const MarketplacePage = () => {
  const { addToCart, addToWishlist, isInWishlist } = useShoppingContext();
  const { toast } = useToast();
  const [checkoutModal, setCheckoutModal] = useState<{
    isOpen: boolean;
    product: any;
  }>({ isOpen: false, product: null });

  const products = [
    {
      id: 1,
      name: "African Print Dress",
      price: 6450,
      image: "/lovable-uploads/2cb8f323-cb3a-4dae-9804-9544ad9b87e0.png",
      rating: 4.8,
      description: "Beautiful traditional African print dress"
    },
    {
      id: 2,
      name: "Kitenge Skirt",
      price: 4200,
      image: "/lovable-uploads/3a99a999-5550-44c9-a94f-58551c9a1909.png",
      rating: 4.5,
      description: "Vibrant Kitenge skirt with modern design"
    },
    {
      id: 3,
      name: "Maasai Beaded Necklace",
      price: 2800,
      image: "/lovable-uploads/51894299-9191-481d-a635-56919001a444.png",
      rating: 4.7,
      description: "Handmade Maasai beaded necklace"
    },
    {
      id: 4,
      name: "Dashiki Top",
      price: 5100,
      image: "/lovable-uploads/6457f699-1c69-4b6d-b03b-59054489516d.png",
      rating: 4.6,
      description: "Stylish Dashiki top for any occasion"
    },
    {
      id: 5,
      name: "Kanzu Robe",
      price: 7500,
      image: "/lovable-uploads/711b9932-3b9f-4961-894a-147997379989.png",
      rating: 4.9,
      description: "Elegant Kanzu robe for men"
    },
    {
      id: 6,
      name: "Ankara Pants",
      price: 4800,
      image: "/lovable-uploads/81254097-5999-4a9a-8591-99594912495d.png",
      rating: 4.4,
      description: "Trendy Ankara print pants"
    },
    {
      id: 7,
      name: "African Headwrap",
      price: 1500,
      image: "/lovable-uploads/92909111-4444-4561-8911-594ca5ec179e.png",
      rating: 4.3,
      description: "Colorful African headwrap"
    },
    {
      id: 8,
      name: "Shuka Blanket",
      price: 3200,
      image: "/lovable-uploads/a1979999-555f-4741-864b-22a992258a99.png",
      rating: 4.8,
      description: "Warm and cozy Shuka blanket"
    },
    {
      id: 9,
      name: " Maasai Sandals",
      price: 2100,
      image: "/lovable-uploads/b213c444-4444-4444-8888-444444444444.png",
      rating: 4.2,
      description: "Handcrafted Maasai sandals"
    },
    {
      id: 10,
      name: "Kikoi Wrap",
      price: 2500,
      image: "/lovable-uploads/c3456789-9876-5432-1010-212121212121.png",
      rating: 4.6,
      description: "Versatile Kikoi wrap for beach or casual wear"
    }
  ];

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (product: any) => {
    addToWishlist(product);
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleCheckout = (product: any) => {
    setCheckoutModal({ isOpen: true, product });
  };

  const closeCheckoutModal = () => {
    setCheckoutModal({ isOpen: false, product: null });
  };

  return (
    <div className="min-h-screen bg-soft-cream">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-charcoal-black mb-4">
            Marketplace
          </h1>
          <p className="text-xl text-charcoal-black/70">
            Discover unique fashion pieces from talented designers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-playfair font-semibold text-lg mb-2 text-charcoal-black">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-earthy-gold text-earthy-gold' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-charcoal-black/70 ml-1">
                    ({product.rating})
                  </span>
                </div>
                <p className="text-2xl font-bold text-deep-emerald mb-4">
                  KSh {product.price.toLocaleString()}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddToWishlist(product)}
                    className={`${
                      isInWishlist(product.id) 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : 'border-charcoal-black/20 text-charcoal-black hover:bg-charcoal-black/5'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleCheckout(product)}
                  className="w-full mt-2 bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black"
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />

      <CheckoutModal
        isOpen={checkoutModal.isOpen}
        onClose={closeCheckoutModal}
        productName={checkoutModal.product?.name || ''}
        productPrice={checkoutModal.product?.price || 0}
        productImage={checkoutModal.product?.image || ''}
      />
    </div>
  );
};

export default MarketplacePage;
