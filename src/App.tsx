import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import Receipt from "./pages/Receipt";
import Experiences from "./pages/Experiences";
import FAQ from "./pages/FAQ";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";
import AdminDashboard from "./pages/AdminDashboard";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";
import NotificationPrompt from "./components/NotificationPrompt";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/receipt/:bookingId" element={<Receipt />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
          <NotificationPrompt />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
