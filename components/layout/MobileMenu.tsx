import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconDashboard, IconResources, IconTracking, IconTeam, IconCommunity, IconCalendar, IconSettings, IconSparkles, IconX } from '../../constants';

const navigation = [
  { name: 'Panel', href: '/', icon: IconDashboard },
  { name: 'Recursos', href: '/resources', icon: IconResources },
  { name: 'Asistente IA', href: '/ai-chat', icon: IconSparkles },
  { name: 'Seguimiento', href: '/tracking', icon: IconTracking },
  { name: 'Calendario', href: '/calendar', icon: IconCalendar },
  { name: 'Equipo', href: '/team', icon: IconTeam },
  { name: 'Comunidad', href: '/community', icon: IconCommunity },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 md:hidden ${
          isOpen ? 'bg-opacity-50 backdrop-blur-sm' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-teal-800 transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 bg-teal-700">
          <span className="text-white text-xl font-bold">TEA-Conecta</span>
          <button
            onClick={onClose}
            className="text-teal-100 hover:text-white focus:outline-none focus:text-white"
          >
            <IconX className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-teal-900 text-white'
                      : 'text-teal-100 hover:bg-teal-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" />
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="flex-shrink-0 p-2 border-t border-teal-700">
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-teal-900 text-white'
                    : 'text-teal-100 hover:bg-teal-700 hover:text-white'
                }`
              }
            >
              <IconSettings className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" />
              Ajustes
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu; 