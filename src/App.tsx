import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import FunnelPageTracker from "@/components/FunnelPageTracker";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EmailSignup from "./pages/EmailSignup";
import Congrats from "./pages/Congrats";
import Calculator from "./pages/Calculator";
import Protocol from "./pages/Protocol";
import Resource from "./pages/Resource";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

function ResourceGoalRedirect() {
  const { goal } = useParams<{ goal: string }>();
  const normalized =
    goal === '6pack' || goal === 'muscle' || goal === 'physique' ? goal : 'physique';
  return <Navigate to={`/resource#video-${normalized}`} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FunnelPageTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/email-signup" element={<EmailSignup />} />
          <Route path="/congrats" element={<Congrats />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/booking" element={<Navigate to={{ pathname: '/', hash: 'book-call' }} replace />} />
          <Route path="/quiz" element={<Navigate to="/protocol" replace />} />
          <Route path="/resource/:goal" element={<ResourceGoalRedirect />} />
          <Route path="/resource" element={<Resource />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/calculator" element={<Calculator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
