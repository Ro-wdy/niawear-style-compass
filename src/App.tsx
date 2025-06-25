
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Marketplace from "./pages/MarketplacePage";
import AIStyling from "./pages/AIStyling";
import AfricanDesigns from "./pages/AfricanDesigns";
import WomensFashion from "./pages/WomensFashion";
import MensFashion from "./pages/MensFashion";
import KidsFashion from "./pages/KidsFashion";
import AllStyles from "./pages/AllStyles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/ai-styling" element={<AIStyling />} />
          <Route path="/african-designs" element={<AfricanDesigns />} />
          <Route path="/womens-fashion" element={<WomensFashion />} />
          <Route path="/mens-fashion" element={<MensFashion />} />
          <Route path="/kids-fashion" element={<KidsFashion />} />
          <Route path="/all-styles" element={<AllStyles />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
