
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { CartProvider } from "@/context/CartContext"; // import CartProvider
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";

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
    <html lang="en" className="">

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
          <WishlistProvider>
            <Layout>{children}</Layout>
          </WishlistProvider>
          </CartProvider>
        </AuthProvider>
    </body>

    </html>
  );
}




