"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, User, Phone, Lock } from 'lucide-react';
import Link from 'next/link';
import { registerUser } from '@/action/RegisterUser';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repassword: '',
    name: '',
    phone: '',
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      router.push('/dashboard');
    }
  }, [router]);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*)";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'password') {
      const error = validatePassword(value);
      setPasswordError(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setMessage(passwordValidationError);
      return;
    }

    if (formData.password !== formData.repassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (response.error) {
        setMessage(`Registration failed: ${response.error}..`);
      } else {
        setMessage("🎉 Success! Your account has been created. You'll be redirected to login shortly.");
        setTimeout(() => {
          // router.push('/auth/login');
        }, 2000);
      }
    } catch (error) {
      setMessage("Oops! Something went wrong during sign up. Please try again or contact support if the issue persists.");
    } finally {
      setLoading(false);
      setFormData({
        email: '',
        password: '',
        repassword: '',
        name: '',
        phone: '',
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-8 bg-gray-100 min-h-[91vh]">
      <div className='hidden md:flex items-center justify-center w-full md:w-[50%]'>
        <img className='rounded-md w-full max-w-lg' src="/image/bt.jpg" alt="" />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-8 lg:p-24">
        <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-6">Create your account</h2>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
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
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="repassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="repassword"
                    name="repassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="••••••••"
                    value={formData.repassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !!passwordError}
                className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>
          <div className='flex items-center justify-center mt-4'>
            <Link href={'/auth/login'}>
              <h3 className="py-2 px-5">login?</h3>
            </Link>
          </div>
          {message && (
            <div className={`mt-4 text-center text-sm ${message.includes("Success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;