'use client';
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useDarkMode } from "@/hooks/dark-mode"; // Your custom dark mode hook
import { MoonIcon, SunIcon } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ This works perfectly now! The hooks are inside the Provider.
  const { darkMode, toggle } = useDarkMode();

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex border-b  h-16 shrink-0 justify-between pr-5 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="flex justify-center items-center">
              <Input type="search" placeholder="Search Content..." />
            </div>
          </div>
          <div className="flex items-center gap-2 border rounded-3xl p-2">
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={toggle}
            />
            <label htmlFor="dark-mode" className="text-sm">{darkMode? <MoonIcon className="w-4 h-4"/>: <SunIcon className="w-4 h-4"/>}</label>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </SidebarInset>
    </>
  );
}
