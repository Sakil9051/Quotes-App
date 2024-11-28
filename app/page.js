'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/app/context/ToastContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const { addToast } = useToast();
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://assignment.stage.crafto.app/login', {
        username,
        otp,
      });
      localStorage.setItem('token', response.data.token);
      addToast('Login successful! Redirecting to main page', 'success');
      router.push('/quotes');
    } catch (error) {
      addToast('Login failed! Please check your credentials.', 'error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full max-sm:w-[90%]">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Quotes App Login</h1>
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="otp" className="block text-gray-700 text-sm font-semibold mb-2">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </div>
    </div>
  );
}
