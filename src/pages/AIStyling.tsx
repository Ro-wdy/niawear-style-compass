
import React, { useState } from 'react';
import { ArrowLeft, Camera, Upload, MessageSquare, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const AIStyling = () => {
  const [selectedOption, setSelectedOption] = useState<'photo' | 'describe' | null>(null);
  const [description, setDescription] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const { toast } = useToast();

  const API_URL = 'http://localhost:8000'; // Replace with your FastAPI URL
  const MAX_PHOTOS = 3;

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (uploadedPhotos.length + files.length > MAX_PHOTOS) {
      toast({
        title: 'Too many photos',
        description: `You can only upload up to ${MAX_PHOTOS} photos.`,
        variant: 'destructive',
      });
      return;
    }

    const validFiles = files.filter(file => {
      const isValid = file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024; // 10MB limit
      if (!isValid) {
        toast({
          title: 'Invalid file',
          description: 'Please upload image files under 10MB.',
          variant: 'destructive',
        });
      }
      return isValid;
    });

    setUploadedPhotos(prev => [...prev, ...validFiles]);
    
    if (validFiles.length > 0) {
      toast({
        title: 'Photos uploaded',
        description: `${validFiles.length} photo(s) added successfully.`,
      });
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleGetRecommendations = async () => {
    if (uploadedPhotos.length === 0) {
      toast({
        title: 'No photos uploaded',
        description: 'Please upload at least one photo to get recommendations.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      uploadedPhotos.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      const response = await axios.post(`${API_URL}/ai/upload-photos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setRecommendations(response.data.data);
      toast({
        title: 'Photos Analyzed!',
        description: 'Your outfit recommendations are ready.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze photos. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDescriptionSubmit = async () => {
    if (!description.trim()) {
      toast({
        title: 'Description Required',
        description: 'Please describe what you want to wear.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await axios.post(`${API_URL}/describe-style/`, {
        description,
        occasion: null,
        preferred_colors: [],
      });

      setRecommendations(response.data.data);
      toast({
        title: 'Styling Complete!',
        description: 'Your personalized outfit recommendations are ready.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process description. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
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
                  Upload up to 3 photos of your current outfit or wardrobe items and get instant AI-powered styling suggestions
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
                  {selectedOption === 'photo' ? 'Upload Your Photos' : 'Describe Your Style'}
                </CardTitle>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedOption(null);
                    setUploadedPhotos([]);
                    setRecommendations(null);
                  }}
                >
                  Back
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedOption === 'photo' ? (
                <div className="space-y-4">
                  <Label htmlFor="photo" className="text-charcoal-black">
                    Upload up to {MAX_PHOTOS} photos of your outfit or wardrobe items
                  </Label>
                  
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-deep-emerald/30 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-deep-emerald/50 mx-auto mb-4" />
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                      disabled={uploadedPhotos.length >= MAX_PHOTOS}
                    />
                    <Label htmlFor="photo" className="cursor-pointer">
                      <Button 
                        asChild 
                        className="bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream"
                        disabled={uploadedPhotos.length >= MAX_PHOTOS}
                      >
                        <span>Choose Photos ({uploadedPhotos.length}/{MAX_PHOTOS})</span>
                      </Button>
                    </Label>
                    <p className="text-sm text-charcoal-black/60 mt-2">
                      Support JPG, PNG files up to 10MB each
                    </p>
                  </div>

                  {/* Uploaded Photos Preview */}
                  {uploadedPhotos.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-charcoal-black">Uploaded Photos:</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {uploadedPhotos.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 hover:bg-red-600 text-white rounded-full"
                              onClick={() => removePhoto(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommend Styling Button */}
                  {uploadedPhotos.length > 0 && (
                    <Button 
                      onClick={handleGetRecommendations}
                      disabled={isAnalyzing}
                      className="w-full bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream"
                    >
                      {isAnalyzing ? 'Analyzing Photos...' : 'Recommend Styling'}
                    </Button>
                  )}
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

              {recommendations && (
                <div className="mt-6 p-4 bg-deep-emerald/10 rounded-lg">
                  <h3 className="text-lg font-playfair text-charcoal-black mb-2">Recommendations</h3>
                  <p className="text-charcoal-black/70">
                    {selectedOption === 'photo'
                      ? `Clothing: ${recommendations.clothing_type}. ${recommendations.style_suggestion}`
                      : recommendations.style_suggestion}
                  </p>
                  {recommendations.weather && (
                    <p className="text-charcoal-black/70 mt-2">
                      Weather: {recommendations.weather.temperature}°C, {recommendations.weather.condition}
                    </p>
                  )}
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
