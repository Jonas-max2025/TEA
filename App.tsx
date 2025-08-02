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


const formatDate = (date: Date) => date.toISOString().split('T')[0];

const initialLogs: LogEntry[] = [
    { id: 'app-upcoming-3', date: formatDate(twelveDaysFromNow), time: '09:00', type: LogType.APPOINTMENT, description: 'Terapia Ocupacional', details: 'Sesión con Laura Méndez.', source: 'app', reminder: '1d' },
    { id: 'app-upcoming-2', date: formatDate(fiveDaysFromNow), time: '14:30', type: LogType.APPOINTMENT, description: 'Evaluación Pediátrica', details: 'Chequeo anual.', source: 'app', reminder: '1d' },
    { id: 'app-upcoming-1', date: formatDate(tomorrow), time: '10:00', type: LogType.APPOINTMENT, description: 'Terapia del Lenguaje', details: 'Sesión con Carlos Ruiz.', source: 'app', reminder: '1h' },
    { id: 'app-log-1', date: formatDate(today), type: LogType.MILESTONE, description: 'Mantuvo contacto visual', details: 'Logró mantener contacto visual por 5 segundos durante el juego.', source: 'app' },
    { id: 'app-log-2', date: formatDate(yesterday), type: LogType.BEHAVIOR, description: 'Transición tranquila', details: 'Pasó del juego a la cena sin frustración.', source: 'app' },
    { id: 'app-past-appt', date: formatDate(tenDaysAgo), time: '14:30', type: LogType.APPOINTMENT, description: 'Cita con terapeuta (pasada)', details: 'La terapeuta sugirió nuevos ejercicios de comunicación.', source: 'app' },
    { id: 'app-log-3', date: formatDate(yesterday), type: LogType.MILESTONE, description: 'Usó una nueva palabra: "más"', details: 'Lo dijo para pedir más bloques.', source: 'app' },
];

const mockGoogleEvents: LogEntry[] = [
    { id: 'google-1', date: formatDate(threeDaysFromNow), time: '11:00', type: LogType.APPOINTMENT, description: 'Cita con Dentista', details: 'Limpieza y revisión general.', source: 'google', reminder: '1d' },
    { id: 'google-2', date: formatDate(eightDaysFromNow), time: '16:00', type: LogType.APPOINTMENT, description: 'Reunión Escolar (IEP)', details: 'Discutir el progreso y plan educativo.', source: 'google', reminder: '1d' },
];


const App: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const allLogs = [
      ...logs,
      ...(isGoogleCalendarConnected ? mockGoogleEvents : [])
  ].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
        return dateB.getTime() - dateA.getTime();
    });

  const addLog = (newLog: Omit<LogEntry, 'id' | 'source'>) => {
    const logToAdd: LogEntry = { ...newLog, id: new Date().toISOString(), source: 'app' };
    setLogs(prevLogs => [logToAdd, ...prevLogs]);
  };
  
  const getUpcomingAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return allLogs
      .filter(log => log.type === LogType.APPOINTMENT && new Date(`${log.date}T00:00:00`) >= today)
      .sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
          const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
          return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 3);
  };

  const getActiveReminders = () => {
    const now = new Date();
    return allLogs
      .filter(log => {
        if (log.type !== LogType.APPOINTMENT || !log.time || !log.reminder || log.reminder === 'none') {
            return false;
        }
        const apptDate = new Date(`${log.date}T${log.time}`);
        if (apptDate < now) return false;

        let reminderTime = new Date(apptDate);
        switch (log.reminder) {
            case '15m': reminderTime.setMinutes(reminderTime.getMinutes() - 15); break;
            case '1h': reminderTime.setHours(reminderTime.getHours() - 1); break;
            case '1d': reminderTime.setDate(reminderTime.getDate() - 1); break;
            default: return false;
        }
        return now >= reminderTime;
      })
      .sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
          const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
          return dateA.getTime() - dateB.getTime();
      });
  };

  const getRecentProgress = () => {
      return allLogs
          .filter(log => log.type === LogType.MILESTONE || log.type === LogType.BEHAVIOR)
          .slice(0, 3);
  };
  
  const getTitle = (pathname: string): string => {
    const pathKey = pathname.substring(1) || 'dashboard';
    return PAGE_TITLES[pathKey as keyof typeof PAGE_TITLES] || 'TEA-Conecta';
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={getTitle(location.pathname)} 
          onMenuToggle={handleMobileMenuToggle}
        />
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={handleMobileMenuClose}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard appointments={getUpcomingAppointments()} reminders={getActiveReminders()} recentProgress={getRecentProgress()} />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/tracking" element={<Tracking logs={logs.filter(l => l.source === 'app')} addLog={addLog} isGoogleCalendarConnected={isGoogleCalendarConnected} />} />
            <Route path="/calendar" element={<Calendar logs={allLogs} />} />
            <Route path="/team" element={<Team />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<Settings isConnected={isGoogleCalendarConnected} setConnected={setIsGoogleCalendarConnected} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;