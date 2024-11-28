'use client';

import React, { createContext, useContext, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-0 left-0 p-6 space-y-4 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type} p-4 mb-4 rounded-lg shadow-lg w-80 transition-all duration-300`}
            style={{ background: toast.type === 'error' ? '#dc3545' : '#28a745' }}
          >
            <div className="flex items-center">
              <span
                className={`text-white ${
                  toast.type === 'error' ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {toast.type === 'error' ? (
                  <FaExclamationCircle size={24} />
                ) : (
                  <FaCheckCircle size={24} />
                )}
              </span>
              <div className="ml-3 text-white font-semibold">{toast.message}</div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
