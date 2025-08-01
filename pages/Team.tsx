import React from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ChatMessage } from '../types';

const teamMembers = [
    { id: 1, name: 'Dra. Elena García', role: 'Supervisora Clínica', avatar: 'https://picsum.photos/seed/doc1/100/100' },
    { id: 2, name: 'Carlos Ruiz', role: 'Terapeuta del Lenguaje', avatar: 'https://picsum.photos/seed/doc2/100/100', active: true },
    { id: 3, name: 'Laura Méndez', role: 'Educadora Especial', avatar: 'https://picsum.photos/seed/doc3/100/100' },
];

const initialMessages: ChatMessage[] = [
    { id: '1', sender: 'therapist', text: 'Hola, solo para confirmar nuestra sesión de mañana a las 10 AM. ¿Revisaron los pictogramas que envié?', timestamp: 'Ayer, 4:30 PM', avatar: 'https://picsum.photos/seed/doc2/100/100' },
    { id: '2', sender: 'user', text: '¡Hola Carlos! Sí, confirmado. Los hemos estado practicando y a Mateo le gustan mucho.', timestamp: 'Ayer, 4:32 PM', avatar: 'https://picsum.photos/100/100' },
    { id: '3', sender: 'therapist', text: '¡Excelente! Me alegra escuchar eso. Nos vemos mañana entonces.', timestamp: 'Ayer, 4:33 PM', avatar: 'https://picsum.photos/seed/doc2/100/100' },
];

const Team: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
      <Card className="md:col-span-1">
        <div className="p-5">
            <h3 className="text-lg font-semibold">Tu Equipo de Cuidado</h3>
        </div>
        <div className="border-t border-slate-200">
            <ul className="divide-y divide-slate-200">
                {teamMembers.map(member => (
                    <li key={member.id} className="p-4 flex items-center hover:bg-slate-50 cursor-pointer">
                        <img className="h-10 w-10 rounded-full" src={member.avatar} alt={member.name} />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-slate-900">{member.name}</p>
                            <p className="text-sm text-slate-500">{member.role}</p>
                        </div>
                        {member.active && <span className="ml-auto w-2 h-2 bg-green-400 rounded-full"></span>}
                    </li>
                ))}
            </ul>
        </div>
      </Card>
      
      <Card className="md:col-span-2 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center">
             <img className="h-10 w-10 rounded-full" src={teamMembers[1].avatar} alt={teamMembers[1].name} />
             <div className="ml-3">
                <h3 className="text-lg font-semibold">{teamMembers[1].name}</h3>
                <p className="text-sm text-green-600">En línea</p>
             </div>
        </div>

        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {initialMessages.map(msg => (
                <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    {msg.sender === 'therapist' && <img src={msg.avatar} alt="Therapist" className="h-8 w-8 rounded-full" />}
                    <div className={`rounded-lg px-4 py-2 max-w-sm ${msg.sender === 'user' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-teal-200' : 'text-slate-500'}`}>{msg.timestamp}</p>
                    </div>
                     {msg.sender === 'user' && <img src={msg.avatar} alt="User" className="h-8 w-8 rounded-full" />}
                </div>
            ))}
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center space-x-3">
                <Input type="text" placeholder="Escribe tu mensaje..." className="flex-1"/>
                <Button>Enviar</Button>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default Team;
