import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface SettingsProps {
  isConnected: boolean;
  setConnected: (isConnected: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ isConnected, setConnected }) => {

  const handleConnect = () => {
    // In a real app, this would trigger the OAuth flow.
    // Here, we just simulate a successful connection.
    setConnected(true);
  };

  const handleDisconnect = () => {
    setConnected(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Card>
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800">Integración con Google Calendar</h3>
          <p className="mt-1 text-sm text-slate-600">
            Sincroniza tus citas con Google Calendar para una gestión unificada. Los eventos de tu calendario aparecerán en la aplicación.
          </p>

          <div className="mt-6">
            {!isConnected ? (
              <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg">
                <div>
                    <h4 className="font-semibold text-slate-800">Conectar tu cuenta</h4>
                    <p className="text-sm text-slate-500">Permite que TEA-Conecta acceda a tus calendarios de Google.</p>
                </div>
                <Button onClick={handleConnect}>
                  Conectar con Google Calendar
                </Button>
              </div>
            ) : (
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                     <div>
                        <h4 className="font-semibold text-green-800">Conectado como:</h4>
                        <p className="text-sm text-green-700">familia.conectada@gmail.com (simulado)</p>
                    </div>
                    <Button onClick={handleDisconnect} variant="secondary">
                      Desconectar
                    </Button>
                </div>
                 <div className="mt-4 border-t border-green-200 pt-4">
                     <label htmlFor="calendar-select" className="block text-sm font-medium text-slate-700">Sincronizar con el calendario:</label>
                     <select 
                        id="calendar-select" 
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                        defaultValue="primary"
                    >
                        <option value="primary">Calendario Principal</option>
                        <option value="reminders">Recordatorios</option>
                        <option value="work">Trabajo</option>
                    </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
