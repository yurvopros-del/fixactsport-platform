import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import ScrollToHash from "@/components/ScrollToHash";
import AppErrorBoundary from "@/components/AppErrorBoundary";
import CookieBanner from "./components/CookieBanner";

import Index from "./pages/Index";

const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const UserAgreement = lazy(() => import("./pages/UserAgreement"));
const BetaTesting = lazy(() => import("./pages/BetaTesting"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function RuEntry() {
  try {
    localStorage.setItem("locale", "ru");
    localStorage.setItem("lang", "ru");
    localStorage.setItem("i18nextLng", "ru");
  } catch {
    // Ignore storage failures in restricted browser contexts.
  }

  return <Navigate to="/" replace />;
}

export default function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AppErrorBoundary>
              <ScrollToHash />

              <Suspense fallback={null}>
                <Routes>
                  <Route path="/ru/*" element={<RuEntry />} />

                  <Route path="/" element={<Index />} />

                  <Route path="/beta" element={<BetaTesting />} />
                  <Route path="/login" element={<AdminPanel />} />
                  <Route path="/beta-testing" element={<Navigate to="/beta" replace />} />

                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/user-agreement" element={<UserAgreement />} />

                  <Route path="/ru/beta" element={<BetaTesting />} />
                  <Route path="/ru/beta-testing" element={<Navigate to="/ru/beta" replace />} />
                  <Route path="/ru/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/ru/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/ru/user-agreement" element={<UserAgreement />} />
                  <Route path="/ru/" element={<RuEntry />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>

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
