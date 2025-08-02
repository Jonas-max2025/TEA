import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileMenu from './components/layout/MobileMenu';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import Tracking from './pages/Tracking';
import Team from './pages/Team';
import Community from './pages/Community';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import AIChat from './pages/AIChat';
import { PAGE_TITLES } from './constants';
import { LogEntry, LogType } from './types';

// ============================================================================
// DATOS DE PRUEBA - Simulación de eventos y registros
// ============================================================================
// Estos datos simulan eventos reales que una familia podría tener
// En una aplicación real, estos vendrían de una base de datos
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const fiveDaysFromNow = new Date(today);
fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);
const twelveDaysFromNow = new Date(today);
twelveDaysFromNow.setDate(twelveDaysFromNow.getDate() + 12);
const tenDaysAgo = new Date(today);
tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
const threeDaysFromNow = new Date(today);
threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
const eightDaysFromNow = new Date(today);
eightDaysFromNow.setDate(eightDaysFromNow.getDate() + 8);



// Función auxiliar para formatear fechas en formato YYYY-MM-DD
const formatDate = (date: Date) => date.toISOString().split('T')[0];

// ============================================================================
// DATOS INICIALES - Registros simulados de la aplicación
// ============================================================================
// Estos registros simulan el historial real de una familia
// Incluyen citas, hitos de desarrollo y comportamientos observados
const initialLogs: LogEntry[] = [
    // Citas próximas
    { id: 'app-upcoming-3', date: formatDate(twelveDaysFromNow), time: '09:00', type: LogType.APPOINTMENT, description: 'Terapia Ocupacional', details: 'Sesión con Laura Méndez.', source: 'app', reminder: '1d' },
    { id: 'app-upcoming-2', date: formatDate(fiveDaysFromNow), time: '14:30', type: LogType.APPOINTMENT, description: 'Evaluación Pediátrica', details: 'Chequeo anual.', source: 'app', reminder: '1d' },
    { id: 'app-upcoming-1', date: formatDate(tomorrow), time: '10:00', type: LogType.APPOINTMENT, description: 'Terapia del Lenguaje', details: 'Sesión con Carlos Ruiz.', source: 'app', reminder: '1h' },
    
    // Hitos de desarrollo recientes
    { id: 'app-log-1', date: formatDate(today), type: LogType.MILESTONE, description: 'Mantuvo contacto visual', details: 'Logró mantener contacto visual por 5 segundos durante el juego.', source: 'app' },
    { id: 'app-log-3', date: formatDate(yesterday), type: LogType.MILESTONE, description: 'Usó una nueva palabra: "más"', details: 'Lo dijo para pedir más bloques.', source: 'app' },
    
    // Comportamientos observados
    { id: 'app-log-2', date: formatDate(yesterday), type: LogType.BEHAVIOR, description: 'Transición tranquila', details: 'Pasó del juego a la cena sin frustración.', source: 'app' },
    
    // Cita pasada (para mostrar historial)
    { id: 'app-past-appt', date: formatDate(tenDaysAgo), time: '14:30', type: LogType.APPOINTMENT, description: 'Cita con terapeuta (pasada)', details: 'La terapeuta sugirió nuevos ejercicios de comunicación.', source: 'app' },
];

// ============================================================================
// EVENTOS DE GOOGLE CALENDAR - Simulación de integración externa
// ============================================================================
// Estos eventos simulan citas que vendrían de Google Calendar
// Se muestran solo cuando la integración está activada
const mockGoogleEvents: LogEntry[] = [
    { id: 'google-1', date: formatDate(threeDaysFromNow), time: '11:00', type: LogType.APPOINTMENT, description: 'Cita con Dentista', details: 'Limpieza y revisión general.', source: 'google', reminder: '1d' },
    { id: 'google-2', date: formatDate(eightDaysFromNow), time: '16:00', type: LogType.APPOINTMENT, description: 'Reunión Escolar (IEP)', details: 'Discutir el progreso y plan educativo.', source: 'google', reminder: '1d' },
];


// ============================================================================
// COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ============================================================================
const App: React.FC = () => {
  // ============================================================================
  // ESTADO GLOBAL DE LA APLICACIÓN
  // ============================================================================
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs); // Registros de la aplicación
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false); // Estado de integración con Google Calendar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado del menú móvil
  const location = useLocation(); // Hook de React Router para obtener la ruta actual
  
  // ============================================================================
  // COMBINACIÓN Y ORDENAMIENTO DE REGISTROS
  // ============================================================================
  // Combina registros de la app con eventos de Google Calendar (si está conectado)
  // Ordena por fecha/hora, más recientes primero
  const allLogs = [
      ...logs, // Registros de la aplicación
      ...(isGoogleCalendarConnected ? mockGoogleEvents : []) // Eventos de Google Calendar (si está conectado)
  ].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
        return dateB.getTime() - dateA.getTime(); // Orden descendente (más recientes primero)
    });

  // ============================================================================
  // FUNCIONES PARA GESTIONAR REGISTROS
  // ============================================================================
  
  /**
   * Agrega un nuevo registro a la aplicación
   * @param newLog - El registro a agregar (sin id ni source)
   */
  const addLog = (newLog: Omit<LogEntry, 'id' | 'source'>) => {
    const logToAdd: LogEntry = { 
      ...newLog, 
      id: new Date().toISOString(), // Genera un ID único basado en timestamp
      source: 'app' // Marca como registro de la aplicación
    };
    setLogs(prevLogs => [logToAdd, ...prevLogs]); // Agrega al inicio de la lista
  };
  
  /**
   * Obtiene las próximas citas (máximo 3)
   * @returns Array de citas ordenadas por fecha/hora
   */
  const getUpcomingAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Inicio del día actual
    
    return allLogs
      .filter(log => 
        log.type === LogType.APPOINTMENT && // Solo citas
        new Date(`${log.date}T00:00:00`) >= today // Desde hoy en adelante
      )
      .sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
          const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
          return dateA.getTime() - dateB.getTime(); // Orden ascendente (próximas primero)
      })
      .slice(0, 3); // Máximo 3 citas
  };

  /**
   * Obtiene recordatorios activos basados en la hora actual
   * @returns Array de citas que necesitan recordatorio
   */
  const getActiveReminders = () => {
    const now = new Date();
    return allLogs
      .filter(log => {
        // Validaciones básicas
        if (log.type !== LogType.APPOINTMENT || !log.time || !log.reminder || log.reminder === 'none') {
            return false;
        }
        
        const apptDate = new Date(`${log.date}T${log.time}`);
        if (apptDate < now) return false; // Cita ya pasó

        // Calcula cuándo debe activarse el recordatorio
        let reminderTime = new Date(apptDate);
        switch (log.reminder) {
            case '15m': reminderTime.setMinutes(reminderTime.getMinutes() - 15); break;
            case '1h': reminderTime.setHours(reminderTime.getHours() - 1); break;
            case '1d': reminderTime.setDate(reminderTime.getDate() - 1); break;
            default: return false;
        }
        
        return now >= reminderTime; // ¿Ya es hora de mostrar el recordatorio?
      })
      .sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
          const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
          return dateA.getTime() - dateB.getTime(); // Orden por proximidad
      });
  };

  /**
   * Obtiene los avances recientes (hitos y comportamientos)
   * @returns Array de los últimos 3 avances
   */
  const getRecentProgress = () => {
      return allLogs
          .filter(log => log.type === LogType.MILESTONE || log.type === LogType.BEHAVIOR) // Solo hitos y comportamientos
          .slice(0, 3); // Últimos 3 avances
  };
  
  /**
   * Obtiene el título de la página basado en la ruta actual
   * @param pathname - La ruta actual
   * @returns El título de la página
   */
  const getTitle = (pathname: string): string => {
    const pathKey = pathname.substring(1) || 'dashboard'; // Extrae la clave de la ruta
    return PAGE_TITLES[pathKey as keyof typeof PAGE_TITLES] || 'TEA-Conecta'; // Obtiene el título o usa el default
  };

  // ============================================================================
  // MANEJO DEL MENÚ MÓVIL
  // ============================================================================
  
  /**
   * Alterna el estado del menú móvil (abrir/cerrar)
   */
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Cierra el menú móvil
   */
  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // ============================================================================
  // EFECTO PARA BLOQUEAR SCROLL CUANDO EL MENÚ MÓVIL ESTÁ ABIERTO
  // ============================================================================
  // Previene que el usuario pueda hacer scroll en el body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open'); // Agrega clase CSS que bloquea el scroll
    } else {
      document.body.classList.remove('menu-open'); // Remueve la clase cuando se cierra
    }

    // Cleanup: asegura que se remueva la clase al desmontar el componente
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]); // Se ejecuta cada vez que cambia el estado del menú

  // ============================================================================
  // RENDERIZADO DE LA APLICACIÓN
  // ============================================================================
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar fijo para desktop */}
      <Sidebar />
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header con botón hamburguesa para móvil */}
        <Header 
          title={getTitle(location.pathname)} 
          onMenuToggle={handleMobileMenuToggle}
        />
        
        {/* Menú móvil (overlay) */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={handleMobileMenuClose}
        />
        {/* Área principal de contenido */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <Routes>
            {/* Dashboard - Página principal con resumen */}
            <Route path="/" element={
              <Dashboard 
                appointments={getUpcomingAppointments()} 
                reminders={getActiveReminders()} 
                recentProgress={getRecentProgress()} 
              />
            } />
            
            {/* Páginas de funcionalidades */}
            <Route path="/resources" element={<Resources />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/tracking" element={
              <Tracking 
                logs={logs.filter(l => l.source === 'app')} // Solo registros de la app
                addLog={addLog} 
                isGoogleCalendarConnected={isGoogleCalendarConnected} 
              />
            } />
            <Route path="/calendar" element={<Calendar logs={allLogs} />} />
            <Route path="/team" element={<Team />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={
              <Settings 
                isConnected={isGoogleCalendarConnected} 
                setConnected={setIsGoogleCalendarConnected} 
              />
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;