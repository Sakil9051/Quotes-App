'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useToast } from '@/app/context/ToastContext';
import ConfirmationModal from '@/app/components/ConfirmationModal';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const router = useRouter();
  const { addToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username || '');
      } catch (error) {
        console.error('Error decoding token:', error);
        setUsername('');
      }
    }
  }, []);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    addToast('You have been logged out successfully!', 'success');
    router.push('/');
    setIsModalOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-gray-800 fixed top-0 z-30 w-[100vw] text-white py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold">Quotes App</div>
      {username && (
        <div className="flex items-center space-x-4">
          <div className="text-lg">
            <p>Welcome, <strong>{username}</strong>!</p>
          </div>
          <button
            onClick={handleLogoutClick}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to log out?"
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </nav>
  );
};

export default Navbar;
