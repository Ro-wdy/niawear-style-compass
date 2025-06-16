
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import GenderSelector from '@/components/GenderSelector';
import DailyTips from '@/components/DailyTips';
import Marketplace from '@/components/Marketplace';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <GenderSelector />
      <DailyTips />
      <Marketplace />
      <Footer />
    </div>
  );
};

export default Index;
