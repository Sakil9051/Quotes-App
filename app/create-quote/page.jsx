'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { useToast } from '@/app/context/ToastContext';
export default function CreateQuote() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  const handleFileChange = (e) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      addToast('Please select a file!', 'error');
      return '';
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'https://crafto.app/crafto/v1.0/media/assignment/upload',
        formData
      );

      const mediaUrl = response.data?.[0]?.url;
      if (mediaUrl) {
        return mediaUrl;
      } else {
        throw new Error('Media URL not found in response');
      }
    } catch (error) {
      console.error('File upload failed:', error.response || error.message || error);
      addToast('Failed to upload file. Please try again.', 'error');
      throw error;
    }
  };

  const createQuote = async () => {
    setLoading(true);
    try {
      const mediaUrl = await uploadFile();
      if (!mediaUrl) return;

      const token = localStorage.getItem('token');
      if (!token) {
        addToast('You are not authenticated. Please log in again.', 'error');
        return;
      }

      const response = await axios.post(
        'https://assignment.stage.crafto.app/postQuote',
        { text, mediaUrl },
        { headers: { Authorization: token } }
      );
      
      addToast('Quote created successfully!', 'success');
      setText('');
      setFile(null);
    } catch (error) {
      console.error('Failed to create quote:', error.response || error.message || error);
      addToast('Failed to create quote. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create a New Quote</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <textarea
            placeholder="Enter your quote here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4 p-2 border border-gray-300 rounded-md"
            accept="image/*"
          />
          <div className="flex justify-center">
            <button
              onClick={createQuote}
              disabled={loading}
              className={`px-6 py-3 w-full rounded-md text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Quote'}
            </button>
          </div>
          <button
            onClick={() => router.push('/quotes')}
            className="self-center mt-4 text-blue-500 hover:text-blue-700"
          >
            &larr; Back to Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
