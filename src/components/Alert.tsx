import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  type?: 'error' | 'success';
}

const Alert: React.FC<AlertProps> = ({ children, type = 'error' }) => {
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-700',
    success: 'bg-green-50 border-green-200 text-green-700'
  };

  return (
    <div className={`${styles[type]} border px-4 py-3 rounded-lg`}>
      {children}
    </div>
  );
};

export default Alert;