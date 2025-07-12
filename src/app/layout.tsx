'use client';
import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { store, useAppDispatch } from '../store/store';
import { Provider } from 'react-redux';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useContent } from "@/hooks/useContent";
import { toggleDarkMode } from "@/store/slices/userPrefsSlice";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div id="root">
            <SidebarProvider>
               <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 justify-between pr-5 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  {/* <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                          Building Your Application
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb> */}
                  <div className="flex justify-center items-center" >
                    <Input type="search" placeholder="Search Content..."/>
                  </div>
                </div>
                
              </header>
              <main className="flex-1 overflow-hidden">{children}</main>
            </SidebarInset>
            </SidebarProvider>
          </div>
        </Provider>
      </body>
    </html>
  );
}
