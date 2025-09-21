import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import "react-image-gallery/styles/css/image-gallery.css";

import AuthProvider from "@/shared/providers/auth-provider";
import TanstackProvider from "@/shared/providers/tanstack-provider";
import { Toaster } from "@/components/ui/sonner";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["200", "400", "800"],
});

export const metadata: Metadata = {
  title: "HouseMotto - UK best property website",
  description: "UK's property website for properties for sale and to rent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} font-jakarta`}>
        <main>
          <AuthProvider>
            <TanstackProvider>{children}</TanstackProvider>
          </AuthProvider>
          <Toaster richColors toastOptions={{}} />
        </main>
      </body>
      <GoogleAnalytics gaId="G-327EHFM7NW" />
    </html>
  );
}
