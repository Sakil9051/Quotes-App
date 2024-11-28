'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import QuoteCard from '@/app/components/QuoteCard';
import FloatingButton from '@/app/components/FloatingButton';
import Navbar from '@/app/components/Navbar';
import { useToast } from '@/app/context/ToastContext';

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        addToast('You are not logged in. Please log in again.', 'error');
        router.push('/');
        return;
      }

      const response = await axios.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${offset}`,
        { headers: { Authorization: token } }
      );

      const resdata = response.data['data'];

      if (resdata.length === 0) {
        setHasMore(false);
        addToast('No more quotes available.', 'info');
      } else {
        setQuotes((prev) => [...prev, ...resdata]);
        setOffset((prev) => prev + 20);
        addToast('Quotes loaded successfully!', 'success');
      }
    } catch (error) {
      if (error.response && error.response.data?.error === 'Invalid token') {
        addToast('Session expired. Please log in again.', 'error');
        localStorage.removeItem('token');
        router.push('/');
      } else {
        console.error('Failed to fetch quotes:', error);
        addToast('Failed to fetch quotes. Please try again later.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        {loading && offset === 0 && (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="loader"></div>
          </div>
        )}
        <div className="grid mt-[5rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} />
          ))}
        </div>
        {quotes.length > 0 && !loading && hasMore && (
          <div className="flex fixed bottom-8 left-8 justify-center mt-6">
            <button
              onClick={fetchQuotes}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none"
            >
              Load More
            </button>
          </div>
        )}
        {loading && offset > 0 && (
          <div className="flex justify-center mt-6">
            <div className="loader"></div>
          </div>
        )}
        {!loading && !hasMore && quotes.length === 0 && (
          <div className="text-center text-gray-500 mt-6">
            <p>No quotes available. Add some inspirational quotes to get started!</p>
          </div>
        )}
        <FloatingButton />
      </div>
    </div>
  );
}
