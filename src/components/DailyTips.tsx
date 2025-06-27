import React, { useState } from 'react';
import { Lightbulb, TrendingUp, Sun, Calendar, Phone, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const DailyTips = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const API_URL = 'http://localhost:8000';

  const tips = [
    {
      icon: Sun,
      category: "Weather Style",
      tip: "Layer lightweight fabrics for unpredictable spring weather - a silk blouse under a linen blazer works perfectly!",
      time: "Today"
    },
    {
      icon: TrendingUp,
      category: "Trending Now",
      tip: "Earthy tones are dominating this season. Try incorporating warm terracotta and sage green into your wardrobe.",
      time: "This Week"
    },
    {
      icon: Calendar,
      category: "Occasion Ready",
      tip: "For casual Friday meetings, pair wide-leg trousers with a structured tee and statement jewelry for professional polish.",
      time: "Weekly"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phoneNumber.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    // Basic phone number validation
    const phoneRegex = /^\+\d{10,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number (e.g., +254123456789).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API_URL}/sms/send_sms`, {
        name,
        phone_number: phoneNumber,
      });

      toast({
        title: "Success! 🎉",
        description: response.data.message || `Thanks ${name}! You'll start receiving personalized daily fashion tips on your phone.`,
      });
      
      // Reset form
      setName('');
      setPhoneNumber('');
      setShowForm(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-warm-terracotta font-semibold mb-4">
            <Lightbulb className="h-5 w-5" />
            <span>Daily Fashion Intelligence</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal-black mb-4">
            Your Daily Style Guide
          </h2>
          <p className="text-xl text-charcoal-black/70 max-w-2xl mx-auto">
            Personalized fashion tips and trending insights delivered fresh every day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur border-0 shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-warm-terracotta/10 p-2 rounded-lg group-hover:bg-warm-terracotta/20 transition-colors">
                    <tip.icon className="h-5 w-5 text-warm-terracotta" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold text-warm-terracotta">
                      {tip.category}
                    </CardTitle>
                    <CardDescription className="text-xs text-charcoal-black/50">
                      {tip.time}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-black/80 leading-relaxed mb-4">
                  {tip.tip}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          {!showForm ? (
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black font-semibold px-8 py-3"
            >
              Get Personal Daily Tips
            </Button>
          ) : (
            <Card className="max-w-md mx-auto bg-white/95 backdrop-blur border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-charcoal-black">
                  Get Your Personal Tips
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your details to receive daily fashion tips via SMS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-charcoal-black">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-warm-terracotta/20 focus:border-warm-terracotta"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-charcoal-black">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254123456789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="border-warm-terracotta/20 focus:border-warm-terracotta"
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1 border-charcoal-black/20 text-charcoal-black hover:bg-charcoal-black/5"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black font-semibold"
                    >
                      {isSubmitting ? 'Signing Up...' : 'Start Receiving Tips'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default DailyTips;