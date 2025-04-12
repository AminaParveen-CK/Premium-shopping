// src/app/auth/signup/page.jsx
'use client';

import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { signUp } = useAuth(); // Get the signUp function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      await signUp(email, password);
      router.push("/"); // Redirect to home page after sign up
    } catch (err) {
      setError("Error signing up: " + err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 border rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      
      {/* Show error message if exists */}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Email"
          />
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Password"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full p-2 bg-black text-white rounded-md"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <span className="text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="text-black">
            Log in
          </a>
        </span>
      </div>
    </div>
  );
}
