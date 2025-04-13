
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { CartProvider } from "@/context/CartContext"; // import CartProvider
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Premium shopping",
  description: "Premium shopping experience with Next.js",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
          <WishlistProvider>
            <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <Layout>
            <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
              {children}
            </div>
            </Layout>
            </ThemeProvider>
          </WishlistProvider>
          </CartProvider>
        </AuthProvider>
    </body>

    </html>
  );
}




