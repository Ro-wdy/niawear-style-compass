
import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useShoppingContext } from '@/contexts/ShoppingContext';
import CheckoutModal from './CheckoutModal';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useShoppingContext();
  const [checkoutModal, setCheckoutModal] = React.useState<{
    isOpen: boolean;
    productId: number | null;
  }>({ isOpen: false, productId: null });

  const handleCheckout = (productId: number) => {
    setCheckoutModal({ isOpen: true, productId });
  };

  const closeCheckoutModal = () => {
    setCheckoutModal({ isOpen: false, productId: null });
  };

  const selectedProduct = checkoutModal.productId 
    ? cart.find(p => p.id === checkoutModal.productId)
    : null;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="absolute top-12 right-0 z-50 w-80">
        <Card className="shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-playfair flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Cart ({cart.length})
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Your cart is empty</p>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 border rounded-lg">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-deep-emerald font-bold">${item.price}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        onClick={() => handleCheckout(item.id)}
                        className="bg-deep-emerald hover:bg-deep-emerald/90 text-xs"
                      >
                        Checkout
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <CheckoutModal
        isOpen={checkoutModal.isOpen}
        onClose={closeCheckoutModal}
        productName={selectedProduct?.name || ''}
        productPrice={selectedProduct?.price || 0}
        productImage={selectedProduct?.image || ''}
      />
    </>
  );
};

export default CartDropdown;
