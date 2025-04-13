'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggleButton() {
 const {theme, setTheme} = useTheme();

  return (
    <button
      onClick={()=>setTheme(theme === "light"? "dark" : "light")}
      className="p-2 rounded-full"
      aria-label="Toggle Theme"
    >

        <Sun size={20} className="text-yellow-400 absolute h-10 w-10 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />

        <Moon size={20} className="text-gray-800 absolute h-10 w-10 rotate-90 scale-0 dark:-rotate-0 dark:scale-100" />

    </button>
  );
}
