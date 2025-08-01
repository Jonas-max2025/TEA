import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex-shrink-0 bg-white border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
           <div className="flex items-center space-x-4">
             <img className="h-8 w-8 rounded-full" src="https://picsum.photos/100/100" alt="User avatar" />
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
