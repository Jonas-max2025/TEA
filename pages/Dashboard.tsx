import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import { IconResources, IconTracking, IconTeam, IconCommunity, IconBell } from '../constants';
import { LogEntry, LogType } from '../types';

const quickLinks = [
  { name: 'Explorar Recursos', href: '/resources', icon: IconResources },
  { name: 'Añadir Registro', href: '/tracking', icon: IconTracking },
  { name: 'Contactar Equipo', href: '/team', icon: IconTeam },
  { name: 'Ver Comunidad', href: '/community', icon: IconCommunity },
];

interface DashboardProps {
  appointments: LogEntry[];
  reminders: LogEntry[];
  recentProgress: LogEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ appointments, reminders, recentProgress }) => {
  
  const formatAppointmentDate = (dateString: string, timeString?: string) => {
    const date = new Date(`${dateString}T${timeString || '00:00'}`);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Hoy, ${timeString || ''}`.trim();
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return `Mañana, ${timeString || ''}`.trim();
    }
    return `${date.toLocaleDateString('es-ES', { weekday: 'long', month: 'short', day: 'numeric' })}${timeString ? `, ${timeString}`: ''}`;
  };

  const formatTimeUntil = (date: string, time: string) => {
      const now = new Date();
      const apptTime = new Date(`${date}T${time}`);
      const diffMinutes = Math.round((apptTime.getTime() - now.getTime()) / 60000);

      if (diffMinutes <= 1) return 'Ahora mismo';
      if (diffMinutes < 60) return `En ${diffMinutes} min`;
      const diffHours = Math.round(diffMinutes / 60);
      if (diffHours < 24) return `En ${diffHours} h`;
      return `Hoy a las ${time}`;
  };
  
  const progressIcons = {
      [LogType.MILESTONE]: '🏆',
      [LogType.BEHAVIOR]: '😊',
      [LogType.NOTE]: '📝',
      [LogType.APPOINTMENT]: '📅',
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-tight text-slate-900">Bienvenido/a de nuevo,</h2>
        <p className="mt-1 text-slate-600">Aquí tienes un resumen de la actividad reciente y próximos eventos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Reminders Card */}
        {reminders.length > 0 && (
          <Card className="bg-amber-50 border-amber-200">
            <div className="p-5">
              <div className="flex items-center">
                  <IconBell className="h-6 w-6 text-amber-500 mr-3" />
                  <h3 className="text-lg font-semibold text-amber-900">Recordatorios</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {reminders.map((reminder) => (
                  <li key={reminder.id} className="flex justify-between items-center">
                    <span className="font-medium text-slate-800">{reminder.description}</span>
                    <span className="font-bold text-amber-600">
                      {formatTimeUntil(reminder.date, reminder.time!)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Upcoming Appointments Card */}
        <Card>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-slate-800">Próximas Citas</h3>
            {appointments.length > 0 ? (
              <ul className="mt-4 space-y-3 text-sm">
                {appointments.map((appt) => (
                  <li key={appt.id} className="flex justify-between items-center">
                    <span>{appt.description}</span>
                    <span className="font-medium text-slate-500 capitalize">
                      {formatAppointmentDate(appt.date, appt.time)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No tienes citas próximas programadas.</p>
            )}
          </div>
        </Card>

        {/* Latest Progress Card */}
        <Card>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-slate-800">Últimos Avances</h3>
            {recentProgress.length > 0 ? (
                <ul className="mt-4 space-y-3 text-sm">
                {recentProgress.map(log => (
                    <li key={log.id} className="flex items-start">
                        <span className="text-teal-500 mr-2">{progressIcons[log.type]}</span>
                        <p><strong className="font-semibold">{log.type === LogType.MILESTONE ? "Hito:" : "Comportamiento:"}</strong> {log.description}</p>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="mt-4 text-sm text-slate-500">Aún no hay avances registrados.</p>
            )}
          </div>
        </Card>

        {/* Quick Links Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <div className="p-5">
            <h3 className="text-lg font-semibold text-slate-800">Accesos Rápidos</h3>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex flex-col items-center justify-center p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <link.icon className="h-8 w-8 text-teal-600" />
                  <span className="mt-2 text-xs text-center font-medium text-slate-700">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;