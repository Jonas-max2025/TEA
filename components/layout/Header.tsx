import React from 'react';
import { IconMenu } from '../../constants';

interface HeaderProps {
  title: string;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuToggle }) => {
  return (
    <header className="flex-shrink-0 bg-white border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Botón hamburguesa solo en móvil */}
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Abrir menú"
            >
              <IconMenu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-slate-900 ml-2 md:ml-0">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <img className="h-8 w-8 rounded-full" src="https://picsum.photos/100/100" alt="User avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
