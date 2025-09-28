import Footer from "@/components/Footer";
import { Page } from "@/components/LayoutWidgets";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Sidebar, { DesktopSidebarButton } from "@/features/Sidebar/Sidebar";
import useDelay from "@/hooks/useDelay";
import { initI18n } from "@/i18n";
import { useAppStore } from "@/store/store";
import "@/styles/fonts.css";
import "@/styles/utils.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
initI18n();

function App() {
  const { toast, dismiss } = useToast();
  const appError = useAppStore((s) => s.appError);
  const delay = useDelay(3000);

  useEffect(() => {
    if (appError) {
      console.error("Unexpected Error:", appError);
      toast({
        title: "Unexpected Error",
        description: appError,
        variant: "destructive",
      });
      delay(dismiss);
    }
  }, [appError]);

  return (
    <Page id="appScrollContainer" className="flex">
      <Sidebar />

      <div className="w-full flex-col-center flex-1 overflow-hidden relative">
        <DesktopSidebarButton />

        <div className="h-[calc(100%-var(--footer-height))] w-full">
          <Outlet />
        </div>

        <Footer />
      </div>

      <Toaster />
    </Page>
  );
}

export default App;
