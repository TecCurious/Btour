"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginUser } from "@/action/actions";
import Link from "next/link";
import { LoginUser } from "@/action/LoginUser";

interface LoginResponse {
  error?: string;
  success: string;
  user?: {
    email: string;
    id: string;
    password: string;
  };
}

const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const signInResponse = await LoginUser({ email, password });
      console.log(email);
      console.log(password);
      console.log(signInResponse);

      if ("error" in signInResponse) {
        setEmail("");
        setPassword("");
        return setMessage("Invalid details!");
      } else if ("success" in signInResponse) {
        return setMessage(signInResponse?.success);
      }
      if ("user" in signInResponse) {
        localStorage.setItem("email", signInResponse.user.email);
        localStorage.setItem("id", signInResponse.user.id);
        router.push("/dashboard");
        setEmail("");
        setPassword("");
      } else {
        setMessage("Invalid credentials. Please try again.");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-8 bg-gray-100 min-h-[91vh]">
      <div className="hidden md:flex items-center justify-center w-full md:w-[50%]">
        <img className="rounded-md w-full max-w-lg" src="/image/bt.jpg" alt="" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-8 lg:p-24">
        <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-6">
            Sign in to your account
          </h2>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mt-4">
            <Link href={"/auth/register"}>
              <h3 className="py-2 px-5">register?</h3>
            </Link>
          </div>

          {message && (
            <div
              className={`mt-4 text-center text-sm ${
                message.includes("error") ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInForm;