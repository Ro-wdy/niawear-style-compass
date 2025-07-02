
import React, { useState } from 'react';
import { X, Phone, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
  productImage: string;
}

const CheckoutModal = ({ isOpen, onClose, productName, productPrice, productImage }: CheckoutModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your M-Pesa phone number to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid M-Pesa phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Initiated",
        description: `M-Pesa payment request sent to ${phoneNumber}. Please check your phone to complete the transaction.`,
      });
      onClose();
      setPhoneNumber('');
    }, 2000);
  };

  const handleCancel = () => {
    setPhoneNumber('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-deep-emerald" />
            <CardTitle className="text-lg font-playfair">Checkout</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-soft-cream rounded-lg">
            <img 
              src={productImage} 
              alt={productName}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-charcoal-black">{productName}</h3>
              <p className="text-xl font-bold text-deep-emerald">${productPrice}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-charcoal-black">
              M-Pesa Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-charcoal-black/50" />
              <Input
                id="phone"
                type="tel"
                placeholder="e.g., 0712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10 border-deep-emerald/20 focus:border-deep-emerald"
              />
            </div>
            <CardDescription className="text-xs">
              Enter your M-Pesa registered phone number to receive payment prompt
            </CardDescription>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 border-charcoal-black/20 text-charcoal-black hover:bg-charcoal-black/5"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCheckout}
              className="flex-1 bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutModal;
