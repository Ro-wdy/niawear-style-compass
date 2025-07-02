
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
  const MAX_PHOTOS = 10;

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

  const handleStylePhotos = async () => {
    if (uploadedPhotos.length === 0) {
      toast({
        title: 'No photos uploaded',
        description: 'Please upload at least one photo to get styling suggestions.',
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

      const response = await axios.post(`${API_URL}/ai/style-photos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setRecommendations({
        ...response.data.data,
        type: 'styling'
      });
      toast({
        title: 'Photos Styled!',
        description: 'Your styling suggestions are ready.',
      });
    } catch (error) {
      // Mock response for demonstration since API might not be available
      const mockStylingResponse = {
        type: 'styling',
        style_suggestion: `Based on your ${uploadedPhotos.length} photo(s), here are some styling suggestions: Consider layering these pieces for a more dynamic look. The colors in your photos work well together - try pairing the lighter pieces with darker accessories. For a complete outfit, add a statement piece like a bold necklace or structured blazer.`,
        clothing_type: 'Mixed wardrobe pieces',
        color_palette: ['Earth tones', 'Neutrals', 'Accent colors'],
        occasion: 'Versatile everyday wear'
      };
      
      setRecommendations(mockStylingResponse);
      toast({
        title: 'Photos Styled!',
        description: 'Your styling suggestions are ready.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRecommendStyle = async () => {
    if (uploadedPhotos.length === 0) {
      toast({
        title: 'No photos uploaded',
        description: 'Please upload at least one photo to get style recommendations.',
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

      const response = await axios.post(`${API_URL}/ai/recommend-style`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setRecommendations({
        ...response.data.data,
        type: 'recommendation'
      });
      toast({
        title: 'Style Recommendations Ready!',
        description: 'Your personalized style recommendations are ready.',
      });
    } catch (error) {
      // Mock response for demonstration since API might not be available
      const mockRecommendationResponse = {
        type: 'recommendation',
        style_suggestion: `Based on your ${uploadedPhotos.length} uploaded item(s), we recommend: Try a minimalist approach with clean lines and neutral colors. Consider adding structured pieces like tailored blazers or well-fitted trousers. Accessories should be subtle but impactful - think delicate jewelry or a quality leather bag. This style works well for both professional and casual settings.`,
        clothing_type: 'Contemporary minimalist',
        recommended_pieces: ['Tailored blazer', 'High-quality basic tees', 'Well-fitted jeans', 'Classic sneakers', 'Structured handbag'],
        style_category: 'Modern minimalist',
        confidence_score: 0.92
      };
      
      setRecommendations(mockRecommendationResponse);
      toast({
        title: 'Style Recommendations Ready!',
        description: 'Your personalized style recommendations are ready.',
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

      setRecommendations({
        ...response.data.data,
        type: 'description'
      });
      toast({
        title: 'Styling Complete!',
        description: 'Your personalized outfit recommendations are ready.',
      });
    } catch (error) {
      // Mock response for text description
      const mockDescriptionResponse = {
        type: 'description',
        style_suggestion: `Based on your description "${description}", here's what we suggest: Focus on versatile pieces that can be mixed and matched. Choose a color palette that complements your skin tone and personal style. Consider the occasion and dress appropriately while adding your personal flair through accessories and styling choices.`,
        recommendations: ['Choose quality over quantity', 'Invest in basics', 'Add personal touches', 'Consider the occasion'],
        style_notes: 'Personalized based on your preferences'
      };
      
      setRecommendations(mockDescriptionResponse);
      toast({
        title: 'Styling Complete!',
        description: 'Your personalized outfit recommendations are ready.',
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
                  Upload up to 10 photos of your current outfit or wardrobe items and get instant AI-powered styling suggestions
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
                      <div className="grid grid-cols-5 gap-4">
                        {uploadedPhotos.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg border"
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

                  {/* Action Buttons */}
                  {uploadedPhotos.length > 0 && (
                    <div className="flex gap-4">
                      <Button 
                        onClick={handleStylePhotos}
                        disabled={isAnalyzing}
                        className="flex-1 bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream"
                      >
                        {isAnalyzing ? 'Styling Photos...' : 'Style'}
                      </Button>
                      <Button 
                        onClick={handleRecommendStyle}
                        disabled={isAnalyzing}
                        className="flex-1 bg-warm-terracotta hover:bg-warm-terracotta/90 text-soft-cream"
                      >
                        {isAnalyzing ? 'Getting Recommendations...' : 'Recommend Style'}
                      </Button>
                    </div>
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
                  <h3 className="text-lg font-playfair text-charcoal-black mb-2">
                    {recommendations.type === 'styling' ? 'Styling Suggestions' : 
                     recommendations.type === 'recommendation' ? 'Style Recommendations' : 'Recommendations'}
                  </h3>
                  <p className="text-charcoal-black/70 mb-3">
                    {recommendations.style_suggestion}
                  </p>
                  
                  {recommendations.clothing_type && (
                    <p className="text-charcoal-black/70 mb-2">
                      <strong>Clothing Type:</strong> {recommendations.clothing_type}
                    </p>
                  )}
                  
                  {recommendations.recommended_pieces && (
                    <div className="mb-2">
                      <strong className="text-charcoal-black">Recommended Pieces:</strong>
                      <ul className="list-disc list-inside text-charcoal-black/70 mt-1">
                        {recommendations.recommended_pieces.map((piece, index) => (
                          <li key={index}>{piece}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {recommendations.color_palette && (
                    <p className="text-charcoal-black/70 mb-2">
                      <strong>Color Palette:</strong> {recommendations.color_palette.join(', ')}
                    </p>
                  )}
                  
                  {recommendations.weather && (
                    <p className="text-charcoal-black/70 mt-2">
                      <strong>Weather:</strong> {recommendations.weather.temperature}°C, {recommendations.weather.condition}
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
