import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import Restaurant from "./pages/Restaurant";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import Events from "./pages/events";
import GalleryPage from "./pages/gallery";
import { useEffect } from "react";

const queryClient = new QueryClient();

// FIXED: ScrollToTop Component - Only scrolls to top on certain conditions
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if it's NOT a hash link (e.g., #section) and we want to reset scroll for main navigation
    if (!window.location.hash) {
      // Use 'auto' instead of 'smooth' for immediate scrolling
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
};

// Alternative: Only scroll to top on specific route changes
// This is better if you want more control
const ControlledScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // List of routes where you DO want to scroll to top
    const scrollToTopRoutes = [
      "/",
      "/rooms",
      "/restaurant",
      "/about",
      "/gallery",
      "/contact",
      "/booking"
    ];

    // Check if current route should trigger scroll to top
    if (scrollToTopRoutes.includes(pathname)) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
};

// Another alternative: Preserve scroll position for all navigations
// (if you don't want any automatic scrolling at all)
const NoAutoScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This will preserve the scroll position on route change
    // Do nothing here unless you have a specific reason to scroll
  }, [pathname]);

  return null;
};

// WhatsApp SVG Icon Component
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="w-7 h-7 fill-current"
  >
    <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z" />
    <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z" />
    <path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd" />
  </svg>
);

// Floating WhatsApp Button
const FloatingWhatsAppButton = () => {
  const phoneNumber = "256779424477";
  const message = "Hello! I'm interested in La Roza Nature Resort. Can you help me with more information?";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />

      {/* Tooltip */}
      <div className="absolute right-16 bottom-1/2 translate-y-1/2 bg-gray-900 text-white text-sm py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with us on WhatsApp
        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
      </div>

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></span>
    </a>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        {/* Choose one of these ScrollToTop implementations */}
        {/* Option 1: Basic - Only scrolls when not a hash link */}
        <ScrollToTop />

        {/* Option 2: Controlled - Only scrolls on specific routes */}
        {/* <ControlledScrollToTop /> */}

        {/* Option 3: No automatic scrolling at all */}
        {/* <NoAutoScroll /> */}

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        <FloatingWhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;