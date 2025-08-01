import React, { useState, useRef, useEffect } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AIChatMessage } from '../types';
import { getAIChatResponse } from '../services/geminiService';
import { IconSparkles } from '../constants';

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
    </div>
);

const AIChat: React.FC = () => {
    const [messages, setMessages] = useState<AIChatMessage[]>([
        {
            id: 'initial',
            role: 'model',
            text: 'Hola, soy tu asistente virtual. Estoy aquí para ayudarte a resolver dudas sobre el autismo, ofrecerte estrategias o simplemente escucharte. ¿En qué puedo ayudarte hoy?',
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: AIChatMessage = {
            id: new Date().toISOString(),
            role: 'user',
            text: input.trim(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await getAIChatResponse(input.trim());
            const modelMessage: AIChatMessage = {
                id: new Date().toISOString() + '-model',
                role: 'model',
                text: responseText,
            };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            const errorMessage: AIChatMessage = {
                id: new Date().toISOString() + '-error',
                role: 'model',
                text: 'Lo siento, he encontrado un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col max-w-3xl mx-auto">
            <Card className="flex-1 flex flex-col">
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && (
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
                                    <IconSparkles className="h-5 w-5 text-white" />
                                </div>
                            )}
                            <div className={`rounded-lg px-4 py-3 max-w-lg shadow-sm ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
                                <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}/>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-end gap-3 justify-start">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
                                <IconSparkles className="h-5 w-5 text-white" />
                            </div>
                            <div className="rounded-lg px-4 py-3 max-w-lg bg-slate-200 text-slate-800">
                                <TypingIndicator />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                        <Input
                            type="text"
                            placeholder="Escribe tu pregunta aquí..."
                            className="flex-1"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                            aria-label="Escribe tu pregunta aquí"
                        />
                        <Button type="submit" isLoading={isLoading} disabled={!input.trim()}>
                            Enviar
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default AIChat;