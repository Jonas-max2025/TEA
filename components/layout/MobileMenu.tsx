import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconDashboard, IconResources, IconTracking, IconTeam, IconCommunity, IconCalendar, IconSettings, IconSparkles, IconX } from '../../constants';

// ============================================================================
// CONFIGURACIÓN DE NAVEGACIÓN MÓVIL
// ============================================================================
// Define los elementos del menú móvil con sus iconos y rutas
// Esta configuración debe mantenerse sincronizada con el Sidebar
const navigation = [
  { name: 'Panel', href: '/', icon: IconDashboard },
  { name: 'Recursos', href: '/resources', icon: IconResources },
  { name: 'Asistente IA', href: '/ai-chat', icon: IconSparkles },
  { name: 'Seguimiento', href: '/tracking', icon: IconTracking },
  { name: 'Calendario', href: '/calendar', icon: IconCalendar },
  { name: 'Equipo', href: '/team', icon: IconTeam },
  { name: 'Comunidad', href: '/community', icon: IconCommunity },
];

// ============================================================================
// INTERFAZ DE PROPS DEL COMPONENTE
// ============================================================================
interface MobileMenuProps {
  isOpen: boolean;      // Estado del menú (abierto/cerrado)
  onClose: () => void;  // Función para cerrar el menú
}

// ============================================================================
// COMPONENTE MENÚ MÓVIL
// ============================================================================
/**
 * Componente de menú móvil que se muestra como overlay
 * Incluye animaciones suaves y bloqueo de scroll
 */
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* ============================================================================
          OVERLAY CON BLUR - Fondo oscuro que cubre toda la pantalla
          ============================================================================ */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 md:hidden ${
          isOpen ? 'bg-opacity-50 backdrop-blur-sm' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose} // Cierra el menú al hacer clic en el overlay
      />
      
      {/* ============================================================================
          MENÚ DESLIZABLE - Panel lateral con navegación
          ============================================================================ */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-teal-800 transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full' // Animación de deslizamiento
      }`}>
        {/* ============================================================================
            HEADER DEL MENÚ - Título y botón de cerrar
            ============================================================================ */}
        <div className="flex items-center justify-between h-16 px-4 bg-teal-700">
          <span className="text-white text-xl font-bold">TEA-Conecta</span>
          <button
            onClick={onClose}
            className="text-teal-100 hover:text-white focus:outline-none focus:text-white"
            aria-label="Cerrar menú"
          >
            <IconX className="h-6 w-6" />
          </button>
        </div>
        
        {/* ============================================================================
            CONTENIDO DEL MENÚ - Navegación y configuración
            ============================================================================ */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Navegación principal */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/'} // Exact match para la ruta raíz
                onClick={onClose} // Cierra el menú al navegar
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-teal-900 text-white' // Estado activo
                      : 'text-teal-100 hover:bg-teal-700 hover:text-white' // Estado normal
                  }`
                }
              >
                <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" />
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          {/* Configuración (separada en la parte inferior) */}
          <div className="flex-shrink-0 p-2 border-t border-teal-700">
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
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