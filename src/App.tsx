import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Calls from "./pages/Calls";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          {/* Header with sidebar trigger */}
          <header className="h-14 flex items-center border-b bg-background px-4 sticky top-0 z-50">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-lg">MedCall AI Admin</h1>
            </div>
          </header>
          
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1 p-6 bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calls" element={<Calls />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
