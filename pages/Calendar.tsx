import React, { useState, useMemo } from 'react';
import { LogEntry, LogType } from '../types';
import Card from '../components/ui/Card';

interface CalendarProps {
  logs: LogEntry[];
}

const Calendar: React.FC<CalendarProps> = ({ logs }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const appointments = useMemo(() => 
        logs
            .filter(log => log.type === LogType.APPOINTMENT)
            .sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`).getTime() - new Date(`${b.date}T${b.time || '00:00'}`).getTime())
    , [logs]);
    
    const appointmentsByDate = useMemo(() => {
        const map = new Map<string, LogEntry[]>();
        appointments.forEach(appt => {
            const dateKey = appt.date; // YYYY-MM-DD
            if (!map.has(dateKey)) {
                map.set(dateKey, []);
            }
            map.get(dateKey)!.push(appt);
        });
        return map;
    }, [appointments]);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDayOfWeek = startOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const daysInMonth = endOfMonth.getDate();

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    const handleDayClick = (day: Date) => {
        setSelectedDate(day);
    };
    
    const selectedDateString = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
    const appointmentsForSelectedDate = appointmentsByDate.get(selectedDateString) || [];
    
    const appointmentsForCurrentMonth = useMemo(() => {
      return appointments.filter(appt => {
        const apptDate = new Date(`${appt.date}T00:00:00`);
        return apptDate.getFullYear() === currentDate.getFullYear() && apptDate.getMonth() === currentDate.getMonth();
      });
    }, [appointments, currentDate]);


    const AppointmentPill: React.FC<{appt: LogEntry}> = ({ appt }) => {
      const bgColor = appt.source === 'google' ? 'bg-amber-100' : 'bg-slate-50';
      const textColor = appt.source === 'google' ? 'text-amber-900' : 'text-slate-800';
      const timeColor = appt.source === 'google' ? 'text-amber-700' : 'text-slate-600';

      return (
         <div key={appt.id} className={`p-3 ${bgColor} rounded-lg`}>
            {!selectedDate && <p className="text-xs font-bold text-slate-500">{new Date(`${appt.date}T00:00:00`).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })}</p>}
            <p className={`font-semibold ${textColor}`}>{appt.description}</p>
            {appt.time && <p className={`text-sm ${timeColor}`}>{appt.time}</p>}
            {appt.details && <p className="text-xs text-slate-500 mt-1">{appt.details}</p>}
        </div>
      );
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <Card className="lg:col-span-2">
                <div className="flex justify-between items-center p-4 border-b border-slate-200">
                    <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-slate-100">&lt;</button>
                    <h2 className="text-lg font-bold text-slate-800 capitalize">{currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</h2>
                    <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-slate-100">&gt;</button>
                </div>
                <div className="grid grid-cols-7 text-center text-sm font-semibold text-slate-500 border-b border-slate-200">
                    {weekDays.map(day => <div key={day} className="py-2">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 grid-rows-6 gap-px bg-slate-200 border-l border-b border-slate-200">
                    {days.map((day, index) => {
                        if (!day) return <div key={`empty-${index}`} className="bg-slate-50"></div>;
                        
                        const dateString = day.toISOString().split('T')[0];
                        const dayAppointments = appointmentsByDate.get(dateString) || [];
                        const hasAppointment = dayAppointments.length > 0;
                        const isToday = dateString === new Date().toISOString().split('T')[0];
                        const isSelected = dateString === selectedDateString;
                        
                        return (
                            <div key={dateString} onClick={() => handleDayClick(day)} className={`relative p-1.5 h-32 bg-white hover:bg-teal-50 cursor-pointer flex flex-col items-start overflow-hidden ${isSelected ? 'ring-2 ring-teal-500 z-10' : ''}`}>
                                <time dateTime={dateString} className={`font-medium text-sm ${isToday ? 'bg-teal-600 text-white rounded-full h-6 w-6 flex items-center justify-center' : 'text-slate-700'}`}>
                                    {day.getDate()}
                                </time>
                                {hasAppointment && (
                                  <div className="mt-1 w-full space-y-1 overflow-y-auto pr-1">
                                    {dayAppointments.slice(0, 3).map(appt => (
                                        <div key={appt.id} className={`px-1.5 py-0.5 rounded text-xs truncate ${appt.source === 'google' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'}`}>
                                            {appt.time && <span className="font-bold">{appt.time}</span>} {appt.description}
                                        </div>
                                    ))}
                                    {dayAppointments.length > 3 && (
                                        <div className="text-xs text-slate-500 font-medium">+ {dayAppointments.length - 3} más</div>
                                    )}
                                  </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </Card>
            
            <Card>
                <div className="p-5">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {selectedDate 
                        ? `Citas para el ${selectedDate.toLocaleDateString('es-ES', {day: 'numeric', month: 'long'})}`
                        : `Citas en ${currentDate.toLocaleDateString('es-ES', {month: 'long'})}`
                      }
                    </h3>
                    <div className="mt-4 space-y-3 max-h-[28rem] overflow-y-auto pr-2">
                      {(selectedDate ? appointmentsForSelectedDate : appointmentsForCurrentMonth).length > 0 ? (
                        (selectedDate ? appointmentsForSelectedDate : appointmentsForCurrentMonth).map(appt => (
                          <AppointmentPill key={appt.id} appt={appt} />
                        ))
                      ) : (
                        <p className="text-sm text-slate-500">No hay citas para {selectedDate ? 'este día.' : 'este mes.'}</p>
                      )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Calendar;