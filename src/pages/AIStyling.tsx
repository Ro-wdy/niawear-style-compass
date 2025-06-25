
import React, { useState } from 'react';
import { ArrowLeft, Camera, Upload, MessageSquare, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AIStyling = () => {
  const [selectedOption, setSelectedOption] = useState<'photo' | 'describe' | null>(null);
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        toast({
          title: "Photo Analyzed!",
          description: "We've analyzed your outfit and generated style recommendations.",
        });
      }, 2000);
    }
  };

  const handleDescriptionSubmit = () => {
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe what you want to wear.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Styling Complete!",
        description: "We've created personalized outfit recommendations based on your description.",
      });
    }, 2000);
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
            <h1 className="text-2xl font-playfair font-bold text-soft-cream">AI Style Assistant</h1>
            <div className="flex items-center gap-2 text-soft-cream">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-charcoal-black mb-4">
            Your Personal Style Assistant
          </h2>
          <p className="text-xl text-charcoal-black/70">
            Get personalized outfit recommendations using AI technology
          </p>
        </div>

        {!selectedOption ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              onClick={() => setSelectedOption('photo')}
            >
              <CardHeader className="text-center">
                <div className="bg-deep-emerald/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-deep-emerald" />
                </div>
                <CardTitle className="text-xl font-playfair text-charcoal-black">
                  Take a Photo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-charcoal-black/70 leading-relaxed">
                  Upload a photo of your current outfit or wardrobe items and get instant AI-powered styling suggestions
                </CardDescription>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              onClick={() => setSelectedOption('describe')}
            >
              <CardHeader className="text-center">
                <div className="bg-warm-terracotta/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-warm-terracotta" />
                </div>
                <CardTitle className="text-xl font-playfair text-charcoal-black">
                  Describe Your Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-charcoal-black/70 leading-relaxed">
                  Tell us about the occasion, your preferences, or describe what you want to wear
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-playfair text-charcoal-black">
                  {selectedOption === 'photo' ? 'Upload Your Photo' : 'Describe Your Style'}
                </CardTitle>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedOption(null)}
                >
                  Back
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedOption === 'photo' ? (
                <div className="space-y-4">
                  <Label htmlFor="photo" className="text-charcoal-black">
                    Choose a photo of your outfit or wardrobe items
                  </Label>
                  <div className="border-2 border-dashed border-deep-emerald/30 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-deep-emerald/50 mx-auto mb-4" />
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Label htmlFor="photo" className="cursor-pointer">
                      <Button asChild className="bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream">
                        <span>Choose Photo</span>
                      </Button>
                    </Label>
                    <p className="text-sm text-charcoal-black/60 mt-2">
                      Support JPG, PNG files up to 10MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Label htmlFor="description" className="text-charcoal-black">
                    Describe what you want to wear or the occasion
                  </Label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-32 p-4 border border-deep-emerald/20 rounded-lg focus:border-deep-emerald focus:outline-none resize-none"
                    placeholder="e.g., I have a business meeting tomorrow and want something professional but stylish. I prefer earth tones and have a blazer I'd like to incorporate..."
                  />
                  <Button 
                    onClick={handleDescriptionSubmit}
                    disabled={isAnalyzing}
                    className="w-full bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Get Style Recommendations'}
                  </Button>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-emerald mx-auto mb-4"></div>
                  <p className="text-charcoal-black/70">
                    Our AI is analyzing your request and creating personalized recommendations...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AIStyling;
