import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconDashboard, IconResources, IconTracking, IconTeam, IconCommunity, IconCalendar, IconSettings, IconSparkles } from '../../constants';

const navigation = [
  { name: 'Panel', href: '/', icon: IconDashboard },
  { name: 'Recursos', href: '/resources', icon: IconResources },
  { name: 'Asistente IA', href: '/ai-chat', icon: IconSparkles },
  { name: 'Seguimiento', href: '/tracking', icon: IconTracking },
  { name: 'Calendario', href: '/calendar', icon: IconCalendar },
  { name: 'Equipo', href: '/team', icon: IconTeam },
  { name: 'Comunidad', href: '/community', icon: IconCommunity },
];

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-teal-700">
          <span className="text-white text-2xl font-bold">TEA-Conecta</span>
        </div>
        <div className="h-0 flex-1 flex flex-col overflow-y-auto bg-teal-800">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/'}
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
    </div>
  );
};

export default Sidebar;