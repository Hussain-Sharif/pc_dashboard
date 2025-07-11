'use client';

import { store } from '../store/store';
import { Provider } from 'react-redux';
import './globals.css';

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
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
