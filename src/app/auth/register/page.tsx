"use client";
import React, { useState, useEffect } from 'react';
// import { signUp } from '../../action/signUp';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, User, Phone, Lock } from 'lucide-react';
import Link from 'next/link';
// import { registerUser } from '@/action/actions';
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

  const router = useRouter();


  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      router.push('/dashboard');
    }
    
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (formData.password !== formData.repassword) {
    setMessage("Passwords do not match");
    return;
  }

  setLoading(true);
  // setMessage("Signing up...");

  try {
    const response = await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    if (response.error) {
      setMessage(response.error);
    } else {
      setMessage(response.success);
      // localStorage.setItem("id", response.user.id);
      // localStorage.setItem("email", response.user.email);
      // router.push('/dashboard');
    }
  } catch (error) {
    console.log(error);
    setMessage("An error occurred during sign up");
  } finally {
    setLoading(false);
    setFormData({
      email: '',
      password: '',
      repassword: '',
      name: '',
      phone: '',
    })
  }
};

  return (
    <div className="flex p-8 bg-gray-100 h-[91vh]">
      
      <div className='flex items-center justify-center w-[50%] '><img className='rounded-md' src="/image/bt.jpg" alt="" /></div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24">
        <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Create your account</h2>
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                disabled={loading}
                className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>
          <div className='flex items-center justify-center mt-4'>
          <Link href={'/auth/login'}>
            <h3 className="py-2 px-5 ">login?</h3>
          </Link>
          </div>
          {message && (
            <div className={`mt-4 text-center text-sm ${message.includes("error") ? "text-red-600" : "text-green-600"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
