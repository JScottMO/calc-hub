import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Moon, Sun, Shield } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Layout() {
  const { dark, toggle } = useDarkMode();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b px-4 bg-card no-print shrink-0">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Link to="/" className="font-bold text-lg tracking-tight text-foreground">
                calc<span className="text-primary">.rsvp</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle dark mode">
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
          <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground no-print">
            <div className="flex items-center justify-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              <span>All calculations run on your device. No tracking. No ads.</span>
              <span className="mx-1">·</span>
              <Link to="/privacy" className="underline hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
