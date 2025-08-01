import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-12 h-12 border-4 border-teal-500 border-dashed rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
