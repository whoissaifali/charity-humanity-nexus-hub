
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import DonateNow from "./pages/DonateNow";
import TopDonors from "./pages/TopDonors";
import RequestHelp from "./pages/RequestHelp";
import OurWork from "./pages/OurWork";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Transparency from "./pages/Transparency";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";

// Create query client outside component to prevent recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/donate" element={<DonateNow />} />
    <Route path="/donors" element={<TopDonors />} />
    <Route path="/request-help" element={<RequestHelp />} />
    <Route path="/our-work" element={<OurWork />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/transparency" element={<Transparency />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/dashboard" element={<UserDashboard />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-screen">
              <AppRoutes />
            </div>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
