import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import ScrollToHash from "@/components/ScrollToHash";
import AppErrorBoundary from "@/components/AppErrorBoundary";

import Index from "./pages/Index";
import CookiePolicy from "./pages/CookiePolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserAgreement from "./pages/UserAgreement";
import BetaTesting from "./pages/BetaTesting";
import NotFound from "./pages/NotFound";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

function RuProbe() {
  const locale = useLanguage();
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 80,
          left: 8,
          zIndex: 999999,
          padding: 10,
          borderRadius: 8,
          background: "rgba(255,0,0,0.85)",
          color: "#fff",
          font: "12px/1.4 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        RU ROUTE HIT (locale: {locale})
      </div>
      <Index />
    </div>
  );
}

function RuEntry() {
  try {
    localStorage.setItem("locale", "ru");
    localStorage.setItem("lang", "ru");
    localStorage.setItem("i18nextLng", "ru");
  } catch {}
  return <Navigate to="/" replace />;
}

export default function App() {
const location = window.location;
const params = new URLSearchParams(location.search);
const p = params.get("p");

if (p) {
  window.history.replaceState(null, "", p);
}

  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AppErrorBoundary>
              <ScrollToHash />

              <Routes>
                {/* RU redirect */}
                <Route path="/ru/*" element={<RuEntry />} />

                {/* MAIN ROUTES */}
                <Route path="/" element={<Index />} />

                {/* 🔥 FIX: ADD REAL /beta ROUTE */}
                <Route path="/beta" element={<BetaTesting />} />

                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/user-agreement" element={<UserAgreement />} />

                {/* EXISTING ROUTE (kept for compatibility) */}
<Route path="/beta" element={<BetaTesting />} />
<Route path="/beta-testing" element={<BetaTesting />} />
                {/* RU ROUTES */}
                <Route path="/ru" element={<RuProbe />} />
                <Route path="/ru/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/ru/cookie-policy" element={<CookiePolicy />} />
                <Route path="/ru/user-agreement" element={<UserAgreement />} />
                <Route path="/ru/beta-testing" element={<BetaTesting />} />

                {/* OPTIONAL: RU beta route */}
                <Route path="/ru/beta" element={<BetaTesting />} />

                <Route path="/ru/" element={<Navigate to="/ru" replace />} />

                {/* FALLBACK */}
                <Route path="*" element={<NotFound />} />
              </Routes>

              <CookieBanner />
              <Toaster />
              <Sonner />
            </AppErrorBoundary>
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}