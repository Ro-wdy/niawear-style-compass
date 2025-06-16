
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const GenderSelector = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const genderOptions = [
    {
      id: 'female',
      title: 'Women\'s Fashion',
      description: 'Explore feminine styles, dresses, accessories and more',
      emoji: '👗'
    },
    {
      id: 'male',
      title: 'Men\'s Fashion',
      description: 'Discover masculine styles, suits, casual wear and accessories',
      emoji: '👔'
    },
    {
      id: 'non-binary',
      title: 'All Styles',
      description: 'Gender-neutral and inclusive fashion for everyone',
      emoji: '✨'
    }
  ];

  return (
    <section id="styling" className="py-20 bg-soft-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal-black mb-4">
            Personalized for
            <span className="gradient-text block">Your Style</span>
          </h2>
          <p className="text-xl text-charcoal-black/70 max-w-3xl mx-auto">
            Choose your style preference to get tailored recommendations that match your unique fashion sense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {genderOptions.map((option, index) => (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-scale-in ${
                selectedGender === option.id 
                  ? 'ring-2 ring-deep-emerald bg-deep-emerald/5' 
                  : 'bg-white hover:bg-deep-emerald/5'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setSelectedGender(option.id)}
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{option.emoji}</div>
                <CardTitle className={`text-xl font-playfair ${
                  selectedGender === option.id ? 'text-deep-emerald' : 'text-charcoal-black'
                }`}>
                  {option.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-charcoal-black/70 mb-6">
                  {option.description}
                </CardDescription>
                <Button 
                  className={`w-full font-semibold transition-all ${
                    selectedGender === option.id
                      ? 'bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream'
                      : 'bg-earthy-gold hover:bg-earthy-gold/90 text-charcoal-black'
                  }`}
                >
                  {selectedGender === option.id ? 'Selected' : 'Choose This Style'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedGender && (
          <div className="text-center mt-12 animate-fade-in">
            <Button className="bg-deep-emerald hover:bg-deep-emerald/90 text-soft-cream font-semibold px-8 py-3 text-lg">
              Continue to Styling
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GenderSelector;
