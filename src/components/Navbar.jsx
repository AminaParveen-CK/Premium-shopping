'use client'

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import ThemeToggleButton from './ThemeToggleButton';

export default function Navbar() {
  
  const { user, logout } = useAuth();
  const router = useRouter();
console.log(user);

    // Handle logout and redirect to home page or login page
    const handleLogout = async () => {
      console.log("Logging out...");
      await logout(); // Logout the user
      router.push("/login");  // Redirect to login page after logout
    };

  return (
    <nav className=" dark:bg-gray-900 dark:text-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          PremiumShop
        </Link>
        <ThemeToggleButton />

        <div className="space-x-4">
        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:underline">Home</Link>
          <Link href="/cart" className="text-gray-600 dark:text-gray-300 hover:underline">Cart</Link>
          
          {user ? (
    <>
      <Link href="/profile" className="text-gray-600 dark:text-gray-300 hover:underline">Profile</Link>
      <button onClick={handleLogout} className="text-gray-600 dark:text-gray-300 hover:underline">Logout</button>
    </>
  ) : (
    <>
      <Link href="/auth/signup" className="text-gray-600 dark:text-gray-300 hover:underline">SignUp</Link>
      <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:underline">Login</Link>
    </>
  )}
          {/* <Link href="/auth/signup" className="text-gray-600 dark:text-gray-300 hover:underline">SignUp</Link>
          <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:underline">Login</Link> */}
        </div>
      </div>
    </nav>
  )
}