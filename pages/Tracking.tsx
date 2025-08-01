import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { LogEntry, LogType } from '../types';

interface TrackingProps {
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, 'id' | 'source'>) => void;
  isGoogleCalendarConnected: boolean;
}

const LogTypePill: React.FC<{ type: LogType }> = ({ type }) => {
    const colors = {
        [LogType.MILESTONE]: 'bg-green-100 text-green-800',
        [LogType.BEHAVIOR]: 'bg-yellow-100 text-yellow-800',
        [LogType.APPOINTMENT]: 'bg-blue-100 text-blue-800',
        [LogType.NOTE]: 'bg-slate-100 text-slate-800',
    }
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[type]}`}>{type}</span>
}

const Tracking: React.FC<TrackingProps> = ({ logs, addLog, isGoogleCalendarConnected }) => {
  const [newLog, setNewLog] = useState({ date: new Date().toISOString().split('T')[0], time: '', type: LogType.NOTE, description: '', details: '', reminder: 'none' });
  const [syncWithGoogle, setSyncWithGoogle] = useState(true);
  
  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.description) return;

    if (newLog.type === LogType.APPOINTMENT && isGoogleCalendarConnected && syncWithGoogle) {
        console.log("Simulating: Adding event to Google Calendar...", newLog);
    }
    
    const logData: Omit<LogEntry, 'id' | 'source'> = { ...newLog };
    
    if (logData.type !== LogType.APPOINTMENT) {
        delete logData.time;
        delete logData.reminder;
    } else {
        if (!logData.time) delete logData.time;
        if (!logData.reminder || logData.reminder === 'none') delete logData.reminder;
    }

    addLog(logData);
    setNewLog({ date: new Date().toISOString().split('T')[0], time: '', type: LogType.NOTE, description: '', details: '', reminder: 'none' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1">
        <Card>
          <form onSubmit={handleAddLog} className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Añadir Nuevo Registro</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700">Fecha</label>
                <Input type="date" id="date" value={newLog.date} onChange={e => setNewLog({...newLog, date: e.target.value})} required/>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-700">Tipo de Registro</label>
                <select id="type" value={newLog.type} onChange={e => setNewLog({...newLog, type: e.target.value as LogType})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md bg-white text-slate-900">
                    {Object.values(LogType).map(type => <option key={type}>{type}</option>)}
                </select>
              </div>
               {newLog.type === LogType.APPOINTMENT && (
                <>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-slate-700">Hora (Opcional)</label>
                    <Input type="time" id="time" value={newLog.time} onChange={e => setNewLog({...newLog, time: e.target.value})} />
                  </div>
                   <div>
                    <label htmlFor="reminder" className="block text-sm font-medium text-slate-700">Recordatorio</label>
                    <select id="reminder" value={newLog.reminder} onChange={e => setNewLog({...newLog, reminder: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md bg-white text-slate-900">
                        <option value="none">Sin recordatorio</option>
                        <option value="15m">15 minutos antes</option>
                        <option value="1h">1 hora antes</option>
                        <option value="1d">1 día antes</option>
                    </select>
                  </div>
                  {isGoogleCalendarConnected && (
                     <div className="flex items-center">
                        <input
                            id="google-sync"
                            name="google-sync"
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            checked={syncWithGoogle}
                            onChange={(e) => setSyncWithGoogle(e.target.checked)}
                        />
                        <label htmlFor="google-sync" className="ml-2 block text-sm text-slate-900">
                            Añadir a Google Calendar
                        </label>
                    </div>
                  )}
                </>
              )}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Descripción Corta</label>
                <Input type="text" id="description" placeholder="Ej: Usó una nueva palabra" value={newLog.description} onChange={e => setNewLog({...newLog, description: e.target.value})} required/>
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-slate-700">Detalles Adicionales</label>
                <textarea id="details" rows={4} placeholder="Añade más contexto si es necesario..." value={newLog.details} onChange={e => setNewLog({...newLog, details: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-white text-slate-900 placeholder:text-slate-400"></textarea>
              </div>
              <Button type="submit" className="w-full">Guardar Registro</Button>
            </div>
          </form>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
            <div className="p-6">
                 <h3 className="text-xl font-bold text-slate-800 mb-4">Historial de Registros</h3>
                 <div className="space-y-4">
                     {logs.map(log => (
                         <div key={log.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                             <div className="flex justify-between items-start">
                                 <div>
                                     <LogTypePill type={log.type} />
                                     <p className="mt-2 font-semibold text-slate-800">{log.description}</p>
                                 </div>
                                 <div className="text-right flex-shrink-0 ml-4">
                                    <p className="text-sm text-slate-500">{new Date(`${log.date}T00:00:00`).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    {log.time && <p className="text-sm font-medium text-slate-600">{log.time}</p>}
                                 </div>
                             </div>
                             {log.details && <p className="mt-2 text-sm text-slate-600">{log.details}</p>}
                         </div>
                     ))}
                 </div>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Tracking;