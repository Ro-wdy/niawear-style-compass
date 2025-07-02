import React, { useState } from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useShoppingContext } from '@/contexts/ShoppingContext';
import { useToast } from '@/hooks/use-toast';
import CheckoutModal from '@/components/CheckoutModal';

const AfricanDesigns = () => {
  const { addToCart, addToWishlist, isInWishlist } = useShoppingContext();
  const { toast } = useToast();
  const [checkoutModal, setCheckoutModal] = useState<{
    isOpen: boolean;
    product: any;
  }>({ isOpen: false, product: null });

  const products = [
    {
      id: 1,
      name: "Kente Dress",
      price: 7740,
      image: "/lovable-uploads/2cb8f323-cb3a-4dae-9804-9544ad9b87e0.png",
      rating: 4.9,
      description: "Authentic Kente pattern dress"
    },
    {
      id: 2,
      name: "Kitenge Skirt",
      price: 4320,
      image: "/lovable-uploads/3a969995-a969-439c-b37a-935c991a5991.png",
      rating: 4.6,
      description: "Vibrant Kitenge fabric skirt"
    },
    {
      id: 3,
      name: "Ankara Top",
      price: 3210,
      image: "/lovable-uploads/4199999a-8571-4c4f-81a6-369895936993.png",
      rating: 4.7,
      description: "Stylish Ankara print top"
    },
    {
      id: 4,
      name: "Maasai Beaded Necklace",
      price: 2100,
      image: "/lovable-uploads/54999a99-9a9a-4a9a-aa9a-9a9a9a9a9a9a.png",
      rating: 4.5,
      description: "Handmade Maasai beaded necklace"
    },
    {
      id: 5,
      name: "Zulu Beaded Bracelet",
      price: 1680,
      image: "/lovable-uploads/66666666-6666-4666-b666-666666666666.png",
      rating: 4.4,
      description: "Traditional Zulu beaded bracelet"
    },
    {
      id: 6,
      name: "Ethiopian Cross Pendant",
      price: 2620,
      image: "/lovable-uploads/77777777-7777-4777-b777-777777777777.png",
      rating: 4.8,
      description: "Elegant Ethiopian silver cross pendant"
    },
    {
      id: 7,
      name: "Ghanaian Kente Stole",
      price: 5390,
      image: "/lovable-uploads/88888888-8888-4888-b888-888888888888.png",
      rating: 4.9,
      description: "Colorful Ghanaian Kente stole"
    },
    {
      id: 8,
      name: "Nigerian Gele Headwrap",
      price: 1890,
      image: "/lovable-uploads/99999999-9999-4999-b999-999999999999.png",
      rating: 4.6,
      description: "Stylish Nigerian Gele headwrap"
    },
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
            African Designs
          </h1>
          <p className="text-xl text-charcoal-black/70">
            Authentic African fashion celebrating heritage and style
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

export default AfricanDesigns;
