import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/store/store-provider";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Hortus Botanical Atelier",
  description: "Hortus Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-surface text-on-surface font-sans">
        <StoreProvider>
          {children}
        </StoreProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}

