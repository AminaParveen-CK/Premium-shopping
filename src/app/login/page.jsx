'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";  // Import your Firebase config

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to home page or cart page after login
      router.push("/");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-black text-white rounded mt-4 hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/auth/signup" className="text-black">Sign up here</a>
      </p>
    </div>
  );
}
