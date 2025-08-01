import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const baseClasses = "block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-white text-slate-900 placeholder:text-slate-400";
  
  return (
    <input
      className={`${baseClasses} ${className || ''}`}
      {...props}
    />
  );
};

export default Input;