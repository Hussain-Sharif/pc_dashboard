

'use client';

import { store } from '../store/store';
import { Provider } from 'react-redux';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useDarkMode } from '@/hooks/dark-mode'; // Assuming this hook handles initialization
import './globals.css';

// This small component will initialize the dark mode from localStorage
function ThemeInitializer() { // with out this also work but it's not a good practice to make this a Component to 
// call Hook before the Whole Application Childern Components in this Main Root Layout 
  useDarkMode(); // This hook will now run inside the Provider context
  return null; // It doesn't render anything as it's a Component
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      
      <body>
        <Provider store={store}>
          <SidebarProvider>
            <ThemeInitializer />
            {children}
          </SidebarProvider>
        </Provider>
      </body>
    </html>
  );
}
